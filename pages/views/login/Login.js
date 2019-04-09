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
    Image,
    AsyncStorage,
    DeviceEventEmitter,
    Alert,
    ActivityIndicator
} from "react-native";

import * as Reg from "../../utils/reg";

import * as Key from "../../config/key";

// 存储服务
AV = require("leancloud-storage");
let { Query, User } = AV;

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
            isLinkToReg: false, // 点击跳转注册按钮连续事件开关
            isLogin: false, // 点击登录连续事件开关
            openId: ``,
            userName: ``,
            password: ``
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {
        console.log(`登录页面开始挂载 >>>>>>>>>>>>>`);
        try {
            AV.init(Key.lcAppID, Key.lcAppKey);
        } catch (error) {
            console.log(`初始化error >>>>>>>>`, error);
        }
    }

    componentWillUnmount() {
        console.log(`登录页面离开 >>>>>>>>>>>>>`);
    }

    // 注册正则校验
    reg() {
        let that = this;
        return new Promise((resolve, reject) => {
            if (this.state.userName === ``) {
                Alert.alert(`用户名不能为空`);
            } else if (this.state.password === ``) {
                Alert.alert(`密码不能为空`);
            } else {
                if (!Reg.passwordReg.test(this.state.password)) {
                    Alert.alert(`请输入6到20位数字和英文字母`);
                } else {
                    resolve();
                }
            }
        });
    }

    login() {
        let that = this;
        if (that.state.isLogin) {
            console.log(`请等待1s后再次点击 >>>>>>>>>>`);
            return false;
        }
        that.setState(
            {
                isLogin: true
            },
            () => {
                setTimeout(() => {
                    that.setState({
                        isLogin: false
                    });
                }, 1000);
                console.log(`login`, that.state);
                that.reg().then(
                    () => {
                        AV.User.logIn(
                            that.state.userName + ``,
                            that.state.password + ``
                        ).then(
                            async function(loggedInUser) {
                                console.log(`登录成功 >>>>>>>`, loggedInUser);
                                try {
                                    await AsyncStorage.setItem(
                                        "openId",
                                        loggedInUser.id
                                    );
                                    console.log(`保存成功 >>>>>>>>>>`);
                                    DeviceEventEmitter.emit(
                                        "getOpenId",
                                        loggedInUser.id
                                    );
                                    // 导航到注册页面
                                    navigation.push("IndexCom");
                                } catch (error) {
                                    // Error saving data
                                    console.log(`保存失败`, error);
                                }
                            },
                            function(error) {
                                console.log(`登录失败 >>>>>>>`, error);
                                Alert.alert(`登录失败${error}`);
                            }
                        );
                    },
                    () => {
                        Alert.alert(`未知错误`);
                    }
                );
            }
        );
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
                        onPress={() => {
                            this.login();
                        }}
                        title="登录"
                        accessibilityLabel="login"
                    />
                </View>
                <View style={styles.loginBtn}>
                    <Button
                        style={{ width: "100%" }}
                        onPress={() => {
                            let that = this;
                            if (that.state.isLinkToReg) {
                                console.log(
                                    `请等待1s后再次操作 >>>>>>>>>>>>>>`
                                );
                                return false;
                            }
                            that.setState(
                                {
                                    isLinkToReg: true
                                },
                                () => {
                                    setTimeout(() => {
                                        that.setState({
                                            isLinkToReg: false
                                        });
                                    }, 1000);
                                    // 导航到注册页面
                                    navigation.push("Register");
                                }
                            );
                        }}
                        title="跳转注册"
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
