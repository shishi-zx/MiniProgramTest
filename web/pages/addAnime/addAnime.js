import { reqAnime, reqAddAnime,reqUpAnime } from "../../api/index"
import Toast from '@vant/weapp/toast/toast'; 

// pages/addAnime/addAnime.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 0,//0：添加页面。1：修改页面
        id:-1,//如果是修改页面要用到该参数
        showTimer: false,//控制时间选择器的弹出
        showTime: new Date().getTime(),//格式化后的时间显示给用户，不是上传的参数
        minDate: new Date(1970,1).getTime(),
        maxDate:new Date().getTime(),
        fileList: [],
        name: '',
        brief: '',
        desc: '',
        show_time: new Date().getTime(),//时间戳，上传参数
        cover_img: '',
        fileList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 根据是否传进id参数来判断是不是修改页面
        if(options.id){
           this.setData({type:1})
           wx.setNavigationBarTitle({
             title: '修改角色信息',
           })
            let res = await reqAnime({id:options.id})
            let anime = res.data
            this.setData({
                id: anime.id,
                name: anime.name,
                brief: anime.brief,
                desc: anime.desc,
                show_time: new Date(anime.show_time).getTime(),
                cover_img: anime.cover_img,
                fileList: [{
                    url: anime.cover_img,
                    name: '封面'
                }]
            })
        }
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

    //点击取消按钮返回
    close(){
        wx.navigateBack({
            delta: 1
        })
    },
    //点击确认按钮
    async add(){
        const { name, brief,desc,cover_img,show_time } = this.data
        let res = await reqAddAnime({
            name,brief,desc,cover_img,show_time: new Date(show_time)
        })
        if(res.code==200){
            wx.navigateBack({
              delta: 2,
              success: ()=>{
                  wx.navigateTo({
                    url: '../anime/animes',
                  })
                  wx.showToast({
                    title: '添加成功',
                  })
              }
            })
        }else{
            Toast.fail("添加失败,请检查你的输入")
        }
    },

    //点击修改按钮
    async upAnime(){
        const {id, name, brief,desc,cover_img,show_time } = this.data
        let res = await reqUpAnime({
            id,name,brief,desc,cover_img,show_time: new Date(show_time)
        })
        if(res.code==200){
            wx.navigateBack({
              delta: 3,
              success: ()=>{
                  wx.navigateTo({
                    url: `../character/characters?id=${this.data.id}`,
                  })
                  wx.showToast({
                    title: '修改成功',
                  })
              }
            })
        }else{
            Toast.fail("修改失败,请检查你的输入")
        }
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
        //根据页面类型判断返回哪一个页面
        // let url = '../anime/animes'
        // if(this.data.type==1)url=`../character/characters?id=${this.data.id}`
        // // wx.redirectTo({
        // //   url,
        // // })
        // console.log(getCurrentPages());
        // wx.navigateBack({
        // //   url,
        //     delta: 1
        // })
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