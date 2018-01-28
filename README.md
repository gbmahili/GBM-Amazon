# GBM-Amazon

## Overview

This is an Amazon-like storefront made using MySQL and Node. The app will take in orders from customers and deplete stock from the store's inventory. 

![AmazonGBM](img/gbmahili_bamazon.gif)

The entry point is the ```bamazonCustoermjs``` and when it is run, this application will first display all of the items available for sale. The list includes the ```ITEM ID, PRODUCT NAME, and the PRICE``` of products for sale.

| ITEM NAME     | PRODUCT NAME    | PRICE  | 
| ------------- | --------------- | -------|
| 1             | Item 1          | 10.59  |
| 2             | Item 2          | 19.99  |

The customer is prompted to answer the following two questions:

   * What is the 'ITEM_ID' of the product you would like to buy?
   * How many units of the product would would like to buy?

The information entered by the customer is validated and will only allow numbers.

Once that data has been validated, the your application checks if the store has enough of the product to meet the customer's request.

   * If not, the app informs the customer that there is `Insufficient quantity!`.

However, if the store _does_ have enough of the product, the application fulfills the customer's order then:
   * Updates the database to reflect the remaining quantity.
   * Once the update goes through, the customer sees the total cost of their purchase.
