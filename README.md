# pghiring
Repository for pgHiring technical assessment

## setting up in localhost
**To setup and load data into database in local environment**
run `pghiring.sql` script in mysqlserver

**To run in development -- localhost**
Development Server runs on port 3000
`npm install`
`npm node start.js`


## Accessing hosted endpoints
"http://18.141.141.84/api/:endpoints"

API

`/getProducts`
: Get List of all Products

`/getCategory`
: Get list of all categories which can be mapped to products

`/getPromotionList`
: Get list of promotion packages

`/getPromotionBreakdown`
: Get breakdown list of promotion items including the items and qty

`/getProductPic?productID={productID}`
: Get all available pics of product id in S3 bucket

Working On {Put}
