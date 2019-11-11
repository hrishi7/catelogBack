# Product catelog API

> Backend API for product catelog

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
nodemon server.js

# Run in prod mode
node server.js
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo

The API is live at [https://catelogeback.herokuapp.com/api/v1/products](https://catelogeback.herokuapp.com/api/v1/products)

- Version: 1.0.0
- License: MIT
- Author: Brad Traversy