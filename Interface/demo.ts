//demo测试接口
import express from 'express'
const router = express.Router()


router.get('/demo',(req:any,res:any)=>{
	const {typesOf,howMany} =req.query
	res.send({data:[typesOf,howMany]})
	})


export default router