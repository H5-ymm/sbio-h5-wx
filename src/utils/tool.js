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

export function locationUrl () {
  let locationParams = location.href.split('#')[0]
  console.log(locationParams)
  let urlHome = encodeURIComponent(locationParams)
  console.log(urlHome + '回调函数')
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe60bb0d781a1f74&redirect_uri=${urlHome}&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect`
}
export function getUrlQuery (name = '') {
  let querys = {}
  location.search.substr(1)
    .split('&')
    .filter(i => i)
    .forEach(i => (querys[i.split('=')[0]] = i.split('=')[1]))
  return name ? querys[name] : querys
}

export function getIsWxClient () {
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

export function downloadFile (content) {
  console.log('下载')
  let elink = document.createElement("a");
  // 设置下载文件名
  elink.download = '样本报告' + ".xlsx";
  elink.style.display = "none";
  let blob = new Blob([content]);
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  // document.body.removeChild(elink);
}