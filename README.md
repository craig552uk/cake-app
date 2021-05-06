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
$ npm install --global typescript mocha
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