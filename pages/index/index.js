//index.js
//获取应用实例
const app = getApp()
let timer;
let aiImgIndex;
var resultStr = "比赛结果即将揭晓";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgAi: '',
    imgUser: '',
    winCount:0,
    failedCount:0,
    gameResult: '',
    playAgain: false,
    src:[
      '../img/clipper.png',
      '../img/step.png',
      '../img/stone.png'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ imgUser: '../img/default.png'});
    this.setData({winCount:0});
    this.setData({gameResult : '比赛结果即将揭晓'});
    this.startTimer();
  },
  startTimer: function(){
    timer = setInterval(this.changeAiImg, 50);
  },
  stopTimer(){
    clearInterval(timer);
  },
  changeAiImg: function(){
    aiImgIndex = parseInt(Math.random() * 3);
    this.setData({imgAi: this.data.src[aiImgIndex]});
  },

  myChoose: function (event){

    if(this.data.playAgain){
      return;
    }
    // 获取当前选中的索引，并将该索引的图片赋值用户选择的图片
    let chooseIndex = event.currentTarget.id;
    this.setData({imgUser: this.data.src[chooseIndex]});
    this.stopTimer();

    if (this.data.imgAi == this.data.imgUser){
      resultStr = '不相上下，打个平局';
    }
    else if (this.data.imgAi == '../img/clipper.png' && this.data.imgUser == '../img/stone.png'){
      this.setData({ winCount : this.data.winCount + 1});
      resultStr = '🐂逼少年，你赢了';
    }
    else if (this.data.imgAi == '../img/stone.png' && this.data.imgUser == '../img/step.png') {
      this.setData({ winCount: this.data.winCount + 1 });
      resultStr = '🐂逼少年，你赢了';
    }
    else if (this.data.imgAi == '../img/step.png' && this.data.imgUser == '../img/clipper.png') {

      this.setData({ winCount: this.data.winCount + 1 });
      resultStr = '🐂逼少年，你赢了';
    }else {
      
      this.setData({ failedCount: this.data.failedCount + 1});
      resultStr = '噢噢，少年你输了';
    }

    this.setData({gameResult : resultStr});
    this.setData({playAgain: true});
  },

  playAgain: function(){

    if(this.data.playAgain == false){
      return;
    }
    this.startTimer();
    resultStr = "比赛结果即将揭晓";
    this.setData({imgUser : '../img/default.png'});
    this.setData({ gameResult: resultStr});
    this.setData({ playAgain: false });
  }

})
