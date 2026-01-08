# 📘 Documentación del Proyecto

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)

### 1. Clonar el repositorio
```bash
git clone https://github.com/lgavegno/mi-portafolio.git
cd mi-portafolio
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
# EmailJS Configuration (Para el formulario de contacto)
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

---

## 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera la versión de producción en la carpeta `dist/`.
- `npm run lint`: Ejecuta ESLint para verificar calidad de código.
- `npm run preview`: Previsualiza la build de producción localmente.

---

## ☁️ Guía de Despliegue en Vercel

### Despliegue Automático (Recomendado)

1. Sube tu código a GitHub.
2. Inicia sesión en [Vercel](https://vercel.com).
3. Importa tu repositorio de GitHub.
4. En la configuración del proyecto en Vercel:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Variables de Entorno:**
   - Ve a la sección "Environment Variables".
   - Agrega las mismas variables que definiste en tu `.env` (`VITE_EMAILJS_SERVICE_ID`, etc.).
6. Haz clic en **Deploy**.

### Actualizaciones
Cada vez que hagas un `push` a la rama `main` (o la rama configurada), Vercel disparará un nuevo despliegue automáticamente.

---

## 🐛 Troubleshooting Común

**Problema:** El formulario de contacto no envía correos.
**Solución:**
1. Verifica que las variables de entorno en Vercel coincidan con tus credenciales de EmailJS.
2. Asegúrate de que el template en EmailJS acepte los parámetros: `name`, `email`, `message`.

**Problema:** Estilos rotos en producción.
**Solución:** Asegúrate de que los archivos de Tailwind y los imports de CSS en `main.jsx` estén correctos y purgados adecuadamente.
