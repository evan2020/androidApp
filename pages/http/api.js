// 测试环境
// let baseUrl = `http://192.168.0.104:8089/shalou/`

// 正式环境
let baseUrl = `https://serverJavaMysql.smallzhiyun.com/shalou/`;

// 添加卡片
export let addCard = `${baseUrl}timer/addCard`;

// 查询所有卡片
export let findAllCard = `${baseUrl}timer/findAllCard`;

// 编辑卡片
export let editCard = `${baseUrl}timer/editCard`;

// 删除卡片
export let delCard = `${baseUrl}timer/delCard`;

// 微信通过code获取access_token
export let getAccessToken = `https://api.weixin.qq.com/sns/oauth2/access_token`;
