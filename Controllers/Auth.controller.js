import AuthService from '../Services/Auth.service.js'

class AuthController {
	async register(req, res) {
		try {
			const userData = await AuthService.register(req.body)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.cookie('accessToken', userData.accessToken, {
				maxAge: 30 * 30 * 1000,
			})

			return res.json(userData)
		} catch (error) {
			console.log(error)
			res.status(400).json({
				message: 'Не удалось зарегистрироваться',
			})
		}
	}
	async login(req, res) {
		try {
			console.log(req.body)
			const userData = await AuthService.login(req.body)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.cookie('accessToken', userData.accessToken, {
				maxAge: 30 * 30 * 1000,
			})

			return res.json(userData)
		} catch (error) {
			console.log(error)
			res.status(400).json({
				message: 'Не удалось авторизироваться',
			})
		}
	}
	async logout(req, res) {
		try {
			// Get token
			const { refreshToken } = req.cookies

			// Logout
			const token = await AuthService.logout(refreshToken)

			// Clear cookie
			res.clearCookie('refreshToken')
			res.clearCookie('accessToken')

			return res.status(200).json(token)
		} catch (error) {
			console.log(error)
		}
	}

	async refresh(req, res) {
		try {
			const { refreshToken } = req.cookies

			if (!refreshToken) {
				res.status(400).json({
					message: 'Пользователь не авторизирован',
				})
			}
			// Return user token
			const userData = await AuthService.refresh(refreshToken)
			res.cookie('accessToken', userData.accessToken, {
				maxAge: 30 * 30 * 1000,
			})
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(userData)
		} catch (error) {
			console.log(error)
		}
	}

	async getMe(req, res) {
		try {
			const { refreshToken } = req.cookies
			const user = await AuthService.getUser(refreshToken)
			res.json(user)
		} catch (error) {
			console.log(error)
			res.status(400).json({
				message: 'не удалось загрузить профиль',
			})
		}
	}
}

export default new AuthController()
