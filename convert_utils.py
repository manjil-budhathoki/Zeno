import nbformat
from nbconvert import HTMLExporter
from weasyprint import HTML

async def convert_ipynb_to_pdf(upload_file, font_family, font_size, font_weight, color, text_align, margin_top, margin_bottom, margin_left, margin_right, output_pdf_path):
    content = await upload_file.read()
    notebook = nbformat.reads(content.decode(), as_version=4)

    html_exporter = HTMLExporter()
    body, _ = html_exporter.from_notebook_node(notebook)

    heading_style = f"""
        font-family: {font_family};
        font-size: {font_size};
        font-weight: {font_weight};
        color: {color};
        text-align: {text_align};
        margin-top: {margin_top};
        margin-bottom: {margin_bottom};
        margin-left: {margin_left};
        margin-right: {margin_right};
    """

    styled_html = f"""
    <html>
    <head>
        <style>
            @page {{
                margin: 20mm;
                @top-center {{
                    content: "Zeno - Styled Notebook Export";
                    font-size: 12px;
                    color: #888;
                }}
                @bottom-center {{
                    content: "Page " counter(page) " of " counter(pages);
                    font-size: 12px;
                    color: #888;
                }}
            }}

            body {{
                font-family: sans-serif;
                line-height: 1.6;
                color: #111;
            }}

            .jp-Notebook h1,
            .jp-Notebook h2,
            .jp-Notebook h3 {{
                {heading_style}
            }}

            pre, code, .output, .input, .jp-OutputArea, .highlight, .output_text {{
                all: revert !important;
                font-family: monospace;
                font-size: 13px;
                background-color: #f6f6f6;
                color: black;
                padding: 10px;
                border-radius: 6px;
                overflow-x: auto;
            }}
        </style>
    </head>
    <body>
        <div class="jp-Notebook">
            {body}
        </div>
    </body>
    </html>
    """

    HTML(string=styled_html).write_pdf(output_pdf_path)
