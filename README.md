
# AI Story Reels Lite - React Web App Source Code

**AI Story Reels Lite** is a premium, ready-to-launch React (Vite + TypeScript) template that allows users to generate short, engaging video reel scripts using the power of Google's Gemini AI. This is a web application built with Tailwind CSS for a modern, responsive user interface.

This source code is perfect for developers looking to quickly launch an AI-powered content creation app, or for entrepreneurs who want a solid foundation for a new SaaS product.

---

## 🚀 Features
*   **Simple Authentication Flow**: A straightforward login screen to get users started.
*   **Multi-Step Story Creation**: An intuitive wizard guides users from idea to final script.
*   **Gemini AI Integration**: Leverages the Gemini API for high-quality script generation.
*   **Local Storage**: Save and manage your favorite stories directly in the browser.
*   **Social Sharing**: Easily share generated scripts.
*   **Multi-Language Support**: Built-in context for English and Arabic.
*   **PRO Subscription Model**: Includes a `ProContext` and a sample upgrade screen to monetize your app.
*   **Settings Ready**: A settings modal for easy configuration and access to legal documents.
*   **Onboarding Experience**: A welcome screen for new users.

---

## 📦 Installation & Setup

This project is built with React and Vite.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up your Gemini API Key:**
    The application uses `process.env.API_KEY` to securely access the Gemini API. You need to create a `.env` file in the root of your project and add your key:
    ```
    VITE_GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE
    ```
    The app is configured to use this variable. **Do not** hardcode your key in any file.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🔑 Configuration

While the API key is handled by environment variables, you can configure other app constants in `constants.ts`:

*   `APP_NAME`: Your application's name.
*   `PRIVACY_POLICY_URL`: Link to your privacy policy.
*   `TERMS_OF_SERVICE_URL`: Link to your terms of service.

---

## 📄 Support

For support or custom modifications, contact:
Hossammustafa30@gmail.com

---
 
