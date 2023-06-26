import mongoose from 'mongoose'

const SeriesShema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Type',
	},
})
mongoose.set('strictQuery', true)
export default mongoose.model('Series', SeriesShema)
