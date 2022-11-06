# Simple Typescript/Express.js/MariaDB API Exercise
## Setup
1. Clone this repository
```
git clone https://github.com/Circl3s/api-test
```
2. Install dependencies
```
npm ci
```
3. Configure and run MariaDB database
    1. Create a table with fields:
        - Id: `INT NOT NULL AUTO_INCREASE` (Primary Key)
        - Name: `VARCHAR(100)`
        - Price: `FLOAT`
        - UpdateDate: `DATETIME DEFAULT CURRENT_TIMESTAMP`
```SQL
CREATE TABLE `products` (`Id` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(100), `Price` FLOAT, `UpdateDate` DATETIME DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`Id`));
```
4. Create a `.env` file with database info
```.env
DB_HOST="localhost"
DB_USER="root"
DB_PASS=""
DB_NAME="api-test"

PORT=8080
```
5. Start
```
npm start
```
## API Usage
- **GET /products**
    - No body.
    - Returns all products.
- **POST /products**
    - Body:
    ```json
    {
      "name": <name>,
      "price": <price>
    }
    ```
    - Creates a new product, returns query result.
- **GET /products/`<id>`**
    - No body.
    - Returns single product with given id.
- **PUT /products/`<id>`**
    - Body:
    ```json
    {
      "name": <name>,
      "price": <price>
    }
    ```
    - Modifies the product with given id, returns query result.
- **DELETE /products/`<id>`**
    - No body.
    - Deletes the product with given id, returns query result.
