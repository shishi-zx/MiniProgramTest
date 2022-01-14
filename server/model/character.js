const Anime = require('./animes.js')
const { DataTypes } =require("sequelize")
const dbInstance = require('../db/config')

const Character = dbInstance.define("Character",{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    pid: {
        name: 'pid',
        allowNull: false,
        description: '所处动漫id，不为null',
        type: DataTypes.INTEGER
    },
    name: {
        name: 'name',
        allowNull: false,
        defaultValue: '未知人物',
        description: '人物名字',
        type: DataTypes.STRING
    },
    brief: {
        name: 'brief',
        allowNull: true,
        description: '人物简介',
        type: DataTypes.STRING
    },
    desc: {
        name: 'desc',
        allowNull: true,
        description: '人物描述',
        defaultValue: '暂无介绍',
        type: DataTypes.TEXT
    },
    status: {
        name: 'status',
        defaultValue: 1,
        description: '是否有效，0有效，1删除',
        type: DataTypes.INTEGER
    },
    create_time: {
        name: 'create_time',
        allowNull: true,
        description: '上传时间',
        type: DataTypes.DATE
    },
    cover_img: {
        name: 'cover_img',
        description: '人物头像',
        defaultValue: 'minitest-1309252537.cos.ap-beijing.myqcloud.com/avatar-default.png',
        allowNull: true,
        type: DataTypes.STRING
    }},
{
    timestamps: false,//不使用 createAt 和 updateAt 字段
})

//一对多关联
Character.belongsTo(Anime, {
    foreignKey: 'pid',// pages.pid
    targetKey: 'id'// projects.id
})

module.exports = Character
// await Character.sync({ force: true });
// //await Anime.sync();
// console.log("用户模型表刚刚(重新)创建！");