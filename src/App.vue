<template>
  <div class="app">
    <h2>Select reCAPTCHA Example</h2>
    <label for="exampleSelect">Choose Example:</label>
    <select id="exampleSelect" v-model="selectedExample">
      <option value="v2">reCAPTCHA v2</option>
      <option value="v3">reCAPTCHA v3</option>
    </select>

    <div v-if="selectedExample === 'v2'" class="container">
      <RecaptchaV2Example />
    </div>
    <div v-else-if="selectedExample === 'v3'" class="container">
      <RecaptchaV3Example />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RecaptchaV2Example from "./examples/RecaptchaV2Example.vue";
import RecaptchaV3Example from "./examples/RecaptchaV3Example.vue";

const selectedExample = ref("v3");
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

label {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

select {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #f9f9f9;
}

select:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>
