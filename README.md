# Assignment: AI TEAM — Team Cognova

> **Interactive Algorithm Visualizer & Pedagogical Stepping Engine**  
> *Coursework Assignment & Project Extension: From N-Queens Backtracking to the LeetCode Top Interview 150.*

---

## 📌 Table of Contents
1. [Team Information](#-team-information)
2. [Coursework Assignment: N-Queens Problem (#51 & #52)](#-coursework-assignment-n-queens-problem-51--52)
   - [Backtracking & Pruning Logic](#backtracking--pruning-logic)
   - [Interactive 2D Chessboard Visualizer](#interactive-2d-chessboard-visualizer)
   - [Solving the "1,500-Step" Pedagogical Dilemma (Key Decisions Mode)](#solving-the-1500-step-pedagogical-dilemma-key-decisions-mode)
   - [Interactive Discovered Solutions Gallery](#interactive-discovered-solutions-gallery)
3. [Project Extension: AlgoPlay (LeetCode Top Interview 150)](#-project-extension-algoplay-leetcode-top-interview-150)
   - [The Core Philosophy](#the-core-philosophy)
   - [Implemented Problem Categories (44+ Solved)](#implemented-problem-categories-44-solved)
   - [Multi-Language Synchronized Code Viewer](#multi-language-synchronized-code-viewer)
4. [Current Project Status: What's In Progress](#-current-project-status-whats-in-progress)
5. [System Architecture & Tracing Engine](#-system-architecture--tracing-engine)
6. [Tech Stack](#-tech-stack)
7. [Player Controls & Keyboard Shortcuts](#-player-controls--keyboard-shortcuts)
8. [Local Setup & Testing Guide](#-local-setup--testing-guide)

---

## 👥 Team Information

* **Team Name:** Team Cognova
* **Project Track:** AI TEAM — Algorithm Animation & Interactive Education Engine
* **Project Code:** AlgoPlay
* **Team Members:** RAJ YASH GUPTA (BTECH/15103/24)
                    VERTIKA (BTECH/15111/24)
                    ANJALI KUMARI (BTECH/15010/24)
                    RAM KISHAN MEHTA (BTECH/15016/24)
                    NISHANT KUMAR (BTECH/15130/24)

---

## 👑 Coursework Assignment: N-Queens Problem (#51 & #52)

As part of the core AI coursework, we implemented and deeply animated the classic **N-Queens Puzzle** ([LeetCode #51: N-Queens](https://leetcode.com/problems/n-queens/) and [LeetCode #52: N-Queens II](https://leetcode.com/problems/n-queens-ii/)).

### Problem Summary
Given an integer $N$, place $N$ queens on an $N \times N$ chessboard such that no two queens attack each other. A queen can attack horizontally, vertically, and diagonally in all 8 directions.
* **#51 (N-Queens):** Return all distinct valid board arrangements.
* **#52 (N-Queens II):** Return the total count of distinct valid solutions.

```
Sample Solution for N = 4:
Solution 1:               Solution 2:
. Q . .                   . . Q .
. . . Q                   Q . . .
Q . . .                   . . . Q
. . Q .                   . Q . .
```

### Backtracking & Pruning Logic
The solution employs recursive depth-first search (DFS) with state tracking sets:
* `cols`: Set of columns currently attacked by placed queens.
* `diag1` ($r - c$): Main diagonal ray indices.
* `diag2` ($r + c$): Anti-diagonal ray indices.

At each row $r$, the algorithm tests candidate column $c \in [0, N-1]$. If any ray is in conflict, the branch is **pruned immediately**. When $r == N$, a full safe configuration is recorded; otherwise, it backtracks by undoing the placement.

```
                     Backtrack Search Tree
                         Row 0 [Try Col 0..N-1]
                        /       \          \
                  Col 0           Col 1      ...
                 /    \          /     \
            (Attacked) Col 2   Col 3  (Attacked)
                        |        |
                     [Pruned]  Row 2 ...
```

---

### Interactive 2D Chessboard Visualizer

Rather than a static grid, we engineered a dedicated **`GridRenderer`** for board games and 2D arrays:
1. **8-Direction Attack Rays:** When candidate square $(r, c)$ is evaluated, the visualizer casts soft amber attack rays along its row, column, and both diagonals to illustrate queen sightlines.
2. **Real-time Conflict Crosshairs:**
   *  **Attacked Square:** Displays animated coral crosshairs with an alert badge (`⚔️ Conflict at (r, c)`) showing exactly which diagonal/column is threatened.
   *  **Safe Square:** Highlights in vibrant yellow with (`✓ Testing (r, c)`).
3. **Framer Motion Spring Physics:** Queens animate into position with spring bounce and rotation, and exit smoothly during backtracking.
4. **Zoom & Pan Controls:** Built-in zoom controls (65% to 140%) to handle both small boards ($N=4$) and larger boards ($N=8+$).

---

### Solving the "1,500-Step" Pedagogical Dilemma (Key Decisions Mode)

#### The Problem
In standard AST line-by-line tracing, checking every sub-expression, Set lookup, and `continue` statement across $N=5$ generates **1,505 execution steps** ($428$ steps even for $N=4$). Watching 1,500 micro-steps causes cognitive overload and obscures the high-level intuition of backtracking.

#### The Solution: Pedagogical Dual-Mode Stepping
We introduced **Key Decisions Mode** in the player store and UI:
* 🎯 **Key Decisions Only:** Filters out all non-essential statements (`continue;`, variable arithmetic) and steps strictly between actual algorithmic decisions:
  * **Queen Placed:** Row advances down.
  * **Pruning / Conflict:** Attack detected.
  * **Backtracking (Undo):** Queen removed from square.
  * **Valid Solution Discovered:** Celebration milestone.
* **Step Reduction Impact:**
  * **$N=4$:** Cuts **428 micro-steps $\rightarrow$ 68 decision milestones**.
  * **$N=5$:** Cuts **1,505 micro-steps $\rightarrow$ 232 decision milestones**.
* 🏆 **Jump to Solution:** A quick-jump button that skips directly to solved configurations without stepping through dead-end search branches.

---

### Interactive Discovered Solutions Gallery

At the bottom of the chessboard, discovered solutions are rendered in real time as mini $N \times N$ previews. Each card is an interactive button:
* Clicking any solution card (e.g., **Sol #1 Jump ↗**) immediately snaps the visualizer, code line, and scrubber straight to the exact step where that solution was discovered!

---

## 🚀 Project Extension: AlgoPlay (LeetCode Top Interview 150)

Building on the N-Queens engine, we extended the application into **AlgoPlay**: a full-scale algorithm visualizer for the **LeetCode Top Interview 150**.

### The Core Philosophy
1. **Separation of Concerns:** Solution algorithms never draw directly. Solutions run in plain JavaScript and record an immutable execution trace composed of `Step` snapshots.
2. **Reusable Data Structure Renderers:** Renderers are built per *data structure*, not per problem:
   * **`ArrayRenderer`:** 1D array visualization with multi-pointer tracking (`left`, `right`, `slow`, `fast`), sliding windows, and bar heights.
   * **`LinkedListRenderer`:** Nodes, directional arrows, cycle detection loopback edges, and animated relinking.
   * **`TreeRenderer`:** Automatic tidy-tree hierarchical layout, BFS/DFS traversal ordering, node inspection badges, and traversal result output drawer.
   * **`StackQueueRenderer`:** Vertical stack and horizontal queue with push, pop, and enqueue animations.
   * **`GridRenderer`:** 2D grid/board visualizer with coordinate inspection and attack ray tracing.

---

### Implemented Problem Categories (44+ Solved)

| Category | Count | Sample Problems Included | Renderers Used |
| :--- | :---: | :--- | :--- |
| **Backtracking (Assignment)** | 2 | #51 N-Queens, #52 N-Queens II | `GridRenderer` |
| **Array & Two Pointers** | 5 | Two Sum, Two Sum II, Valid Palindrome, Best Time to Buy/Sell Stock, Search Insert Position | `ArrayRenderer` |
| **Stack** | 5 | Valid Parentheses, Simplify Path, Min Stack, Evaluate Reverse Polish Notation, Basic Calculator | `StackQueueRenderer` |
| **Linked List** | 11 | Linked List Cycle, Add Two Numbers, Merge Two Sorted Lists, Copy List with Random Pointer, Reverse Linked List II, Reverse Nodes in k-Group, Remove Nth Node, Remove Duplicates II, Rotate List, Partition List, LRU Cache | `LinkedListRenderer` |
| **Binary Tree (General)** | 14 | Max Depth, Same Tree, Invert Tree, Symmetric Tree, Construct Tree (Pre/In, In/Post), Populating Next Right Pointers, Flatten Tree, Path Sum, Sum Root to Leaf, Max Path Sum, Lowest Common Ancestor, Count Complete Nodes, BST Iterator | `TreeRenderer` |
| **Binary Tree BFS** | 4 | Right Side View, Average of Levels, Level Order Traversal, Zigzag Level Order Traversal | `TreeRenderer` |
| **Binary Search Tree** | 3 | Minimum Absolute Difference in BST, Kth Smallest Element in BST, Validate BST | `TreeRenderer` |

---

### Multi-Language Synchronized Code Viewer

Every problem in AlgoPlay features clean code implementations across **5 major programming languages**:
1. **JavaScript** (traced & executed)
2. **TypeScript**
3. **Python**
4. **Java**
5. **C++**

#### Synchronized Line Mapping
* Internal engine hooks (such as `note(...)`) are stripped from display code.
* A line-mapping table (`rawToDisplayLine`) keeps the active line highlighted simultaneously across all 5 languages without drifting, verified by automated test suites.

---

## 🚧 Current Project Status: What's In Progress

AlgoPlay is structured in iterative phases:

* [x] **Phase 1: Foundation & Arrays** *(Completed)*
  * AST Babel transformation engine, Web Worker execution isolation, and `ArrayRenderer`.
  * Top LeetCode Array & Two-Pointer problems with multi-language line mapping.
* [x] **Phase 2: Pointer, Tree, Stack & Backtracking Structures** *(Completed)*
  * Node ID registry for persistent object graph identity across time steps.
  * `LinkedListRenderer`, `TreeRenderer`, `StackQueueRenderer`, and `GridRenderer`.
  * 37+ LeetCode problems across Stack, Linked List, Tree BFS/DFS, BST, and N-Queens.
  * Dual-mode stepping (**Key Decisions Mode** + **Micro-step Mode**).
* [ ] **Phase 3: Graphs, Dynamic Programming & Custom Problem Generator** *(In Progress 🚧)*
  * **`GraphRenderer`:** Adjacency list and matrix visualizations with cycle detection and topological sort.
  * **`DPRenderer`:** 2D dynamic programming grid table with memoization state transitions.
  * **`IntervalRenderer`:** 1D range timelines for interval scheduling and merging.
  * **User Custom Code Playground:** Allow students to paste arbitrary JavaScript code and auto-generate step-by-step animations on the fly.

---

## 🏗 System Architecture & Tracing Engine

```
[ Problem Input ]
       │
       ▼
[ Babel AST Instrumenter ] ──> Injects __line(), __assign(), __wrapArray()
       │
       ▼
[ Sandboxed JS Execution ] ──> NodeIdRegistry maintains stable object identity
       │
       ▼
[ Immutable Trace Steps ] ──> Step[]: { line, vars, structures, highlights, note }
       │
       ▼
[ Zustand Player Store ] ──> Scrubber, Key Decisions Mode, Speed Control
       │
       ▼
[ Reusable UI Renderers ] ──> Framer Motion + Neo-Brutalist HUD Canvas
```

---

## 💻 Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React 18)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero `any` tolerance)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with centralized Neo-brutalist design tokens
* **Animations:** [Framer Motion](https://www.framer.com/motion/) (Spring physics, pop layouts)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **AST Parsing & Code Gen:** [@babel/parser](https://babel.dev/), `@babel/traverse`, `@babel/generator`
* **Icons:** [Lucide React](https://lucide.dev/)
* **Testing:** [Vitest](https://vitest.dev/) (174 unit and integration tests passing)

---

## 🎮 Player Controls & Keyboard Shortcuts

| Shortcut | Action | Description |
| :---: | :--- | :--- |
| <kbd>Space</kbd> | **Play / Pause** | Toggles continuous playback |
| <kbd>→</kbd> | **Step Forward** | Moves forward by 1 step (or 1 key decision) |
| <kbd>←</kbd> | **Step Backward** | Moves backward by 1 step (or 1 key decision) |
| <kbd>Shift</kbd> + <kbd>→</kbd> | **Next Decision** | Jumps directly to next queen placement/backtrack |
| <kbd>Shift</kbd> + <kbd>←</kbd> | **Prev Decision** | Jumps directly to previous queen placement/backtrack |
| <kbd>K</kbd> | **Toggle Key Steps** | Toggles between Key Decisions Mode and All Code Lines |
| <kbd>R</kbd> | **Restart** | Resets playback to Step 0 |
| **Slider** | **Speed Control** | Smooth speed adjustment from 0.10x (slow) to 1.00x |

---

## 🛠 Local Setup & Testing Guide

### Prerequisites
* Node.js 18.x or 20.x
* npm 9+ or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/<YOUR_GITHUB_USERNAME>/algoPlay.git
cd algoPlay

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
* Access the assignment directly at: [http://localhost:3000/assignment](http://localhost:3000/assignment)
* Or browse all problems from the homepage directory.

### Running Verification Tests
```bash
# Run unit & trace integration tests (174 tests)
npm test

# Run strict TypeScript typecheck
npm run typecheck

# Build for production
npm run build
```

---

*Authored by Team Cognova — AI Team Coursework Assignment & Extended Project.*
