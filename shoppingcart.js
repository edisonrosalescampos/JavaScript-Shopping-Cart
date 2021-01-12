/*!
 * This library provides a simple way to implement a Shopping Cart with Vanilla JavaScript
 * 
 * Edison Rosales. v1.0. Created on Jan 9th, 2021.
 * Any doubt? Send me a message to edisonrosales@gmail.com.
 */
class ShoppingCart {
	constructor( content = {} ) {
		this.products = ( content.products || [] );
		this.subtotal = ( content.subtotal || 0 );
		this.tax = ( content.tax || 0 );
		this.total = ( content.total || 0 );
		this.decimals = ( content.decimals || 2 );
		this.taxPercent = ( content.taxPercent || 19 );
		this.increment = ( content.increment || 1 );
	}

	// Adds a new item in Cart
	add( content = {} ) {		
		// Checks for required keys
		if ( !content.id || !content.stock || !content.price ) {
	    	throw "'id', 'stock' or 'price' is not defined!";
	    	return false;
    	}

    	// Checks if item is already in Cart
		let index = this.exists( content.id );

		if ( index === null ) {
			// If item does not exist

			// Checks if stock is enough
 			if (  parseInt( content.stock ) < parseInt( content.quantity ) || parseInt( content.stock ) < parseInt( this.increment ) ) { 
				throw "Stock is not enough!";
    			return false;
			}

			this.products.push({
				"id": parseInt( content.id ),
				"name": content.name || '',
				"stock": parseInt( content.stock ),
				"quantity": parseInt( ( content.quantity || this.increment ) ),
				"price": parseFloat( content.price ),
				"discount": parseFloat( ( content.discount || 0 ) )
			});

			// Gets the product added index
			index = this.exists( content.id );

			// Updates the current item subtotal 
			this.products[index].subtotal = parseFloat( this.calculateSubTotalByItem( index ) );
		} else {
			// If item exists

			// Checks if there is enough stock
			if ( parseInt( this.products[index].stock ) < ( parseInt( this.products[index].quantity ) + parseInt( this.increment ) ) ) {
				throw "Stock is not enough!";
    			return false;
			}

			// Increases the current item quantity
			this.products[index].quantity += this.increment;
			// Updates the current item subtotal
			this.products[index].subtotal = parseFloat( this.calculateSubTotalByItem( index ) );
		}

		// Updates SubTotal
		this.subtotal = this.calculateSubTotal(); 
		// Updates Tax
		this.tax = this.calculateTax(); 
		// Updates Total
		this.total = this.calculateTotal();

		return true;
	}

	// Removes an item by id in Cart
	remove( content = {} ) {
		// Checks for required keys
		if ( !content.id ) {
    		throw "'id' is not defined!";
    		return false;
    	}

    	// Checks if item is already in Cart
		let index = this.exists( content.id );

		// If item does not exist
		if ( index === null ) {
			throw "No item with required id!";
    		return false;
		}

		// If item exists
		this.products.splice( index, 1 );

		// Updates SubTotal
		this.subtotal = this.calculateSubTotal();
		// Updates Tax
		this.tax = this.calculateTax();
		// Updates Total
		this.total = this.calculateTotal();

		return true;
	}

	// Edits an item in Cart
	update( content = {} ) {
		// Checks for required keys
		if ( !content.id || !content.quantity ) {
	    	throw "'id' or 'quantity' is not defined!";
	    	return false;
	    } 

    	// Checks if item is already in Cart
		let index = this.exists( content.id );

		// If item does not exists
		if ( index === null ) {
			throw "No item with required id!";
    		return false;
		} 

		// If item exists
		
		// Checks if there is enough stock
		if ( parseInt( this.products[index].stock ) < parseInt( content.quantity ) ) {
			throw "Stock is not enough!";
    		return false;
		}

		// Updates the current item quantity
		this.products[index].quantity = parseInt( content.quantity );
		// Update the current item subtotal
		this.products[index].subtotal = parseFloat( this.calculateSubTotalByItem( index ) );

		// Updates SubTotal		
		this.subtotal = this.calculateSubTotal();
		// Updates Tax
		this.tax = this.calculateTax();
		// Updates Total
		this.total = this.calculateTotal();

		return true;
	}

	// Removes all items in Cart
	clear() {
		this.products.length = 0;

		// Updates SubTotal
		this.subtotal = this.calculateSubTotal();
		// Updates Tax
		this.tax = this.calculateTax();
		// Updates Total
		this.total = this.calculateTotal();

		return true;
	}

	// Finds an item by ID
	exists( id ) {
		// Checks for required properties
		if ( !id ) {
	    	throw "'id' is not defined!";
	    	return false;
	    }

	    // Returns the selected item index
		for( let i in this.products ) {
	    	if ( !this.products.hasOwnProperty( i ) ) continue;
	    	if ( parseInt( this.products[i].id ) == parseInt( id ) ) return i;
	    }

	    // Otherwise, returns null
	    return null;
	}

	// Returns subtotal
	getSubTotal() {
		return parseFloat( this.subtotal ).toFixed( this.decimals );
	}

	// Returns tax
	getTax() {
		return parseFloat( this.tax ).toFixed( this.decimals );
	}

	// Returns total
	getTotal() {
		return parseFloat( this.total ).toFixed( this.decimals );
	}

	// Returns all items in Cart
	getContent() {
		return this.products;
	}

	// Returns total items quantity sum
	getTotalQuantity() {
		return this.products.length;
	}

	// Returns true if there are not items in Cart
	isEmpty() {
		return ( parseInt( this.products.length ) == 0 );
	}

	calculateDiscountByItem( index ) {
		return parseFloat( this.products[index].price ) *  parseFloat( this.products[index].quantity ) * ( parseFloat(this.products[index].discount ) / 100 );
	}

	calculateSubTotalByItem( index ) {
		return ( parseInt( this.products[index].quantity ) * parseFloat( this.products[index].price ) ) - parseFloat( this.calculateDiscountByItem( index ) );
	}

	calculateSubTotal() {
		let subtotal = 0;

		for( let i in this.products ) {
	    	if ( !this.products[i].hasOwnProperty("subtotal") ) continue;
				
			subtotal += parseFloat(this.products[i].subtotal);
	    }

	    return subtotal;
	}

	calculateTax() {
		return parseFloat( this.getSubTotal() ) * ( parseFloat( this.taxPercent ) / 100 );
	}

	calculateTotal() {
		return parseFloat( this.getSubTotal() ) + parseFloat( this.getTax() );
	}
}
