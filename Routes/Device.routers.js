import { Router } from 'express'
import DeviceController from '../Controllers/Device.controller.js'
const deviceRouter = new Router()

deviceRouter.get('/devices/', DeviceController.getAllDevice)
deviceRouter.get('/devices/:category', DeviceController.getFilterDevices)
deviceRouter.get('/device/:id', DeviceController.getDevice)
deviceRouter.get('/device-info/:id', DeviceController.getDeviceInfo)
deviceRouter.get('/types/:type', DeviceController.getType)
deviceRouter.get('/types', DeviceController.getAllTypes)
deviceRouter.get('/brands', DeviceController.getAllBrands)
deviceRouter.get('/series/:type', DeviceController.getAllSeries)
deviceRouter.get('/colors/:type', DeviceController.getColorsBySeries)

export default deviceRouter
