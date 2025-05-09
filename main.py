from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from convert_utils import convert_ipynb_to_pdf
import tempfile

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://zeno-phi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/convert/")
async def convert_to_pdf(
    notebook: UploadFile = File(...),
    font_family: str = Form(...),
    font_size: str = Form(...),
    font_weight: str = Form(...),
    color: str = Form(...),
    text_align: str = Form(...),
    margin_top: str = Form(...),
    margin_bottom: str = Form(...),
    margin_left: str = Form(...),
    margin_right: str = Form(...)
):
    if not notebook.filename.endswith(".ipynb"):
        return {"error": "Only .ipynb files are allowed."}

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
        await convert_ipynb_to_pdf(
            notebook,
            font_family,
            font_size,
            font_weight,
            color,
            text_align,
            margin_top,
            margin_bottom,
            margin_left,
            margin_right,
            temp_pdf.name,
        )
        return FileResponse(path=temp_pdf.name, filename="converted.pdf", media_type='application/pdf')
