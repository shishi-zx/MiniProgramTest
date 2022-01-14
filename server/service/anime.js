//service 层控制接口于model层的交互
const AnimeModel = require('../model/animes')
const dataUtil = require('../utils/datautil')
const Result = require('./result')

class Anime{
    /**
     * 分页获取动漫列表
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
    static async getAll(payload){
        payload.pageNum = dataUtil.checkNumberOrUseDefault(payload.pageNum, 1, 1);//默认第1页，第1,2,3...页
        payload.pageSize = dataUtil.checkNumberOrUseDefault(payload.pageSize, 15, 1);//默认15条，至少查1条
        payload.sortby = dataUtil.checkStringOrUseDefault(payload.sortby, ['name','show_time'], 'name');//默认name字段
        payload.orderby = dataUtil.checkStringOrUseDefault(payload.orderby, ['asc', 'desc'], 'desc');//默认desc

        let data = await AnimeModel.findAll({
            order: [[payload.sortby,payload.orderby]],
            offset: (payload.pageNum-1)*payload.pageSize,
            limit: payload.pageSize,
            where: {
                status: 1
            }
        })

        let totalRecords = await AnimeModel.count({
            where:{
                status: 1
            }
        })
        let tmp = parseInt(totalRecords / payload.pageSize);
        let totalPages = (totalRecords % payload.pageSize) === 0 ? tmp : tmp + 1;
        let curPageSize = data.length

        return Result.success({
            pageNum: payload.pageNum,       //请求的页号
            pageSize: payload.pageSize,     //请求的页大小
            total: totalRecords,            //所有记录
            totalPages,         //按照 totalRecored 和 pageSize 计算的可查总页数
            curPageSize,       //当前页记录数，考虑到最后一页数据可能不为 pageSize
            data: data
        })
    }

    /**
     * 根据id获取一个动漫详情
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
    static async getOneById(payload){
        payload.id = dataUtil.checkNumberOrUseDefault(payload.id,-1)
        if(payload.id==-1){
            return Result.error({
                code: 501002,
                msg: '动漫请求错误'
            })
        }

        let data = await AnimeModel.findAll({
            where:{
                id: payload.id,
                status:1
            }
        })

        if(dataUtil.isEmptyArray(data)){
            return Result.error({
                code: 404,
                msg: '找不到该动漫'
            })
        }
        return Result.success(data[0])
    }

    /**   
     * 添加一个动漫
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
    static async addOne(payload){
        //校验动漫名
        if (!dataUtil.hasLength(payload.name)) {
            return respModel.error({
                code: 501001,
                msg: '动漫名不能为空'
            });
        }
        //封装数据
        let obj = {
            name: payload.name,
            brief: dataUtil.getPureString(payload.brief),
            desc: dataUtil.getPureString(payload.desc),
            show_time: dataUtil.getPureString(payload.show_time)
        }
        //没设置则使用数据库默认值
        payload.cover_img && (obj.cover_img = payload.cover_img)

        let newOne = await AnimeModel.create(obj);

        return Result.success({id:newOne.id})
    }

    /**
     * 删除一个动漫，根据id
     * @params payload
     * @return {Promise.<{code, msg, data}|*>}
     */
    static async deleteOneById(payload){
        payload.id = dataUtil.checkNumberOrUseDefault(payload.id,-1)
        if(payload.id==-1){
            return Result.error({
                code: 501002,
                msg: '动漫请求错误'
            })
        }

        let row = await AnimeModel.update({
            status: 0
        },{
            where:{
                id: payload.id
            }
        })

        if(row<=0)return Result.error({
            code: 501002,
            msg: '删除失败'
        })

        return Result.success(null)
    }

    /**
     * 根据id修改动漫详情
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
    static async updateOneById(payload){
        payload.id = dataUtil.checkNumberOrUseDefault(payload.id,-1)
        if(payload.id==-1){
            return Result.error({
                code: 501002,
                msg: '动漫请求错误'
            })
        }

        let oldObj = AnimeModel.findAll({
            where:{
                id:payload.id,
                status: 1
            }
        })
        if(dataUtil.isEmptyArray(oldObj)){
            return Result.error({
                code: 404,
                msg: '找不到该动漫'
            })
        }
        
        let upObj = {}
        payload.name && (upObj.name = payload.name)
        payload.brief && (upObj.brief = payload.brief)
        payload.desc && (upObj.desc = payload.desc)
        payload.cover_img && (upObj.cover_img = payload.cover_img)
        payload.show_time && (upObj.show_time = payload.show_time)

        let row = await AnimeModel.update(upObj,{
            where: {
                id: payload.id
            }
        })

        if(row<=0)return Result.error({
            code: 404,
            msg: '更新失败'
        })

        return Result.success(null)
    }
}

module.exports = Anime