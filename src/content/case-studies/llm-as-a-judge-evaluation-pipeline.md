---
# ⚠️ BEFORE PUBLISHING ───────────────────────────────────────────────────────
# Confirm with your employer which internal details (architecture specifics,
# metric values, tool configuration, screenshots) are OK to publish publicly.
# Redact or generalize anything not cleared. Replace every <<TODO>> below.
# ─────────────────────────────────────────────────────────────────────────────
title: 'Building an LLM-as-a-Judge Evaluation Pipeline'
summary: 'How do you measure whether a RAG assistant''s answers are reliable? A testing-and-observability methodology built on decomposed LLM-as-a-Judge evaluators and retrieval-stage metrics, wired into CI for automated regression detection.'
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

> **Note for João:** Confirm with your employer which internal details are OK to
> publish before going live, and fill in every `<<TODO>>` below. Keep numbers and
> internal tooling specifics out until they're cleared as shareable.

## Problem

How do you measure the reliability of a RAG-based assistant's answers?

A retrieval-augmented assistant can fail in many distinct ways: it can retrieve
the wrong context, retrieve the right context but answer the wrong question,
answer helpfully but incorrectly, or fabricate details that were never in the
sources. A single "is this answer good?" score collapses all of these failure
modes into one number that's impossible to act on — and impossible to track as
the system changes.

The goal was a measurement system that:

- distinguishes *which* part of the pipeline failed (retrieval vs. generation),
- produces stable, comparable scores across runs, and
- runs automatically so regressions are caught before they ship.

<<TODO: add any product/domain context that's cleared for publication — what the
assistant does and who uses it, kept appropriately general.>>

## Approach

Rather than one monolithic judge, the evaluation is **decomposed** into
independent LLM-as-a-Judge evaluators, each scoring a single, well-defined
dimension of answer quality:

- **Relevance** — does the answer address what was actually asked?
- **Helpfulness** — is it actionable and complete for the user's intent?
- **Correctness** — is it factually right with respect to the source material?
- **Hallucination** — does it assert anything not grounded in the retrieved
  context?

Scoring dimensions separately means a drop in one number points directly at a
specific failure mode, instead of averaging everything into an opaque score.

Generation quality is only half the story, so the pipeline also captures
**retrieval-stage metrics**:

- **Context precision** — how much of the retrieved context is actually relevant.
- **Context recall** — how much of the relevant context was successfully
  retrieved.
- **Context relevance** — how on-topic the retrieved set is for the query.

Together these separate "the retriever gave us bad material" from "the generator
misused good material."

<<TODO: note the judge model(s) and prompting strategy used, scoring scale (e.g.
0–1 or 1–5), and any calibration / agreement checks against human labels — only
what's cleared to share.>>

## Architecture

```
            ┌──────────────┐     traces      ┌─────────────┐
   query ──▶│ RAG assistant│ ───────────────▶│   Langfuse  │
            └──────┬───────┘                 │ (tracing /  │
                   │ retrieved context +     │ observability)
                   │ generated answer        └──────┬──────┘
                   ▼                                 │
        ┌──────────────────────┐                     │ pulls runs
        │ Decomposed evaluators│                      ▼
        │  • Relevance         │            ┌────────────────────┐
        │  • Helpfulness       │            │ GitHub Actions CI  │
        │  • Correctness       │  scores ──▶│  • run eval suite  │
        │  • Hallucination     │            │  • LLM reasoning   │
        │  • retrieval metrics │            │    layer flags     │
        └──────────────────────┘            │    regressions     │
                                            │  • run-vs-run diff │
                                            └────────────────────┘
```

- **Tracing & observability — Langfuse.** Every assistant call is traced, so each
  evaluated answer is linked back to its inputs, retrieved context, and
  generation, making scores debuggable rather than just numbers.
- **CI/CD — GitHub Actions.** The evaluators run as part of CI so each change is
  scored automatically against a fixed evaluation set.
- **LLM reasoning layer for regression detection.** Beyond raw thresholds, an
  LLM reasoning step interprets score movements to flag *meaningful* regressions
  and summarize *why* a run got worse, reducing false alarms from noise.
- **Run-vs-run comparison tooling.** Two runs can be compared directly —
  per-dimension, per-example — to see exactly what improved or regressed between
  changes.

<<TODO: fill in concrete architecture specifics that are cleared to share —
evaluation dataset size/composition, how thresholds are set, where results are
stored, and how this connects to the deployment workflow.>>

## Results

<<TODO: insert eval scores once cleared as shareable.>>

Suggested things to cover once approved:

- baseline vs. current scores per dimension,
- regressions caught in CI before reaching production,
- reduction in manual review effort,
- any human-vs-judge agreement figures that validate the approach.

## Lessons learned

<<TODO>>

Prompts to draw from:

- What did decomposing the judge buy you over a single score?
- Where did LLM-as-a-Judge prove unreliable, and how did you mitigate it?
- What surprised you about retrieval vs. generation as failure sources?
- What would you change about the CI integration next time?
