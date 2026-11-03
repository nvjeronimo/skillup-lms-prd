---
id: 039
title: Download a certificate from its page only; cards and rows offer View and Share
date: 2026-11-03
status: accepted
audience: [designer, dev]
track: LMS
phase: 1
---
**Decision** — An issued certificate is downloaded from the certificate page only, where the document is open
(*Download certificate*, beside Share). Every card and row that lists certificates offers View and Share, never
Download: My Certificates rows, the Program certificate card, the course certificate cards on Program ›
Certificates, the Certificate card in the Course Detail sidebar and the Progress tab.

**Why**
- Nelson, 2 Nov 2026, asked why Download had gone from earned certificates. It had gone without a decision, as a
  side effect of the 30 Oct redesigns (prototype PRs 437, 438), and the rule had diverged: no Download on the
  ledger rows and the program card, Download still on the course cards, the DS Certificate-Card and the page.
- Of the two options offered (A: no Download anywhere; B: Download on the page only) he chose B: the lists stay
  light, and the download sits where the learner sees what they are saving.

**Source** — Nelson in the prototype review session, 2 Nov 2026 ("vai com a B").

**edX basis** — Open edX renders a web certificate at `/certificates/{verify_uuid}`, not a PDF (CHANGELOG,
15 Sep 2026). On the page, Download is print / save as PDF from the open document; a real PDF stays vendor work
(the open vendor questions). The `download_url` named in the 15 Sep course-states note is to be confirmed with the vendor.

**Design** — DS `Certificate-Card` 1.7: Status=Earned-Certificate has View (fills) + Share; anatomy marker 6 and
its legend row removed. ICP: the Earned Certificate-Card instances follow after the publish.

**Dev impact** — `CertificateCard` (prototype PR 455) drops the Download button; `CertificatePageView` keeps
*Download certificate*.

**Alternatives rejected** — A, no Download anywhere (View already opens the printable page, but learners look for
the word); Download on every card (three equal buttons on a small card, and a "download" that is a print dialog).
