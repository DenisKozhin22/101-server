import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
import BrandService from '../Services/Brand.service.js'
import TypeService from '../Services/Type.service.js'
import Type from '../Models/Type.model.js'
import Brand from '../Models/Brand.model.js'
import Device from '../Models/Device.model.js'
import DeviceInfo from '../Models/DeviceInfo.model.js'
import SeriesService from '../Services/Series.service.js'
import SeriesModel from '../Models/Series.model.js'

class AdminController {
	async createType(req, res) {
		try {
			const existingType = await Type.findOne({
				name: req.body.name,
			})
			if (existingType) {
				return res.json({
					message: 'Такой тип уже существует',
				})
			}

			const type = await TypeService.create(req.body)

			return res.json(type)
		} catch (error) {
			console.log(error)
		}
	}

	async createBrand(req, res) {
		try {
			const existingBrand = await Brand.findOne({
				name: req.body.name,
			})
			if (existingBrand) {
				return res.json({
					message: 'Такой бренд уже существует',
				})
			}

			const brand = await BrandService.create(req.body)

			return res.json(brand)
		} catch (error) {
			console.log(error)
		}
	}

	async createSeries(req, res) {
		try {
			const existingDeviceModel = await SeriesModel.findOne({
				name: req.body.name,
			})
			if (existingDeviceModel) {
				return res.json({
					message: 'Такая модель устройства уже существует',
				})
			}

			const seriesModel = await SeriesService.createModel(req.body)
			return res.json({
				success: Boolean(seriesModel),
			})
		} catch (error) {
			console.log(error)
		}
	}
	async createDevice(req, res) {
		try {
			let { name, price, color, type, deviceInfo, series } = req.body
			const { img } = req.files

			let fileName = `${uuidv4()}.jpg`

			const __filename = fileURLToPath(import.meta.url)
			const __dirname = path.dirname(__filename)
			img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const device = new Device({
				name,
				price,
				color,
				brand: '648ca74a40de0b871ce01a79',
				type,
				series,
				img: fileName,
			})

			device.save()

			if (deviceInfo) {
				const info = JSON.parse(deviceInfo)
				new DeviceInfo({
					deviceID: device._id,
					info,
				}).save()
			}

			const iphone = [
				{
					title: 'Processor',
					description: 'A15 Bionic',
				},
				{
					title: 'Memory',
					description: '256 гб',
				},
				{
					title: 'Display',
					description: '6.7',
				},
				{
					title: 'Camera',
					description: '12 Мп + 12 Мп',
				},
				{
					title: 'Battery',
					description: '3279 мАч',
				},
			]
			const iPad = [
				{
					title: 'Processor',
					description: 'M2',
				},
				{
					title: 'Memory',
					description: '512 gb',
				},
				{
					title: 'Display',
					description: '11',
				},
				{
					title: 'Camera',
					description: '10 Мп + 12 Мп',
				},
				{
					title: 'Battery',
					description: '9720 мАч',
				},
			]
			const macbook = [
				{
					title: 'Processor',
					description: 'M1',
				},
				{
					title: 'Memory',
					description: '256 gb',
				},
				{
					title: 'Display',
					description: '13 2560x1600',
				},
				{
					title: 'Battery',
					description: '49,9 Вт*ч',
				},
			]

			return res.json(device)
		} catch (error) {
			console.log(error)
		}
	}
}

export default new AdminController()
