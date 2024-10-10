import express from 'express'

import cors from 'cors'

const app=express()

const port=5000

import mongoose from 'mongoose'

const mongodbURL='mongodb://localhost:27017/RMS'

 
import orderRoute from './Routes/orderRoute.js'

app.use(express.json())

app.use(cors())

app.use('/api/order',orderRoute)

mongoose.connect(mongodbURL)
.then(()=>{
    console.log("Database connected successfully")
})
.catch((error)=>{
    console.log(error)
})
app.get('/',(req,res)=>{
    res.send("welcome")
})

app.listen(port,()=>{
    console.log(`server running successfully at localhost ${port}`)
})