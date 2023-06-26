import Cart from '../Models/Cart.model.js'

class CartController {
	async getCartUser(req, res) {
		try {
			const { id } = req.user
			let cart = await Cart.findOne({
				user: id,
			})
				.populate('products.product')
				.populate({
					path: 'products.product',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'type',
					},
				})

			if (!cart) {
				cart = new Cart({
					user: id,
				})
			}
			return res.json(cart.products)
		} catch (error) {
			console.log(error)
		}
	}
	async addToCart(req, res) {
		try {
			const { productId } = req.body
			const { id } = req.user

			let cart = await Cart.findOne({
				user: id,
			})
				.populate('products.product')
				.populate({
					path: 'products.product',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'type',
					},
				})
			if (!cart) {
				cart = new Cart({
					user: id,
				})
			}

			const existingProductIndex = cart.products.findIndex(
				item => item.product._id.toString() === productId,
			)

			if (existingProductIndex !== -1) {
				cart.products[existingProductIndex].quantity = 1
			} else {
				cart.products.push({
					product: productId,
				})
			}

			await cart.save()

			res.json({ success: true, productId })
		} catch (error) {
			console.log(error)
		}
	}

	async removeFromCart(req, res) {
		try {
			const { productId } = req.body
			const { id } = req.user

			let cart = await Cart.findOne({
				user: id,
			})
				.populate('products.product')
				.populate({
					path: 'products.product',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'type',
					},
				})
			cart.products = cart.products.filter(item => item.product._id.toString() !== productId)

			await cart.save()

			res.json({ success: true, productId })
		} catch (error) {
			console.log(error)
		}
	}

	async toggleQuantityProductFromCart(req, res) {
		try {
			const { productId, quantity } = req.body
			const { id } = req.user
			let cart = await Cart.findOne({
				user: id,
			})
				.populate('products.product')
				.populate({
					path: 'products.product',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products.product',
					populate: {
						path: 'type',
					},
				})

			const existingProductIndex = cart.products.findIndex(
				item => item.product._id.toString() === productId,
			)

			cart.products[existingProductIndex].quantity = quantity

			await cart.save()

			res.json({
				productId: cart.products[existingProductIndex].product._id,
				quantity: cart.products[existingProductIndex].quantity,
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export default new CartController()
