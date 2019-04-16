import axios from "axios";
import qs from "qs";
const VERSION = "1.0.0";
//进度条配置
// axios.defaults.timeout = 7000; //超时时间 request拦截器
// axios.defaults.baseURL = '/api';
// axios.defaults.headers.common['version'] = VERSION; //头部公共参数

// 引入组件
import { ActivityIndicator } from "react-native";

let hidesWhenStopped = false;

// request拦截器
axios.interceptors.request.use(
    config => {
        config.data = qs.stringify(config.data);
        console.log(`加载中 >>>>>>>>>>>>`);
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// respone拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export const http = function({
    method,
    url,
    params,
    customErr = false //是否自定义错误处理
}) {
    return new Promise((resolve, reject) => {
        axios({
            headers: {
                // 把token放在http头部(从本地储存储取token)
                // token: sessionStorage.getItem('token') || ''
            },
            method: method,
            url: url,
            [method === "post" ? "data" : "params"]: params
        })
            .then(
                response => {
                    if (!customErr) {
                        if (response.data.code === 0) {
                            resolve(response.data.data);
                        } else {
                            console.log(`error >>>>>>>>>>>>`);
                        }
                    } else {
                        resolve(response.data);
                    }
                },
                error => {
                    console.log(`error >>>>>>>>>>>>`, error);
                    reject(error);
                }
            )
            .catch(error => {
                console.log(`error >>>>>>>>>>>>`, error);
                reject(error);
            });
    });
};
