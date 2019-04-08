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
    AsyncStorage,
    Alert
} from "react-native";

// 引入微信登录和支付
import * as WeChat from "react-native-wechat";
WeChat.registerApp("wx6c2f0edac4fdab22");

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
        try {
            let isInstall = await WeChat.isWXAppInstalled();
            if (!isInstall) {
                throw new Error(`微信未安装`);
            }
            let result = await WeChat.sendAuthRequest(`snsapi_userinfo`);
            Alert.alert(`微信登录结果 >>>${JSON.stringify(result)}`);
        } catch (error) {
            Alert.alert(`微信登录失败 >>>${JSON.stringify(error)}`);
        }
    }

    async wechatShareText() {
        try {
            let result = await WeChat.shareToTimeline({
                type: `text`,
                description: `微信分享文字`
            });
            console.log(`微信分享结果 >>>${result}`)
            Alert.alert(`微信分享结果 >>>${JSON.stringify(result)}`);
        } catch (error) {
            console.log(`微信分享失败 >>>${error}`)
            Alert.alert(`微信分享失败 >>>${JSON.stringify(error)}`);
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
                <View style={{ width: "70%", marginBottom: 0 }}>
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
                </View>
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
