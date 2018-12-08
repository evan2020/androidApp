// 计算间隔天
export let timeStamp = (time) => {
    let that = this;
    let date = new Date(time);
    let timeStamp = date.getTime();
    let nowDate = new Date();
    let nowTimeStamp = nowDate.getTime();
    console.log(`timeStamp >>>>>>`, timeStamp, timeStamp - nowTimeStamp);
    let days = parseInt((timeStamp - nowTimeStamp) / (1000 * 60 * 60 * 24));
    console.log(`days >>>>>>`, days, timeStamp - nowTimeStamp);
    return days;
}

// 根据数组中的json某属性排序,第一个参数为属性名称,第二个参数为布尔值,true为升序,false为降序
export let sortBy = (attr, rev) => {
    //第二个参数没有传递 默认升序排列
    if (rev == undefined) {
        rev = 1;
    } else {
        rev = rev ? 1 : -1;
    }

    return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    };
}