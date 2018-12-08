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

// import SwiperCom from "./index";

// 当前页面全局变量(为了设置导航)
let navigation = null;

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
        title: "轮播图",
        headerStyle: {
            backgroundColor: "#eee"
            // display: "none"
        },
        headerTintColor: "#999",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };
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
    render() {
        return (
            <Swiper style={styles.wrapper}>
                {this.state.bannerList.map((item, index) => {
                    return <SwiperOne swiperOneData={item} key={index} />;
                })}
            </Swiper>
        );
    }
}

// 单个swiper
class SwiperOne extends React.Component {
    linkToEdit() {
        Alert.alert("linkToEdit");
        // 导航到添加轮播图页面
        navigation.navigate("EditBanner");
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
                            onPress={this.linkToEdit}
                        >
                            24
                        </Text>
                    </View>

                    <View style={styles.listOneBottom}>
                        <Text style={styles.listOneBottomText}>
                            目标日: {this.props.swiperOneData.targetDate}{" "}
                            {this.props.swiperOneData.weekTime}
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
