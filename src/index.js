import express from 'express'
import { PORT } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import { handleErrors } from './controller/controller.js'

const app = express()

app.use((req, res, next) => {
    const { origin } = req.headers
    const dominiosPermitidos = ['http://127.0.0.1:5500']

    if (dominiosPermitidos.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        next()
    }

    if (origin === undefined) {
        next()
    }
})
app.use(express.json()),

app.use(handleErrors),

app.use(usuariosRoutes)



app.listen(PORT, () => console.log('Servidor Levantado en: http://localhost:' + PORT))