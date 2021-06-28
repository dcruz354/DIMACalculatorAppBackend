# DIMACalculatorAppBackend Mongo RESTful API

This RESTful service uses HTTP or HTTPS protocol. What you'll find below is what's used from express to run a simple set of Create, Read, Update, and Delete (CRUD) methods.

Only the bare essentials are used to create the API service, and only the feature used by express and mongoose (mongodb client) will be explained in this documentation guide.

_Caveats: Running this app assumes you have a working mongodb instance preinstalled on you machine_

## What you'll find

| Direcotry   | Description                                           |
| ----------- | ----------------------------------------------------- |
| models      | Representations of data to be used in mongodb.        |
| controllers | Functions to be bound and executed on routes.         |
| routes      | A series of routes for handling HTTP requests.        |
| middleware  | Other helful functions necessary for running the app. |



## MongoDB Setup and Installation

Follow the instructions below to get mongo installed.

For Windows users, follow the setup and install on the [MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

For Mac/Linux users:

```bash
# Install using brew
brew install mongodb

# Create the database directory
mkdir -p /data/db

# Give write ownership for the directory
# You will be prompted to enter your password
sudo chown -R `id -un` /data/db

# Run the service
mongod
```

In another terminal window, you can access the mongo shell with:

```bash
mongo
```

You'll know you sucessfuly ran the service and connected given the logs it presents you.

**NOTE: once configured, move onto the next steps.**

## Setup and Install

1. Install all packages:

```bash
npm install
```

2. Spin up the mongodb instance:

```bash
mongod
```

3. Run server instance (either one works):

```bash
npm start
```

## MongoDB Shell

Running the shell allows you to directly manage you databases and collections. *This is for advanced use and shouldn't be used without looking at the documentation or googling further instructions.*

In one terminal run:

```bash
mongod
# exit with CTRL + C
```

In another terminal window run:

```bash
mongo
# close the shell with
quit()
```



## Models and Schemas

In mongodb, Schemas represent how the data will be presented in the database. The export Schema is wrapped in constructor provided by mongoose called `model()`. This function exposes a number of functions that you can perform that match the Schema being used.

```typescript
// to-order-list.model.ts
export const Orders = model('Orders', OrdersSchema);

// to-order-list.controller.ts
Orders.find(...);
Orders.findById(...);
...
```

Functions exposed by `model()` and more are all in mongoose's [documentation](https://mongoosejs.com/).

## Routes

Routes help direct what an `endpoint` should do. In RESful services, `endpoints` are the full url of a given API at a specific address in that API. For example: `http://localhost:3000/orders` is a RESTful `endpoint`. Pointing my browser at this address (assuming the server is live) will give me results if a route exists and has a [controller method](#controllers) attached.

Express routes are defined by either one of these:

```typescript
const app = express();
app.use('routePath').get((req, res) => { ... });

// or

const router = express.Router();
router.get('routePath', (req, res) => { ... });
```

## Controllers

Controller help build up routes by providing some level of functionality to a specified route. It's also key to note that there are different kinds of controllers. Like in MVC patterns, controllers effect how data is displayed or what happens on click events. When defining APIs, controllers can have nested functionality, control/manipulate data flow to the next controller, or access a database, in our case, and more.

Since these are really just functions, we don't need anything special from express to implement them. We just need to make sure that our function signature matches correctly to where we intend to use it:

```typescript
exports.createOrder = (req, res) => { ... }
// (req, res) <- function signature
```

### Middleware

Middleware is a kind of controller or function that controls the behaviour of a `request` or `response` within a server instance.

#### Error-handling Middlware Functions

We have the freedom to define what we want in our APIs, and error-handling is no exception. Error-handling controllers/functions follow a specific syntax that express recognizes:

```typescript
// notice the `err` parameter before `req` and `res`
exports.errorHandler = (err, req, res) => { ... }
```

## Testing with Postman notes
Download and install Postman for easy testing.
Make sure you setup MongoDB with a database named "*orderdb*"

## Commands to Run Development
```
cd restful-api-mongo/
npm install
npm run dev
```

### Postman User
##### Register
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/register" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. Under "Body", select "raw" and input json content with :
    ```json
    {
        "firstname": "testFN",
        "lastName": "testLN",
        "username": "testUN",
        "password": "testPW"
    }
    ```
6. Click send. You're response should be a json object that includes first name, last name,username, id, password, and all used login tokens.
7. If you submit again with same username, response should state that Username already exists.

##### Login
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/login" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. Under "Body", select "raw" and input json existing username and password: e.g:
    ```json
    {
        "username": "testUN",
        "password": "testPW"
    }
    ```
6. Click send. You're response should be a json object that includes firstname, last name, username, id, password, and all used login tokens.
7. If you submit again, you will receive the same response except with a new token as well.
8. Failed logins will return error messages.

##### Test Login Tokens
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*GET*". Enter "http://localhost:3000/users/me" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. You can leave body empty.
6. Click send. You're response should be a json object that states: "Not authorized to access these resources."
7. Copy one of the tokens from a previous User login response.
8. Click "Authorization", select "Bearer Token" as Type, and paste the previously copied token to the Token field.
9. Click send, should receive JSON object of user with first name, last name, username, id, password, and login tokens.

##### Test Logout for 1 token
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/logout" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. You can leave body empty.
6. Click send. You're response should be a json object that states: "Not authorized to access these resources."
7. Copy one of the tokens from a previous User login response.
8. Click "Authorization", select "Bearer Token" as Type, and paste the previously copied token to the Token field.
9. Click send, should receive  "success": true.


##### Test Logout for All tokens
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/logoutAll" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. You can leave body empty.
6. Click send. You're response should be a json object that states: "Not authorized to access these resources."
7. Copy one of the tokens from a previous User login response.
8. Click "Authorization", select "Bearer Token" as Type, and paste the previously copied token to the Token field.
9. Click send, should receive "success": true.