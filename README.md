# JavaScript Shopping Cart Using Classes
This Library provides a simple way to implement a Shopping Cart with Vanilla JavaScript

## Installation

Include the script *before* the ending BODY tag in HTML: 

```html
<script src="/js/shoppingcart.js"></script>
```

## Usage
Instantiate ShoppingCart Class:
```javascript
const SHOPPING_CART = new ShoppingCart();
```

Add item:

```javascript
try {
	CART.add({
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