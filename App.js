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
        BannerCom: BannerCom
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
