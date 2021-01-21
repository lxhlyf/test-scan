// scan.js
// 移动动画
let animation = wx.createAnimation({});
// 提示音
let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = '/images/beep.mp3'
 
Page({
  data: {
    src: '',
  },
  onLoad: function () {
    
  },
  onShow(){
    this.donghua()
  },
  donghua(){
    var that = this;
	// 控制向上还是向下移动
    let m = true
	
    setInterval(function () {
      if (m) {
        animation.translateY(250).step({ duration: 3000 })
        m = !m;
      } else {
        animation.translateY(-10).step({ duration: 3000 })
        m = !m;
      }
 
      that.setData({
        animation: animation.export()
      })
    }.bind(this), 3000)
  },
  scancode(e){
    // 提示音
    innerAudioContext.play()
    // 校验扫描结果，并处理
    let res = e.detail.result
    if(res !== message) {
      this.setData({
        message: res
      })
    }
    console.log("result-res", res)
  },

  error(e) {
    console.log(e.detail)
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
})