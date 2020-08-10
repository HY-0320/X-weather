// pages/news/news.js
Page({
  data: {
    dialogShow: true,
    tips: "X-weather请求获取您的位置信息",
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    sign: "0",
    currentTemperature: "29℃",
    weather: "中雨",
    airMass: "空气优",
    locals: "西安",
    startAngle: "", //开始位置弧度
    percentage: 10, //完成进度值 
    diffAngle: "" //完成进度弧度值
  },
  tapDialogButton: function (e) {
    // 引入SDK核心类
    var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
    // 实例化API核心类
    var demo = new QQMapWX({
      key: 'BWMBZ-M7GWO-2WKWZ-SIG6C-AOCY3-HJBNZ' // 必填,在腾讯地图申请获得唯一key值
    });
    // 地理位置
    var that = this;
    if (e.detail.index) {
      this.dialogShow = false
      this.setData({
        dialogShow: false
      })
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          // console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          // 调用接口转换成具体位置
          demo.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              // console.log(res.result);
              // console.log(res.result.address_component.city)
              that.locals = res.result.address_component.city
              that.setData({
                locals: that.locals
              })
            },
            fail: function (res) {
              console.log(res);
            },
          })
        }
      })
    } else {
      this.tips = "抱歉您将无法获得当前位置的天气信息"
      this.setData({
        tips: this.tips
      })
      setInterval(function () {
        that.dialogShow = false
        that.setData({
          dialogShow: that.dialogShow
        })
      }, 2800)
    }
  },

  navigatorTo: function () {
    wx.navigateTo({
      url: '../show/show',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //判断当前天气状况，以此来显示不同状态下的天气图标

    //空气质量-污染指数百分比绘制
    var context = wx.createCanvasContext('firstCanvas')
    //一层圆圈绘制
    context.beginPath();
    context.arc(75, 85, 50, 0, 2 * Math.PI, false);
    // new added
    context.setLineWidth(4);
    context.setStrokeStyle('white');
    context.stroke();
    //二层画布百分比绘制
    this.startAngle = 1 / 5 * Math.PI;
    this.diffAngle = this.percentage / 100 * Math.PI * 2;
    context.beginPath();
    context.arc(75, 85, 50, this.startAngle, this.diffAngle + this.startAngle, true);
    context.setLineWidth(7);
    context.setStrokeStyle('#ccc');
    context.stroke();
    //三层百分比圈内文字绘制
    context.setFillStyle('white');
    context.setTextAlign('center');
    context.setFontSize('12px serif');
    context.fillText('污染指数', 73, 80)
    context.fillText(this.percentage + '%', 75, 100); //显示有问题 this.percentage undefined
    context.draw();

    //空气湿度-舒适度百分比绘制
    var context = wx.createCanvasContext('secondCanvas')
    //一层圆圈绘制
    context.beginPath();
    context.arc(75, 85, 50, 0, 2 * Math.PI, false);
    // new added
    context.setLineWidth(4);
    context.setStrokeStyle('white');
    context.stroke();
    // var startAngle = 3 / 2 * Math.PI; //开始位置弧度
    // var percentage = 10; //完成进度值 
    // var diffAngle = percentage / 100 * Math.PI * 2; //完成进度弧度值

    //二层画布百分比绘制
    this.startAngle = 1 / 5 * Math.PI;
    this.diffAngle = this.percentage / 100 * Math.PI * 2;
    context.beginPath();
    context.arc(75, 85, 50, this.startAngle, this.diffAngle + this.startAngle, true);
    context.setLineWidth(7);
    context.setStrokeStyle('#ccc');
    context.stroke();
    //三层百分比圈内文字绘制
    context.setFillStyle('white');
    context.setTextAlign('center');
    context.setFontSize('12px serif');
    context.fillText('体感舒适度', 73, 80)
    context.fillText(this.percentage + '%', 75, 100); //显示有问题 this.percentage undefined
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