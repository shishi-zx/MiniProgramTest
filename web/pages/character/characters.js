import { reqAllCharacters, reqAnime ,reqDelCharacter} from "../../api/index";
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'

// pages/character/characters.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid:1,
        pageNum: 1,
        pageSize: 5,
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
    //动态追加角色列表数据
    async addToList(){
        console.log("加载跟多");
        let res = await reqAllCharacters({
            pid:this.data.pid,
            pageNum: this.data.pageNum+1,
            pageSize: this.data.pageSize
        })
        let list = this.data.data.concat(res.data.data)
        const {pageNum,pageSize,total,totalPages,curPageSize} = res.data
        this.setData({
            data:list,
            pageNum,
            pageSize,
            total,
            totalPages,curPageSize
        })
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
    editAnime(){
        wx.navigateTo({
          url: `../addAnime/addAnime?id=${this.data.pid}`,
        })
    },
    addCharacter(){
        wx.navigateTo({
          url: `../addCharacter/addCharacter?pid=${this.data.pid}`,
        })
    },
    upCharacter(){
        wx.redirectTo({
            url: `../addCharacter/addCharacter?pid=${this.data.pid}&id=${this.data.data[this.data.selectedCharacter].id}`,
        })
    },
    delCharacter(){
        const { data, selectedCharacter} = this.data
        Dialog.confirm({
            title: data[selectedCharacter].name,
            message: '确认删除该角色吗',
          })
            .then(async () => {
              console.log("yes");
              let res = await reqDelCharacter({id:data[selectedCharacter].id})
              console.log(res);
              if(res.code==200){
                  Toast.success("删除成功")
                  this.setData({
                    showCharacter: false
                  })
                  wx.redirectTo({
                    url: `../character/characters?id=${this.data.pid}`,
                  })
              }else{
                  Toast.fail("删除失败")
              }
            })
            .catch(() => {
              console.log('no');
            });
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