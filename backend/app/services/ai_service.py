import boto3
import json

client = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1"
)

MODEL_ID = "amazon.nova-lite-v1:0"


def analyze_text(text):

    prompt = f"""
Analyze the following research paper and provide:

1. Summary
2. Key Contributions
3. Methodology
4. Results
5. Limitations
6. Future Research Directions

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