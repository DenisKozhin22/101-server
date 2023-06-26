import FavoritesService from '../Services/Favorites.service.js'

class FavoritesController {
	async getFavorites(req, res) {
		try {
			const { id } = req.user
			const favorites = await FavoritesService.getFavorites(id)
			return res.json(favorites.products)
		} catch (error) {
			console.log(error)
		}
	}
	async toggleFavorites(req, res) {
		try {
			const { productId } = req.body
			const { id } = req.user

			const resFavorites = await FavoritesService.toggleFavorites(productId, id)

			return res.json(resFavorites)
		} catch (error) {
			console.log(error)
		}
	}

	async addToFavorites(req, res) {
		try {
			const { productId } = req.body
			const { id } = req.user

			const resFavorites = await FavoritesService.addToFavorites(productId, id)
			return res.json(resFavorites)
		} catch (error) {
			console.log(error)
		}
	}

	async removeFromFavorites(req, res) {
		try {
			const { productId } = req.body
			const { id } = req.user

			const resFavorites = await FavoritesService.removeFromFavorites(productId, id)
			return res.json(resFavorites)
		} catch (error) {
			console.log(error)
		}
	}
}

export default new FavoritesController()
