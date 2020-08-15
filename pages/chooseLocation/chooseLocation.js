// pages/chooseLocation/chooseLocation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:"",
    latitude:"",
    map_width:"380",
    map_height:"380",
    markers:[]
  },
  backToHome: function (options) {
     wx.navigateTo({
       url: "../news/news",
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  regionchange:function(e){

    let that = this;
    that.mpCtx = wx.createMapContext("map");
    that.mpCtx.getCenterLocation({
      success:(res)=>{
        app.globalData.latitude=res.latitude
        app.globalData.longitude=res.longitude
        that.setData({
          markers:[{
            id: 0,
            iconPath: "../../image/定位点.png",
            longitude:res.longitude ,
            latitude: res.latitude,
            width: 32,
            height: 32
          }]
        })
      }
      })
  },
 change:function(){
   var that =this
  wx.chooseLocation({
    success: function(res) {
      console.log(res)
      app.globalData.latitude=res.latitude
      app.globalData.longitude=res.longitude
      that.setData({
        latitude:app.globalData.latitude,
        longitude:app.globalData.longitude
      })
      console.log(app.globalData.latitude,app.globalData.longitude)
    }
  })
 
 
 },
  onLoad: function () {
    var that = this
    this.setData({
      longitude:app.globalData.longitude,
      latitude:app.globalData.latitude,
      markers:[
        {
        id: 0,
        iconPath: "../../image/定位点.png",
        longitude:app.globalData.longitude ,
        latitude: app.globalData.latitude,
        width: 32,
        height: 32
        }
      ]
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