import SeriesModel from '../Models/Series.model.js'
import TypeModel from '../Models/Type.model.js'

class SeriesService {
	async createModel(data) {
		try {
			const doc = new SeriesModel({
				name: data.name,
				type: data.type,
			})
			doc.save()

			return doc
		} catch (error) {
			console.log(error)
			return null
		}
	}

	async getAll(type) {
		try {
			const findType = await TypeModel.findOne({ slug: type })
			const devicesModels = await SeriesModel.find({ type: findType._id })
			return devicesModels
		} catch (error) {
			console.log(error)
			return null
		}
	}
}

export default new SeriesService()
