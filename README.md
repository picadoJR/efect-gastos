# 💸 API GASTOS APP  

## 📌 Descripción  
Aplicación web para la gestión de gastos personales, que permite a los usuarios registrarse, iniciar sesión y administrar sus gastos de forma eficiente. Incluye autenticación con JWT, manejo de usuarios y visualización en un dashboard interactivo.  

El proyecto está dividido en frontend (React + Vite) y backend (Node.js + Express), con una arquitectura modular y escalable.  

---


---


---


---

## ⚙️ Instalación  

### 🔹 Clonar el repositorio  
git clone https://github.com/picadoJR/efect-gastos.git 
cd Api-de-Gastos  

### 🔹 Backend  
cd backend  
npm install  

### 🔹 Frontend  
cd ..  
npm install  

---

## ▶️ Ejecución  

### 🔹 Ejecutar Backend  
cd backend  
npm run dev  

### 🔹 Ejecutar Frontend  
npm run dev  

---

## 🛠️ Tecnologías  

### Frontend  
- React  
- Vite  
- Axios  
- Bootstrap  

### Backend  
- Node.js  
- Express  
- MongoDB  
- JWT  
- dotenv  

---

## 🧱 Arquitectura del Proyecto  

## 📂 Estructura del proyecto

```bash
T4_REACT/
│
├── app/
│   ├── dist/
│   ├── node_modules/
│   │
│   ├── public/
│   │   ├── img/
│   │   │   ├── Captura de pantalla 2026-04-13...
│   │   │   ├── favicon.svg
│   │   │   ├── freepik_dame-un-icono-sobre-gasto...
│   │   │   ├── icons.svg
│   │   │   ├── img.png
│   │   │   ├── img1.png
│   │   │   ├── img2.jpg
│   │   │   ├── img3.jpg
│   │   │   ├── imgFP.jpg
│   │   │   ├── imgLanding.jpg
│   │   │   ├── imgRe.jpg
│   │   │   ├── programador1.jpg
│   │   │   ├── programador2.jpg
│   │   │   ├── programador3.jpg
│   │   │   └── programador4.jpg
│   │   │
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── features/
│   │   │   ├── apis/
│   │   │   │   ├── apiRyC_axios.jsx
│   │   │   │   ├── ApiRyC.jsx
│   │   │   │   ├── auth.jsx
│   │   │   │   └── authGastos.jsx
│   │   │   │
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── forgotPassword.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── perfil.jsx
│   │   │   │   └── register.jsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.jsx
│   │   │   │
│   │   │   └── pages/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   └── dashboard.jsx
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   │
│   │   ├── layout/
│   │   │   ├── components/
│   │   │   │   ├── conocenos.jsx
│   │   │   │   ├── Content.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Header.jsx
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   │
│   │   ├── routes/
│   │   │   └── Routes.jsx
│   │   │
│   │   ├── shared/
│   │   │   ├── index.css
│   │   │   └── style.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── gasto.js
│   │   └── user.js
│   │
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

 

---

## 🔐 Variables de Entorno  

Crear un archivo `.env` dentro de la carpeta backend:  

PORT=4000  
MONGO_URI=tu_cadena_de_conexion  
JWT_SECRET=tu_clave_secreta  

---

## 🔗 Repositorio  

https://github.com/picadoJR/efect-gastos.git

---

## 👨‍💻 Autor  

reinaldo picado  

---

## 🚀 Notas  

Proyecto enfocado en el aprendizaje de desarrollo full stack, autenticación con JWT y consumo de APIs con React.  
