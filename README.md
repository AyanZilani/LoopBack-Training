# loopback3

## Extending/Inheriting `User` base model to create a custom user model `Client`.

Learn the following key concepts:  
* Installing `node.js` and `xampp`   
* Installing `loopback 3.x` cli    
* Installing `nvm` and `nodemon` to setup development environment
* Creating new database in `MySQL` through PHPmyadmin with the corresponding user account   
* Configuring loopback to connect to `MySQL` database  
* Automigrating the models into MySQL database  
   - Learn how to use `Fat Arrow Function`, `Promises` and `Async/Await` (ES6 features)
* Configuring the built-in models to be created in the MySQL DB (`server/model-config.json`)  
* Extending/inheriting the built-in model require the `AccessToken` model relations to be overwritten:  
**server/model-config.json**  
    ```javascript
    "AccessToken": {
        "dataSource": "mysql",
        "public": false,
        "relations": {
        "user": {
            "type": "belongsTo",
            "model": "Client",
            "foreignKey": "userId"
        }
        }
    }
    ```