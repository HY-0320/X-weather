// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        app.globalData.longitude = res.latitude
      }
    })
    if (e.detail.userInfo) {
      wx.navigateTo({
        url: '../news/news',
      })
    }
    else{
      this.setData({
        isHide:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 var that = this
 let ishide = this.data.isHide
 console.log(ishide)
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        app.globalData.longitude = res.latitude
      }
    })
    
    wx.getSetting({
      success (res) {
        console.log(res.authSetting)
        if(res.authSetting["scope.userInfo"])
        {
          console.log(1)
          ishide = false
        }
        

        that.setData({
          isHide:ishide
        })  
        wx.navigateTo({
          url: '../news/news',
        })
      }
    })
    console.log(3)
 
   


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