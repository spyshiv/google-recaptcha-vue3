<template>
  <div>
    <div id="recaptcha-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps({
  siteKey: { type: String, required: true },
  action: { type: String, default: "submit" }, // only for v3
  hl: { type: String, default: "en" },
  version: { type: String, default: "v3" }, // Added version prop
  autoLoad: { type: Boolean, default: true } // only for version: v2
});

const emit = defineEmits(["verify", "error", "expired"]);

function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) return resolve();
    const script = document.createElement("script");
    script.src =
      props.version === "v2"
        ? `https://www.google.com/recaptcha/api.js?hl=${props.hl}`
        : `https://www.google.com/recaptcha/api.js?render=${props.siteKey}&hl=${props.hl}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load reCAPTCHA script.");
    document.head.appendChild(script);
  });
}

function renderV2() {
  if (!window.grecaptcha) {
    emit("error", "reCAPTCHA library not loaded.");
    return;
  }
  try {
    window.grecaptcha.render("recaptcha-container", {
      sitekey: props.siteKey,
      callback: (token) => emit("verify", token),
      "expired-callback": () => emit("expired"),
      "error-callback": (error) =>
        emit("error", error || "Unknown reCAPTCHA v2 error")
    });
  } catch (err) {
    emit("error", `Error during reCAPTCHA v2 rendering: ${err.message}`);
  }
}

async function executeRecaptcha() {
  try {
    await loadRecaptchaScript();
    if (props.version === "v2") {
      renderV2();
    } else {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(props.siteKey, { action: props.action })
          .then((token) => emit("verify", token))
          .catch((err) => emit("error", err));
      });
    }
  } catch (err) {
    emit("error", err);
  }
}

defineExpose({
  execute: executeRecaptcha
});

onMounted(async () => {
  if (props.version === "v2" && props.autoLoad) {
    await loadRecaptchaScript();
    renderV2();
  }
});
</script>
