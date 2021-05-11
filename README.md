Cake App
========

Running the App
---------------

Ensure you are running NodeJs v12

```
$ nvm use 12
```

or

```
nvm install 12
```

Install global dependencies

```
$ npm install --global typescript mocha db-migrate db-migrate-mysql @angular/cli
```

Start a temporary local DB with Docker

```
$ docker run --name cake-db -e MYSQL_ROOT_PASSWORD=Passw0rd -e MYSQL_USER=cake.api -e MYSQL_PASSWORD=Passw0rd -e MYSQL_DATABASE=cake_app -p 3306:3306 mariadb
```

Run DB migrations with:

```
$ db-migrate up
```

Build and run the API with:

```
$ cd api
$ npm install
$ tsc
$ npm start
```

The API will serve on http://localhost:1337

Run unit tests with:

```
npm test
```

Build and run the front-end application with:

```
cd app
ng serve
```

Open http://localhost:4300 in your browser.