// pages/anime/animes.js
import { reqAllAnimes } from '../../api/index'
import Toast from '@vant/weapp/toast/toast'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum:1,
        pageSize:10,
        curPageSize:0,
        total:0,
        totalPages:0,
        sortby:'name',
        orderby: 'desc',
        data:[],
        showSetting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.reqData()
    },
    //请求动漫列表数据
    reqData: async function(pageNum){
        let res = await reqAllAnimes({
            pageNum,
            pageSize: this.data.pageSize,
            sortby:this.data.sortby,
            orderby: this.data.orderby
        })
        if(res.code!==200){
            return Toast.fail(res.msg);
        }
        let data = res.data
        this.addList(data)
    },
    //添加动漫数据（追加）
    addList(data){
        const {pageNum,pageSize,curPageSize,total,totalPages} = data
        let list = data.data
        list = this.data.data.concat(list)
        this.setData({
            pageNum,
            pageSize,
            curPageSize,
            total,
            totalPages,
            data: list
        })
    },
    //切换排序方式
    switchOrderToLow(){
        this.setData({
            orderby: 'desc',
            data:[]
        })
        this.reqData(1)
    },
    switchOrderToHigh(){
        this.setData({
            orderby: 'asc',
            data:[]
        })
        this.reqData(1)
    },
    //切换设置菜单的显示
    switchShow() {
        this.setData({ show: !this.data.show });
    },
    //进入动漫详情页
    open(event){
        let id = event.target.dataset.id
        id && wx.navigateTo({
            url: `../character/characters?id=${id}`
          })
    },
    //新建动漫，跳转页面
    addAnime(){
        wx.redirectTo({
          url: '../addAnime/addAnime'
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
        console.log(1111);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.data.pageNum+1>this.data.totalPages){
            return Toast("已经到底了哦")
        }
        this.reqData(this.data.pageNum+1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})