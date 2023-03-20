import { createApp } from "vue";
import "./style.css";
import "flowbite/dist/flowbite.min.js";
import App from "./App.vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { useStore } from "./stores/store.js";
import { createPinia } from "pinia";

import router from "./router.js";
const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 3,
    newestOnTop: true,
  })
  .mount("#app");
