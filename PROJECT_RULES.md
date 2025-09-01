# 📖 PROJECT\_RULES.md – SkillScore

## **1. Project Overview**

**SkillScore** is a cross-platform mobile app (React Native + Expo) with a FastAPI backend. It allows users to:

* Upload files (PDF, DOCX, TXT, or Images).
* Extract text from files.
* Generate practice questions using **Google Gemini API**.
* Answer questions directly in the app.
* Receive instant **scores and feedback**.

Authentication and file storage are handled by **Supabase**.

---

## **2. Technical Stack & Platforms**

* **Frontend:** React Native (Expo), NativeWind for styling, Expo Router for navigation.
* **Backend:** FastAPI (Python).
* **Database:** Supabase (Postgres).
* **Authentication:** Supabase Auth (JWT).
* **Storage:** Supabase Storage (files), DB for metadata.
* **AI Services:** Google Gemini API.
* **Deployment:**

  * Frontend → Expo EAS build & OTA updates.
  * Backend → FastAPI with Uvicorn (deployable to Railway, Render, or GCP).

---

## **3. Requirements**

### **3.1 Functional Requirements**

* Users can sign up/login via Supabase Auth.
* Users can upload supported files (PDF, DOCX, TXT, Image).
* Extracted text is processed by backend.
* Gemini API generates 3 MCQs + 2 short-answer questions.
* Users can answer questions in the app.
* Backend evaluates answers via Gemini and returns a **score + feedback**.
* Users see results immediately.

### **3.2 Non-Functional Requirements**

* Must work on both iOS and Android.
* Backend should respond within **<3 seconds** for most requests.
* Gemini calls should be **asynchronous** to avoid UI freezing.
* The app should remain responsive even when processing files.

### **3.3 UI/UX Requirements**

* Use **NativeWind** for consistent styling.
* Minimalist design: focus on usability, clarity, and speed.
* Components must be mobile-friendly (buttons, forms, lists).
* Dark mode support (stretch goal).
* Navigation handled via **Expo Router**.

### **3.4 Performance Requirements**

* Handle file uploads up to **10 MB**.
* Extract text within **5 seconds** for average-size files.
* API latency <1 second (excluding AI processing).
* Cache AI results (questions, feedback) to reduce duplicate Gemini requests.

### **3.5 Security Requirements**

* JWT tokens from Supabase must be validated for every API call.
* File uploads restricted to supported formats (pdf, docx, txt, jpg, png).
* Input sanitization for text extraction & AI prompts.
* Use HTTPS everywhere (frontend ↔ backend ↔ Supabase).
* No sensitive data (passwords, keys) stored in client.

---

## **4. Design Guidelines**

* **Styling Framework:** NativeWind (Tailwind-like utility classes).
* **Color Palette:**

  * Primary: Blue (trust, learning).
  * Secondary: Green (progress, scoring).
  * Neutral grays for backgrounds.
* **Typography:**

  * Headings → bold, larger size.
  * Body text → base, readable.
* **UI Components:**

  * Buttons → rounded, shadow, consistent sizing.
  * Cards → used for questions & answers.
* **Navigation:** Expo Router with `/auth`, `/upload`, `/questions`, `/results` routes.

---

## **5. Development Guidelines**

### **5.1 File Structure**

**Frontend (React Native + Expo):**

```
/app  
  /auth (login/register screens)  
  /upload (file upload screen)  
  /questions (quiz flow)  
  /results (score display)  
/components (shared UI components)  
/lib (supabase, api clients)  
/styles (NativeWind config)  
```

**Backend (FastAPI):**

```
/app  
  /routes (upload, questions, answers)  
  /models (SQLAlchemy models)  
  /services (Gemini, Supabase integration)  
  /core (config, utils)  
```

### **5.2 Testing**

* Frontend: Jest + React Testing Library.
* Backend: Pytest for API routes.
* Use mock Gemini responses for test cases.

### **5.3 Deployment**

* **Frontend:** Expo EAS build for iOS & Android. OTA updates enabled.
* **Backend:** FastAPI deployed to Railway/Render.
* Environment variables managed via Supabase & Expo secrets.

---

✅ With these additions, your `PROJECT_RULES.md` now covers:

* Functional requirements
* Non-functional, UI/UX, performance, and security requirements
* Design guidelines (colors, typography, UI rules)
* Development guidelines (file structure, testing, deployment)