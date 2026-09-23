# How to Use Llama: Sovereign On-Premise AI Compute Runbook
**The Lantern Daily & RedLantern Studios — Operator Stack Reference**
*Target: Open-Weight Models, Local Private Inference, vLLM, Ollama, and Data Sovereignty*

---

## 1. Executive Summary & Why Llama Matters
Llama represents true technological sovereignty. Unlike proprietary cloud APIs that log queries, train on corporate IP, or can be shut down without notice, Llama gives builders complete physical ownership of model weights. In a principled AI architecture, private user data, sensitive financial records, and proprietary internal workflows must run locally on open weights.

```
[Private Internal Data] 
           │ (Zero Cloud Egress)
           ▼
[Local Bare-Metal Server / GPU Cluster]
           │
  ┌─────────────────────────────────┐
  ▼                                 ▼
[vLLM / Ollama Local Inference]   [Docker Compose Sandbox]
  │                                 │
  ▼                                 ▼
[OpenAI-Compatible Local API]     [Private Embeddings & Vector DB]
 (http://localhost:11434)          (pgvector / LanceDB)
```

---

## 2. Step-by-Step Operator Guide: How to Use Llama

### Step 1: Rapid Local Deployment with Ollama
To get running in under 2 minutes on macOS or Linux:
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull and run Llama 3.3 70B (or Llama 3.1 8B for laptops)
ollama run llama3.1:8b

# Test the local REST endpoint
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Explain the concept of Amanah in technology stewardship."
}'
```

### Step 2: Production High-Throughput Serving with vLLM
For enterprise multi-user production applications, use vLLM for PagedAttention (20x higher throughput than standard PyTorch):
```bash
# Launch vLLM with OpenAI API compatibility
python3 -m vllm.entrypoints.openai.api_server \
    --model meta-llama/Llama-3.1-70B-Instruct \
    --tensor-parallel-size 2 \
    --gpu-memory-utilization 0.95 \
    --port 8000
```

### Step 3: Connecting Your App (Drop-in OpenAI Replacement)
Because vLLM and Ollama provide an OpenAI-compatible endpoint, point your existing code directly to localhost:
```python
from openai import OpenAI

# Connects to local Llama instance — zero data leaves your machine
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # placeholder
)

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[
        {"role": "system", "content": "You are a private sovereign data assistant."},
        {"role": "user", "content": "Summarize this internal database report."}
    ]
)
print(response.choices[0].message.content)
```

---

## 3. Production Docker Compose Template
Save as `docker-compose.llama.yml`:
```yaml
version: '3.8'

services:
  ollama:
    image: ollama/ollama:latest
    container_name: sovereign-llama
    restart: always
    ports:
      - "11434:11434"
    volumes:
      - ./ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```

---
*Verified by The Lantern Daily Operator Stack (https://thelanterndaily.com/stack)*
