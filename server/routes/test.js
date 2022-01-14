//用来测试
const express = require('express');
const router = express.Router();
const Anime = require('../service/anime.js')
const Character = require('../service/character')

router.use('/',(req,res,next)=>{
    console.log('query',req.query)
    console.log('body',req.body)
    next()
})

//分页获取动漫列表
router.get('/animes',async (req,res,next)=>{
    const payload = req.query
    res.json(await Anime.getAll(payload))
})
//获取动漫详情
router.get('/animeOne',async (req,res,next)=>{
    const payload = req.query
    res.json(await Anime.getOneById(payload))
})
//添加动漫
router.post('/anime',async (req,res,next)=>{
    const payload = req.body
    res.json(await Anime.addOne(payload))
})
//删除动漫
router.delete('/anime',async (req,res,next)=>{
    const payload = req.query
    res.json(await Anime.deleteOneById(payload))
})
//修改动漫
router.put('/anime',async (req,res,next)=>{
    const payload = req.body
    res.json(await Anime.updateOneById(payload))
})

//分页获取校色
router.get('/characters',async (req,res,next)=>{
    const payload = req.query
    res.json(await Character.getAll(payload))
})
//获取动漫角色详情
router.get('/characterOne',async (req,res,next)=>{
    const payload = req.query
    res.json(await Character.getOneById(payload))
})
//添加动漫角色
router.post('/character',async (req,res,next)=>{
    const payload = req.body
    res.json(await Character.addOne(payload))
})
//删除动漫juese
router.delete('/character',async (req,res,next)=>{
    const payload = req.query
    res.json(await Character.deleteOneById(payload))
})
//修改动漫角色
router.put('/character',async (req,res,next)=>{
    const payload = req.body
    res.json(await Character.updateOneById(payload))
})
module.exports = router;