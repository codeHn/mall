import { request } from "../../request/index.js"
Page({
  data: {
    swiperList: [],
    navList: [],
    floorList:[]
  },
  onLoad: function (options) {
    this.getSwiperList(),
    this.getCateList(),
    this.getFloorList()
  },
  getSwiperList(){

    // 异步promise
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList:result
        })
      })
  },
  getCateList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          navList:result
      })
    })
  },
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList:result
      })
    })
  }
})
