import express from 'express'
import cors from 'cors'
// 使用swagger API 文档
var swaggerInstall = require('./utils/swagger')

//引入接口
import demo from './Interface/demo'
import videoToMP4 from './Interface/videoToMP4'

const app=express()

//跨域
app.use(cors())


//注册接口
app.use('/api',demo)
app.use('/api',videoToMP4)

swaggerInstall(app)

app.listen(3000,()=>{
	console.log('端口号：http://127.0.0.1:3000')
})