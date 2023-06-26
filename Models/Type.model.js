import mongoose from 'mongoose'

const TypeShema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
		required: true,
	},
})
export default mongoose.model('Type', TypeShema)
