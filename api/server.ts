import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
//import * as helmet from 'helmet'
import * as cors from 'cors'

import router from './routes/v1'
import config from './config/mian'

// Iniciar Express
const app = express()

// Iniciar Mongoose
mongoose.connect(config.db)

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger('dev'))
app.use(cors())

// Routers
router(app)

// Iniciar Server
let server

if(process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port, () => {
        console.log(`Server escuchando en el puerto ${config.port}`)
    })
} else {
    server = app.listen(config.test_port, () => {
        console.log(`Server escuchando en el puerto ${config.test_port}`)
    })
}


export default server