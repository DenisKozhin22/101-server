import { Router } from 'express'
import AdminController from '../Controllers/Admin.controller.js'
import checkAuth from '../Utils/checkAuth.js'
import checkAdmin from '../Utils/checkAdmin.js'

const adminRouter = new Router()

adminRouter.post('/create-type', checkAuth, checkAdmin, AdminController.createType)
adminRouter.post('/create-brand', checkAuth, checkAdmin, AdminController.createBrand)
adminRouter.post('/create-device-series', checkAuth, checkAdmin, AdminController.createSeries)
adminRouter.post('/create-device', checkAuth, checkAdmin, AdminController.createDevice)

export default adminRouter
