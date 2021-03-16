import { createApp, h } from "vue";
import "./config";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "./styles/index.scss";
import routers from "./routers";
import directives from "./directives";
import plugins from "./plugins";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.h = h;

for (let el of directives) {
  const { name, func } = el;
  app.directive(name, func);
}

app.use(ElementPlus);
app.use(routers);
app.use(plugins);
app.use(store);
app.mount("#app");
