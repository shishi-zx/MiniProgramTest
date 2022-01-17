// pages/addAnime/addAnime.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTimer: false,//控制时间选择器的弹出
        showTime: new Date().getTime(),//格式化后的时间显示给用户，不是上传的参数
        minDate: new Date(1970,1).getTime(),
        maxDate:new Date().getTime(),
        fileList: [],
        name: '',
        brief: '',
        desc: '',
        show_time: new Date().getTime(),//时间戳，上传参数
        cover_img: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    switchShowTimer(){
        this.setData({
            showTimer: !this.data.showTimer
        })
    },
    selectTime(value){
        let time = new Date(value.detail)
        this.setData({
            show_time: value.detail,
            showTime: time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
        })
    },
    afterRead(event){
        //处理图片
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
        wx.redirectTo({
          url: '../anime/animes',
        })
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