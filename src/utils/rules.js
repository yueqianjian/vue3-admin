/**
 * 表单验证
 * Positive正数，后缀有_P的均为必须是正数
 * 0_x9 表示为 0至x个9，eg:0_29 0至99
 */
const rules = {
  req(message = "不能为空") {
    return {
      required: true,
      trigger: ["blur", "change"],
      message,
    };
  },
  num: {
    message: "必须为数字",
    pattern: /^(-?\d+)(\.\d+)?$/,
    trigger: "blur",
  },
  num_p: {
    message: "必须为正数",
    pattern: /^\d*(\.\d*)?$/,
    trigger: "blur",
  },
  int: {
    message: "必须为整数",
    pattern: /^\d*(\.\d*)?$/,
    trigger: "blur",
  },
  int_p: {
    message: "必须为正整数",
    pattern: /^[1-9]\d*$/,
    trigger: "blur",
  },
  tel: {
    pattern: /^1\d{10}$/,
    message: "目前只支持中国大陆的手机号码",
    trigger: "blur",
  },
  phone: {
    pattern: /^\d{3}-\d{8}|^\d{4}-\d{7}|^1\d{10}$/,
    message: "输入正确手机或座机号码",
    trigger: "blur",
  },
  int0_29: {
    message: "范围0-99整数",
    pattern: /^\d{0,2}$/,
    trigger: "blur",
  },
  vcode: {
    message: "请输入6位验证码",
    pattern: /^\d{6}$/,
    trigger: "blur",
  },
  pwd: {
    message: "密码格式为6-16个字母、数字、下划线",
    pattern: /^(\w){6,16}$/,
    trigger: "blur",
  },
  // 密码强度3，8-16位同时包含大写、小写、数字、特殊字符!@#$%^&*?
  password3: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,16}/,
  // 密码强度2，8-16位同时包含大写、小写、数字
  password2: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
  // 密码强度1，必须包含字母和数字，6-16位
  password1: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
  email: {
    message: "Email格式有误",
    pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    trigger: "blur",
  },
  idNum: {
    message: "身份证号格式有误",
    pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    trigger: "blur",
  },
  bankNum: {
    message: "银行卡号格式有误",
    pattern: /^([1-9]{1})([\d\s]{14,24})$/,
    trigger: "blur",
  },
};

export default rules;
