import jwt from 'jsonwebtoken'
import Token from '../Models/Token.model.js'
class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
		return {
			accessToken,
			refreshToken,
		}
	}
	validateAccessToken(accessToken) {
		try {
			const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}
	validateRefreshToken(refreshToken) {
		try {
			const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({
			user: userId,
		})

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = new Token({
			user: userId,
			refreshToken,
		})

		token.save()

		return token
	}
	async removeToken(refreshToken) {
		const tokenData = await Token.deleteOne({ refreshToken })
		return tokenData
	}
	async findToken(refreshToken) {
		const tokenData = await Token.findOne({ refreshToken })
		return tokenData
	}
}

export default new TokenService()
