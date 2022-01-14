const { DataTypes } = require('sequelize')
const dbInstance = require('../db/config')

const Anime = dbInstance.define("Anime",{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        description: '动漫id',
        type: DataTypes.INTEGER
    },
    name: {
        name: 'name',
        allowNull: true,
        defaultValue: '未知动漫',
        description: '动漫名字',
        type: DataTypes.STRING
    },
    brief: {
        name: 'brief',
        allowNull: true,
        description: '动漫简介',
        type: DataTypes.STRING
    },
    desc: {
        name: 'desc',
        allowNull: true,
        description: '动漫正文',
        defaultValue: '暂无介绍',
        type: DataTypes.TEXT
    },
    status: {
        name: 'status',
        defaultValue: 1,
        description: '逻辑删除，1存在，0删除',
        type: DataTypes.INTEGER
    },
    cover_img: {
        name: 'cover_img',
        description: '封面图url',
        defaultValue: 'minitest-1309252537.cos.ap-beijing.myqcloud.com/default.png',
        allowNull: true,
        type: DataTypes.STRING
    },
    show_time: {
        name: 'show_time',
        description: '上映时间',
        allowNull: true,
        type: DataTypes.DATE
    },
    create_time: {
        name: 'create_time',
        allowNull: true,
        description: '资料上传时间',
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
},{
    timestamps: false,//不使用 createAt 和 updateAt 字段
})

module.exports = Anime

// await Anime.sync({ force: true });
// //await Anime.sync();
// console.log("用户模型表刚刚(重新)创建！");