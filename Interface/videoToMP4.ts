//视频转mp4格式
import express from 'express'
import fs from 'fs'
import axios from 'axios'
import {exec} from 'child_process'

const router = express.Router()
// const ffmpeg = require('fluent-ffmpeg');

router.get('/videoToMP4',(req:any,res:any)=>{
    const {videoUrl} =req.query
    // const videoUrl = 'https://v2.kwaicdn.com/upic/2023/11/11/08/BMjAyMzExMTEwODI2NDNfMTc1MjY4MTc4NV8xMTY5MDY5Nzg3NTJfMl8z_hd15_Bdb5af04be423100f3484d2cfa7dc90ea.mp4?pkey=AAWdkOUbtRD6UUItp9YPfs-WlHllqLvxhlTaH4DVT-PQwf6SadHOrYxo6R2A_bzGtpCIyGU1pXivJjZsULY1NS6coQygdHppNtMu_IEugQKQsl7T-eNeyMf8oHRHzM22V1Y&tag=1-1703923886-unknown-0-op9lupmpt5-f09228a72c912c6d&clientCacheKey=3xhmyn5v8bmexjk_hd15.mp4&di=JA4EfCIgV4uoFy0ZDtUTbA==&bp=10004&tt=hd15&ss=vp';
	axios({
    method: 'GET',
    url: videoUrl,
    responseType: 'stream'
    })
  .then((response:any) => {
    const fileCount = getFileCount('videoMp4/')
    // 创建可写流
    const writer = fs.createWriteStream(`videoMp4/video${fileCount}.mp4`);

    // 将响应数据流写入文件
    response.data.pipe(writer);

    // 监听写入完成事件
    writer.on('finish', () => {
    	aaap(fileCount)
      // fileCountChange(fileCount)
      console.log('视频转换完成！');
      res.send({code:200,url:`http://127.0.0.1:3000/api/video${fileCount}`})
    });

    // 监听错误事件
    writer.on('error', (err:any) => {
      console.error('视频转换失败:', err);
      res.send({code:500,url:'',message:'视频转换失败'})
    });
  })
  .catch((err:any) => {
    console.error('请求视频失败:', err);
    res.send({code:500,url:'',message:'请求视频失败'})
  });
	// res.send({data:[typesOf,howMany]})
	})



const aaap= (value:number)=>{
const path = require('path');


router.get(`/video${value}`, (req:any, res:any) => {
  const videoPath:any = path.join(__dirname, '..', `videoMp4/video${value}.mp4`);
  const videoSize:any = fs.statSync(videoPath).size;
  const videoStream:any = fs.createReadStream(videoPath);

  res.writeHead(200, {
    'Content-Length': videoSize,
    'Content-Type': 'video/mp4'
  });

  videoStream.pipe(res);
});
}


function getFileCount(directory:string) {
    try {
      const files = fs.readdirSync(directory);
      return files.length;
    } catch (error) {
      console.error('Error reading directory:', error);
      return -1;
    }
  }


  function fileCountChange(fileCount:number){
    const inputFilePath = `videoMp4/video${fileCount}.mp4`;
      const outputFilePath = `videoMp4/output${fileCount}.mp4`; // 修改输出文件路径
      
      // 读取输入文件的内容
      fs.readFile(inputFilePath, (err, data) => {
        if (err) {
          console.error(`读取文件时出错：${err}`);
          return;
        }
      
        // 将输入文件的内容写入临时文件
        const tempFilePath = `videoMp4/temp${fileCount}.mp4`; // 修改临时文件路径
        fs.writeFile(tempFilePath, data, (err) => {
          if (err) {
            console.error(`写入临时文件时出错：${err}`);
            return;
          }
      
          // 执行ffmpeg命令进行转码
          const command = `ffmpeg -i ${tempFilePath} -c:v libx264 ${outputFilePath}`;
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`执行命令时出错：${error}`);
              return;
            }
      
            console.log('转码完成！');
            
            // 删除临时文件
            fs.unlink(tempFilePath, (err) => {
              if (err) {
                console.error(`删除临时文件时出错：${err}`);
              }
            });
          });
        });
      });
  }

export default router