// pages/my/my.js
// 导入request请求工具类
import {
  getBaseUrl,
  getWxLogin,
  getUserProfile,
  requestUtil
} from '../../utils/requestUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const token=wx.getStorageSync('token');
    if(!token){
      wx.showModal({
        title:'友情提示',
        content:'微信授权登录后，才可进入个人中心',
        success:(res)=>{
          Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
            console.log(res[0].code);
            console.log(res[1].userInfo.nickName,res[1].userInfo.avatarUrl)
            let loginParam={
              code:res[0].code,
              nickName:res[1].userInfo.nickName,
              avatarUrl:res[1].userInfo.avatarUrl
            }
            console.log(loginParam)
            wx.setStorageSync('userInfo', res[1].userInfo);
            this.wxlogin(loginParam);
            this.setData({
              userInfo:res[1].userInfo
            })
          })
        }
      })
    }else{
      console.log("token存在："+token);
      const userInfo=wx.getStorageSync('userInfo')
      this.setData({
        userInfo
      })
    }
  },
/**
   * 请求后端获取用户token
   * @param {*} loginParam 
   */
  async wxlogin(loginParam){
    const result=await requestUtil({url:"/wxUserInfo/wxlogin",data:loginParam,method:"post"});
    console.log(result);
    const token=result.token;
    if(result.code===0){
      // 存储token到缓存
      wx.setStorageSync('token', token);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})