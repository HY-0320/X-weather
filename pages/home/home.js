// pages/Home/Home.js
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
    local: "北京",
    temp: "29℃",
    high: "35℃",
    low: "27℃",
    weather: "中雨",
    aQuality: "空气优",
    infor: [{
        eTime: "7月23",
        eLog: "云朵",
        eHlow: "35℃/27℃"
      }, {
        eTime: "7月24",
        eLog: "太阳",
        eHlow: "37℃/23℃"
      },
      {
        eTime: "7月25",
        eLog: "太阳",
        eHlow: "37℃/23℃"
      },
      {
        eTime: "7月24",
        eLog: "太阳",
        eHlow: "37℃/23℃"
      },
      {
        eTime: "7月24",
        eLog: "太阳",
        eHlow: "37℃/23℃"
      },
      {
        eTime: "7月24",
        eLog: "太阳",
        eHlow: "37℃/23℃"
      },
      {
        eTime: "7月24",
        eLog: "太阳",
        eHlow: "37℃/23℃"
      }
    ],
    startAngle: "", //开始位置弧度
    percentage: "10", //完成进度值 
    diffAngle: "", //完成进度弧度值
    num1:"11",
    num2:"9",
    num3:"27℃",
    num4:"2"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../locals/locals'
    })
  },
  bindViewTapOne:function(){
    wx.navigateTo({
      url: '../details/details',
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var context = wx.createCanvasContext('firstCanvas')
    //一层圆圈绘制
    context.beginPath();
    context.arc(75, 85, 38, 0, 2 * Math.PI, false);
    // new added
    context.setLineWidth(3);
    context.setStrokeStyle('white');
    context.stroke();
    // var startAngle = 3 / 2 * Math.PI; //开始位置弧度
    // var percentage = 10; //完成进度值 
    // var diffAngle = percentage / 100 * Math.PI * 2; //完成进度弧度值

    //二层画布百分比绘制
    this.startAngle = 1 / 5 * Math.PI;
    this.diffAngle = this.percentage / 100 * Math.PI * 2;
    context.beginPath();
    context.arc(75, 85, 38, this.startAngle, this.diffAngle + this.startAngle, true);
    context.setLineWidth(5);
    context.setStrokeStyle('#696969');
    context.stroke();
    //三层百分比圈内文字绘制
    context.setFillStyle('white');
    context.setTextAlign('center');
    context.setFontSize('12px serif');
    context.fillText('污染指数', 73, 35 )
    context.fillText(this.percentage + '%', 75, 90);//显示有问题 this.percentage undefined
    context.draw()

    var context = wx.createCanvasContext('secondCanvas')

     //一层圆圈绘制
     context.beginPath();
     context.arc(75, 85, 38, 0, 2 * Math.PI, false);
     // new added
     context.setLineWidth(3);
     context.setStrokeStyle('white');
     context.stroke();
     // var startAngle = 3 / 2 * Math.PI; //开始位置弧度
     // var percentage = 10; //完成进度值 
     // var diffAngle = percentage / 100 * Math.PI * 2; //完成进度弧度值
 
     //二层画布百分比绘制
     this.startAngle = 1 / 5 * Math.PI;
     this.diffAngle = this.percentage / 100 * Math.PI * 2;
     context.beginPath();
     context.arc(75, 85, 38, this.startAngle, this.diffAngle + this.startAngle, true);
     context.setLineWidth(5);
     context.setStrokeStyle('#696969');
     context.stroke();
     //三层百分比圈内文字绘制
     context.setFillStyle('white');
     context.setTextAlign('center');
     context.setFontSize('12px serif');
     context.fillText('空气湿度', 73, 35 )
     context.fillText(this.percentage + '%', 75, 90);//显示有问题 this.percentage undefined
     context.draw()

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