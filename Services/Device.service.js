import DeviceModel from '../Models/Device.model.js'
import DeviceInfoModel from '../Models/DeviceInfo.model.js'

class DeviceService {
	async getDevice(_id) {
		try {
			const device = await DeviceModel.findOne({ _id })
				.populate('type')
				.populate('brand')
				.populate('series')
			return device
		} catch (error) {
			console.log(error)
			return null
		}
	}
	async getAllDevices() {
		try {
			const devices = await DeviceModel.find()
			return devices
		} catch (error) {
			console.log(error)
			return null
		}
	}
	async getDeviceInfo(_id) {
		try {
			const deviceInfo = await DeviceInfoModel.findOne({ deviceID: _id })
			return deviceInfo.info
		} catch (error) {
			console.log(error)
			return null
		}
	}
}

export default new DeviceService()
