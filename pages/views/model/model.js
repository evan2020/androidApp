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
    FlatList
} from "react-native";

// 模块
export class Model extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "Model",
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
        return <View style={styles.Model} />;
    }
}

// 定义样式
const styles = StyleSheet.create({});
