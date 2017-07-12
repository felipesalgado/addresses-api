# Addresses REST API

> REST API that stores and shows addresses.

```sh
$ npm install
$ node app.js
```

# Testing Examples:

> (1) Store an address:

- localhost:3000/api/address  (POST)

```json
{
  "address": "Los Militares 4777 Of. 1904 Las Condes, Santiago Chile"
}
```

> (2) Require a specific address by its place_id (string):

- localhost:3000/api/address/ChIJLmsQvQYpYRew  (GET)

> (3) Require all the addresses:

- localhost:3000/api/address  (GET)
