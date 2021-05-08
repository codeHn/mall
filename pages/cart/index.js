// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleChooseAddress() {
    wx.getSetting({
      success: (result)=>{
        console.log(result)
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})