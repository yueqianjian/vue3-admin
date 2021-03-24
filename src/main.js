import { createApp } from "vue";
import "./config";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "./styles/index.scss";
import { router } from "./routers";
import plugins from "./plugins";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(plugins);
app.use(store);
app.mount("#app");
