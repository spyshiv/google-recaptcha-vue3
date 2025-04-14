<template>
  <h3>Vue 3 reCAPTCHA v3 Example</h3>
  <p>
    This is an example of using reCAPTCHA v3 in a Vue 3 application. The
    reCAPTCHA challenge is invisible and will be triggered when the user clicks
    the button below.
  </p>
  <div>
    <label for="siteKeyInput">Enter reCAPTCHA Site Key:</label>
    <input
      id="siteKeyInput"
      v-model="recaptchaSiteKey"
      placeholder="Enter your site key"
    />
  </div>
  <GoogleRecaptcha
    ref="recaptchaRef"
    :siteKey="recaptchaSiteKey"
    @verify="handleToken"
    @error="handleError"
  />
  <button :disabled="!recaptchaSiteKey" @click="submitForm()">
    Generate reCAPTCHA Token
  </button>
  <p>Click the button to invoke the reCAPTCHA v3 challenge.</p>
  <div v-if="recaptchaToken">
    <h4>reCAPTCHA Token:</h4>
    <div class="token">
      <div>{{ recaptchaToken }}</div>
    </div>
  </div>
  <div v-if="recaptchaError">
    <h4>reCAPTCHA Error:</h4>
    <div>{{ recaptchaError }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GoogleRecaptcha from "../components/Recaptcha.vue";

const recaptchaRef = ref(null);
const recaptchaToken = ref(null);
const recaptchaError = ref(null);
const recaptchaSiteKey = ref("");

function handleToken(token) {
  recaptchaToken.value = token;
  console.log("reCAPTCHA Token:", token);
  // Optionally send the `token` to your server for verification
}

function handleError(err) {
  recaptchaError.value = err;
  console.error("reCAPTCHA Error:", err);
}

function submitForm() {
  if (recaptchaRef.value) {
    recaptchaRef.value.execute();
  } else {
    alert("The reCAPTCHA component is not yet initialized.");
    console.warn("reCAPTCHA component ref is not available.");
  }
}
</script>
<style scoped>
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

input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

input:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
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

button:hover:enabled {
  background-color: #1b5e20;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
