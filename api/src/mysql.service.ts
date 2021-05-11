/**
 * Singleton MySQL utility class
 */

import { Connection, createPool, createConnection, Pool } from 'mysql';

const MYSQL_DATABASE = 'cake_app';
const MYSQL_HOST = '0.0.0.0';
const MYSQL_PASSWORD = 'Passw0rd';
const MYSQL_PORT = 3306;
const MYSQL_USER = 'cake.api';

export class MySQLService {

    // connection pool
    private static pool: Pool;

    /**
     * Returns instance of a connection pool
     */
     public static getPool(): Pool {
        if (this.pool) {
            return this.pool;
        }

        this.pool = createPool({
            database: MYSQL_DATABASE,
            host: MYSQL_HOST,
            password: MYSQL_PASSWORD,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            charset: 'utf8mb4',
            typeCast(field, next) {
                // Cast TINYINT(1) to boolean
                if (field.type === 'TINY' && field.length === 1) { return (field.string() === '1'); }
                return next();
            },
        });

        return this.pool;
    }

        /**
     * Get a connection from the pool
     */
         public static getConnection(): Promise<Connection> {
            const pool = this.getPool();
    
            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    (error) ? reject(error) : resolve(connection);
                });
            });
        }
    
        /**
         * End the pool
         */
        public static end() {
            const pool = this.getPool();
            return pool.end();
        }
    
        /**
         * Make a SQL query
         * @param text
         * @param params
         * @param connection
         */
        public static async query<T>(text: string, params?: any[], connection?: Connection): Promise<T> {
    
            // Get a connection from the pool if not provided
            const conn = connection || await this.getConnection();
    
            return new Promise((resolve, reject) => {
                conn.query(text, params, (error, results, fields) => {
    
                    // Don't close the connection if it was passed in as an argument
                    if (!connection) { conn.destroy(); }
    
                    if (error) { reject(error); }
    
                    // console.debug({ text: text.replace(/[\s\t\n\r]+/g, ' '), params, connnectionId: conn.threadId }, 'MYSQL QUERY');
                    return resolve(results);
                });
            });
        }


    /**
     * Make DB query, returning first result or false
     */
    public static async queryOne<T>(text: string, params?: any[], connection?: Connection): Promise<false | T> {
        const result = await this.query<T[]>(text, params, connection);
        if (result.length === 0) { return false; }
        return result[0];
    }

    /**
     * Execute two queries in a transaction
     * Utility function for INSERT/SELECT and UPDATE/SELECT transactions
     * @param text1
     * @param params1
     * @param text2
     * @param params2
     */
    public static async twinQuery<T>(text1: string, params1: any[], text2: string, params2: any[]): Promise<T> {
        // Get a DB connection
        const connection = await this.getConnection();

        try {
            // Begin transaction
            await this.query('START TRANSACTION', [], connection);

            // Execute first query
            await this.query(text1, params1, connection);

            // Execute second query
            const result = await this.query<T>(text2, params2, connection);

            // Commit transaction
            await this.query('COMMIT', [], connection);

            // Destroy connection
            connection.destroy();

            // Return result of second query
            return result;

        } catch (err) {
            // Rollback the transaction if any errors occur
            await this.query('ROLLBACK', [], connection);
            connection.destroy();
            throw (err);
        }
    }

    /**
     * Utility function to insert and select records in a transaction
     * @param insertText
     * @param insertParams
     * @param selectText
     * @param selectParams
     */
    public static async insertSelect<T>(insertText: string, insertParams: any[], selectText: string, selectParams: any[]): Promise<T[]> {
        return await this.twinQuery<T[]>(insertText, insertParams, selectText, selectParams);
    }

    /**
     * Utility function to insert and select a single record in a transaction
     * @param insertText
     * @param insertParams
     * @param selectText
     * @param selectParams
     */
    public static async insertSelectOne<T>(insertText: string, insertParams: any[], selectText: string, selectParams: any[]): Promise<T> {
        return await this.twinQuery<T[]>(insertText, insertParams, selectText, selectParams).then((result) => result[0]);
    }

    /**
     * Utility function to update and select a single record in a transaction
     * @param updateText
     * @param updateParams
     * @param selectText
     * @param selectParams
     */
    public static async updateSelect<T>(updateText: string, updateParams: any[], selectText: string, selectParams: any[]): Promise<T[]> {
        return await this.twinQuery<T[]>(updateText, updateParams, selectText, selectParams);
    }

    /**
     * Utility function to update and select a single record in a transaction
     * @param updateText
     * @param updateParams
     * @param selectText
     * @param selectParams
     */
    public static async updateSelectOne<T>(updateText: string, updateParams: any[], selectText: string, selectParams: any[]): Promise<T> {
        return await this.twinQuery<T[]>(updateText, updateParams, selectText, selectParams).then(((result) => result[0]));
    }

}