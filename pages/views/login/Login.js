// 引入react
import React, { Component } from "react";
// 引入组件
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TextInput,
    Image
} from "react-native";

// 当前页面全局变量(为了设置导航)
let navigation = null;

let globalData = {};

// 模块
export class Login extends React.Component {
    // 设置标题栏
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Login",
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
        this.state = {
            userName: ``,
            password: ``
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    login() {
        let that = this;
        console.log(`login`);
    }
    render() {
        return (
            <View style={styles.Login}>
                <View style={styles.content}>
                    <Image
                        style={{ width: 50, height: 50, marginTop: 150 }}
                        source={require("../../static/images/mine/clock192.png")}
                    />
                </View>
                <View style={styles.inputComUser}>
                    <Text style={styles.useraName}>用户名</Text>
                    <TextInput
                        style={styles.userInput}
                        onChangeText={userName => {
                            this.setState({ userName });
                            console.log(this.state);
                        }}
                        value={this.state.userName}
                    />
                </View>

                <View style={styles.inputComUser}>
                    <Text style={styles.useraName}>密码</Text>
                    <TextInput
                        style={styles.userInput}
                        onChangeText={password => {
                            this.setState({ password });
                            console.log(this.state);
                        }}
                        value={this.state.password}
                    />
                </View>

                <View style={styles.loginBtn}>
                    <Button
                        style={{ width: "100%" }}
                        onPress={this.login}
                        title="登录"
                        accessibilityLabel="login"
                    />
                </View>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    Login: {
        width: "100%",
        // flex: 1,
        display: "flex",
        flexDirection: "column"
        // alignItems: "center"
    },
    content: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    inputComUser: {
        marginTop: 50,
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
        // backgroundColor: "pink"
    },
    userInput: {
        marginTop: 10,
        width: "80%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1
    },
    useraName: {
        width: "80%"
    },
    loginBtn: {
        // flex:1,
        width: "80%",
        marginLeft: "10%",
        height: 50,
        position: "relative",
        top: 50,
        display: "flex",
        flexDirection: "column"
        // alignItems: "center"
    }
});
