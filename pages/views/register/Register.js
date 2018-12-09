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
    Alert
} from "react-native";

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
            userName: ``,
            password: ``
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {
        console.log(`注册页面开始挂载 >>>>>>>>>>>>>`);
        AV.init("GE6fChi0RfeFqDSniofwlSSj-gzGzoHsz", "jci4BNtk6BTBJyhUGWk9qyci");
    }

    componentWillUnmount() {}

    register() {
        let that = this;
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
            function(loggedInUser) {
                console.log(`注册成功 >>>>>>>>>>`, loggedInUser);
                Alert.alert(`注册成功`);
            },
            function(error) {
                console.log(`注册失败 >>>>>>>>>`, error);
                Alert.alert(`注册失败`);
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
                            this.register();
                        }}
                        title="注册"
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
