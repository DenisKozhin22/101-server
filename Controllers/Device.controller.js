import BrandService from '../Services/Brand.service.js'
import TypeService from '../Services/Type.service.js'
import SeriesService from '../Services/Series.service.js'
import FilterService from '../Services/Filter.service.js'
import DeviceService from '../Services/Device.service.js'

class DeviceController {
	async getFilterDevices(req, res) {
		try {
			const devices = await FilterService.getFilterDevices(req.query, req.params.category)
			return res.json(devices)
		} catch (error) {
			console.log(error)
		}
	}
	async getAllDevice(req, res) {
		try {
			const devices = await DeviceService.getAllDevices()
			return res.json(devices)
		} catch (error) {}
	}
	async getDevice(req, res) {
		try {
			const { id } = req.params
			const device = await DeviceService.getDevice(id)
			return res.json(device)
		} catch (error) {
			console.log(error)
		}
	}
	async getDeviceInfo(req, res) {
		try {
			const { id } = req.params
			const deviceInfo = await DeviceService.getDeviceInfo(id)
			return res.json(deviceInfo)
		} catch (error) {
			console.log(error)
		}
	}
	async getAllBrands(req, res) {
		try {
			const brands = await BrandService.getAll()
			return res.json(brands)
		} catch (error) {
			console.log(error)
		}
	}

	async getType(req, res) {
		try {
			const { type } = req.params
			const findType = await TypeService.getOne(type)
			return res.json(findType)
		} catch (error) {
			console.log(error)
		}
	}
	async getAllTypes(req, res) {
		try {
			const types = await TypeService.getAll()
			return res.json(types)
		} catch (error) {
			console.log(error)
		}
	}

	async getAllSeries(req, res) {
		try {
			const { type } = req.params
			const series = await SeriesService.getAll(type)
			return res.json(series)
		} catch (error) {
			console.log(error)
		}
	}
	async getColorsBySeries(req, res) {
		try {
			const { series } = req.query
			const { type } = req.params
			const colors = await FilterService.getColors(series, type)
			return res.json(colors)
		} catch (error) {
			console.log(error)
		}
	}
}

export default new DeviceController()
