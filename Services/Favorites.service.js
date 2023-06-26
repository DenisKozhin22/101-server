import FavoritesModel from '../Models/Favorites.model.js'

class FavoritesService {
	async getFavorites(_id) {
		try {
			const favorites = FavoritesModel.findOne({ user: _id })
				.populate('products')
				.populate({
					path: 'products',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'type',
					},
				})

			return favorites
		} catch (error) {
			console.log(error)
		}
	}

	async toggleFavorites(productId, _id) {
		try {
			let favorites = await FavoritesModel.findOne({
				user: _id,
			})
				.populate('products')
				.populate({
					path: 'products',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'type',
					},
				})

			if (!favorites) {
				favorites = new FavoritesModel({
					user: _id,
				})
			}

			const existingProductIndex = favorites.products.findIndex(
				item => item._id.toString() === productId,
			)
			if (existingProductIndex === -1) {
				favorites.products.push(productId)
			} else {
				const filterFavorites = favorites.products.filter(item => item._id.toString() !== productId)
				favorites.products = filterFavorites
			}

			await favorites.save()
			return {
				success: true,
				productId,
			}
		} catch (error) {
			console.log(error)
		}
	}

	async addToFavorites(productId, _id) {
		try {
			let favorites = await FavoritesModel.findOne({
				user: _id,
			})
				.populate('products')
				.populate({
					path: 'products',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'type',
					},
				})

			if (!favorites) {
				favorites = new FavoritesModel({
					user: _id,
				})
			}
			const existingProductIndex = favorites.products.findIndex(
				item => item._id.toString() === productId,
			)
			if (existingProductIndex === -1) {
				favorites.products.push(productId)
				await favorites.save()
				return {
					success: true,
					productId,
				}
			} else {
				return {
					success: false,
					productId,
				}
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				productId,
			}
		}
	}
	async removeFromFavorites(productId, _id) {
		try {
			let favorites = await FavoritesModel.findOne({
				user: _id,
			})
				.populate('products')
				.populate({
					path: 'products',
					populate: {
						path: 'series',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'brand',
					},
				})
				.populate({
					path: 'products',
					populate: {
						path: 'type',
					},
				})

			if (!favorites) {
				favorites = new FavoritesModel({
					user: _id,
				})
			}
			const existingProductIndex = favorites.products.findIndex(
				item => item._id.toString() === productId,
			)
			if (existingProductIndex !== -1) {
				favorites.products = favorites.products.filter(item => item._id.toString() !== productId)
				await favorites.save()
				return {
					success: true,
					productId,
				}
			} else {
				return {
					success: false,
					productId,
				}
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				productId,
			}
		}
	}
}
export default new FavoritesService()
