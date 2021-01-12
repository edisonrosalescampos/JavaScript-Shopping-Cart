# JavaScript Shopping Cart Using Classes
This Library provides a simple way to implement a Shopping Cart with Vanilla JavaScript

## Installation

Include the script *before* the ending BODY tag in HTML: 

```html
<script src="/js/shoppingcart.js"></script>
```

## Usage
Instantiate The ShoppingCart Class:
```javascript
// The constructor method receives an object type parameter
const SHOPPING_CART = new ShoppingCart();
```

The class constructor method has seven initial properties: 
```javascript
// {"products", "subtotal", "tax", "total", "decimals", "taxPercent", "increment"}
```

By default, the properties mentioned above are initialized. However, you may specify other values: 
```javascript
let settings = {
	"products": [], 
	"subtotal": 0,
	"tax": 0, 
	"total": , 
	"decimals", 
	"taxPercent", 
	"increment"
}
```

Add a new item:

```javascript
// The product quantity by default is 1
try {
	SHOPPING_CART.add({
		"id": 1,
		"name": "ProductName",
		"stock": 20,
		"price": 300.00,
		"discount": 10
	});
} catch(msg) {
	console.log(msg);
}
```

**Only *id*, *stock* & *price* are required!**

Update an item:

```javascript
try {
	SHOPPING_CART.update({
		"id": 1,
		"quantity": 10 
	});
} catch(msg) {
	console.log(msg);
}
```

**Only *id* & *quantity* are required!**

Remove an item:

```javascript
try {
	SHOPPING_CART.remove({
		"id": 1,
	});
} catch(msg) {
	console.log(msg);
}
```

**Only *id* is required!**

Clear Cart:

```javascript
SHOPPING_CART.clear();
```

Get All Cart Items:

```javascript
// Returns an objects array
let products = SHOPPING_CART.getContent();
```


Get Total Items Quantity:

```javascript
// Returns an integer
SHOPPING_CART.getTotalQuantity();
```

Get Cart SubTotal:

```javascript
// Returns an float
SHOPPING_CART.getSubTotal();
```

Get Cart Tax:

```javascript
// Returns an float
SHOPPING_CART.getTax();
```

Get Cart Total:

```javascript
// Returns an float
SHOPPING_CART.getTotal();
```