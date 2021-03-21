// 成功状态码
const SUCCESS_CODE = 200;

// 请求超时时间
const TIME_OUT = 25 * 1000;

// 服务器地址
const DEV_URL = "http://localhost:7777";
const PROD_URL = "http://localhost:7777";
const BASE_URL = location.hostname == "localhost" ? DEV_URL : PROD_URL;

// 请求Loading时间，请求时间小于该时间，则loading不显示
const LOADING_TIME = 100;

export { BASE_URL, SUCCESS_CODE, TIME_OUT, LOADING_TIME };
