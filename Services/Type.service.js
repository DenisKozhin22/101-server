import Type from '../Models/Type.model.js'

class TypeService {
	async create(data) {
		try {
			const doc = new Type({
				name: data.name,
				slug: data.slug,
			})

			doc.save()

			return doc
		} catch (error) {
			console.log(error)
			return null
		}
	}
	async getOne(slug) {
		try {
			const type = await Type.findOne({ slug })
			return type
		} catch (error) {
			console.log(error)
			return null
		}
	}
	async getAll() {
		try {
			const types = await Type.find()

			return types
		} catch (error) {
			console.log(error)
			return null
		}
	}
}

export default new TypeService()
