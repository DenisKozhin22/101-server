import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import authRouter from './Routes/Auth.routers.js'
import adminRouter from './Routes/Admin.routers.js'
import path from 'path'
import { fileURLToPath } from 'url'
import deviceRouter from './Routes/Device.routers.js'
import cartRouter from './Routes/Cart.routers.js'
import favoritesRouter from './Routes/Favorites.routers.js'

dotenv.config()

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('DB CONNECT')
	})
	.catch(err => {
		console.log('DB ERROR', err)
	})

const app = express()
const corsOptions = {
	origin: [/^(.*)/],
	credentials: true,
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/device', deviceRouter)
app.use('/api/cart', cartRouter)
app.use('/api/favorites', favoritesRouter)

app.listen(process.env.PORT || 5000, err => {
	if (err) {
		return console.log(err)
	}
	console.log('Server OK')
})
