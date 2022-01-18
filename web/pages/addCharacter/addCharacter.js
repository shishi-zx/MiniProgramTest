import { reqAddCharacter, reqCharacter,reqUpCharacter } from "../../api/index";
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast'

// pages/addCharacter/addCharacter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 0,//0：添加页面。1：修改页面
        pid: -1,
        id: -1,
        name: '',
        brief: '',
        desc: '',
        cover_img: '',
        fileList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        console.log(options.pid, options.id);
        console.log(options);
        this.setData({ pid: options.pid })
        if (options.id) {
            let res = await reqCharacter({ id: options.id })
            this.setData({
                id: options.id,
                type: 1
            })
            this.setData(res.data)
            this.setData({
                fileList: [{
                    url: res.data.cover_img
                }]
            })
        }
    },

    //点击取消按钮返回
    close() {
        wx.navigateBack({
            delta: 1,
        })
    },
    //点击确认按钮
    addChararcter() {
        Dialog.confirm({
            message: '确认添加吗？'
        }).then(async () => {
            const { name,pid,cover_img,brief,desc} = this.data
            console.log({ name,pid,cover_img,brief,desc});
            let res = await reqAddCharacter({ name,pid,cover_img,brief,desc})
            if(res.code==200){
                Toast.success('添加陈功')
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1,
                        success: ()=>{
                            wx.redirectTo({
                                url: `../character/characters?id=${this.data.pid}`
                              })
                        }
                      })
                }, 1000);
            }else{
                Toast.fail(res.msg)
            }
        }).catch((error) => {
            console.log('添加失败');
        })
    },
    //点击修改按钮
    async upCharacter(){
        console.log("up");
        const { name,id,cover_img,brief,desc} = this.data
            let res = await reqUpCharacter({ name,id,cover_img,brief,desc})
            if(res.code==200){
                Toast.success('修改成功')
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1,
                        success: ()=>{
                            wx.redirectTo({
                                url: `../character/characters?id=${this.data.pid}`
                              })
                        }
                      })
                }, 1000);
            }else{
                Toast.fail(res.msg)
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