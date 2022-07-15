# MyStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

# steps before running the project

1- Don't forget to run "npm install" to install all packages and dependencies.
2- Run the following command "npm run json:server" before running the "ng serve" command

# Brief for the project

1- The home page consists of a parent component which is "product-list" which loops the child component "product-item" making the home page.
2- "product-item" component recieves the product from its parent -in this case "product-list- as an Input.
3- The third component which is "product-details" capture the id in url and display the all information about the product.
4- "cart" component displays the products that were added to the cart in db.json(act as database).
5- You can add any product at any page .. home, product details or even change the quantity inside the cart page.
6- Any change on the quantity in any page will reflect in all pages and the total amount.
7- After making the order the cart will be empty, feel free to add products again.

# last changes made

1- used ngModelChange to display an error if full name length is less than 3 characters, and address also.
2- used event emitter to can hide a product if clicked on (X) icon
