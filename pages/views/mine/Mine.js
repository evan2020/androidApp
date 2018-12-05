// 引入react
import React, { Component } from "react";
// 引入组件
import { Platform, StyleSheet, Text, View, Button } from "react-native";
// 引入tabbar组件
import { TabBarCom } from "../components/tabbar/TabBar";

export class MineCom extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "我的",
        headerStyle: {
            backgroundColor: "#eee",
            display:"none"
        },
        headerTintColor: "#999",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>这是我的页面</Text>
                {/* 引入tabbar组件,把导航事件传递给子组件 */}
                <TabBarCom navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({});
