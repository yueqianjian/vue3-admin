// 成功状态码
const SUCCESS_CODE = 200;

// 请求超时时间
const TIME_OUT = 25 * 1000;

// 服务器地址
const DEV_URL = "http://localhost:7777";
const PROD_URL = "http://localhost:7777";
const BASE_URL = location.hostname == "localhost" ? DEV_URL : PROD_URL;

export { BASE_URL, SUCCESS_CODE, TIME_OUT };
