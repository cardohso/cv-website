---
# ⚠️ BEFORE PUBLISHING: confirm with your employer which internal details are OK
# to publish. This is a GENERALIZED, redacted version. Review notes and the items
# still needing sign-off live in REVIEW-BEFORE-PUBLISH.md (kept OUT of the build,
# so nothing leaks into the page source). Do not paste raw scores/tool names here
# without clearing them first — markdown HTML comments DO show up in page source.
title: 'Building an LLM-as-a-Judge Evaluation Pipeline'
summary: 'How do you measure whether a RAG assistant''s answers are reliable — not just plausible? A testing-and-observability methodology built on decomposed, source-grounded LLM-as-a-Judge evaluators and retrieval-stage metrics, wired into CI for automated regression detection.'
role: 'AI Engineering Intern'
stack:
  - LLM-as-a-Judge
  - Langfuse
  - GitHub Actions
  - RAG
  - Python
status: 'Case study'
publishDate: 2026-07-01
draft: false
---

## Problem

Retrieval-augmented, multi-agent systems don’t fail loudly. A retrieved chunk
goes stale, a prompt changes tone, an upstream model update shifts phrasing, and
a correct-looking answer quietly becomes wrong or unsupported. Classic software
testing assumes a fixed input produces a fixed output. A system like this can
give two different, both plausible-looking, answers to the same question on two
different days. The real problem was measuring answer quality run over run,
instead of eyeballing transcripts and hoping.

## Approach

I decomposed answer quality into four dimensions, each scored independently by an
LLM judge rather than folded into one blended number: **Relevance**,
**Helpfulness**, **Correctness**, and **Hallucination**. Every judge is grounded
against the source document the answer should be based on, not just checked for
internal consistency. On the retrieval side, I added three more evaluators —
**context precision**, **context recall**, and **context relevance** — so a low
score could be traced back to "the retriever missed it" versus "the retriever
found it and the model still got it wrong."

## Architecture

Every run is traced end to end, including intermediate retrieval steps, so a bad
score is attributable to a specific step rather than just the final answer.
Evaluators run automatically in CI on relevant changes. A comparison tool I built
takes two runs and uses an LLM to reason about what changed and whether it
matters, instead of diffing raw numbers: the difference between "score dropped
0.05" and "score dropped 0.05 because three answers switched from citing one
financial statement to citing another."

## Results

The suite runs automatically today and has caught regressions — cases where a
prompt or upstream model change quietly shifted answer quality — that would
previously have shipped unnoticed.

## Lessons learned

- **A judge is only as good as its measurement pipeline.** A harness bug silently
  dropped part of the retrieved context, which tanked one evaluator’s scores for
  reasons that had nothing to do with the model. Audit the measurement code
  before trusting a bad number.
- **"Wrong" and "different but defensible" aren’t the same failure.** A
  low-scoring case turned out to be a legitimate methodology difference (which
  financial definition to use), not a hallucination. The rubric needed room for
  that distinction.
- **LLM judges can be self-preferring.** Before trusting a judge’s verdict, I had
  to check whether it was systematically kinder to outputs from its own model
  family, and design around that risk instead of assuming it away.
- **Not every proposed test is equally worth running.** Given three candidate
  bias-detection tests, the useful move was ranking them: one was decision-grade,
  the other two were diagnostic color. Rigor also means knowing what to skip.
- **A single pass through an eval set tells you almost nothing about
  consistency.** Reliability claims need repeated runs to separate real signal
  from noise before you trust any one score.
