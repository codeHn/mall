import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
  },
  // 全局商品对象
  goodsInfo: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  // 请求数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } })
    this.goodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        pics:goodsObj.pics,
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce
        // 使用正则表达式将.web格式改为.jpg格式 不推荐
        // goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'/jpg/')
      }
    })
  },
  // 点击图片放大查看
  handlePreviewImage(e) {
    // 重新构造数组
    const urls = this.goodsInfo.pics.map(v => v.pics_big_url);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  // 加入购物车
  handleCartAdd() {
    // 1 获取缓存中的cart 数组
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if (index === -1){
    // 3 cart中不存在，第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
    // 4 cart中已存在，num++
      cart[index].num++;
    }
    // 5 同步进缓存中的cart数组
    wx.setStorageSync("cart",cart);
    // 6 弹窗提提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})