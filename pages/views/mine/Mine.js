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
// 引入tabbar组件
import { TabBarCom } from "../components/tabbar/TabBar";

// 我的页面主体
export class MineCom extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "我的",
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
            <View style={styles.mineCom}>
                {/* 头像和姓名区域 */}
                <AvatarCom />
                {/* 导航区域 */}
                <Navigation />
                {/* 引入tabbar组件,把导航事件传递给子组件 */}
                <TabBarCom navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

// 设置头像和姓名
class AvatarCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.avatarCom}>
                <Image
                    style={styles.avatarImg}
                    source={{
                        uri:
                            "https://file.smallzhiyun.com/001ec949c8d6138ec9a261_%E5%89%AF%E6%9C%AC.jpg"
                    }}
                />
                <Text style={styles.userName}>大师兄</Text>
            </View>
        );
    }
}

// 导航区域
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    leftIconUrl: require("../../static/images/mine/mine.png"),
                    centerTitle: `关于我们`,
                    arrowRight: require("../../static/images/mine/right.png")
                },
                {
                    leftIconUrl: require("../../static/images/mine/help.png"),
                    centerTitle: `帮助中心`,
                    arrowRight: require("../../static/images/mine/right.png")
                },
                {
                    leftIconUrl: require("../../static/images/mine/contat.png"),
                    centerTitle: `联系客服`,
                    arrowRight: require("../../static/images/mine/right.png")
                },
                {
                    leftIconUrl: require("../../static/images/mine/feedback.png"),
                    centerTitle: `提交反馈`,
                    arrowRight: require("../../static/images/mine/right.png")
                }
            ]
        };
    }
    render() {
        return (
            <View style={styles.navigation}>
                <FlatList
                    data={this.state.navList}
                    // 设置key值
                    keyExtractor={item => item.centerTitle}
                    renderItem={({ item }) => <NavOne navOneData={item} />}
                />
            </View>
        );
    }
}

// 单个导航组件
class NavOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.navigationOne}>
                {/* 左侧图标 */}
                <Image
                    style={styles.leftIcon}
                    source={this.props.navOneData.leftIconUrl}
                />
                {/* 中间标题 */}
                <Text style={styles.centerTitle}>
                    {this.props.navOneData.centerTitle}
                </Text>
                {/* 右侧箭头 */}
                <Image
                    style={styles.arrowRight}
                    source={this.props.navOneData.arrowRight}
                />
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    mineCom: {
        flex: 1,
        alignItems: "center"
    },
    avatarCom: {
        width: "100%",
        height: 160,
        // backgroundColor: "pink",
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatarImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 15
    },
    userName: {
        marginTop: 10
    },
    navigation: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    navigationOne: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        // backgroundColor: "pink",
        borderTopWidth: 1,
        borderTopColor: "#eee"
    },
    leftIcon: {
        width: 30,
        height: 30
    },
    centerTitle: {
        position: "absolute",
        left: 50,
        fontSize: 20,
        color: "#666"
    },
    arrowRight: {
        width: 30,
        height: 30
    }
});
