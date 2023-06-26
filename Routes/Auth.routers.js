import { Router } from 'express'
import AuthController from '../Controllers/Auth.controller.js'
import checkAuth from '../Utils/checkAuth.js'

const authRouter = new Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.get('/refresh', AuthController.refresh)
authRouter.post('/logout',  AuthController.logout)
authRouter.get('/getMe', checkAuth, AuthController.getMe)

export default authRouter
