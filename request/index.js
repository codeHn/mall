let ajaxTime = 0
export const request = (params) => {
  ajaxTime++;
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
  wx.request({
    ...params,
    url: baseUrl + params.url,
    success: (result) => {
      resolve(result.data.message);
    },
    fail: (err) => {
      reject(err);
    },
    complete: () => {
      ajaxTime--;
      if (ajaxTime === 0) {
        wx.hideLoading();
      }
    }
  });
  })
}