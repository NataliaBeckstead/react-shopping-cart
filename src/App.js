import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		if (!cart.some(cartItem => cartItem.id === item.id))
			setCart([...cart, item]);
	};

	const removeItem = itemId => {
		setCart(cart.filter(cartItem => cartItem.id !== itemId));
	};


	return (
		<div className="App">
			<CartContext.Provider value={{ cart, removeItem }}>
				<Navigation />

				{/* Routes */}
				<ProductContext.Provider value={{ products, addItem }}>
					<Route exact path="/">
						<Products />
					</Route>
				</ProductContext.Provider>

				<Route path="/cart">
					<ShoppingCart />
				</Route>
			</CartContext.Provider>
		</div>
	);
}

export default App;
