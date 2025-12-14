import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import toConnectToBd from './config/database.js'
import usersRoutes from './routes/users.route.js'
import albumsRoutes from './routes/albumes.route.js'

dotenv.config()


const app = express()
const PORT = process.env.PORT || 8090;



// middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

toConnectToBd()

app.use('/api/albumes', albumsRoutes);
app.use('/api/users', usersRoutes)

app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})