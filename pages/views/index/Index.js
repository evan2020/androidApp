// 引入react
import React, { Component } from "react";
// 引入组件
import { Platform, StyleSheet, Text, View, Button } from "react-native";
// 引入tabbar组件
import { TabBarCom } from "../components/tabbar/TabBar";

// 设置首页组件
export class IndexCom extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "首页",
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
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        color: "#333"
                    }}
                >
                    这是首页123
                </Text>

                {/* 引入tabbar组件,把导航事件传递给子组件 */}
                <TabBarCom navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({});
