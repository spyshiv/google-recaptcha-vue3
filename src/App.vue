<template>
  <div>
    <h3>Select reCAPTCHA Example</h3>
    <label for="exampleSelect">Choose Example:</label>
    <select id="exampleSelect" v-model="selectedExample">
      <option value="v2">reCAPTCHA v2</option>
      <option value="v3">reCAPTCHA v3</option>
    </select>

    <div v-if="selectedExample === 'v2'">
      <RecaptchaV2Example />
    </div>
    <div v-else-if="selectedExample === 'v3'">
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
select {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
