# Functional UAT Checklist - PoC 52: Search Ads Auction Simulator

This checklist verifies the functional requirements for the Search Ads Auction Simulator.

## 1. Core Functionality
- [ ] **Data Loading:** Application loads data from the FastAPI backend on initialization.
- [ ] **Fallback Mechanism:** Application correctly falls back to `mock_data.json` if the backend is unreachable.
- [ ] **Auction Simulation:** Bid multiplier, quality weight, and budget pressure sliders correctly update the auction results.
- [ ] **Rank Logic:** Advertisers are correctly ranked based on Ad Rank (Max Bid * Quality Score).
- [ ] **CPC Calculation:** CPC is calculated using the GSP (Generalized Second-Price) intuition and reflects changes in quality scores and competitor ranks.

## 2. Interactive Elements
- [ ] **Filters:** Sector filter correctly narrows down the auction table and chart data.
- [ ] **Sliders:** All three sliders (Bid, Quality, Budget) provide immediate feedback and update the state without page refresh.
- [ ] **Tooltips/Insights:** Advertiser-specific insights correctly explain the relationship between CPC, rank, and quality score.
- [ ] **Data Download:** "Download Sample Data" button generates and downloads a valid JSON file.

## 3. Experience & UI
- [ ] **Responsive Design:** Dashboard layout adapts to mobile, tablet, and desktop screens.
- [ ] **Loading States:** A clear loading indicator is shown while fetching auction data.
- [ ] **Visual Feedback:** Chart (CPC vs Margin) updates smoothly when parameters change.
- [ ] **Sidebar Storytelling:** "Why This Matters" and "Who Controls the Rail" sections provide clear context for the simulation.

## 4. Edge Cases & Data Correctness
- [ ] **Zero/Negative Inputs:** Backend handles minimum/maximum slider values without crashing.
- [ ] **No Results:** Sector filter handles cases where no advertisers match the criteria (if applicable).
- [ ] **Data Accuracy:** Metrics (Avg CPC, Total Margin, Capture Score) match the visible data in the table.

---
**Status:** Pending full re-run after fallback data correction
**Date:** 2026-06-30
**Tester:** Codex
