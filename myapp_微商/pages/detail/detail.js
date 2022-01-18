// pages/detail/detail.js
import CheckAuth from "../../utils/auth"
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    tabbarList: ['商品详情', '商品评价'],
    current: 0,
    commentList: []

  },
  handleAdd() {
    CheckAuth(() => {
      console.log("yes")
      let {
        nickName
      } = wx.getStorageSync('token')
      let tel = wx.getStorageSync('tel')
      var goodId = this.data.info.id
      console.log(nickName, tel, goodId)

      request({
        url: "/carts",
        data: {
          tel,
          goodId,
          nickName
        }
      }).then(res => {
        if (res.length === 0) {
          request({
            url: "/carts",
            method: "post",
            data: {
              "username": nickName,
              "tel": tel,
              "goodId": goodId,
              "number": 1,
              "checked": false
            }
          })
        } else {
          request({
            url: `/carts/${res[0].id}`,
            method: "put",
            data: {
              ...res[0],
              number: res[0].number + 1
            }
          })
        }
      }).then(res => {
        wx.showToast({
          title: '加入购物车成功',
        })
      })
    })
  },
  handleTap(e) {
    wx.previewImage({
      urls: this.data.info.slides.map(item => `http://localhost:5000${item}`),
      current: e.currentTarget.dataset.index

    })
    console.log(this.data.info)
  },
  tabbarTap(e) {
    this.setData({
      current: e.currentTarget.dataset.current
    })
  },
/* 跳转到购物车 */
  handleChange() {
    /* switchTab是能跳转到tabbar页面 */
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* console.log(options) */
    /* 设定标题 */
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getDetailInfo(options.id)
    this.getCommentInfo()
  },
  getDetailInfo(id) {
    request({
      url: `/goods/${id}`
    }).then(res => {
      /* console.log(res) */
      this.setData({
        info: res
      })
    })

  },
  getCommentInfo() {
    request({
      url: "/comments"
    }).then(res => {
      this.setData({
        commentList: res
      })
      /* console.log(this.data.commentList) */
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