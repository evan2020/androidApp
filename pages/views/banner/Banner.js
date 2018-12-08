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
    Alert
} from "react-native";

// 设置底部tabBar组件
export class BannerCom extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "轮播图",
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
            // tabbar组件
            <View style={styles.BannerCom}>
                <Text>BannerCom</Text>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    BannerCom: {}
});
