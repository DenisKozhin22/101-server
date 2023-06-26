import mongoose from 'mongoose'

const UserShema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
})

mongoose.set('strictQuery', true)
export default mongoose.model('User', UserShema)
