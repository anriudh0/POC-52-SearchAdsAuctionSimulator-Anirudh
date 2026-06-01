# TASKS.md
## PoC #52: Search Ads Auction Simulator - Development Tasks

This document outlines the development tasks for PoC #52, "Search Ads Auction Simulator," following the "Backend First" execution protocol.

### Phase 1: Backend Development (FastAPI)

-   **Task 1.1: Setup FastAPI Project and Virtual Environment**
    -   Initialize a Python virtual environment (`venv`).
    -   Install FastAPI and Uvicorn.
    -   Create a basic FastAPI application structure.
    -   Implement a root endpoint (`/`) returning a simple "Hello World" or project status.
    -   *Expected Output:* Running FastAPI application.
    -   **Status:** Completed

-   **Task 1.2: Implement Mock Data Generation**
    -   Develop a module or utility to generate synthetic data for:
        *   Keywords
        *   Bids
        *   Click-Through Rates (CTR)
        *   Quality Scores
    -   Ensure the mock data is well-labeled and realistic enough for simulation.
    -   *Expected Output:* Python functions/classes capable of generating structured mock data.
    -   **Status:** Completed

-   **Task 1.3: Develop Auction Simulation Logic**
    -   Implement the core auction simulation logic based on:
        *   Keyword bidding
        *   Quality score
        *   Rank calculation
        *   CPC outcome determination
        *   Margin impact calculation
    -   Ensure the logic can accept parameters (e.g., bid adjustments, quality score inputs) to simulate different scenarios.
    -   *Expected Output:* Python functions/classes encapsulating the auction simulation.
    -   **Status:** Completed

-   **Task 1.4: Define and Implement FastAPI Endpoints**
    -   Create FastAPI endpoints to:
        *   `GET /auction/simulate`: Accepts simulation parameters and returns the results (auction table, CPC outcomes, margin impact, etc.).
        *   Potentially other endpoints for initial data or configuration.
    -   Ensure the API returns structured JSON that can be easily consumed by the frontend.
    -   Implement the mock fallback mechanism: if the simulation logic fails or takes too long, return data from a local `mock_data.json`.
    -   *Expected Output:* Functional FastAPI endpoints serving simulation results.
    -   **Status:** Completed

-   **Task 1.5: Backend Testing**
    -   Write unit tests for mock data generation and auction simulation logic.
    -   Write integration tests for FastAPI endpoints.
    -   *Expected Output:* Passing test suite for the backend.
    -   **Status:** Completed

### Phase 2: Frontend Development (Next.js)

-   **Task 2.1: Setup Next.js Project**
    -   Initialize a Next.js 14+ project with TypeScript, Tailwind CSS, and Shadcn/ui.
    -   Configure the project for the App Router.
    -   Set up the basic page structure for the dashboard.
    -   *Expected Output:* Basic Next.js project with styling and component library integrated.
    -   **Status:** Completed

-   **Task 2.2: Implement Base Layout and Visual Identity**
    -   Apply the Real Rails Visual DNA:
        *   Background: `#030712` (Obsidian Black)
        *   Surface/Cards: `#0B1117` (Deep Navy Grey)
        *   Accent Primary: `#38BDF8` (Electric Cyan)
        *   Accent Secondary: `#818CF8` (Indigo)
        *   Borders: `#1F2937` (Slate-800), 1px width.
    -   Implement the 2-column split layout (Main Stage 70%, Intelligence Sidebar 30%).
    -   *Expected Output:* Visually compliant base layout.
    -   **Status:** Completed

-   **Task 2.3: Develop Intelligence Sidebar**
    -   Implement the sidebar with:
        *   Section A: PoC Title ("Search Ads Auction Simulator") & High-level Metric placeholder.
        *   Section B: "Why This Matters" content ("Explains why demand capture has its own hidden rails.").
        *   Section C: "Who Controls the Rail" content ("The invisible hand of the platform's algorithms governs the search ad auction, setting the stage for advertisers to strategically contend for visibility through optimized bids and quality scores.").
        *   Section D: Placeholder for Functional Filters & Tooltips.
        *   Section E: Placeholder for "Download Sample Data" button.
    -   *Expected Output:* Fully structured intelligence sidebar with static content.
    -   **Status:** Completed

-   **Task 2.4: Integrate with FastAPI Backend**
    -   Create data adapters or services to fetch data from the FastAPI endpoints.
    -   Implement error handling and the mock fallback mechanism on the frontend.
    -   *Expected Output:* Frontend successfully fetching data from the backend (or mock data).
    -   **Status:** Completed

-   **Task 2.5: Implement Main Stage Visualizations**
    -   Develop interactive components for the main stage:
        *   Auction table displaying simulation results (using TanStack Table).
        *   Bid sliders for user input.
        *   Charts/graphs for CPC outcomes and margin impact (using D3.js, Plotly, or Apache ECharts).
        *   Display of rank logic.
    -   Ensure responsiveness and cinematic interaction.
    -   *Expected Output:* Interactive visualizations reflecting backend simulation.
    -   **Status:** Completed

-   **Task 2.6: Implement Filters and Tooltips**
    -   Add functional filters to the intelligence sidebar that interact with the main stage visualizations and simulation parameters.
    -   Implement tooltips for clarity and explanation.
    -   *Expected Output:* Interactive filters and informative tooltips.
    -   **Status:** Completed

-   **Task 2.7: Implement Download Sample Data Feature**
    -   Add functionality to the "Download Sample Data" button in the sidebar to export current simulation data.
    -   *Expected Output:* Working data download feature.
    -   **Status:** Completed

### Phase 3: Finalization and Review

-   **Task 3.1: Comprehensive Testing and Debugging**
    -   Perform end-to-end testing of the application.
    -   Address any bugs or issues found.
    -   Ensure responsiveness across different screen sizes.
    -   *Expected Output:* Stable, bug-free application.
    -   **Status:** Pending

-   **Task 3.2: Update README.md**
    -   Create a comprehensive `README.md` file including:
        *   Project title and description.
        *   Setup instructions (backend and frontend).
        *   How to run the application.
        *   Overview of features.
        *   Screenshot references (once screenshots are available).
    -   *Expected Output:* Complete and accurate `README.md`.
    -   **Status:** In Progress

-   **Task 3.3: Capture Screenshots**
    -   Generate high-quality screenshots of the running application for documentation and presentation.
    -   *Expected Output:* `screenshots/` folder populated with relevant images.
    -   **Status:** Pending

-   **Task 3.4: Prepare Mock Data Files**
    -   Ensure `mock_data.json` files are properly structured and available for the mock fallback mechanism.
    -   *Expected Output:* Robust mock data files.
    -   **Status:** Completed

