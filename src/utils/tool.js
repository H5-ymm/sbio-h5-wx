import crypto from 'crypto'
// MD5加密
export const sign = (str) => {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};

export const getImg = file => {
  let url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(_file)
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}
export const checkMobile = mobile => {
  let reg = /^1[3456789]\d{9}$/;
  let flag = false;
  if (!reg.test(mobile)) {
    flag = false;
  } else {
    flag = true;
  }
  return flag;
};
export const isMiniProgram = () => {
  var ua = navigator.userAgent.toLowerCase();
  var envType = '#';
  if (ua.match(/MicroMessenger/i) == 'micromessenger') { //微信环境
    wx.miniProgram.getEnv(function (res) {
      if (res.miniprogram) { // 小程序环境下逻辑
        envType = true
      } else { //非小程序环境下逻辑
        envType = false
      }
    })
  } else { //非微信环境逻辑
    envType = false
  }
  return envType
}

export function locationUrl() {
  let locationParams = location.href.split('#')[0]
  let urlHome = encodeURIComponent(locationParams)
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx32d0cfc28c12087a&redirect_uri=${urlHome}&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect`
}
export function getUrlQuery(name = '') {
  let querys = {}
  location.search.substr(1)
    .split('&')
    .filter(i => i)
    .forEach(i => (querys[i.split('=')[0]] = i.split('=')[1]))
  return name ? querys[name] : querys
}

export function getIsWxClient() {
  var ua = navigator.userAgent.toLowerCase()
  var flag = false
  if (ua.match(/MicroMessenger/i)) {
    if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      flag = true
    }
  } else {
    flag = false
  }
  return flag
}
export function validateIdCard(idCard) {
  let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  let flag = false
  if (idcardReg.test(idCard)) {
    flag = true
  } else {
    flag = false
  }
  return flag
}
