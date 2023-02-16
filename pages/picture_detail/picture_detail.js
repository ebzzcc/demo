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
    fileResult:{},
  },
  // 处理图片保存
  async handleSave(){
    const token=wx.getStorageSync('token');
    if(!token){
      Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
        let loginParam={
          code:res[0].code,
          nickName:res[1].userInfo.nickName,
          avatarUrl:res[1].userInfo.avatarUrl
        }
        wx.setStorageSync('userInfo', res[1].userInfo);
        this.wxlogin(loginParam);
      })
    }
    else{
      //继续保存
      this.confirmSave()
    }
  },
    /**
   * 保存图片
   */
  async confirmSave(){
    const {pname}=this.data.fileResult
    const {ocrResult}=this.data.fileResult
    const saveParam={
      pname,
      ocrResult
    }
    const res=await requestUtil({url:"/my/history/confirmSave",method:"POST",data:saveParam});
    if(res.flag===0){
      wx.showModal({
        title:'友情提示',
        content:'请勿重复保存',
      })
    }else{
      wx.showModal({
        title:'友情提示',
        content:'保存成功',
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
        //继续保存
        this.confirmSave()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
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
    const fileResult=JSON.parse(wx.getStorageSync('fileResult'));
    this.setData({
      fileResult
    })
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
    // //退出时清除缓存
    // wx.removeStorage({
    //   key: 'fileResult',
    // })
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