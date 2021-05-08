import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart:[]
  },
  onload() {
    onShow()
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    this.setData({address})
    this.setCart(cart);
  },
  // handleChooseAddress() {
  //   wx.getSetting({
  //     success: (result)=>{
  //       const address = result.authSetting["scope.address"];
  //       if (address === true || address === undefined) {
  //         wx.chooseAddress({
  //           success: (res)=>{
  //              console.log(res)
  //           }
  //         });
  //       } else {
  //         wx.openSetting({
  //           success: (result)=>{
  //             wx.chooseAddress({
  //               success: (res)=>{
  //                 console.log(res)
  //               }
  //             });
  //           }
  //         });
  //       }
  //     },
  //     fail: ()=>{},
  //     complete: ()=>{}
  //   });
  // },
  // 方法：获取地址
  async handleChooseAddress() {
    try {
    // 获取用户当前设置
    const result = await getSetting();
    // 获取地址
    const scopeAddress = result.authSetting["scope.address"];
    // 当未获取地址信息时打开授权
    if (scopeAddress === false) {
      await openSetting();
    }
    // 将获取到的地址信息保存
    let address = await chooseAddress();
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error)
    }
  },
  // 方法：单个项目选中和取消
  handleItemChange(e) {
    // 获取被修改的商品对象的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let { cart } = this.data;
    // 找到被修改的商品对象
    const index = cart.findIndex(v => v.goods_id === goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 把购物车设置回appData和storage中
    this.setCart(cart);
  },
  //方法：商品数量加一/减一 删除
  async handleItemNumEdit(e) {

 // 获取被修改的商品对象的id
    const {id,operation} = e.currentTarget.dataset;
    //获取购物车数组
    let { cart } = this.data;
    // 找到被修改的商品对象
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断是否删除
    if (cart[index].num===1&&operation===-1) {
      const result = await showModal({ content: "是否删除" })
      if(result.confirm){
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
    // 商品数量修改
    cart[index].num += operation;
    // 把购物车设置回appData和storage中
    this.setCart(cart);
    }

  },
  // 方法：设置购物并返回appData和storage中
  setCart(cart) {
    // 是否全选
    let allChecked = true;
    // 总价格总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      // 当前item被选中时计算总价格和总数量否则取消全选
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
      // 数组不为空时allChecked返回自身，数组为空的话返回false
      allChecked = cart.length != 0 ? allChecked : false;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart);
  },
  // 方法：购物车全选和反选
  handleItemAllChange() {
    // 获取data中的数值
    let { cart, allChecked } = this.data;
    // 修改allChecked的值
    allChecked = !allChecked;
    // 循环修改cart数组中的checked的值
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  async handlePay() {
    const {address,totalNum} = this.data
    if (!address.userName) {
      await showToast("请选择地址！")
      return
    }

    if(totalNum==0){
      await showToast("您还没有选购商品！")
      return
    }

    wx.navigateTo({
      url: '../pay/index',
      success: (result)=>{

      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})