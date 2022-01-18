// pages/center/center.js
import CheckAuth from "../../utils/auth"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]

  },
  handleTap(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          userInfo:{
            ...this.data.userInfo,
            avatarUrl:tempFilePaths[0]
          }
        })

        wx.setStorageSync('token', {
          ...wx.getStorageSync('token'),
          avatarUrl:tempFilePaths[0]
        })
      }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    CheckAuth(()=>{
      this.setData({
        userInfo:wx.getStorageSync('token')
      })
      console.log(this.data.userInfo)
      
    })

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