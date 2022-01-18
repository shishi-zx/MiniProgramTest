// pages/anime/animes.js
import {
    reqAllAnimes,
    reqDelAnime
} from '../../api/index'
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 1,
        pageSize: 20,
        curPageSize: 0,
        total: 0,
        totalPages: 0,
        sortby: 'name',
        orderby: 'desc',
        data: [],
        showSetting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.reqData()
    },
    //请求动漫列表数据
    reqData: async function (pageNum) {
        let res = await reqAllAnimes({
            pageNum,
            pageSize: this.data.pageSize,
            sortby: this.data.sortby,
            orderby: this.data.orderby
        })
        if (res.code !== 200) {
            return Toast.fail(res.msg);
        }
        let data = res.data
        this.addList(data)
    },
    //添加动漫数据（追加）
    addList(data) {
        const {
            pageNum,
            pageSize,
            curPageSize,
            total,
            totalPages
        } = data
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
    //删除一个动漫
    async deleteOne(event) {
        Dialog.confirm({
            title: '注意！',
            message: '是否确定删除',
        })
            .then(async () => {
                // on confirm
                let res = await reqDelAnime({
                    id: event.target.dataset.id
                })
                if (res.code == 200) {
                    Toast.success('删除成功')
                    let index = -1;
                    this.data.data.find((e, i) => {
                        if (e.id == event.target.dataset.id) {
                            index = i
                        }
                    })
                    this.data.data.splice(index, 1)
                    let list = this.data.data
                    this.setData({
                        data: list
                    })
                } else {
                    Toast.fail('删除失败，请稍后重试')
                }
            })
            .catch(() => {
                // on cancel
            });

    },
    //切换排序方式
    switchOrderToLow() {
        this.setData({
            orderby: 'desc',
            data: []
        })
        this.reqData(1)
    },
    switchOrderToHigh() {
        this.setData({
            orderby: 'asc',
            data: []
        })
        this.reqData(1)
    },
    //切换设置菜单的显示
    switchShow() {
        this.setData({
            show: !this.data.show
        });
    },
    //进入动漫详情页
    open(event) {
        let id = event.target.dataset.id
        id && wx.navigateTo({
            url: `../character/characters?id=${id}`
        })
    },
    //新建动漫，跳转页面
    addAnime() {
        wx.navigateTo({
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
    onShow: function (event) {
        console.log(getCurrentPages());
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
        if (this.data.pageNum + 1 > this.data.totalPages) {
            return Toast("已经到底了哦")
        }
        this.reqData(this.data.pageNum + 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})