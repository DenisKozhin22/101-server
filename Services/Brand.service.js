import Brand from '../Models/Brand.model.js'

class BrandService {
	async create(data) {
		try {
			const doc = new Brand({
				name: data.name,
			})

			doc.save()

			return doc
		} catch (error) {
			console.log(error)
			return null
		}
	}

	async getAll() {
		try {
			const brands = await Brand.find()

			return brands
		} catch (error) {
			console.log(error)
			return null
		}
	}
}

export default new BrandService()
