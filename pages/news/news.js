// pages/news/news.js
const app = getApp()
Page({
  data: {
    ccc: "",
    currentTemperature: "29",
    weather: "中雨",
    airMass: "空气优",
    one: "8.14",
    weatherOne: "中雨",
    two: "8.15",
    weatherTwo: "晴天",
    three: "8.16",
    weatherThree: "小雨",
    four: "8.17",
    weatherFour: "阴天",
    five: "8.18",
    weatherFive: "晴天",
    six: "8.19",
    weatherSix: "阴天",
    seven: "8.20",
    weatherSeven: "小雨",
    locals: "点击获取地址",
    startAngle: "5", //开始位置弧度
    airMassPercentage: "75",
    comfortPercentage: "25",
    diffAngle: "25", //完成进度弧度值,
    twenty_four: [{
        id: "1",
        fxTime: "8:00",
        useimage: "../../image/xuexuexuetian.png",
        text: "暴雨",
        temp: "27"
      },
      {
        id: "2",
        fxTime: "9:00",
        useimage: "../../image/xuexuexuetian.png",
        text: "暴雨",
        temp: "27"
      },
      {
        id: "3",
        fxTime: "10:00",
        useimage: "../../image/xuexuexuetian.png",
        text: "暴雨",
        temp: "27"
      },
      {
        id: "4",
        fxTime: "11:00",
        useimage: "../../image/xuexuexuetian.png",
        text: "暴雨",
        temp: "27"
      },
      {
        id: "5",
        fxTime: "12:00",
        useimage: "../../image/xuexuexuetian.png",
        text: "暴雨",
        temp: "27"
      }
    ],
    sevenWeather: [{
        id: "1",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      },
      {
        id: "2",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      },
      {
        id: "3",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      },
      {
        id: "4",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      },
      {
        id: "5",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      },
      {
        id: "6",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      },
      {
        id: "7",
        date: "8.16",
        tempMax: "27",
        tempMin: "24",
        textDay: "暴雨",
        useimage: "../../image/xuexuexuetian.png"
      }
    ],
    arrayNum:[
      '0','1','2','3','4','5','6'
    ],
    someTips:"",
    showDialog:false,
    oneButton: [{text: '确定'}],
  },
  navigatorTo: function () {
    wx.navigateTo({
      url: '../chooseLocation/chooseLocation',
    })
  },
  //页面最下方按钮点击获得当前天气提示信息
  getSomeTips:function(){
     this.setData({
      showDialog:true
     })
  },
    //页面最下方按钮点击获得当前天气提示信息
  tapDialogButton(e) {
    this.setData({
        dialogShow: false,
        showDialog: false
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getSevenInformation()
    console.log(this.data.sevenWeather[3].textDay)
    // console.log(tt)
    // console.log(options)

    // 引入SDK核心类
    var that = this
    var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
    // 实例化API核心类
    var demo = new QQMapWX({
      key: 'BWMBZ-M7GWO-2WKWZ-SIG6C-AOCY3-HJBNZ' // 必填,在腾讯地图申请获得唯一key值
    });
    //地理位置
    demo.reverseGeocoder({
      location: {
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude
      },
      success: function (res) {
        // console.log(res.result);
        // console.log(res.result.address_component.city)
        that.locals = res.result.address_component.city + res.result.address_component.district + res.result.address_component.street
        that.setData({
          locals: that.locals
        })
      },
      fail: function (res) {
        console.log(res);
      },
    })
    //后端返回数据获取城市id
    var that = this
    wx.request({
      url: 'http://99c56y.natappfree.cc/getLocation?longitude=' + app.globalData.longitude + '&latitude=' + app.globalData.latitude,
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.data.ccc = res.data.data[0].c_id
        app.globalData.ciId = res.data.data[0].c_id
        that.setData({
          ccc: res.data.data[0].c_id
        })
      }
    })
    // setTimeout(function () {
    //   console.log(that.data.ccc)
    // }, 1000)

    //7天天气信息
    var that = this
    setTimeout(function () {
      wx.request({
        url: 'http://99c56y.natappfree.cc/getweather7?locationId=' + that.data.ccc,
        method: "GET",
        success: function (res) {
          console.log(res.data)
          that.sevenWeather = res.data.data
          that.currentTemperature = Math.round((parseInt(res.data.data[0].tempMax) + parseInt(res.data.data[0].tempMin)) / 2)
          that.weather = res.data.data[0].textDay
          that.setData({
            sevenWeather: that.sevenWeather,
            currentTemperature: that.currentTemperature,
            weather: that.weather
          })
        },
      })
    }, 4000)
    //24小时天气信息
    setTimeout(function () {
      wx.request({
        url: 'http://99c56y.natappfree.cc/getweather24?localId=' + that.data.ccc,
        method: "GET",
        success: function (res) {
          console.log(res.data)
          that.twenty_four = res.data.data
          that.comfortPercentage = res.data.data[0].humidity
          that.setData({
            twenty_four: that.twenty_four,
            comfortPercentage: that.comfortPercentage
          })
          console.log(that.comfortPercentage)
        },
      })
    }, 2300)
    //体感指数
    setTimeout(function () {
      wx.request({
        url: 'http://99c56y.natappfree.cc/getlife?localId=' + that.data.ccc,
        method: "GET",
        success: function (res) {
          console.log(res.data)
          that.airMassPercentage = res.data.data.api
          that.someTips = res.data.data.text
          that.setData({
            airMassPercentage: that.airMassPercentage,
            someTips:that.someTips
          })
        },
      })
    }, 4000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


    //判断当前天气状况，以此来显示不同状态下的天气图标
    var that = this
    setTimeout(function () {
      //空气质量-污染指数百分比绘制
      var context = wx.createCanvasContext('firstCanvas')
      //一层圆圈绘制
      context.beginPath();
      context.arc(75, 85, 50, 0, 2 * Math.PI, false);
      // new added
      context.setLineWidth(7);
      context.setStrokeStyle('rgb(74, 150, 226)');
      context.stroke();
      //二层画布百分比绘制
      that.data.startAngle = 0;
      that.data.diffAngle = that.data.airMassPercentage / 100 * Math.PI * 2;
      context.beginPath();
      context.arc(75, 85, 50, that.data.startAngle, that.data.diffAngle + that.data.startAngle, true);
      context.setLineWidth(4);
      context.setStrokeStyle('white');
      context.stroke();
      //三层百分比圈内文字绘制
      context.setFillStyle('rgb(252, 252, 252)');
      context.setTextAlign('center');
      context.setFontSize('14px serif');
      context.fillText('污染指数', 75, 80)
      context.fillText(that.data.airMassPercentage + '%', 77, 100); //显示有问题 that.percentage undefined
      context.draw();
    }, 4500)

    setTimeout(function () { //空气湿度-舒适度百分比绘制
      var context = wx.createCanvasContext('secondCanvas')
      //一层圆圈绘制
      context.beginPath();
      context.arc(75, 85, 50, 0, 2 * Math.PI, false);
      // new added
      context.setLineWidth(7);
      context.setStrokeStyle('rgb(74, 150, 226)');
      context.stroke();
      // var startAngle = 3 / 2 * Math.PI; //开始位置弧度
      // var percentage = 10; //完成进度值 
      // var diffAngle = percentage / 100 * Math.PI * 2; //完成进度弧度值

      //二层画布百分比绘制
      that.data.startAngle = 0;
      that.data.diffAngle = that.data.comfortPercentage / 100 * Math.PI * 2;
      context.beginPath();
      context.arc(75, 85, 50, that.data.startAngle, that.data.diffAngle + that.data.startAngle, true);
      context.setLineWidth(4);
      context.setStrokeStyle('white');
      context.stroke();
      //三层百分比圈内文字绘制
      context.setFillStyle('rgb(252, 252, 252)');
      context.setTextAlign('center');
      context.setFontSize('14px serif');
      context.fillText('体感舒适度', 75, 80)
      context.fillText(that.data.comfortPercentage + '%', 77, 100); //显示有问题 that.percentage undefined
      context.draw()
    },4500)

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getSevenInformation()
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