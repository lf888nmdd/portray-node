//轮播图菜单接口
import express from 'express'
const router = express.Router()



router.get('/demo',(req:any,res:any)=>{
	res.send({data:['demo1','demo2']})
	})



export default router