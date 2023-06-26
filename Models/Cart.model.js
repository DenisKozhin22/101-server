import mongoose from 'mongoose'

const CartShema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Device',
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				default: 1,
			},
		},
	],
})

// mongoose.set('strictQuery', true)
export default mongoose.model('Cart', CartShema)
