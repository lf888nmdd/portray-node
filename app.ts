import express from 'express'
import cors from 'cors'

//引入接口
import demo from './Interface/demo'

const app=express()

//跨域
app.use(cors())


//注册接口
app.use('/api',demo)



app.listen(3000,()=>{
	console.log('端口号：http://127.0.0.1:3000')
})