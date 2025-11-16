# 📱Personal Health Tracker App
- Personal Health Tracker është një aplikacion mobil i ndërtuar për t’i ndihmuar përdoruesit të kujdesen për shëndetin e tyre ditor. Aplikacioni kombinon ushqimin, ushtrimet, gjumin, dhe recetat ushqimore në një vend të vetëm, duke krijuar një përvojë të thjeshtë dhe praktike për menaxhimin e stilit të jetesës.
- Përdoruesi krijon llogarinë e tij dhe aplikacioni i personalizohet automatikisht: çdo ditë ai mund të regjistrojë çfarë ka ngrënë, çfarë ushtrimesh ka bërë, sa ka fjetur, sa hapa ka bërë, dhe t’i shohë statistikat menjëherë në dashboard.
- Aplikacioni ofron edhe plane ushqimore dhe ushtrimesh të ndara sipas qëllimit personal (humbje peshe, shtim peshe, ruajtje peshe), si dhe sjell receta të gatshme nga API të jashtme, duke e bërë planifikimin e ditës shumë më të lehtë.
-Personal Health Tracker është i dizajnuar të jetë i thjeshtë për t'u përdorur, vizualisht i qartë, dhe i përshtatur për secilin përdorues individualisht. Qëllimi kryesor i tij është të krijojë një mënyrë të shpejtë dhe të lehtë për të ndjekur progresin shëndetësor dhe për të motivuar përdoruesin drejt një stili më të shëndetshëm jetese.
----------------------------------------------------------------------------------------------------------
## Screenshots

### Admin View
<img src="my-app/assets/foto1.png" width ="410}"/>
<img src="my-app/assets/foto1.png" width ="410}"/>
<img src="my-app/assets/foto1.png" width ="410}"/>
<img src="my-app/assets/foto1.png" width ="410}"/>



































Projekti Personal Health Tracker është një aplikacion mobil i zhvilluar për të ndihmuar përdoruesit në menaxhimin e shëndetit të tyre personal, duke përfshirë planifikimin e ushqimeve, ndjekjen e ushtrimeve fizike dhe monitorimin e peshës trupore.
Aplikacioni mundëson autentikim të përdoruesve dhe ofron ndërfaqe të qartë, funksionale dhe lehtësisht të përdorshme për menaxhimin e planeve personale shëndetësore.

Teknologjitë e Përdorura
React Native – për zhvillimin e aplikacionit mobil ndër-platformë
TypeScript (TSX) – për tipizim të fortë dhe strukturë më të qëndrueshme të kodit
Expo – për testim dhe ndërtim të shpejtë të aplikacionit
React Navigation – për menaxhimin e faqeve dhe tab-eve


 Udhëzime për Ekzekutim
Klono repository-n:
git clone https://github.com/personal-health-tracker.git

Hyr në dosjen e projektit:
cd myAppa

Instalo varësitë:
npm install

Nise aplikacionin:
npx expo start

Skanoni QR kodin me aplikacionin Expo Go për ta testuar në pajisjen tuaj.

Anëtarët e Grupit:
Aurorë Smirqaku
Era Sheqiri
Artin Dulahi
Emir Bislimi
Ulp Bellaqa


Projekti është zhvilluar në kuadër të lëndës së Zhvillimit të Aplikacioneve Mobile, si pjesë e studimeve në Fakultetin e Inxhinierisë Elektike dhe Kompjuterike në Universitetin e Prishtinës.

--------------------------------------------------------------------------------------------------------

# Personal Health Tracker App

Aplikacioni  Personal Health Tracker është një aplikacion mobil i zhvilluar për të ndihmuar përdoruesit në menaxhimin e shëndetit të tyre personal, duke përfshirë planifikimin e ushqimeve, ndjekjen e ushtrimeve fizike dhe monitorimin e peshës trupore.
Aplikacioni mundëson autentikim të përdoruesve dhe ofron ndërfaqe të qartë, funksionale dhe lehtësisht të përdorshme për menaxhimin e planeve personale shëndetësore.
------------------------------------------------------------------------------------------------------
This project is a simple **React Native (Expo Web)** app built using **Firebase Authentication** for user signup and login.
The app supports:
- Sign up with **email & password**
- Login with **email & password**
- Login with **Google**
- A **Welcome page** that displays the logged-in user's name
----------------------------------------------------------------------------------------------------------------
## Screenshots

### Google Sign-In Screen
<img src="my-app/assets/foto12.png" width ="410}"/>

### Welcome Page
<img src="my-app/assets/foto3.png" width ="350}"/>

### Firbase User Console
<img src="my-app/assets/foto4.png" width ="700}"/>

-----------------------------------------------------------------------------------------------------------
## Features
-Firebase Authentication – Email/Password login & signup

-Google Sign-In – Available for Web only

-Session Handling – Auto redirect if user is not logged in

-User Interface – Clean design, error handling, and validation

-Navigation – Simple routing with expo-router

------------------------------------------------------------------------------------------------------------------
## Set up instructions
### 1. Clone the repository
  ```bash
   https://github.com/erasheqiri1/Programimi_Pajisje_Mobile.git
   cd my-app
   ```
### 2. Install dependencies
   ```bash
   npm install
   ```
### 3. Create a firebase project
 - Go to [Firebase Console](https://console.firebase.google.com/)
 - Create a new Firebase project
 - Navigate to Authentication → Sign-in Method. Enable **Email/Password** and**Google Sign-In**
 - Go to Project Settings→General→Your app → Web App
 - Copy your Firebase Config
 - In your project, create a file name **firebaseConfig.js** and paste your config inside it

   ```bash
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   
   const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_AUTH_DOMAIN",
   projectId: "YOUR_PROJECT_ID",
   storageBucket: "YOUR_STORAGE_BUCKET",
   messagingSenderId: "YOUR_SENDER_ID",
   appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export default app;
   ```

----------------------------------------------------------------------------------------------------------------
## Folder Structure

 ```bash
MY-APP/
├── app/
│   ├── (auth)/
│   │   ├── login.jsx
│   │   ├── signup.jsx
│   │   └── welcome.jsx
│   ├── _layout.jsx        
│   └── index.jsx
│
├── firebaseConfig.jsx
└── README.md



   ```

