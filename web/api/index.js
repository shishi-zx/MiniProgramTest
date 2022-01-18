//封装 api
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import config from '../config'
axios.defaults.adapter = mpAdapter

let BaseUrl = config.url + ':'+ config.port
BaseUrl = 'http://'+ BaseUrl +'/api'

const reqInstance = axios.create({
    baseURL:BaseUrl,
    // timeout:10000,
    headers: {
        'Content-Type': 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
    },
})

reqInstance.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return response.data;
    }
}, function (error) {
    console.log(error.message)
    wx.showToast({
        title: error.message,
        duration: 2000,
        icon: "error"
      })
});

//请求方法
/**
 * 请求动漫列表
 * @param data 
 */
export const reqAllAnimes = function(data){ return reqInstance.get('/animes',{params:data})}

/**
 * 请求某个动漫详情
 * @param {*} data 
 */
export const reqAnime = (data)=>reqInstance.get('/animeOne',{params:data})

/**
 * 请求某个动漫的所有动漫角色
 * @param {*} data 
 */
export const reqAllCharacters = (data)=>reqInstance.get('/Characters',{params:data})

/**
 * 请求某个动漫角色
 * @param {*} data 
 */
export const reqCharacter = (data)=>reqInstance.get('/CharacterOne',{params:data})

/**
 * 请求添加一个动漫
 * @param {*} data 
 */
export const reqAddAnime = (data)=>reqInstance.post('/anime', data)

/**
 *  请求修改一个动漫
 * @param {*} data 
 */
export const reqUpAnime = (data)=>reqInstance.put('/anime',data)

/**
 * 请求删除一个动漫
 * @param {*} data 
 */
export const reqDelAnime = (data)=>reqInstance.delete('/anime',{params:data})

/**
 * 请求添加一个角色
 * @param {*} data 
 */
export const reqAddCharacter = (data)=>reqInstance.post('/character',data)

/**
 * 请求修改一个角色
 * @param {*} data 
 */
export const reqUpCharacter = (data)=>reqInstance.put('/character',data)

/**
 * 请求删除一个角色
 * @param {*} data 
 */
export const reqDelCharacter = (data)=>reqInstance.delete('/character',{params:data})


