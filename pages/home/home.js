// 导入request请求工具类
import {
  getChooseMedia,
  uploadFile,
  getBaseUrl
} from '../../utils/requestUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
  },
  //上传图片
  async handleImg() {
    const mediaResult = await getChooseMedia();
    const {
      tempFilePath
    } = mediaResult.tempFiles[0]
    console.log(tempFilePath)
    const fileResult = await uploadFile({
      url: "/picture/handleImg",
      filePath: tempFilePath,
      name: "uploadPicture"
    });
    console.log(fileResult)
    wx.setStorageSync('fileResult', fileResult)
    if (fileResult) {
      wx.navigateTo({
        url: '../picture_detail/picture_detail', //要跳转到的页面路径
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
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