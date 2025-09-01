# 📖 PROJECT\_RULES.md – SkillScore

## **1. Project Overview**

**SkillScore** is a cross-platform mobile app (React Native + Expo) that enables users to:

* Upload files (PDF, DOCX, TXT, or Images).
* Extract text from files.
* Generate practice questions using **Google Gemini API**.
* Answer questions directly in the app.
* Receive instant **scores and feedback**.

**Supabase** powers authentication, database, and storage. **FastAPI** is used as a helper microservice for text extraction, AI orchestration, and communication with Gemini.

---

## **2. Technical Stack & Platforms**

* **Frontend:** React Native (Expo), NativeWind for styling, Expo Router for navigation.
* **Backend (primary):** Supabase (Postgres, Auth, Storage).
* **Helper Service:** FastAPI (Python, handles file parsing, Gemini API calls).
* **Authentication:** Supabase Auth (JWT).
* **Storage:** Supabase Storage for file uploads.
* **AI Services:** Google Gemini API.
* **Deployment:**

  * Frontend → Expo EAS build & OTA updates.
  * Supabase → managed cloud instance.
  * FastAPI → deployable to Railway, Render, or GCP.

---

## **3. Requirements**

### **3.1 Functional Requirements**

* Users can sign up/login via Supabase Auth.
* Users can upload supported files (PDF, DOCX, TXT, Image) → stored in Supabase Storage.
* FastAPI extracts text from uploaded files and saves it back to Supabase DB.
* Gemini API generates 3 MCQs + 2 short-answer questions.
* Users can fetch questions and answer them.
* FastAPI evaluates answers via Gemini and stores results in Supabase DB.
* Users see scores and feedback immediately.

### **3.2 Non-Functional Requirements**

* Must work on both iOS and Android.
* Supabase should be the single source of truth for all data.
* FastAPI endpoints should respond in **<3 seconds** for most requests.
* Gemini calls should be **async** to keep the app responsive.

### **3.3 UI/UX Requirements**

* Use **NativeWind** for consistent styling.
* Minimalist design: usability > decoration.
* Buttons and inputs must be mobile-friendly.
* Dark mode support (optional stretch).
* Navigation handled via **Expo Router**.

### **3.4 Performance Requirements**

* File uploads limited to **10 MB**.
* Text extraction within **5 seconds** for average-size files.
* API latency <1 second (excluding Gemini).
* Cache Gemini results (questions/feedback) to avoid duplicate calls.

### **3.5 Security Requirements**

* Supabase JWT must be validated on every FastAPI call.
* Restrict uploads to safe formats (pdf, docx, txt, jpg, png).
* Input sanitization for text extraction & AI prompts.
* Enforce HTTPS everywhere.
* Never expose private keys in client.

---

## **4. Design Guidelines**

* **Styling Framework:** NativeWind (Tailwind-like).
* **Color Palette:**

  * Primary: Blue (trust, learning).
  * Secondary: Green (progress, scoring).
  * Neutral grays for backgrounds.
* **Typography:**

  * Headings → bold, larger.
  * Body text → base, readable.
* **UI Components:**

  * Buttons → rounded, shadow, consistent sizing.
  * Cards → for questions & answers.
* **Navigation:** Expo Router with `/auth`, `/upload`, `/questions`, `/results` routes.

---

## **5. Development Guidelines**

### **5.1 File Structure**

**Frontend (React Native + Expo):**

```
/app  
  /auth (Supabase login/register)  
  /upload (file upload screen)  
  /questions (quiz flow)  
  /results (score display)  
/components (shared UI components)  
/lib (supabase client, API clients)  
/styles (NativeWind config)  
```

**Helper Service (FastAPI):**

```
/app  
  /routes (upload, questions, answers)  
  /services (Gemini, Supabase integration)  
  /core (config, utils)  
```

### **5.2 Testing**

* Frontend: Jest + React Testing Library.
* Backend (FastAPI): Pytest for API routes.
* Use mock Gemini responses for test cases.

### **5.3 Deployment**

* **Frontend:** Expo EAS build (iOS & Android). OTA updates enabled.
* **Backend (Supabase):** managed cloud environment.
* **Helper Service (FastAPI):** Railway/Render/GCP.
* Secrets handled via Supabase environment variables + Expo secrets.
