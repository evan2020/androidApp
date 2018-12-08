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
    Alert
} from "react-native";
// 引入tabbar组件
import { TabBarCom } from "../components/tabbar/TabBar";

// 当前页面全局变量(为了设置导航)
let navigation = null;

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
    constructor(props) {
        super(props);
        this.state = {
            listData: [
                {
                    leftText: `圣诞`,
                    rightDate: `17`,
                    rightUnit: `天`
                },
                {
                    leftText: `元旦`,
                    rightDate: `17`,
                    rightUnit: `天`
                },
                {
                    leftText: `春节`,
                    rightDate: `17`,
                    rightUnit: `天`
                },
                {
                    leftText: `情人节`,
                    rightDate: `17`,
                    rightUnit: `天`
                }
            ]
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <View style={styles.indexCom}>
                <View style={styles.content}>
                    <Image
                        style={styles.logo}
                        source={require("../../static/images/mine/clock2.png")}
                    />
                    <FlatList
                        data={this.state.listData}
                        // 设置key值
                        keyExtractor={item => item.rightDate}
                        renderItem={({ item }) => (
                            <ListOne
                                listOneData={item}
                                navigation={navigation}
                            />
                        )}
                    />
                </View>
                {/* 引入tabbar组件,把导航事件传递给子组件 */}
                <TabBarCom navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

// 设置单个列表样式
class ListOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    showBanner() {
        // 导航到轮播图页面
        navigation.navigate("BannerCom");
    }
    render() {
        return (
            <TouchableOpacity onPress={this.showBanner}>
                <View style={styles.listOne}>
                    <View style={styles.listOneLef}>
                        <Text style={styles.listOneLeftText}>
                            {this.props.listOneData.leftText}
                        </Text>
                    </View>
                    <View style={styles.listOneRight}>
                        <View style={styles.listOneRightDate}>
                            <Text style={styles.listOneRightDateText}>
                                {this.props.listOneData.rightDate}
                            </Text>
                        </View>
                        <View style={styles.listOneRightUnit}>
                            <Text style={styles.listOneRightUnitText}>
                                {this.props.listOneData.rightUnit}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

// 定义样式
const styles = StyleSheet.create({
    indexCom: {
        width: "100%",
        flex: 1,
        alignItems: "center"
    },
    content: {
        width: "90%",
        height: "70%",
        marginTop: 50,
        // backgroundColor: "pink",
        borderWidth: 1,
        borderColor: "#eee",
        paddingLeft: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    logo: {
        width: 50,
        height: 50,
        position: "relative",
        top: -25
    },
    listOne: {
        width: "100%",
        height: 40,
        marginTop: 5,
        // backgroundColor: "#eee",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        borderLeftWidth: 1,
        borderLeftColor: "#eee"
    },
    listOneLef: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // flex: 7,
        width: "70%"
    },
    listOneLeftText: {
        position: "relative",
        left: 20,
        fontSize: 15
    },
    listOneRight: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "pink",
        // flex: 3,
        width: "30%",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    listOneRightDate: {
        height: "100%",
        // flex: 2,
        width: "66%",
        backgroundColor: "#89DEFF",

        fontSize: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
        // borderBottomWidth: 1,
        // borderBottomColor: "yellow"
    },
    listOneRightDateText: {
        flex: 1,
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    listOneRightUnit: {
        height: "100%",
        // flex: 1,
        width: "34%",
        backgroundColor: "#5CE89B",
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
        // borderBottomWidth: 1,
        // borderBottomColor: "red"
    },
    listOneRightUnitText: {
        flex: 1,
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});
