import { Router } from 'express'
import checkAuth from '../Utils/checkAuth.js'
import CartController from '../Controllers/Cart.controller.js'

const cartRouter = new Router()

cartRouter.get('/get-cart-user', checkAuth, CartController.getCartUser)
cartRouter.post('/add-to-cart', checkAuth, CartController.addToCart)
cartRouter.post('/remove-from-cart', checkAuth, CartController.removeFromCart)
cartRouter.post(
	'/toggle-quantity-product-from-cart',
	checkAuth,
	CartController.toggleQuantityProductFromCart,
)
export default cartRouter
