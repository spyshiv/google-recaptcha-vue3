<script setup>
const props = defineProps({
  siteKey: { type: String, required: true },
  action: { type: String, default: "submit" },
  hl: { type: String, default: "en" }
});

const emit = defineEmits(["verify", "error"]);

function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) return resolve();
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${props.siteKey}&hl=${props.hl}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load reCAPTCHA v3 script.");
    document.head.appendChild(script);
  });
}

async function executeRecaptcha() {
  try {
    await loadRecaptchaScript();
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(props.siteKey, { action: props.action })
        .then((token) => emit("verify", token))
        .catch((err) => emit("error", err));
    });
  } catch (err) {
    emit("error", err);
  }
}

defineExpose({
  execute: executeRecaptcha
});
</script>
