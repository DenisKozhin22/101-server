import mongoose from 'mongoose'

const DeviceShema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	series: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Series' },
	price: {
		type: Number,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	color: { type: String, required: true },
	brand: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' },
	type: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Type',
	},
})

mongoose.set('strictQuery', true)
export default mongoose.model('Device', DeviceShema)
