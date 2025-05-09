# 📄 Zeno – IPYNB to PDF Converter

Zeno is a modern web app that allows users to upload Jupyter Notebook files (`.ipynb`) and convert them into **beautiful, styled PDFs** with customizable fonts, colors, and margins.

![Homepage Preview](image.png)
---

## 🚀 Live Demo

- 🌐 Frontend: [zeno-phi.vercel.app](https://zeno-phi.vercel.app)
- 🔧 Backend: [zeno-backend-zbr4.onrender.com](https://zeno-backend-zbr4.onrender.com)

---

## 🛠 Features

✅ Drag & drop IPYNB file upload  
✅ Customize PDF heading font, color, alignment, and margins  
✅ Live heading preview  
✅ Animated UI with Framer Motion  
✅ In-browser PDF viewer + download  
✅ Emoji feedback system  
✅ Mobile responsive layout  
✅ Beautiful dark glassmorphic design

---

## 🖼 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion
- React Hot Toast
- PDF.js for viewer

### Backend
- FastAPI
- WeasyPrint (PDF generation)
- nbconvert + nbformat (IPYNB parsing)
- CORS middleware
- Render deployment

---

## 🗂 Folder Structure

```
IPYNB_TO_PDF/
├── Backend/
│   ├── main.py
│   ├── convert_utils.py
│   └── test_notebooks/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── public/
├── requirements.txt
└── README.md
```

---

## 🧠 Inspiration

Built to simplify the boring process of exporting Jupyter notebooks into well-formatted, styled reports for submission or presentation.

---

## 📸 Screenshot

> You can place the preview image here:

![Homepage Preview](image.png)
![Services](services.png)
![Feedback](feedback.png)

---

## 💡 Future Improvements

- Multi-format support: Markdown → PDF, PDF → Word  
- User authentication & file history  
- Add watermark or page numbering controls  
- Light/Dark PDF style presets

---

## 🙌 Credits

Crafted with ❤️ by [Manjil Budhathoki](https://github.com/manjil-budhathoki)