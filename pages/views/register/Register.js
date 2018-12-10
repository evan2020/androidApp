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
    Alert,
    AsyncStorage,
    DeviceEventEmitter,
    ActivityIndicator,
    Modal
} from "react-native";

import * as Reg from "../../utils/reg";

// 存储服务
AV = require("leancloud-storage");
let { Query, User } = AV;

// 当前页面全局变量(为了设置导航)
let navigation = null;

let globalData = {};

// 模块
export class Register extends React.Component {
    // 设置标题栏
    static navigationOptions = ({ navigation }) => {
        return {
            title: "register",
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
            isLinkToLogin: false, // 点击跳转登录连续事件开关
            isRegister: false, // 点击注册连续事件开关
            userName: ``,
            password: ``
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {
        console.log(`注册页面开始挂载 >>>>>>>>>>>>>`);
        try {
            AV.init(
                "GE6fChi0RfeFqDSniofwlSSj-gzGzoHsz",
                "jci4BNtk6BTBJyhUGWk9qyci"
            );
        } catch (error) {
            console.log(`初始化error >>>>>>>>`, error);
        }
    }

    componentWillUnmount() {
        console.log(`注册页面离开 >>>>>>>>>>>>>`);
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

    register() {
        let that = this;
        if (that.state.isRegister) {
            console.log(`请等待一秒后再次点击 >>>>>>>>>>>>`);
            return false;
        }
        that.setState(
            {
                isRegister: true
            },
            () => {
                setTimeout(() => {
                    that.setState({
                        isRegister: false
                    });
                }, 1000);
                that.reg().then(
                    () => {
                        console.log(`register`, this.state);
                        // 新建 AVUser 对象实例
                        let user = new AV.User();
                        // 设置用户名
                        user.setUsername(this.state.userName);
                        // 设置密码
                        user.setPassword(this.state.password);
                        // 设置邮箱
                        // user.setEmail('tom@leancloud.cn');
                        user.signUp().then(
                            async function(loggedInUser) {
                                // 导航到首页页面
                                navigation.navigate("IndexCom");
                                console.log(
                                    `注册成功 >>>>>>>>>>`,
                                    loggedInUser
                                );
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
                                } catch (error) {
                                    // Error saving data
                                    console.log(`保存失败`, error);
                                }
                                Alert.alert(`注册成功`);
                            },
                            function(error) {
                                console.log(`注册失败 >>>>>>>>>`, error);
                                Alert.alert(`注册失败${error}`);
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
            <View style={styles.register}>
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

                <View style={styles.registerBtn}>
                    <Button
                        style={{ width: "100%" }}
                        onPress={() => {
                            let that = this;
                            this.register();
                        }}
                        title="注册"
                        accessibilityLabel="register"
                    />
                </View>

                <View style={styles.registerBtn}>
                    <Button
                        style={{ width: "100%" }}
                        onPress={() => {
                            let that = this;
                            console.log(`跳转登录`);
                            if (that.state.isLinkToLogin) {
                                console.log(`请等待1s后再次点击 >>>>>>>>>`);
                                return false;
                            }
                            that.setState(
                                {
                                    isLinkToLogin: true
                                },
                                () => {
                                    setTimeout(() => {
                                        that.setState({
                                            isLinkToLogin: false
                                        });
                                    }, 1000);
                                    // 导航到登录页面
                                    navigation.push("Login");
                                }
                            );
                        }}
                        title="跳转登录"
                        accessibilityLabel="register"
                    />
                </View>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    register: {
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
    registerBtn: {
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
