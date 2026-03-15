# PaperLens AI 

**PaperLens AI** is an AI-powered research assistant that helps users quickly discover and understand academic papers. Users can **search for papers by topic or upload a PDF** and instantly receive **simple summaries, key insights, explanations, and quiz questions**.

Powered by **Amazon Nova via AWS Bedrock**, PaperLens AI converts complex academic research into clear, structured insights that are easier to understand.

**Live Demo:** https://www.paperlens.app

---

## Inspiration

Research papers contain valuable knowledge but are often difficult to understand because they are long, technical, and filled with domain-specific terminology. We built **PaperLens AI** to make research easier to explore by combining **AI-powered paper search with automatic explanations**.

---

## What it does

PaperLens AI helps users explore and understand research papers faster.

Users can:

- **Search for research papers by topic**
-  **Upload a research paper (PDF)** for AI analysis
-  Generate **simple summaries of complex papers**
-  Extract **key insights and main contributions**
-  Generate **quiz questions** to test understanding

---

## How we built it

PaperLens AI uses a modern full-stack architecture:

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS

**Backend**
- Python
- FastAPI

**AI Layer**
- Amazon Nova
- AWS Bedrock
- boto3

**Document Processing**
- pdfplumber
- PyPDF2

**Deployment**
- Vercel (Frontend)
- AWS services for AI processing

---

---

## Challenges we ran into

Handling long research papers was challenging because PDFs often contain complex formatting and large amounts of text. We also had to carefully structure prompts to work within AI token limits while still generating meaningful explanations.

---

## Accomplishments that we're proud of

- Built a working platform that **searches and analyzes research papers**
- Integrated **Amazon Nova via AWS Bedrock**
- Automatically generates **summaries, insights, and quiz questions**
- Created a tool that helps **students understand complex academic content**

---

## What we learned

During development we learned:

- How to integrate **Amazon Nova models with AWS Bedrock**
- Techniques for **extracting text from research paper PDFs**
- Best practices for **prompt engineering for document analysis**
- How to build a **full-stack AI application with Next.js and FastAPI**

---

## What's next for PaperLens AI

We plan to extend PaperLens AI with:

-  Semantic research paper search
-  Interactive Q&A with papers
-  Visual explanations and diagrams
-  Personal research libraries
-  Integration with academic databases like **arXiv** and **Semantic Scholar**

Our long-term goal is to build an **AI-powered research companion** that helps people explore and understand scientific knowledge faster.

---

# Features

-  Research paper search
-  PDF paper analysis
-  AI-generated summaries
-  Key insights extraction
-  Quiz generation for learning

---

# Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI

### AI
- Amazon Nova via AWS Bedrock
- boto3

### Document Processing
- pdfplumber
- PyPDF2

### Deployment
- Vercel
- AWS

---
