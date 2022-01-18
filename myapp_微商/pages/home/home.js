// pages/home/home.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loopList:[],
    goodList:[]
  },
  current:0,
  total:0,
  /* 搜索跳转，详情可以看官方文档 */
  handleEvent(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
    
  },
  /* 商品详情列表 */
  handChangePage(e){
    console.log(e.currentTarget.dataset)
    var id=e.currentTarget.dataset.id
    var title=e.currentTarget.dataset.title
    wx.navigateTo({
      url:  `/pages/detail/detail?id=${id}&title=${title}`,/* 传过去的id和标题名 */
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.renderSwiper()
    this.renderGoods()

  },
  /* 首页轮播数据访问 */
  renderSwiper(){
    request({
      url:"/recommends"
    }).then(res=>{
      
      this.setData({
        loopList:res
      })
      console.log(res)

    })
  },
  /* 首页手机列表数据访问 */
  renderGoods(){
    
    request({
      url:`/goods?_page=${this.current}&_limit=4`},
      true).then(res=>{
      this.total=Number(res.total)
      this.setData({
        goodList:[...this.data.goodList,...res.list]
      })
      console.log('b',res)
      console.log('a',this.data.goodList)
    })
    
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
    if(this.data.goodList.length===this.total){
      return 
    }
    this.current++
    this.renderGoods()
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})