## **CiboAdvisor**

CiboAdvisor - the restaurant list that includes several nice spots worth to visit in Taiwan

<img width="1173" alt="截圖 2020-12-31 上午12 36 35" src="https://user-images.githubusercontent.com/69234380/103368064-9910d600-4b01-11eb-92f2-3b087db4ed81.png">


## **Features**

1. Find restaurants located in Taipei.
2. Search restaurant by name and it's description.
3. Show info page when certain restaurant get clicked.
4. Add new restaurant
5. Edit Info of any restaurant
6. Delete any restaurant

## Prerequisites

Node.js

Express

Express-Handlebars

Handlebars-Helpers

Mongoose

## **Getting Started**

Clone repository to your local computer

```bash
$ git clone https://github.com/ChenSingYo/CiboAdvisor.git
```

create db

```bash
cd ~/mongodb/bin/
[~/mongodb/bin] $ ./mongod --dbpath ~/mongodb-data
```

Install [npm](https://www.npmjs.com/) and execute

```bash
$ npm install 14.15.1
$ npm run seed
$ npm run start     ..will automatically run 'node app.js'
```

or

```bash
$ npm -i nodemon
$ npm run seed
$ npm run dev       ..will automatically run 'nodemon app.js'
```

when everything works fine:

```
Express is listening on localhost:3000
mongodb connected!
```

let 's check CiboAdvisor with your Browser

```
http://localhost:3000
```

## **Built With**

Node.js 14.15.1

Express 4.17.1

Express-Handlebars 5.2.0

Handlebars-Helpers 0.10

Mongoose v5.11.8
