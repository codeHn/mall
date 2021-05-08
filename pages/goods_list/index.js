import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tab栏
    tabs: [
      {
        id: 1,
        name: '综合',
        isActive:true
      },
      {
        id: 2,
        name: '销量',
        isActive:false
      },
      {
        id: 3,
        name: '其他',
        isActive:false
      },
    ],
    // 商品数据
    goodsList: [],
    // 默认总页数
    totalPages:1
  },
  // 传递的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize:10
  },
  // 页面加载
  onLoad: function (options) {
    // 从子组件获取cid并调用getGoosdList()
    this.QueryParams.cid = options.cid;
    this.getGoosdList();
  },
  // 页面上拉触底
  onReachBottom: function () {
    // 判断是否输出全部数据
    if (this.QueryParams.pagenum>=this.totalPages) {
      wx.showToast({ title: '到底啦' });
    } else {
      // 当前页面数据+1并调用getGoosdList()
      this.QueryParams.pagenum++;
      this.getGoosdList();
    }
  },
  // 页面下拉刷新
  onPullDownRefresh: function () {
    // 清空goodsList
    this.setData({
      goodsList:[]
    })
    // 让当前页面默认为1并getGoosdList()
    this.QueryParams.pagenum = 1
    this.getGoosdList();
  },
  // 使用es7中的async await请求数据
  async getGoosdList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    // 获取总数量
    const total = res.total;
    // 获取总页面： 总数量 / 页面容量
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize );
    // 将请求到的数据传给goodsList
    this.setData({
      // 解码当前数组和获取到的数组并进行拼接
      goodsList:[...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh();
  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    // 循环判定isActive
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
})