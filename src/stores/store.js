import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    name: "",
    nameEndpoint: "",
    difficultyStore: "",
  }),
  actions: {
    getCategoryName() {
      return this.name;
      // console.log(this.name);
    },
    // getName
  },
});
