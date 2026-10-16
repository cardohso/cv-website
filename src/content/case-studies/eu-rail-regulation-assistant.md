---
title: 'EU Rail Regulation Assistant'
summary: 'A deployed RAG assistant over EU railway interoperability law. Every answer cites the passage it comes from, the assistant refuses when its sources do not cover the question, and an evaluation gate in CI fails the build when quality drops.'
role: 'Solo project: design, implementation, evaluation and deployment'
stack:
  - Python
  - LangGraph
  - FastAPI
  - Azure AI Search
  - RAGAS
  - Langfuse
  - Docker
  - GitHub Actions
status: 'Personal project'
publishDate: 2026-10-16
draft: false
---

**Code:** [github.com/cardohso/rail-regulation-rag](https://github.com/cardohso/rail-regulation-rag) ·
**Live demo:** [rail-rag on Azure Container Apps](https://rail-rag.calmcliff-0073b8b6.switzerlandnorth.azurecontainerapps.io)
(it scales to zero, so the first request after a pause takes a few seconds).

## Problem

A question-answering system over legal text is only useful if you can check it.
This project answers questions about the Interoperability Directive and six
Technical Specifications for Interoperability (TSIs), cites the exact passage
behind every answer, and says "I can't answer that from these sources" when it
should. The harder question was how to prove it keeps working as the code and
the models change.

## Approach

- **Ingest.** Seven consolidated acts are downloaded from the EU Publications
  Office and parsed into 1,254 sections with stable citation keys, then split
  into 1,589 passages.
- **Agent.** A five-node LangGraph flow: rewrite the query, retrieve the top 8
  passages, grade them, generate with citations, or refuse. Refusal has four
  independent gates, from the cheapest (a similarity floor that skips the LLM)
  to the most expensive.
- **Retrieval.** Hybrid search in Azure AI Search, BM25 plus vectors fused with
  Reciprocal Rank Fusion, with an in-process Qdrant fallback behind the same
  interface. Embeddings run locally with ONNX.
- **Evaluation.** A 20-question golden set (16 answerable, 4 that must be
  refused), scored by RAGAS faithfulness and answer relevancy, deterministic
  retrieval metrics against gold passage ids, a per-document grounding check,
  and the refusal rate. The judge is a different model family from the
  generator, because LLM judges tend to favour their own family, a theme of my
  CAPSI 2026 paper.

## Results

The gated run on GitHub Actions (dense-only retrieval) passed every threshold:
faithfulness 1.00, answer relevancy 0.90, context precision 0.94, context
recall 0.89, grounding 1.00, 15 of 16 answerable questions answered and 4 of 4
unanswerable ones refused. Hybrid retrieval raised retrieval recall@8 from 0.91
to 1.00 in a deterministic test, but it is not yet gated in CI.

## Limitations

- 20 questions is a small set, drafted with an AI assistant from the source
  texts and reviewed by one person (me), so one question moves a rate by 5–6
  points.
- Judge scores vary between runs.
- The hybrid mode hit the free-tier daily quotas before it could pass the gate,
  and it caused one regression in context recall.
- Not legal advice: the consolidated EUR-Lex texts have no legal effect.

## Lessons learned

- **Enforce structured output, don't request it.** The model sometimes returned
  `[[1],[2]]` instead of `[1,2]`, which silently turned answerable questions
  into refusals until the schemas were enforced.
- **Inspect the failures a judge reports.** One faithfulness miss turned out to
  be a judge false negative, not a bad answer.
- **A null result is still a result.** Two judges from different families gave
  the same scores, but the setup could not have detected self-preference, so the
  write-up says exactly that.
- **Retrieval needs more than similarity.** Dense retrieval missed a passage
  that shares few words with the question; adding BM25 keyword search fixed it.

The full list of what went wrong and how it was fixed is in
[`docs/LESSONS.md`](https://github.com/cardohso/rail-regulation-rag/blob/main/docs/LESSONS.md).
