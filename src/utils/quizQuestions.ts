interface QuestionsType {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const QUESTIONS: QuestionsType[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris"],
    correctAnswer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    correctAnswer: "4"
  },
  {
    question: "In Vue 3, what is the new composition API used for?",
    options: ["Managing server-side routes", "Handling HTTP requests", "Managing state and logic in components"],
    correctAnswer: "Managing state and logic in components"
  },
  {
    question: "What is the root component in a Vue 3 application?",
    options: ["main.js", "App.vue", "index.html"],
    correctAnswer: "App.vue"
  },
  {
    question: "In Vue 3, how can you create a reactive data property in a component?",
    options: [
      "Using the `ref` function from Vue composition API",
      "Using the `reactive` function from Vue composition API",
      "Using the `data` option in the component's options object"
    ],
    correctAnswer: "Using the `ref` function from Vue composition API"
  },
  {
    question: "What is the purpose of the v-bind directive in Vue 3 templates?",
    options: [
      "To bind data to an element's attribute",
      "To create a custom directive",
      "To bind a component method to a DOM event"
    ],
    correctAnswer: "To bind a component method to a DOM event"
  }
];
