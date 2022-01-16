import { reqAllCharacters, reqAnime } from "../../api/index";

// pages/character/characters.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid:1,
        pageNum: 1,
        pageSize: 20,
        curPageSize:0,
        total:0,
        totalPages:0,
        data:[],
        Anime: {},
        showCharacter: false,
        selectedCharacter: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let pid = this.options.id
        this.setData({
            pid
        })
        this.reqData()
    },

    async reqData(){
        //请求该动漫详情
        let Anime = await reqAnime({id:this.data.pid})
        this.setData({
            Anime: Anime.data
        })
        //请求该动漫下的所有角色
        let res = await reqAllCharacters({
            pid:this.data.pid,
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize
        })
        this.setData(res.data)
    },
    onClickHideCharacter(){
        this.setData({
            showCharacter: false
        })
    },
    onClickShowCharacter(event){
        this.setData({
            selectedCharacter: event.target.dataset.id,
            showCharacter: true
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})