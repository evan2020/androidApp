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
    WebView
} from "react-native";

// 我的页面主体
export class WebViewCom extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "webView",
        headerStyle: {
            backgroundColor: "#eee",
            display: "none"
        },
        headerTintColor: "#999",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };
    render() {
        return (
            <View style={styles.WebView}>
                <Text>webView</Text>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({});