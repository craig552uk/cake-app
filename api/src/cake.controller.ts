import { Cake } from './cake.model';
import { MySQLService as DB } from './mysql.service';
import { BadRequest, NotFound } from 'http-errors';

export class CakeController {

    /**
     * Get all Cakes
     */
    public static async getAllCakes(): Promise<Cake[]> {
        let response = await DB.query<Cake[]>('SELECT * FROM cakes');
        return response.map((r) => { return new Cake(r); });
    }

    /**
     * Get one Cake by id
     * @param id number
     */
    public static async getOneCake(id: number): Promise<Cake> {
        let response = await DB.queryOne<Cake>('SELECT * FROM cakes WHERE id = ?', [id]);
        if(!response){ throw new NotFound(); }
        return new Cake(response);
    }

    /**
     * Create a new Cake
     * @param cake Cake
     */
    public static async createCake(cake: Cake): Promise<Cake | undefined> {
        cake.validate();

        // Map fields to DB schema
        const values = {
            name: cake.name,
            comment: cake.comment,
            imageUrl: cake.imageUrl,
            yumFactor: cake.yumFactor,
        };

        try {
            let response = await DB.insertSelectOne<Cake>(
                'INSERT INTO cakes SET ?', [values],
                'SELECT * FROM cakes ORDER BY createdAt DESC LIMIT 1', []
            );

            return new Cake(response);

        } catch(e) {
            if (e.message.match(/ER_DUP_ENTRY/)) {
                throw new BadRequest('Cake name already in use');
            }
        }
    }

    /**
     * Update a Cake
     * @param cake Cake
     */
    public static async updateCake(cake: Cake): Promise<Cake | undefined> {
        cake.validate();

        // Map fields to DB schema
        const values = {
            name: cake.name,
            comment: cake.comment,
            imageUrl: cake.imageUrl,
            yumFactor: cake.yumFactor,
        };

        try {
            let response = await DB.updateSelectOne<Cake>(
                'UPDATE cakes SET ? WHERE id = ?', [values, cake.id],
                'SELECT * FROM cakes WHERE id = ?', [cake.id]
            );

            return new Cake(response);

        } catch(e) {
            if (e.message.match(/ER_DUP_ENTRY/)) {
                throw new BadRequest('Cake name already in use');
            }
        }
    }

    /**
     * Delete a Cake
     * @param cake Cake
     */
    public static async deleteCake(cake: Cake): Promise<Cake> {
        await DB.query<Cake>('DELETE FROM cakes WHERE id = ?', [cake.id]);
        return cake;
    }

    /**
     * Delete all Cakes
     * Used in unit tests
     */
    public static async deleteAllCakes(): Promise<boolean> {
        await DB.query('DELETE FROM cakes');
        return true;
    }
}