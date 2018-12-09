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

// 当前页面全局变量(为了设置导航)
let navigation = null;

let globalData = {};

// 模块
export class Model extends React.Component {
    // 设置标题栏
    static navigationOptions = ({ navigation }) => {
        return {
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
    };

    constructor(props) {
        super(props);
        this.state = {};
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
       
    }

    render() {
        return (
            <View style={styles.Model}>
                <Text>model</Text>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({});
