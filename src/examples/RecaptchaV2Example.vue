<template>
  <div>
    <h3>reCAPTCHA v2 Example</h3>
    <p>
      This is an example of using reCAPTCHA v2 in a Vue 3 application. The
      reCAPTCHA challenge is triggered when the user Enter reCAPTCHA site key.
    </p>
    <label for="siteKeyInput">Enter reCAPTCHA Site Key:</label>
    <input
      id="siteKeyInput"
      v-model="recaptchaSiteKey"
      @change="refreshKey++"
      placeholder="Enter your site key"
    />
    <div :key="refreshKey">
      <GoogleRecaptchaVue3
        ref="recaptchaRef"
        version="v2"
        :siteKey="recaptchaSiteKey"
        @verify="onVerify"
        @error="onError"
      />
    </div>
    <div v-if="recaptchaToken">
      <h4>reCAPTCHA Token:</h4>
      <div class="token">
        <div>{{ recaptchaToken }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GoogleRecaptchaVue3 from "../components/Recaptcha.vue";

const recaptchaSiteKey = ref("Your reCAPTCHA Site Key");
const recaptchaRef = ref(null);
const refreshKey = ref(0);
const recaptchaToken = ref(null);

function onVerify(token) {
  recaptchaToken.value = token;
  console.log("Verified Token (v2):", token);
}

function onError(err) {
  console.error("reCAPTCHA v2 error:", err);
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

.token {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
