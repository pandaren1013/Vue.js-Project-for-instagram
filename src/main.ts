import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import "./styles/main.css";
import { httpUtil } from "@/util/http_util";
import type { AxiosError, AxiosResponse } from "axios";
import YoutubeIframe from "@techassi/vue-youtube-iframe";

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);

//Redirect if 500 Server Error occurs
httpUtil.interceptors.response.use(
  (response: AxiosResponse) => response,
  function (error: AxiosError) {
    if (error.response && error.response.status === 500) {
      return router.replace("/Error500");
    }
    return Promise.reject(error);
  }
);

app.mount("#app");
