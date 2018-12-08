// 引入react
import React, { Component } from "react";

// 引入组件
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    Alert,
    FlatList
} from "react-native";
import Swiper from "react-native-swiper";
import { http } from "../../http/index";
import * as API from "../../http/api";
import * as Timer from "../../utils/timer";

// import SwiperCom from "./index";

// 当前页面全局变量(为了设置导航)
let navigation = null;
let globalData = {
    id: 0,
    index: 0
};
// 设置底部tabBar组件
export class BannerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // 获取导航
        navigation = this.props.navigation;
    }
    // 设置标题栏
    static navigationOptions = {
        title: "倒计时卡片",
        headerStyle: {
            backgroundColor: "#eee"
            // display: "none"
        },
        headerTintColor: "#999",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };
    componentDidMount() {}

    componentWillUnmount() {}
    render() {
        return (
            // tabbar组件
            <View style={styles.BannerCom}>
                <SwiperCom />
            </View>
        );
    }
}

// swiper组件
class SwiperCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [
                {
                    itemName: `元旦`,
                    targetDate: `2019-01-01`,
                    weekTime: `星期二`
                },
                {
                    itemName: `元旦`,
                    targetDate: `2019-01-01`,
                    weekTime: `星期三`
                }
            ]
        };
    }

    componentDidMount() {
        let that = this;
        console.log(`开始挂载轮播图`);
        globalData.id = navigation.getParam("id", 0);
        that.getAllCard();
    }

    componentWillUnmount() {}
    // 获取当前用户所有的卡片
    getAllCard() {
        let that = this;
        http({
            method: "get",
            url: API.findAllCard,
            params: {
                openId: `oBoHi5NGVpXF4LKHJ8UT-sOY_n8U`
            },
            customErr: true
        }).then(res => {
            console.log(`请求结果 >>>>>>>>>>>>>`, res);
            let arrTime = res.data.map((item, index) => {
                let itemOne = { ...item };
                let date = new Date(item.targetDate);
                let week = date.getDay();
                let nowDate = new Date();
                let nowDay = nowDate.getDay();
                let nowTimeStamp = nowDate.getTime();
                let arrWeek = new Array(
                    "日",
                    "一",
                    "二",
                    "三",
                    "四",
                    "五",
                    "六"
                );
                let strWeek = `星期${arrWeek[week]}`;
                console.log(`weeek >>>>>>>>>>>`, strWeek);
                let timeStamp = date.getTime();
                let IntervalTime = Timer.timeStamp(item.targetDate);
                if (week !== nowDay && nowTimeStamp < timeStamp) {
                    IntervalTime += 1;
                }
                console.log(timeStamp);
                itemOne.timeStamp = timeStamp;
                itemOne.IntervalTime = IntervalTime;
                itemOne.strWeek = strWeek;
                return itemOne;
            });
            arrTime.sort(Timer.sortBy("timeStamp"));
            let stop = false;
            arrTime.map((item, index) => {
                if (!stop) {
                    console.log(`item >>>>>>>>>>>>>`, item, index);
                    if (item.id === parseInt(globalData.id)) {
                        console.log(`cardId >>>>>>>>>>`, globalData.id);
                        globalData.index = index;
                        stop = true;
                    }
                }
            });
            that.setState({
                bannerList: arrTime
            });
            console.log("success信息:", res);
            console.log("数组排序:", arrTime);
        });
    }
    render() {
        return (
            <Swiper style={styles.wrapper} index={globalData.index}>
                {this.state.bannerList.map((item, index) => {
                    return <SwiperOne swiperOneData={item} key={index} />;
                })}
            </Swiper>
        );
    }
}

// 单个swiper
class SwiperOne extends React.Component {
    linkToEdit(item) {
        // Alert.alert("linkToEdit");
        console.log(`swiperOneData >>>>>>>>>`, item);
        // 导航到添加轮播图页面
        navigation.navigate("EditBanner", {
            itemName: item.itemName,
            targetDate: item.targetDate,
            id: item.id
        });
    }
    render() {
        return (
            <View style={styles.slideOne}>
                <View style={styles.listOne}>
                    <View style={styles.listOneTop}>
                        <Text style={styles.listOneTopText}>
                            距离 {this.props.swiperOneData.itemName} 还有
                        </Text>
                    </View>

                    <View style={styles.listOneCenter}>
                        <Text
                            style={styles.listOneCenterText}
                            onPress={() => {
                                this.linkToEdit(this.props.swiperOneData);
                            }}
                        >
                            {this.props.swiperOneData.IntervalTime}
                        </Text>
                    </View>

                    <View style={styles.listOneBottom}>
                        <Text style={styles.listOneBottomText}>
                            目标日: {this.props.swiperOneData.targetDate}
                            {this.props.swiperOneData.strWeek}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    BannerCom: {
        flex: 1
    },
    wrapper: {},
    slideOne: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB"
    },
    slide1: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB"
    },
    slide2: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5"
    },
    slide3: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9"
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    },
    listOne: {
        width: "70%",
        height: "40%",
        backgroundColor: "pink"
    },
    listOneTop: {
        flex: 2,
        backgroundColor: "#89DEFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    listOneTopText: {
        color: "#fff"
    },
    listOneCenter: {
        flex: 12,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    listOneCenterText: {
        // flex: 1,
        fontSize: 60,
        textAlign: "center",
        color: "#FF84BF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "pink",
        paddingLeft: "30%",
        paddingRight: "30%",
        paddingTop: 30,
        paddingBottom: 30
    },
    listOneBottom: {
        flex: 2,
        backgroundColor: "#F5F9FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    listOneBottomText: {
        color: "#999"
    }
});
