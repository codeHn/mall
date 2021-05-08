/**
 * 获取用户设置信息
 * @returns
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
    });
  })
}
/**
 * 获取地理位置信息
 * @returns
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
    });
  })
}
/**
 * 打开地理位置授权
 * @returns
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
    });
  })
}
/**
 * 确认弹窗
 * @returns
 */
export const showModal = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      content: 'content',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          resolve(result)
        }
      },
      fail: (error) => {
        reject(error)
      },
      complete: ()=>{}
    });
  })
}
/**
 * 确认弹窗
 * @returns
 */
export const showToast = (title) => {
  return new Promise((resolve, reject) => {
     wx.showToast({
        title:title,
        icon: 'none',
        success: (result)=>{

        },
        fail: (error) => {

        },
        complete: ()=>{}
      });
  })
}