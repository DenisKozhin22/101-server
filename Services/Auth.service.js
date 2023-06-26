import User from '../Models/User.model.js'
import bcrypt from 'bcrypt'
import { UserDto } from '../Dtos/User.dto.js'
import TokenService from './Token.service.js'

class AuthService {
	async register(data) {
		try {
			const { userName, email, password } = data
			const candidate = await User.findOne({
				email,
			})
			if (candidate) {
				throw new Error(`Пользователь с таким почтовым адресом ${email} уже существует`)
			}

			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)

			const doc = new User({
				userName,
				email,
				password: hash,
			})
			doc.save()

			const userDTO = new UserDto(doc)
			const tokens = TokenService.generateToken({ ...userDTO })
			await TokenService.saveToken(userDTO.id, tokens.refreshToken)

			return {
				...tokens,
				user: userDTO,
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async login(data) {
		try {
			const { email, password } = data
			
			const user = await User.findOne({
				email,
			})
			
			if (!user) {
				throw new Error(`Пользователь не найден`)
			}
			
			const validPassword = bcrypt.compareSync(password, user.password)
			console.log(validPassword)
			if (!validPassword) {
				res.status(400).json({
					message: 'Неверный пароль',
				})
			}

			const userDTO = new UserDto(user)
			const tokens = TokenService.generateToken({ ...userDTO })
			await TokenService.saveToken(userDTO.id, tokens.refreshToken)

			return {
				...tokens,
				user: userDTO,
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async logout(refreshToken) {
		try {
			const token = await TokenService.removeToken(refreshToken)
			return token
		} catch (error) {
			throw new Error(error)
		}
	}

	async refresh(refreshToken) {
		try {
			const userData = TokenService.validateRefreshToken(refreshToken)
			const tokenFromDB = await TokenService.findToken(refreshToken)
			if (!userData || !tokenFromDB) {
				res.status(400).json({
					message: 'Пользователь не авторизирован',
				})
			}
			const user = await User.findById(userData.id)
			const userDTO = new UserDto(user)
			const tokens = TokenService.generateToken({ ...userDTO })
			await TokenService.saveToken(userDTO.id, tokens.refreshToken)

			return {
				...tokens,
				userDTO,
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async getUser(refreshToken) {
		try {
			const userData = TokenService.validateRefreshToken(refreshToken)
			const user = await User.findOne({
				_id: userData.id,
			})

			return user
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new AuthService()
