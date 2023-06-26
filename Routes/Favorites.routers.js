import { Router } from 'express'
import FavoritesController from '../Controllers/Favorites.controller.js'
import checkAuth from '../Utils/checkAuth.js'

const favoritesRouter = new Router()

favoritesRouter.get('/', checkAuth, FavoritesController.getFavorites)
favoritesRouter.post('/toggle-favorites', checkAuth, FavoritesController.toggleFavorites)
favoritesRouter.post('/add-to-favorites', checkAuth, FavoritesController.addToFavorites)
favoritesRouter.post('/remove-from-favorites', checkAuth, FavoritesController.removeFromFavorites)
export default favoritesRouter
