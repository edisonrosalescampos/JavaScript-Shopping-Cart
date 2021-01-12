# JavaScript Shopping Cart Using Classes
This Library provides a simple way to implement a Shopping Cart with Vanilla JavaScript

## Installation

Include the script *before* the ending BODY tag in HTML 

```html
<script src="/js/shoppingcart.js"></script>
```

## Usage

Add item:

```javascript
$.shoppingcart('add',{
				'id': 123,
				'image': 'path/to/image.png',
				'name': 'ProductName',
				'code': 'Product123',
				'url': 'catalog/clothes/product/123',
				'attributes': ['S', 'Black'],
				'price': 30,
				'count': 1
			});
```

**Only *id* & *price* are required!**

Edit item:
```javascript
$.shoppingcart('edit',{
				'id': 123,
