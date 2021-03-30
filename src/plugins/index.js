import { h } from "vue";
import directives from "../directives";
import api from "../api/index.js";
import rules from "../utils/rules";
import { copy } from "../utils/tools";

const plugins = {
  install(app, options) {
    // 全局注册;
    app.config.globalProperties.$api = api;
    app.config.globalProperties.$rules = rules;
    app.config.globalProperties.$h = h;
    app.config.globalProperties.$copy = copy;
    // 自定义标签
    for (let el of directives) {
      const { name, func } = el;
      app.directive(name, func);
    }
    app.provide("user", "options");
    app.provide("user2", "options2");
    app.mixin({
      created() {
        // console.log("~~~~~~");
      },
    });
  },
};

export default plugins;
