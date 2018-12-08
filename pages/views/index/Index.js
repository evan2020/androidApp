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
import { http } from "../../http/index";
import * as API from "../../http/api";
import * as Timer from "../../utils/timer";

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
                // {
                //     checked: `0`,
                //     classIfy: `综合`,
                //     createTime: 1543732829000,
                //     id: 28,
                //     isRemind: "0",
                //     isRepeat: "0",
                //     itemName: `情人节`,
                //     modifyTime: 1543732829000,
                //     openId: "oBoHi5NGVpXF4LKHJ8UT-sOY_n8U",
                //     targetDate: `2019-02-14`,
                //     leftText: `圣诞`,
                //     rightDate: `1`,
                //     rightUnit: `天`,
                //     IntervalTime: 2
                // }
            ]
        };
        // 获取导航
        navigation = this.props.navigation;
    }

    componentDidMount() {
        let that = this;
        console.log(`开始挂载首页`);
        that.getAllCard();
    }

    componentWillUnmount() {}

    // 获取当前用户所有的卡片
    getAllCard() {
        let that = this;
        http({
            method: "get",
            url: API.findAllCard,
            params: {
                openId: `oBoHi5NGVpXF4LKHJ8UT-sOY_n8U`
            },
            customErr: true
        }).then(res => {
            console.log(`请求结果 >>>>>>>>>>>>>`, res);
            let cardListData = res.data.map((item, index) => {
                let IntervalTime = Timer.timeStamp(item.targetDate);
                let date = new Date(item.targetDate);
                let timeStamp = date.getTime();
                let week = date.getDay();
                let nowDate = new Date();
                let nowDay = nowDate.getDay();
                let nowTimeStamp = nowDate.getTime();
                if (week !== nowDay && nowTimeStamp < timeStamp) {
                    IntervalTime += 1;
                }
                console.log(timeStamp);
                let itemOne = {
                    timeStamp: timeStamp, // 时间戳
                    id: item.id, // 卡片id
                    itemName: item.itemName, // 目标名称
                    IntervalTime: IntervalTime + `` // 间隔时间
                };
                return itemOne;
            });
            cardListData.sort(Timer.sortBy("timeStamp"));
            console.log(`cardListData >>>>>>>>>`, cardListData);
            that.setState({
                listData: cardListData
            });
        });
    }

    linkToAdd() {
        Alert.alert("add");
        // 导航到添加轮播图页面
        navigation.navigate("AddBanner");
    }

    render() {
        return (
            <View style={styles.indexCom}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={this.linkToAdd}>
                        <Image
                            style={styles.logo}
                            source={require("../../static/images/mine/clock2.png")}
                        />
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.listData}
                        // 设置key值
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
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
                            {this.props.listOneData.itemName}
                        </Text>
                    </View>
                    <View style={styles.listOneRight}>
                        <View style={styles.listOneRightDate}>
                            <Text style={styles.listOneRightDateText}>
                                {this.props.listOneData.IntervalTime.toString()}
                            </Text>
                        </View>
                        <View style={styles.listOneRightUnit}>
                            <Text style={styles.listOneRightUnitText}>天</Text>
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
