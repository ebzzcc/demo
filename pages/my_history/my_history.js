// pages/my_history/my_history.js
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
    baseUrl: '',
    historyList: []
  },
  // 接口参数
  QueryParams: {
    page: 1, // 第几页
    pageSize: 5 // 每页记录数
  },
  /**
   * 处理一条历史记录
   */
  handleItem(res) {
    const currentIndex = res.currentTarget.dataset.index
    console.log(currentIndex)
    wx.setStorageSync('fileResult', JSON.stringify(this.data.historyList[currentIndex]))
    this.createDialog()
  },
  /**
   * 处理一条历史记录
   */
  createDialog() {
    wx.showActionSheet({
      itemList: ['查看详情', '重命名', '删除'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          console.log("详情")
          wx.navigateTo({
            url: '../picture_detail/picture_detail', //要跳转到的页面路径
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    const result = requestUtil({
      url: '/my/history/list',
      data: this.QueryParams
    }).then((res) => {
      console.log(res.historyList)
      this.setData({
        historyList: res.historyList
      })
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