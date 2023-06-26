import mongoose from 'mongoose'

const DeviceInfoShema = new mongoose.Schema({
	deviceID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Device' },
	info: [
		{
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
		},
	],
})
mongoose.set('strictQuery', true)
export default mongoose.model('DeviceInfo', DeviceInfoShema)
