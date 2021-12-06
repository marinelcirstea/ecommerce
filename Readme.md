# Ecommerce platform with express and mongodb(mongoose)

##### `This project is still in development, it's going to change a lot, please don't use it in production yet.`

### The stack so far

`express` for the server

`mongoose` for working with MongoDb

`bcryptjs` for hashing and comparing passwords

`cookie` and `cookie-parser` for working with cookies

`cors` to enable cross-site requests

`module-alias` so we can use custom path aliases in production

`JWT` module is hand written(can be found in `libs`)

##### Here's the flow of the app, so you don't have to figure it out

`router => controller => service => database`

##### Let's take the User logic as an example:

`user-routes` hits the `user-controller`

`user-controller` hits the `user-service`

`user-service` hits the `database`

`user-service` can also hit the `ice factory` for validation and/or reconstruction before
hitting the `database`

## What each piece of logic should do:

`router` - Receive requests and call the `controller`

`controller` - Call the `service` and return a `response`

`service` - Call the factory if needed, work with the `database`, validate and throw relevant errors.

### Folders

##### `configs`

```
Contains the configs for each service(auth, product, user, etc.)
Mass export through "index.ts"
```

##### `controllers`

```
Contains the "iced" controllers for each service
Not exported globally. Each controller should be imported individually
```

##### `interfaces`

```
Shared interfaces(interfaces used by multiple pieces of logic)
```

##### `libs`

```
Custom helper functions and node module wrappers(so we can easily swing
through different libraries without changing the code in the whole app)
```

##### `middlewares`

```
For custom express middlewares.
"auth-middleware" for token validation
"catch-exception" used to catch exceptions at route-level.
"error-handler" used to handle exceptions thrown from "catch-exception"
```

##### `models`

```
Pretty self explanatory. Here's where we keep out db models.
```

##### `routes`

```
Contains the routes encapsulated for each service.
Exported as global router through index.ts
```

##### `services`

```
Contains each individual service and its ice factory.
Exported individually.
We should probably ice the services as well.
```

### `More docs will come in the future.`
