<template>
  <div class="editcard">
    <div class="formData">
      <div class="item">
        <div class="icon">
          <img src="../../../../static/images/tabBar/timer.png" alt="timer">
        </div>
        <div class="content">
          <input placeholder="点击这里输入事件名称" @input="changeVal" :value="itemName">
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../static/images/tabBar/timer.png" alt="timer">
        </div>
        <div class="content">
          <picker
            mode="date"
            :value="targetDate"
            start="2018-12-01"
            end="2019-12-01"
            @change="changeDate"
          >
            <div>{{targetDate}}</div>
          </picker>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../static/images/tabBar/timer.png" alt="timer">
        </div>
        <div class="content">
          <div class="classify">分类</div>
          <div class="selectClass">
            <div class="text">综合</div>
            <div class="arrowRight">
              <img src="../../../../static/images/card/right.png" alt="right">
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../static/images/tabBar/timer.png" alt="timer">
        </div>
        <div class="content">
          <div class="classify">置顶</div>
          <div class="selectClass">
            <div class="text">
              <switch
                :checked="checked"
                @change="switchTop"
                disabled
                style="position:relative;left:10rpx"
                class="switch"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../static/images/tabBar/timer.png" alt="timer">
        </div>
        <div class="content">
          <div class="classify">重复</div>
          <div class="selectClass">
            <div class="text">无重复</div>
            <div class="arrowRight">
              <img src="../../../../static/images/card/right.png" alt="right">
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../static/images/tabBar/timer.png" alt="timer">
        </div>
        <div class="content">
          <div class="classify">提醒</div>
          <div class="selectClass">
            <div class="text">无提醒</div>
            <div class="arrowRight">
              <img src="../../../../static/images/card/right.png" alt="right">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="save" @click="save">保存</div>
    <div class="del" @click="del">删除当前事件</div>
  </div>
</template>
<script>
import wxp from "minapp-api-promise";
import * as API from "../../../http/api.js";
export default {
  name: `editcard`,
  data() {
    return {
      openId: ``, // 当前的用户openId
      cardData: {}, // 当前要修改的卡片数据
      checked: false, // 置顶是否选中
      itemName: ``, // 事件名称
      targetDate: `` // 目标日期
    };
  },
  onShow() {
    let that = this;
    wx.getStorage({
      key: "openId",
      success(res) {
        console.log(`openId >>>>>>>>>>>`, res.data);
        that.openId = res.data;
      }
    });
    that.cardData = JSON.parse(that.$route.query.cardData);
    console.log(`that.cardData >>>>>>>>>>`, that.cardData);
    that.itemName = that.cardData.itemName;
    that.targetDate = that.cardData.targetDate;
  },
  methods: {
    changeVal(e) {
      let that = this;
      console.log(`监听输入框的值`, e.target.value);
      that.itemName = e.target.value;
    },
    // 监听日期的改变
    changeDate(e) {
      let that = this;
      console.log(`监听日期输入框的值`, e.target.value);
      that.targetDate = e.target.value;
    },
    save() {
      let that = this;
      that.addCard();
    },
    del() {
      let that = this;
      that.delCard();
    },
    // 编辑卡片
    async addCard() {
      let that = this;
      try {
        let resp = await wxp.request({
          url: API.editCard,
          data: {
            id: that.cardData.id, // 当前卡片的id
            itemName: that.itemName, // 事件名称
            targetDate: that.targetDate // 目标日期
          }
        });
        console.log("success信息:", resp);
        that.$router.push({
          path: `/pages/timer/showList/main`,
          isTab: true,
          query: {}
        });
      } catch (errorMesg) {
        console.log("fail信息:", errorMesg);
      }
    },
    // 删除卡片
    async delCard() {
      let that = this;
      try {
        let resp = await wxp.request({
          url: API.delCard,
          data: {
            cardId: that.cardData.id // 当前卡片的id
          }
        });
        console.log("success信息:", resp);
        that.$router.push({
          path: `/pages/timer/showList/main`,
          isTab: true,
          query: {}
        });
      } catch (errorMesg) {
        console.log("fail信息:", errorMesg);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.editcard {
  display: flex;
  flex-direction: column;
  align-items: center;
  .formData {
    width: 90%;
    margin-top: 50rpx;
    // height: 500rpx;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 60rpx;
      //   background-color: pink;
      border-bottom: 1px solid #eee;
      .icon {
        width: 30rpx;
        height: 30rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 30rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        margin-left: 30rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        .classify {
        }
        .selectClass {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .text {
            margin-right: 20rpx;
          }
          .switch {
            transform: scale(0.7, 0.7);
          }
          .arrowRight {
            width: 30rpx;
            height: 30rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-right: 20rpx;
            img {
              width: 30rpx;
              height: 30rpx;
            }
          }
        }
      }
    }
  }
  .save {
    margin-top: 50rpx;
    width: 90%;
    height: 70rpx;
    background-color: #89deff;
    border-radius: 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30rpx;
  }
  .del {
    margin-top: 10rpx;
    width: 90%;
    height: 70rpx;
    background-color: #ff6b61;
    border-radius: 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30rpx;
  }
}
</style>
