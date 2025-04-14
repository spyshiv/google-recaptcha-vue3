<template>
  <div>
    <h3>reCAPTCHA v2 Example</h3>
    <label for="siteKeyInput">Enter reCAPTCHA Site Key:</label>
    <input
      id="siteKeyInput"
      v-model="recaptchaSiteKey"
      placeholder="Enter your site key"
    />

    <Recaptcha
      ref="recaptchaRef"
      version="v2"
      :siteKey="recaptchaSiteKey"
      :autoLoad="false"
      @verify="onVerify"
      @error="onError"
    />

    <button :disabled="!recaptchaSiteKey" @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Recaptcha from "../components/Recaptcha.vue";

const recaptchaSiteKey = ref("");
const recaptchaRef = ref(null);

function onVerify(token) {
  console.log("Verified Token (v2):", token);
}

function onError(err) {
  console.error("reCAPTCHA v2 error:", err);
}

function submitForm() {
  recaptchaRef.value.execute();
  console.log("Form submitted with site key (v2):", recaptchaSiteKey.value);
}
</script>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

button {
  background-color: #2e7d32;
  color: white;
  padding: 8px 12px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
