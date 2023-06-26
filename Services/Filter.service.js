import TypeModel from '../Models/Type.model.js'
import BrandModel from '../Models/Brand.model.js'
import SeriesModel from '../Models/Series.model.js'
import DeviceModel from '../Models/Device.model.js'

class FilterService {
	async getFilterDevices(query, category) {
		try {
			const { name, brand, colors, price, series } = query
			const brandNames = brand?.split('-')
			const seriesNames = series?.split('-')
			const colorsNames = colors?.split('-')

			const page = parseInt(query.page) || 1
			const limit = parseInt(query.limit) || 6
			const skip = (page - 1) * limit

			let filter = {}
			let sort = {}

			if (name) {
				filter.name = {
					$regex: name,
					$options: 'i',
				}
			}
			if (colors) {
				filter.color = { $in: colorsNames }
			}
			if (category) {
				const typesID = await TypeModel.find({
					slug: category,
				}).distinct('_id')
				filter.type = { $in: typesID }
			}
			if (brand) {
				const brandsID = await BrandModel.find({ name: { $in: brandNames } }).distinct('_id')
				filter.brand = { $in: brandsID }
			}
			if (series) {
				const seriesID = await SeriesModel.find({ name: { $in: seriesNames } }).distinct('_id')
				filter.series = { $in: seriesID }
			}

			if (price === 'asc') {
				sort.price = 1
			} else if (price === 'desc') {
				sort.price = -1
			}

			const totalDevices = await DeviceModel.countDocuments(filter)
			const totalPages = Math.ceil(totalDevices / limit)

			const filterDevices = await DeviceModel.find(filter)
				.sort(sort)
				.populate('type')
				.populate('brand')
				.populate('series')
				.skip(skip)
				.limit(limit)

			return {
				devices: filterDevices,
				totalDevices,
				totalPages,
				activePage: page,
				productsOnPage: filterDevices.length,
			}
		} catch (error) {
			console.log(error)
			return null
		}
	}
	async getColors(series, type) {
		try {
			let filter = {}
			const seriesNames = series?.split('-')
			if (series) {
				const seriesID = await SeriesModel.find({ name: { $in: seriesNames } }).distinct('_id')
				filter.series = { $in: seriesID }
			}
			if (type) {
				const typesID = await TypeModel.find({
					slug: type,
				}).distinct('_id')
				filter.type = { $in: typesID }
			}
			const colors = await DeviceModel.find(filter).distinct('color')
			return colors
		} catch (error) {
			console.log(error)
			return null
		}
	}
}
export default new FilterService()
