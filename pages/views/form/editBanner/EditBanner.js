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
    DatePickerAndroid
} from "react-native";

// 当前页面全局变量(为了设置导航)
let navigation = null;

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

    componentDidMount() {}

    componentWillUnmount() {}

    save() {
        Alert.alert("edit");
        // 导航到首页页面
        navigation.navigate("IndexCom");
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
                        onPress={this.save}
                        title="编辑"
                        accessibilityLabel="Learn more about this purple button"
                        style={styles.save}
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
        this.state = {};
    }
    render() {
        return (
            <View style={styles.navigationOne}>
                {/* 左侧图标 */}
                <Image
                    style={styles.leftIcon}
                    source={require("../../../static/images/mine/mine.png")}
                />
                <TextInput style={styles.centerTitle} />
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
                }
            });
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }
    }

    componentDidMount() {
        // this.changeVal()
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
        color: "#5ED4FF"
    }
});
