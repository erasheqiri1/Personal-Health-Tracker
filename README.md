# 📱Personal Health Tracker App
- Personal Health Tracker është një aplikacion mobil i ndërtuar për t’i ndihmuar përdoruesit të kujdesen për shëndetin e tyre ditor. Aplikacioni kombinon ushqimin, ushtrimet, gjumin, dhe recetat ushqimore në një vend të vetëm, duke krijuar një përvojë të thjeshtë dhe praktike për menaxhimin e stilit të jetesës.
- Përdoruesi krijon llogarinë e tij dhe aplikacioni i personalizohet automatikisht: çdo ditë ai mund të regjistrojë çfarë ka ngrënë, çfarë ushtrimesh ka bërë, sa ka fjetur, sa hapa ka bërë, dhe t’i shohë statistikat menjëherë në dashboard.
- Aplikacioni ofron edhe plane ushqimore dhe ushtrimesh të ndara sipas qëllimit personal (humbje peshe, shtim peshe, ruajtje peshe), si dhe sjell receta të gatshme nga API të jashtme, duke e bërë planifikimin e ditës shumë më të lehtë.
-Personal Health Tracker është i dizajnuar të jetë i thjeshtë për t'u përdorur, vizualisht i qartë, dhe i përshtatur për secilin përdorues individualisht. Qëllimi kryesor i tij është të krijojë një mënyrë të shpejtë dhe të lehtë për të ndjekur progresin shëndetësor dhe për të motivuar përdoruesin drejt një stili më të shëndetshëm jetese.
----------------------------------------------------------------------------------------------------------
## Screenshots

### Admin View
<p align="center">
  <img src="myApp/assets/foto1.PNG" width="220" height="400"/>
  <img src="myApp/assets/foto2.PNG" width="220" height="400"/>
  <img src="myApp/assets/foto3.PNG" width="220" height="400"/>
  <img src="myApp/assets/foto4.PNG" width="220" height="400"/>
</p>
### User View
<p align="center">
  <img src="myApp/assets/foto5.PNG" width="220" height="400"/>
  <img src="myApp/assets/foto6.PNG" width="220" height="400"/>
  <img src="myApp/assets/foto7.PNG" width="220" height="400"/>
  <img src="myApp/assets/foto8.PNG" width="220" height="400"/>
</p>
<p align="center">
  <img src="myApp/assets/foto9.PNG" width="190" height="400"/>
  <img src="myApp/assets/foto10.PNG" width="190" height="400"/>
  <img src="myApp/assets/foto11.PNG" width="190" height="400"/>
    <img src="myApp/assets/foto12.PNG" width="190" height="400"/>
    <img src="myApp/assets/foto13.PNG" width="190" height="400"/>
</p>

## ⭐ Features (të zgjeruara)

### 🔐 Authentication & User Security
- Firebase Email/Password  
- Social Logins (Web): Google, Microsoft, GitHub, Facebook  
- Session Persistence (përdoruesi mbetet i kyçur edhe pas restart)  

---

### 🧠 State Management & Logic
- `useState`, `useEffect`, `useRouter`  
- Handling errors, loading, async operations  
- Data sync me Firebase Firestore

  ---
### 🥗 Food Tracking
- Regjistrim i vakteve ditore  
- Llogaritje automatike e kalorive  
- Shfaqje nutriente: protein, carbs, fats  
- Skanim i barkodit ushqimor *(opsionale në të ardhmen)*  

---
### 💪 Workout Tracking
- Regjistrim i ushtrimeve ditore  
- Kalori të djegura  
- Plane ushtrimesh sipas qëllimit  

- 
### 😴 Sleep Monitoring
- Orët e gjumit  
- Kualiteti i gjumit  
---

### 🍳 Recipes API Integration
- TheMealDB  
- OpenWeatherMap (+rekomandime sipas motit)  
  
### 🧭 Navigation (expo-router)
- Layout i pastër  
- Navigim i thjeshtë për çdo moshë  
- Bottom Tabs + Stack Navigation  

---

## 🏗️ Tech Stack

| Shtresa | Teknologjia |
|--------|-------------|
| Frontend | React Native (Expo) |
| Routing | expo-router |
| Backend | Firebase Firestore |
| Auth | Firebase Authentication |
| Hosting (Web) | Firebase Hosting |
| API External | TheMealDB, OpenWeatherMap |
| State | React Hooks |

---


## 📥 Install & Run

```bash
git clone <repo-url>
cd myApp
npm install
npm run web
```

Hapeni me:
- **Web (Browser)**


  ## 🧪 Testing
Për fazën e testimit kemi përdorur Jest dhe React Testing Library.
- Snapshot Tests: Verifikojnë që UI nuk ndryshon papritur.
- Interaction Tests: Testimi i shtypjes së butonave (fireEvent).
- Mocking: Kemi bërë mock Firebase-in për të simuluar Auth dhe Firestore.

Udhëzimi për testim:
Run `npm test`
