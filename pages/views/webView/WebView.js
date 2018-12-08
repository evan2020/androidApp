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

// 当前页面全局变量(为了设置导航)
let navigation = null;

let globalData = {
    webSiteUrl: ``
};

// 我的页面主体
export class WebViewCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webSiteUrl: ``
        };
        // 获取导航
        navigation = this.props.navigation;
    }
    // 设置标题栏
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title", "webview"),
            headerStyle: {
                backgroundColor: "#eee"
                // display: "none"
            },
            headerTintColor: "#999",
            headerTitleStyle: {
                fontWeight: "bold"
            }
        };
    };
    componentDidMount() {
        let that = this;
        console.log(`开始webView挂载`);
        globalData.webSiteUrl = navigation.getParam("webSiteUrl", ``);
        that.setState({
            webSiteUrl: globalData.webSiteUrl
        });
    }

    componentWillUnmount() {}
    render() {
        return (
            <View style={styles.WebView}>
                <WebView source={{ uri: this.state.webSiteUrl }} />
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    WebView: {
        flex: 1
    }
});
