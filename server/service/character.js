//service 层控制接口于model层的交互
const AnimeModel = require('../model/animes')
const CharacterModel = require('../model/character')
const dataUtil = require('../utils/datautil')
const Result = require('./result')

class Character{
    /**
     * 分页获取动漫的角色列表
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
     static async getAll(payload){

        let pid = dataUtil.checkNumberOrUseDefault(payload.pid, -1);
        if (pid === -1) {
            return Result.error({
                code: 404,
                msg: '请输入正确的动漫id'
            });
        }

        let belongAnime = AnimeModel.findAll({
            where: {
                id: pid
            }
        })
        if(dataUtil.isEmptyArray(belongAnime))return Result.error({
            code: 404,
            msg: '请输入正确的动漫id'
        }); 

        payload.pageNum = dataUtil.checkNumberOrUseDefault(payload.pageNum, 1, 1);//默认第1页，第1,2,3...页
        payload.pageSize = dataUtil.checkNumberOrUseDefault(payload.pageSize, 15, 1);//默认15条，至少查1条
        payload.orderby = dataUtil.checkStringOrUseDefault(payload.orderby, ['asc', 'desc'], 'desc');//默认desc

        let data = await CharacterModel.findAll({
            order: [['name',payload.orderby]],
            offset: (payload.pageNum-1)*payload.pageSize,
            limit: payload.pageSize,
            where: {
                pid,
                status: 1
            }
        })

        let totalRecords = await CharacterModel.count({
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
     * 根据id获取一个动漫角色的详情
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
     static async getOneById(payload){
        payload.id = dataUtil.checkNumberOrUseDefault(payload.id,-1)
        if(payload.id==-1){
            return Result.error({
                code: 501002,
                msg: '动漫角色请求错误'
            })
        }

        let data = await CharacterModel.findAll({
            where:{
                id: payload.id,
                status:1
            }
        })

        if(dataUtil.isEmptyArray(data)){
            return Result.error({
                code: 404,
                msg: '找不到该动漫角色'
            })
        }
        return Result.success(data[0])
    }

    /**
     * 添加一个动漫juese
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
     static async addOne(payload){
        //校验动漫juese名
        if (!dataUtil.hasLength(payload.name)) {
            return Result.error({
                code: 501001,
                msg: 'juese名不能为空'
            });
        }
        let belongAnime = AnimeModel.findAll({
            where: {
                id: payload.pid
            }
        })
        if(dataUtil.isEmptyArray(belongAnime))return Result.error({
            code: 404,
            msg: '找不到该动漫,无法添加'
        }); 
        //封装数据
        let obj = {
            pid: payload.pid,
            name: payload.name,
            brief: dataUtil.getPureString(payload.brief),
            desc: dataUtil.getPureString(payload.desc),
        }
        //没设置则使用数据库默认值
        payload.cover_img && (obj.cover_img = payload.cover_img)

        let newOne = await CharacterModel.create(obj);

        return Result.success({id:newOne.id})
    }

    /**
     * 删除一个动漫juese，根据id
     * @params payload
     * @return {Promise.<{code, msg, data}|*>}
     */
     static async deleteOneById(payload){
        payload.id = dataUtil.checkNumberOrUseDefault(payload.id,-1)
        if(payload.id==-1){
            return Result.error({
                code: 501002,
                msg: '动漫角色请求错误'
            })
        }

        let row = await CharacterModel.update({
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
     * 根据id修改动漫角色详情
     * @param {*} payload 
     * @returns {Promise.<{code, msg, data}|*>}
     */
     static async updateOneById(payload){
        payload.id = dataUtil.checkNumberOrUseDefault(payload.id,-1)
        if(payload.id==-1){
            return Result.error({
                code: 501002,
                msg: '动漫角色请求错误'
            })
        }

        let oldObj = CharacterModel.findAll({
            where:{
                id:payload.id,
                status: 1
            }
        })
        if(dataUtil.isEmptyArray(oldObj)){
            return Result.error({
                code: 404,
                msg: '找不到该动漫角色'
            })
        }
        
        let upObj = {}
        payload.name && (upObj.name = payload.name)
        payload.brief && (upObj.brief = payload.brief)
        payload.desc && (upObj.desc = payload.desc)
        payload.cover_img && (upObj.cover_img = payload.cover_img)

        let row = await CharacterModel.update(upObj,{
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

module.exports = Character
