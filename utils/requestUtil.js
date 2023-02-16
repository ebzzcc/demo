// 定义请求根路径baseUrl
const baseUrl="http://localhost:8080";

//同时并发请求次数
let ajaxTimes=0;
// const baseUrl="http://47.115.221.145:8080";
/**
 * 返回请求根路径baseUrl
 */
export const getBaseUrl=()=>{
  return baseUrl;
}
/**
 * wx chooseMedia封装
 */
export const getChooseMedia=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
/**
 * wx uploadFile封装
 */
export const uploadFile=(params)=>{
  return new Promise((resolve,reject)=>{
    wx.uploadFile({
      ...params,
      filePath: params.filePath,
      name:params.name,
      url:baseUrl+params.url,
      header:{
        // "token":params.token
        "Content-Type": "multipart/form-data"
      },
      // formData:{
      //   "openId":params.openId
      // },
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
/**
 * wx login封装
 */
export const getWxLogin=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 5000,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
/**
 * wx getUserProfile封装
 */
export const getUserProfile=()=>{
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
/**
 * 后端请求工具类
 * @param {*} params 
 */
export const requestUtil=(params)=>{
// 判断url中是否带有 /my/ 请求的是私有的路径 带上header token
let header={...params.header};
if(params.url.includes("/my/")){
  // 拼接header 带上token
  header["token"]=wx.getStorageSync('token')
}
  var start=new Date().getTime();
  console.log(start)
  // 模拟网络延迟加载
  ajaxTimes++;
  wx.showLoading({
    title:"加载中...",
    mask:true
  })
  while(true){
    if(new Date().getTime()-start>1*10) break;
  }
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header,
      url:baseUrl+params.url,
      success:(result)=>{
       resolve(result.data)
      },
      fail:(err)=>{
        reject(err)
       },
       complete:()=>{
         ajaxTimes--;
         if(ajaxTimes==0){
          wx.hideLoading(); //关闭加载
         }
       }
    })
  });
}