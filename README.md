# 🛡️ Google reCAPTCHA Vue3

Effortlessly integrate Google reCAPTCHA **v3 (invisible)** and **v2 (checkbox)** into your Vue 3 applications with this lightweight and efficient plugin.

> 🔐 Protect your website from spam and abuse by leveraging Google's robust reCAPTCHA service.

---

## 📦 Installation

Install the plugin via npm:

```bash
npm install google-recaptcha-vue3
```

---

## ✨ Key Features

- ✅ **Google reCAPTCHA v3 Support:** Implement invisible spam protection.
- ✅ **reCAPTCHA v2 Support:** Integrate the traditional checkbox challenge.
- 🧩 **Vue 3 Composition API Friendly:** Seamless integration within your Vue 3 components.
- 📤 **Token Emission:** Emits a verification token via an event for secure backend validation.

---

## 🚀 Usage

### ✅ reCAPTCHA v3 (Invisible)

1.  **Import the component:**

    ```JavaScript
    import GoogleRecaptcha from 'google-recaptcha-v3';
    ```

2.  **Integrate into your component template:**

    ```JavaScript
    <template>
      <GoogleRecaptcha
        ref="recaptchaRef"
        siteKey="your-site-key"
        action="submit"
        @verified="handleToken"
        @error="handleError"
      />
      </template>

    <script setup>
    import { ref } from 'vue';
    import GoogleRecaptcha from 'google-recaptcha-v3';

    const recaptchaRef = ref(null);

    const handleToken = (token) => {
      console.log('Token:', token);
      // Send this token to your server for verification.
    };

    const handleError = (err) => {
      console.error("reCAPTCHA Error:", err);
    };

    // Trigger reCAPTCHA execution (e.g., on form submission)
    const submitForm = () => {
      recaptchaRef.value.execute();
      // ... other form submission logic
    };
    </script>
    ```

3.  **Trigger Execution:**

    ```JavaScript
    const recaptchaRef = ref(null);

    // Call this method when you need to verify the user action
    const triggerRecaptcha = () => {
      recaptchaRef.value.execute();
    };
    ```

4.  **Handle the emitted token and errors:**

    ```JavaScript
    const handleToken = (token) => {
      console.log('Token:', token);
      // Implement your server-side token verification logic here.
    };

    const handleError = (err) => {
      console.error("reCAPTCHA Error:", err);
      // Handle potential reCAPTCHA errors.
    };
    ```

#### Screenshot

![reCaptcha V3 Demo](https://raw.githubusercontent.com/spyshiv/google-recaptcha-vue3/refs/heads/main/src/assets/v3.png)

---

### ✅ reCAPTCHA v2 (Checkbox)

1.  **Import the component:**

    ```JavaScript
    import GoogleRecaptcha from 'google-recaptcha-v3';
    ```

2.  **Use it in your component template:**

    ```JavaScript
    <template>
      <GoogleRecaptcha
        siteKey="your-site-key"
        version="v2"
        autoLoad="true"
        @verified="handleToken"
        @error="handleError"
      />
    </template>

    <script setup>
    import { ref } from 'vue';
    import GoogleRecaptcha from 'google-recaptcha-v3';

    const handleToken = (token) => {
      console.log('Token:', token);
      // Send this token to your server for verification.
    };

    const handleError = (err) => {
      console.error("reCAPTCHA Error:", err);
    };
    </script>
    ```

3.  **Handle the emitted token and errors:**

    ```JavaScript
    const handleToken = (token) => {
      console.log('Token:', token);
      // Implement your server-side token verification logic.
    };

    const handleError = (err) => {
      console.error("reCAPTCHA Error:", err);
      // Handle any reCAPTCHA errors.
    };
    ```

4.  **Manually Load reCAPTCHA (when `autoLoad` is `false`):**

    ```JavaScript
    const recaptchaRef = ref(null);

    // Call this method to explicitly load the reCAPTCHA widget
    const loadRecaptcha = () => {
      recaptchaRef.value.execute(); // Note: For v2, 'execute' will render the checkbox if not already loaded.
    };
    ```

#### Screenshot

![reCaptcha V2 Demo](https://raw.githubusercontent.com/spyshiv/google-recaptcha-vue3/refs/heads/main/src/assets/v2.png)

---

### ⚙️ Props

| Prop       | Version | Type    | Required | Description                                                            |
| ---------- | ------- | ------- | -------- | ---------------------------------------------------------------------- |
| `version`  | both    | String  | ✅ Yes   | The reCAPTCHA version to use (`'v3'` or `'v2'`, default: `'v3'`)       |
| `siteKey`  | both    | String  | ✅ Yes   | Your Google reCAPTCHA site key.                                        |
| `action`   | v3      | String  | No       | A contextual action name for v3 scoring.                               |
| `autoLoad` | v2      | Boolean | No       | Automatically load the reCAPTCHA on component mount (default: `true`). |

### 📢 Events

| Event      | Payload          | Description                                           |
| ---------- | ---------------- | ----------------------------------------------------- |
| `verified` | `token` (String) | Emitted when reCAPTCHA verification is successful.    |
| `error`    | `error` (Any)    | Emitted when reCAPTCHA setup/verification has failed. |

---

### 🛠️ Methods

You can access the component instance via a `ref` to call the following method:

- `execute()`: Triggers the reCAPTCHA process. For v3, it programmatically invokes the invisible challenge. For v2 (when `autoLoad` is `false`), it can be used to initiate the rendering of the checkbox.

---

## 📂 Examples

Explore the included example Vue files for practical implementations:

- `RecaptchaV3Example.vue`: Demonstrates the usage of the invisible reCAPTCHA v3.
- `RecaptchaV2Example.vue`: Illustrates the integration of the reCAPTCHA v2 checkbox.

---

## 🧪 Test Keys

For local development and testing purposes, you can utilize Google's provided test site keys:

- **v3 Site Key:** `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **v2 Site Key:** `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`

> ⚠️ **Important:** These test keys will always return a valid token. **Never use them in production environments.** Replace them with your site keys obtained from the Google reCAPTCHA admin console.

---

## 📄 License

MIT © [Shiv Baran Singh]

---

## 🙏 Contributions

Your contributions, bug reports, and feature requests are highly appreciated! Feel free to fork this repository and submit a pull request to contribute.

---

## 🔗 Resources

- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Google reCAPTCHA v2 Documentation](https://developers.google.com/recaptcha/docs/display)
- [Vue 3 Official Documentation](https://vuejs.org/)

---
