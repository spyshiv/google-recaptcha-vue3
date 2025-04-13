<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  siteKey: String,
  version: {
    type: String,
    validator: (val) => ["v2", "v3"].includes(val),
    required: true
  },
  action: String, // for v3
  hl: String
});

const emit = defineEmits(["verify", "expired", "error"]);

const recaptchaId = ref(null);
const widgetId = `g-recaptcha-${Math.random().toString(36).substring(2, 9)}`;

function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) return resolve();

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad&hl=${
      props.hl || "en"
    }`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.onRecaptchaLoad = () => resolve();
    script.onerror = () => reject("Failed to load reCAPTCHA script.");
  });
}

function renderV2() {
  if (!window.grecaptcha) return;

  recaptchaId.value = window.grecaptcha.render(widgetId, {
    sitekey: props.siteKey,
    callback: (token) => emit("verify", token),
    "expired-callback": () => emit("expired"),
    "error-callback": () => emit("error", "reCAPTCHA error")
  });
}

async function executeV3() {
  if (!window.grecaptcha) return;
  await window.grecaptcha.ready(() => {
    window.grecaptcha
      .execute(props.siteKey, { action: props.action || "submit" })
      .then((token) => emit("verify", token))
      .catch((err) => emit("error", err));
  });
}

onMounted(async () => {
  try {
    await loadRecaptchaScript();
    if (props.version === "v2") {
      renderV2();
    } else {
      await executeV3();
    }
  } catch (err) {
    emit("error", String(err));
  }
});

onBeforeUnmount(() => {
  if (
    props.version === "v2" &&
    recaptchaId.value !== null &&
    window.grecaptcha
  ) {
    try {
      window.grecaptcha.reset(recaptchaId.value);
    } catch (e) {
      // ignore
    }
  }
});
</script>

<template>
  <div v-if="props.version === 'v2'" :id="widgetId"></div>
</template>
