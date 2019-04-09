// 引入react
import React, { Component } from "react";
// 引入组件
import { Platform, StyleSheet, Text, View, Button } from "react-native";
// 引入react导航路由
import { createStackNavigator, createAppContainer } from "react-navigation";
// 引入首页组件
import { IndexCom } from "./pages/views/index/Index";
// 引入我的组件
import { MineCom } from "./pages/views/mine/Mine";
// 引入banner展示倒计时组件
import { BannerCom } from "./pages/views/banner/Banner";
// 引入添加轮播图组件
import { AddBanner } from "./pages/views/form/addBanner/AddBanner";
// 引入编辑轮播图页面
import { EditBanner } from "./pages/views/form/editBanner/EditBanner";
// 引入webview页面
import { WebViewCom } from "./pages/views/webView/WebView";
// 引入登录页面
import { Login } from "./pages/views/login/Login";
// 引入注册页面
import { Register } from "./pages/views/register/Register";
// 引入按钮页面
import { ShowBtn } from "./pages/views/other/showBtn/ShowBtn";

// // 引入微信登录和支付
// import * as WeChat from 'react-native-wechat';
// WeChat.registerApp('wx6c2f0edac4fdab22');

// 平台类型
const instructions = Platform.select({
    ios: `这是IOS >>>>>>>>>>`,
    android: `这是安卓 >>>>>>>>>>`
});


// 路由设置
const AppNavigator = createStackNavigator(
    {
        IndexCom: IndexCom,
        MineCom: MineCom,
        BannerCom: BannerCom,
        AddBanner: AddBanner,
        EditBanner: EditBanner,
        WebViewCom: WebViewCom,
        Register: Register,
        Login: Login,
        ShowBtn: ShowBtn
    },
    {
        initialRouteName: "IndexCom" // 默认初始页为home组件
    }
);

// 定义路由
const AppContainer = createAppContainer(AppNavigator);

// 导出核心组件APP
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

// 定义样式
const styles = StyleSheet.create({});
