// scan.js
// 移动动画
let animation = wx.createAnimation({});
// 提示音
let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = '/images/beep.mp3'

Page({
  data: {
    thumSrc: '',
    videoUrls: [],
    startTime: 0,
  },
  onLoad: function () {
    // this.ctx = wx.createCameraContext();
  },
  onShow() {
    this.ctx = wx.createCameraContext();
  },

  error(e) {
    console.log(e.detail)
  },

  /**
   * 开始录像的方法
   */
  startShootVideo() {
    console.log("========= 调用开始录像 ===========")
    let that = this
    this.ctx.startRecord({
      timeoutCallback: (res) => {
        console.log("res", res)
        let urls = this.data.videoUrls;
        urls.push(res.tempVideoPath)
        this.setData({
          videoUrls: urls
        }, () => {
          if (this.data.videoUrls.length < 3) {
            that.startShootVideo();
          }
        })
      },
      success: (res) => {
        // console.log("res-start", res)
        // setTimeout(function () {
        //   that.stopShootVideo()
        // }, 5000);
      },
      fail(res) {
        console.log(res)
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration: 4000
        })
        console.log("========= 调用开始录像失败 ===========")
      }
    })
  },
  /**
   * 结束录像
   */
  stopShootVideo() {
    // wx.hideLoading();
    // console.log("========= 调用结束录像 ===========")
    let that = this
    this.ctx.stopRecord({
      compressed: true, //压缩视频
      success: (res) => {
        console.log(res)
        let urls = this.data.videoUrls;
        urls.push(res.tempVideoPath)
        this.setData({
          videoUrls: urls
        }, () => {
          if (this.data.videoUrls.length < 3) {
            that.startShootVideo();
          }
        })
      },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration: 4000
        })
        console.log("========= 调用结束录像失败 ===========")
      }
    })
  },

  //touch start 手指触摸开始
  handleTouchStart: function (e) {
    this.setData({
      videoUrls: [],
      startTime: e.timeStamp
    })
    this.startShootVideo();
  },

  //touch end 手指触摸结束
  handleTouchEnd: function (e) {
    //长按操作 调用结束录像方法
    this.stopShootVideo();
  },

  /**
   * 长按按钮进行录像
   */
  handleLongPress: function (e) {
    // 长按方法触发，调用开始录像方法
    this.startShootVideo();
  },
})