import mongoose from 'mongoose'

const BrandShema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
})
mongoose.set('strictQuery', true)
export default mongoose.model('Brand', BrandShema)
