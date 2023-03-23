<script setup>
import { useStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
const store = useStore();
const { name, getQuiz, getCategoryName } = storeToRefs(store);

const dataQuizs = reactive({
  value: [],
});
const no = ref(dataQuizs.value.length);
const length = ref(0);
const answers = reactive({
  value: [],
});
const correctAnswer = ref("");
const noQuiz = ref(0);

const getChoose = (event) => {
  // let tag = event.target;
  console.log(event.target.dataset.answer);
  console.log(event.target);
};

const getAnswer = (answer) => {
  // let text = e.target.tagName;
  // console.log(event.target.tagName);
  if (answer == correctAnswer.value) {
    alert("correct");
  } else {
    alert("wrong");
  }
};

const getQuizs = async () => {
  console.log(store.name);
  await axios
    .get(
      `https://the-trivia-api.com/api/questions?categories=${
        store.nameEndpoint
      }&limit=5&difficulty=${store.difficultyStore.toLowerCase()}`
    )
    .then((results) => {
      dataQuizs.value = results.data[noQuiz.value];
      length.value = results.data.length;
      answers.value = results.data[noQuiz.value].incorrectAnswers;
      answers.value.push(results.data[noQuiz.value].correctAnswer);
      correctAnswer.value = results.data[noQuiz.value].correctAnswer;
      // console.log(dataQuizs.value.length);
      console.log(dataQuizs.value);
      console.log(answers.value);
    })
    .catch((errr) => {
      console.log(errr);
    });
};

const randomSortAnswer = () => {
  answers.value.sort(() => Math.random() - 0.5);
};

const nextAnswer = async () => {
  noQuiz.value++;
  console.log(noQuiz.value);
  if (noQuiz.value <= 4) {
    await getQuizs();
  } else {
    alert("udahhh");
  }
};

onMounted(async () => {
  await getQuizs();
  randomSortAnswer();
});
</script>
<template>
  <main class="flex-1 py-10 px-5 sm:px-10">
    <h1 class="text-3xl text-white text-center font-bold mb-8">
      {{ store.getCategoryName() }}
    </h1>
    <nav class="flex mb-16" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <router-link
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            to="/"
          >
            <svg
              aria-hidden="true"
              class="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              ></path>
            </svg>
            Home
          </router-link>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
              >{{ name }}</span
            >
          </div>
        </li>
      </ol>
    </nav>

    <section class="quiz">
      <div class="quiz-info">
        <span class="question font-bold"
          >{{ noQuiz + 1 }}. {{ dataQuizs.value.question }}</span
        >
      </div>

      <div
        class="options"
        v-for="(answer, index) in answers.value"
        :key="answer.id"
      >
        <label
          class="option"
          :id="index"
          :data-answer="answer"
          @click.prevent="getAnswer(answer)"
          @click="getChoose"
        >
          <input type="radio" />
          <span class="text-white">{{ answer }}</span>
        </label>
      </div>

      <div class="button flex w-full justify-end">
        <button class="" @click="nextAnswer">Next</button>
      </div>
    </section>
  </main>
</template>
<style scoped>
.quiz {
  background-color: #382a4b;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
}

.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
}

.quiz-info.score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}
</style>
