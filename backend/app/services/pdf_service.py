import fitz

def extract_text(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    # prevent sending too much text to AI
    return text[:15000]