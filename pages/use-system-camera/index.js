// pages/list/list.js
Page({
  takePhoto() {
    // const ctx = wx.createCameraContext()
    // ctx.takePhoto({
    //   quality: 'high',
    //   success: (res) => {
    //     this.setData({
    //       src: res.tempImagePath
    //     })
    //   }
    // })
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }


})
