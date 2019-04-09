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
    FlatList,
    Alert,
    TouchableOpacity,
    Linking,
    AsyncStorage
} from "react-native";
// 引入tabbar组件
import { TabBarCom } from "../components/tabbar/TabBar";

// 当前页面全局变量(为了设置导航)
let navigation = null;

// 用户
let currentUser = 1;

import * as Key from "../../config/key";

// 存储服务
AV = require("leancloud-storage");
let { Query, User } = AV;

let isLogin = false;

// 我的页面主体
export class MineCom extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "我的",
        headerStyle: {
            backgroundColor: "#eee",
            display: "none"
        },
        headerTintColor: "#999",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        };
        // 获取导航
        navigation = this.props.navigation;
    }
    componentDidMount() {
        this.getUserInfo();
    }
    async getUserInfo() {
        console.log(`开始获取用户信息和状态`);
        try {
            const value = await AsyncStorage.getItem("openId");
            if (value !== null) {
                // We have data!!
                console.log(`获取到openID >>>>>>>>>>>`, value);
                this.setState(previousState => {
                    return { isLogin: true };
                });

                console.log(`isLogin >>>`, isLogin);
            } else {
                this.setState(previousState => {
                    return { isLogin: false };
                });
            }
        } catch (error) {
            // Error retrieving data
            console.log(`error >>>>>>>`, error);
        }
    }
    async removeOpenId() {
        console.log(`移除ID`);
        try {
            await AsyncStorage.removeItem("openId", () => {
                // 导航到注册页面
                navigation.push("Login");
            });
        } catch (error) {
            // Error saving data
        }
    }
    render() {
        return (
            <View style={styles.mineCom}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(`点击头像`);
                        this.removeOpenId();
                    }}
                    style={styles.exitIconCom}
                >
                    <Image
                        style={
                            this.state.isLogin ? styles.exitIcon : styles.hide
                        }
                        source={require("../../static/images/mine/exit.png")}
                    />
                </TouchableOpacity>

                {/* 头像和姓名区域 */}
                <AvatarCom />
                {/* 导航区域 */}
                <Navigation />
                {/* 引入tabbar组件,把导航事件传递给子组件 */}
                <TabBarCom navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

// 设置头像和姓名
class AvatarCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async getUserInfo() {
        console.log(`开始获取用户信息和状态`);
        try {
            const value = await AsyncStorage.getItem("openId");
            if (value !== null) {
                // We have data!!
                console.log(`获取到openID >>>>>>>>>>>`, value);
                isLogin = true;
                console.log(`isLogin >>>`, isLogin);
            } else {
                isLogin = false;
                navigation.navigate("Login");
            }
        } catch (error) {
            // Error retrieving data
            console.log(`error >>>>>>>`, error);
            navigation.navigate("Login");
        }
    }
    render() {
        return (
            <View style={styles.avatarCom}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(`点击头像`);
                        this.getUserInfo();
                    }}
                >
                    <Image
                        style={styles.avatarImg}
                        source={require("../../static/images/mine/timg.jpg")}
                    />
                </TouchableOpacity>
                <Text style={styles.userName}>沙漏的时光</Text>
            </View>
        );
    }
}

// 导航区域
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    leftIconUrl: require("../../static/images/mine/mine.png"),
                    centerTitle: `关于我们`,
                    arrowRight: require("../../static/images/mine/ARROW.png"),
                    webSiteUrl: `https://shalou.smallzhiyun.com/timer/aboutUs.html`
                },
                {
                    leftIconUrl: require("../../static/images/mine/help.png"),
                    centerTitle: `帮助中心`,
                    arrowRight: require("../../static/images/mine/ARROW.png"),
                    webSiteUrl: `https://shalou.smallzhiyun.com/timer/helpCenter.html`
                },
                {
                    leftIconUrl: require("../../static/images/mine/contat.png"),
                    centerTitle: `联系客服`,
                    arrowRight: require("../../static/images/mine/ARROW.png")
                },
                {
                    leftIconUrl: require("../../static/images/mine/feedback.png"),
                    centerTitle: `提交反馈`,
                    arrowRight: require("../../static/images/mine/ARROW.png"),
                    webSiteUrl: `http://dsx201601.mikecrm.com/pr7Ye5o`
                }
            ]
        };
    }
    render() {
        return (
            <View style={styles.navigation}>
                <FlatList
                    data={this.state.navList}
                    // 设置key值
                    keyExtractor={item => item.centerTitle}
                    renderItem={({ item }) => <NavOne navOneData={item} />}
                />
            </View>
        );
    }
}

// 单个导航组件
class NavOne extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {};
    }
    linkToWeb(item) {
        console.log(item);
        if (item.centerTitle === `联系客服`) {
            // Alert.alert("联系客服");
            // 点击拨打客服电话
            Linking.openURL("tel:10086");
        } else {
            // 跳转到webWiew页面
            navigation.navigate("WebViewCom", {
                webSiteUrl: item.webSiteUrl,
                title: item.centerTitle
            });
        }
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.linkToWeb(this.props.navOneData);
                }}
            >
                <View style={styles.navigationOne}>
                    {/* 左侧图标 */}
                    <Image
                        style={styles.leftIcon}
                        source={this.props.navOneData.leftIconUrl}
                    />
                    {/* 中间标题 */}
                    <Text style={styles.centerTitle}>
                        {this.props.navOneData.centerTitle}
                    </Text>
                    {/* 右侧箭头 */}
                    <Image
                        style={styles.arrowRight}
                        source={this.props.navOneData.arrowRight}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    hide: {
        display: `none`
    },
    exitIconCom: {
        // backgroundColor:`pink`,
        position: `absolute`,
        zIndex: 9999,
        right: 20,
        top: 20
    },
    exitIcon: {
        width: 30,
        height: 30
    },
    mineCom: {
        flex: 1,
        alignItems: "center",
        position: `relative`
    },
    avatarCom: {
        width: "100%",
        height: 160,
        // backgroundColor: "pink",
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatarImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 15
    },
    userName: {
        marginTop: 20,
        fontSize: 16
    },
    navigation: {
        width: "95%",
        display: "flex",
        flexDirection: "column",
        marginTop: 50,
        paddingLeft: 5,
        paddingRight: 5,
        // borderLeftWidth: 1,
        // borderLeftColor: "#eee",
        // borderRightWidth: 1,
        // borderRightColor: "#eee",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    navigationOne: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        // backgroundColor: "pink",
        borderTopWidth: 1,
        borderTopColor: "#eee"
    },
    leftIcon: {
        width: 20,
        height: 20
    },
    centerTitle: {
        position: "absolute",
        left: 30,
        fontSize: 16,
        color: "#666"
    },
    arrowRight: {
        width: 30,
        height: 30
    }
});
