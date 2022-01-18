// pages/shopcar/shopcar.js
import CheckAuth from "../../utils/auth"
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',

    }],
    cartList: []

  },
  /* 商品详情列表 */
  handChangePage(e){
    console.log(this.data.cartList)
    console.log(e)
    var id=e.currentTarget.dataset.id
    var title=e.currentTarget.dataset.title
    wx.navigateTo({
      url:  `/pages/detail/detail?id=${id}&title=${title}`,/* 传过去的id和标题名 */
    })

  },
  /* 全选 */
  handleChange(e){
    if(e.detail.value.length===0){
      this.setData({
        cartList:this.data.cartList.map(
          item=>({
            ...item,
            checked:false
          })
        )
      })
    }else{
      this.setData({
        cartList:this.data.cartList.map(
          item=>({
            ...item,
            checked:true
          })
        )
      })
    }

  },

  /* 删除 */
  slideButtonTap(e){
    console.log(e.currentTarget.dataset.id)
    var id=e.currentTarget.dataset.id
    this.setData({
      cartList:this.data.cartList.filter(
        item=>item.id!==e.currentTarget.dataset.id
      )
    })
    request({
      url:`/carts/${id}`,
      method:"delete"
    })

  },

  /* 选项盒的状态改变，同时更改后端 */
  checkIs(e) {
    console.log(e)
    var item = e.currentTarget.dataset.item
    item.checked = !item.checked
    this.handleUpadate(item)
  },
   /* 产品数量的加和减 */
   handleAdd(e){
     var item=e.currentTarget.dataset.item
     item.number++
     this.handleUpadate(item)
  },
  handleMinus(e){
    var item=e.currentTarget.dataset.item
    if(item.number>0){
      item.number--
      this.handleUpadate(item)
    }else{
      wx.showToast({
        title:'已是最小值',
        icon:'none'
      })
    }
    
  },
  handleUpadate(item) {
    this.setData({
      cartList: this.data.cartList.map(data => {
        if (data.id === item.id) {
          return item
        }
        return data
      })
    })

    request({
      url: `/carts/${item.id}`,
      method: "put",
      data: {
        "username": item.username,
        "tel": item.tel,
        "goodId": item.goodId,
        "number": item.number,
        "checked": item.checked,
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
    CheckAuth(() => {
      let {
        nickName
      } = wx.getStorageSync('token')
      let tel = wx.getStorageSync('tel')
      request({
        url: `/carts?_expand=good&username=${nickName}&tel=${tel}`

      }).then(res => {
        this.setData({
          cartList: res
        })
        
      })
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