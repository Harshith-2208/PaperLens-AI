import requests
import xml.etree.ElementTree as ET

def search_papers(query):

    url = f"http://export.arxiv.org/api/query?search_query=all:{query}&start=0&max_results=5"

    response = requests.get(url)

    root = ET.fromstring(response.content)

    papers = []

    for entry in root.findall("{http://www.w3.org/2005/Atom}entry"):

        title = entry.find("{http://www.w3.org/2005/Atom}title").text

        summary = entry.find("{http://www.w3.org/2005/Atom}summary").text

        link = entry.find("{http://www.w3.org/2005/Atom}id").text
        pdf_link = link.replace("abs", "pdf") + ".pdf"
        authors = [
            author.find("{http://www.w3.org/2005/Atom}name").text
            for author in entry.findall("{http://www.w3.org/2005/Atom}author")
        ]

        papers.append({
            "title": title.strip(),
            "abstract": summary.strip(),
            "url": link,
            "pdf": pdf_link,
            "authors": authors,
            "year": "arXiv"
        })

    return papers