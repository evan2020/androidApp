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
export class TabBarCom extends React.Component {
    render() {
        return (
            // tabbar组件
            <View style={styles.TabBarCom}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigate("IndexCom");
                    }}
                    style={{
                        flex: 1
                    }}
                >
                    {/* 左侧tabbar */}
                    <View style={styles.tabLeft}>
                        <Image
                            style={{ width: 25, height: 25, marginBottom: 5 }}
                            source={require("../../../static/icon/tabBar/clock.png")}
                        />
                        <Text>首页</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigate("MineCom");
                    }}
                    style={{
                        flex: 1
                    }}
                >
                    {/* 右侧tabbar */}
                    <View style={styles.tabRight}>
                        <Image
                            style={{ width: 25, height: 25, marginBottom: 5 }}
                            source={require("../../../static/icon/tabBar/mine.png")}
                        />
                        <Text>我的</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    TabBarCom: {
        width: "100%",
        height: 60,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#eee"
    },
    tabLeft: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    tabRight: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});
