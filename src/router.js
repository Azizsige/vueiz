import Home from "./views/Home.vue";
import Quiz from "./views/Quiz.vue";
import StartQuiz from "./views/StartQuiz.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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

export default router;
