// 引入react
import React, { Component } from "react";

import { http } from "../../../http/index";
import * as API from "../../../http/index";
// 引入组件
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    FlatList,
    DeviceEventEmitter,
    AsyncStorage,
    Alert
} from "react-native";

// 引入微信登录和支付
import * as WeChat from "react-native-wechat";
WeChat.registerApp("wx6c2f0edac4fdab22");

import * as Key from "../../../config/key";

// 存储服务
AV = require("leancloud-storage");
let { Query, User } = AV;

// 当前页面全局变量(为了设置导航)
let navigation = null;

let globalData = {};

// 模块
export class ShowBtn extends React.Component {
    // 设置标题栏
    static navigationOptions = ({ navigation }) => {
        return {
            title: "ShowBtn",
            headerStyle: {
                backgroundColor: "#eee",
                display: "none"
            },
            headerTintColor: "#999",
            headerTitleStyle: {
                fontWeight: "bold"
            }
        };
    };

    constructor(props) {
        super(props);
        this.state = {};
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    async removeOpenId() {
        try {
            await AsyncStorage.removeItem("openId", () => {
                // 导航到注册页面
                navigation.push("Register");
            });
        } catch (error) {
            // Error saving data
        }
    }

    async wechatLogin() {
        console.log(`开始微信登录 >>>>>>>>>>`);
        try {
            let isInstall = await WeChat.isWXAppInstalled();
            if (!isInstall) {
                throw new Error(`微信未安装`);
            }
            let result = await WeChat.sendAuthRequest(`snsapi_userinfo`);
            console.log(`微信登录结果 >>>${JSON.stringify(result)}`);
            this.getAccessToken(result);
        } catch (error) {
            console.log(`微信登录失败 >>>${JSON.stringify(error)}`);
        }
    }

    async wechatShareText() {
        try {
            let result = await WeChat.shareToTimeline({
                type: `text`,
                description: `微信分享文字`
            });
            console.log(`微信分享结果 >>>${result}`);
            Alert.alert(`微信分享结果 >>>${JSON.stringify(result)}`);
        } catch (error) {
            console.log(`微信分享失败 >>>${error}`);
            Alert.alert(`微信分享失败 >>>${JSON.stringify(error)}`);
        }
    }
    test() {
        console.log(`test`);
    }

    getAccessToken(result) {
        let that = this;
        console.log(`开始获取微信token >>>>>>`, result);
        return new Promise((resolve, reject) => {
            http({
                method: "get",
                url: `https://api.weixin.qq.com/sns/oauth2/access_token`,
                params: {
                    appid: Key.wxAppId,
                    secret: Key.wxSecret,
                    code: result.code,
                    grant_type: `authorization_code`
                },
                customErr: true
            }).then(res => {
                console.log(`请求结果 >>>>>>>>>>>>>`, res);
                that.leanCouldLogin(res);
            });
        });
    }
    // leanclould的第三方登录
    leanCouldLogin(res) {
        let that = this;
        console.log(`开始微信第三方登录 >>>>>>>>> res`, res);
        let authData = res;
        console.log(`开始微信第三方登录 >>>>>>>>> authData`, authData);
        try {
            AV.init(Key.lcAppID, Key.lcAppKey);
            AV.User.loginWithAuthData(authData, "weixin").then(
                function(loggedInUser) {
                    //登录成功
                    console.log(`微信第三方登录成功 >>>>>>>>>>`, loggedInUser);
                    that.linkToLogin(loggedInUser);
                },
                function(error) {
                    // 登录失败
                    console.log(`微信第三方登录失败 >>>>>>>>>>`, error);
                }
            );
        } catch (error) {
            console.log(`初始化error >>>>>>>>`, error);
            AV.User.loginWithAuthData(authData, "weixin").then(
                function(loggedInUser) {
                    //登录成功
                    console.log(`微信第三方登录成功 >>>>>>>>>>`, loggedInUser);
                    that.linkToLogin(loggedInUser);
                },
                function(error) {
                    // 登录失败
                    console.log(`微信第三方登录失败 >>>>>>>>>>`, error);
                }
            );
        }
    }
    async linkToLogin(loggedInUser) {
        //登录成功
        console.log(`登录成功跳转 >>>>>>>>>>`, loggedInUser);
        try {
            await AsyncStorage.setItem("openId", loggedInUser.id);
            console.log(`保存成功 >>>>>>>>>>`);
            DeviceEventEmitter.emit("getOpenId", loggedInUser.id);
            // 导航到注册页面
            navigation.push("IndexCom");
        } catch (error) {
            // Error saving data
            console.log(`保存失败`, error);
        }
    }

    render() {
        return (
            <View style={styles.ShowBtn}>
                {/* <Text>ShowBtn</Text> */}
                <View style={{ width: "70%", marginBottom: 30 }}>
                    <Button
                        onPress={() => {
                            // 导航到登录页面
                            navigation.push("Login");
                        }}
                        title="登录"
                        color="#89DEFF"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={{ width: "70%", marginBottom: 30 }}>
                    <Button
                        onPress={() => {
                            // 导航到注册页面
                            navigation.push("Register");
                        }}
                        title="注册"
                        color="#88FFA9"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={{ width: "70%", marginBottom: 0 }}>
                    <Button
                        onPress={() => {
                            this.removeOpenId();
                        }}
                        title="退出"
                        color="#E89080"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                {/* <View style={{ width: "70%", marginBottom: 0 }}>
                    <Button
                        onPress={() => {
                            this.wechatLogin();
                        }}
                        title="微信登录"
                        color="#E89080"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={{ width: "70%", marginBottom: 0 }}>
                    <Button
                        onPress={() => {
                            this.wechatShareText();
                        }}
                        title="微信分享"
                        color="#E89080"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View> */}
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    ShowBtn: {
        // width:"100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});
