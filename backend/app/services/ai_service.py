import boto3
import json

client = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1"
)

MODEL_ID = "amazon.nova-lite-v1:0"


def analyze_text(text):

    prompt = f"""
    Analyze the research paper and return results in MARKDOWN.

    Sections:
    ### Summary
    ### Methodology
    ### Results
    ### Limitations

    Then generate a quiz section:

    ### Quiz

    Generate 5 MCQ questions.

    Format:

    1. Question text
    A) option
    B) option
    C) option
    D) option
    Answer: correct_option_letter

    Paper:
    {text}
    """

    response = client.converse(
        modelId=MODEL_ID,
        messages=[
            {
                "role": "user",
                "content": [
                    {"text": prompt}
                ]
            }
        ],
        inferenceConfig={
            "maxTokens": 800,
            "temperature": 0.3
        }
    )

    output = response["output"]["message"]["content"][0]["text"]
    return {
        "analysis": output
    }
