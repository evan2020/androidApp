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
    SectionList,
    TouchableOpacity,
    Alert,
    TextInput,
    DatePickerAndroid,
    DeviceEventEmitter
} from "react-native";

import { http } from "../../../http/index";
import * as API from "../../../http/api";
import * as Timer from "../../../utils/timer";

// 当前页面全局变量(为了设置导航)
let navigation = null;

// 全局变量
let globalData = {
    itemName: ``,
    targetDate: `2019-01-01`,
    id: 0
};

// 设置首页组件
export class EditBanner extends React.Component {
    // 设置标题栏
    static navigationOptions = {
        title: "添加banner",
        headerStyle: {
            backgroundColor: "#eee",
            display: "none"
        },
        headerTintColor: "#999",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {
        console.log(`编辑页面挂载时 >>>>>>>>>`);
        globalData.id = navigation.getParam("id", 0);
    }

    componentWillUnmount() {
        console.log(`编辑页面离开时 >>>>>>>>>>>>>>>>>`);
        DeviceEventEmitter.emit("IndexCom", "发送了个通知");
    }

    // 保存卡片
    saveCard() {
        let that = this;
        console.log(`globalData >>>>>>`, globalData);
        http({
            method: "get",
            url: API.editCard,
            params: {
                id: globalData.id,
                itemName: globalData.itemName,
                targetDate: globalData.targetDate
            },
            customErr: true
        }).then(res => {
            console.log(`请求结果 >>>>>>>>>>>>>`, res);
            if (res.code === 0) {
                // 导航到首页页面
                navigation.navigate("IndexCom");
            } else {
                Alert.alert(res.mag);
            }
        });
    }

    deleteCard() {
        let that = this;
        console.log(`globalData >>>>>>`, globalData);
        http({
            method: "get",
            url: API.delCard,
            params: {
                cardId: globalData.id
            },
            customErr: true
        }).then(res => {
            console.log(`请求结果 >>>>>>>>>>>>>`, res);
            if (res.code === 0) {
                // 导航到首页页面
                navigation.navigate("IndexCom");
            } else {
                Alert.alert(res.mag);
            }
        });
    }

    render() {
        return (
            <View style={styles.EditBanner}>
                <InputItemName />
                <TargetDate />
                <View
                    style={{
                        marginTop: 30,
                        width: "100%",
                        height: 30
                    }}
                >
                    <Button
                        onPress={this.saveCard}
                        title="编辑"
                        color="#5ED4FF"
                        accessibilityLabel="Learn more about this purple button"
                        style={styles.save}
                    />
                </View>
                <View
                    style={{
                        marginTop: 30,
                        width: "100%",
                        height: 30,
                        // backgroundColor: `red`
                    }}
                >
                    <Button
                        onPress={this.deleteCard}
                        title="删除"
                        color="#FF7286"
                        accessibilityLabel="Learn more about this purple button"
                        style={styles.delete}
                    />
                </View>
            </View>
        );
    }
}
// 事件名称
class InputItemName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: ``
        };
    }
    componentDidMount() {
        console.log(`初始化输入框 >>>>>>>>>>>>>>>`);
        globalData.itemName = navigation.getParam("itemName", "");

        console.log(`获取到的itemName >>>>>>>>>`, globalData.itemName);
        this.setState({
            itemName: globalData.itemName
        });
    }
    changeText(text) {
        console.log(text);
        this.setState({
            itemName: text
        });
        globalData.itemName = text;
    }
    render() {
        return (
            <View style={styles.navigationOne}>
                {/* 左侧图标 */}
                <Image
                    style={styles.leftIcon}
                    source={require("../../../static/images/mine/mine.png")}
                />
                <TextInput
                    style={styles.centerTitle}
                    value={this.state.itemName}
                    onChangeText={text => {
                        this.changeText(text);
                    }}
                />
            </View>
        );
    }
}

// 目标日期
class TargetDate extends React.Component {
    // static open({

    // })
    constructor(props) {
        super(props);
        this.state = {
            targetDate: `请选择日期`
        };
    }

    componentDidMount() {
        globalData.targetDate = navigation.getParam("targetDate", "请输入日期");
        this.setState({
            targetDate: globalData.targetDate
        });
    }
    openDate() {
        let that = this;
        try {
            const { action } = DatePickerAndroid.open({
                // 要设置默认值为今天的话，使用`new Date()`即可
                date: new Date()
            }).then(({ year, month, day }) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                    console.log(year + "-" + (month + 1) + "-" + day);
                    this.setState({
                        targetDate: year + "-" + (month + 1) + "-" + day
                    });
                    globalData.targetDate =
                        year + "-" + (month + 1) + "-" + day;
                }
            });
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }
    }

    render() {
        return (
            <View style={styles.navigationOne}>
                {/* 左侧图标 */}
                <Image
                    style={styles.leftIcon}
                    source={require("../../../static/images/mine/mine.png")}
                />
                <Text
                    style={styles.TargetDateText}
                    onPress={this.openDate.bind(this)}
                >
                    {this.state.targetDate}
                </Text>
            </View>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    EditBanner: {
        // flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
        paddingTop: 100
        // justifyContent: "center"
    },
    navigationOne: {
        marginTop: 20,
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative"
    },
    leftIcon: {
        width: 30,
        height: 30
    },
    centerTitle: {
        width: "70%",
        position: "absolute",
        left: 50,
        fontSize: 20,
        color: "#666",
        borderWidth: 1,
        borderColor: "#eee"
    },
    TargetDateText: {
        width: "70%",
        position: "absolute",
        left: 50,
        fontSize: 20,
        color: "#666"
    },
    arrowRight: {
        width: 30,
        height: 30
    },
    save: {
        // color: "#5ED4FF"
    },
    delete: {
        marginTop: 10,
        // color: "#FF7286",
        // backgroundColor: "red"
    }
});
