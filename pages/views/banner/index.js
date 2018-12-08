import React from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-swiper";

var styles = {
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB"
    },
    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5"
    },
    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9"
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    },
    listOne: {
        width: "70%",
        height: "40%",
        backgroundColor: "pink"
    },
    listOneTop: {
        flex: 2,
        backgroundColor: "#89DEFF"
    },
    listOneCenter: {
        flex: 12,
        backgroundColor: "#fff"
    },
    listOneBottom: {
        flex: 2,
        backgroundColor: "#F5F9FF"
    }
};

export default () => (
    <Swiper style={styles.wrapper} showsButtons>
        <View style={styles.slide1}>
            <View style={styles.listOne}>
                <View style={styles.listOneTop} />
                <View style={styles.listOneCenter} />
                <View style={styles.listOneBottom} />
            </View>
        </View>
        <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
        </View>
    </Swiper>
);
