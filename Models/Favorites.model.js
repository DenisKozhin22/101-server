import mongoose from 'mongoose'
const favoritesSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Device',
		},
	],
})

mongoose.set('strictQuery', true)
export default mongoose.model('Favorites', favoritesSchema)
