import Content from "./views/Content.vue";
import Quiz from "./views/Quiz.vue";
import StartQuiz from "./views/StartQuiz.vue";
import { useStore } from "./stores/store.js";
import { useToast } from "vue-toastification";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Content",
    component: Content,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz,
  },
  {
    path: "/start-quiz",
    name: "StartQuiz",
    component: StartQuiz,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  // Get toast interface
  const toast = useToast();
  if (to.name === "StartQuiz" && store.difficultyStore === "") {
    // alert("Please select a difficulty level");
    toast.error("Please select a difficulty level!", {
      position: "top-right",
      timeout: 1500,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
    next({ name: "Content" });
  } else {
    next();
  }
});

export default router;
