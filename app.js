import express, { json } from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import playlistRoutes from './routes/playlist.routes'
import database from './database'
const app = express()
const port = process.env.PORT

app.use(json())

app.use(morgan('dev'))

app.use(playlistRoutes)

app.listen(port, () => {
    console.log(`escuchando request en ${port}`)
})