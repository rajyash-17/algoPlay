# Assignment: AI(CS24307) TEAM — Cognova

<div align="center">

### 🎮 [AlgoPlay Live Demo: algoplay-eta.vercel.app](https://algoplay-eta.vercel.app) 🚀

**Interactive Algorithm Visualizer & Pedagogical Stepping Engine**  
*AI Team Coursework Assignment (N-Queens Backtracking) & Extended Platform (LeetCode Top Interview 150)*

[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://algoplay-eta.vercel.app)
[![Assignment](https://img.shields.io/badge/Assignment-N--Queens%20%2351%20%26%20%2352-FFE600?style=for-the-badge&logo=crown&logoColor=black&labelColor=121212)](https://algoplay-eta.vercel.app/assignment)
[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tests-181%2F181%20Passing-00F0A0?style=for-the-badge&logo=vitest&logoColor=black&labelColor=121212)](https://vitest.dev/)

[**🌐 Live Application**](https://algoplay-eta.vercel.app) • [**👑 Direct Assignment Page**](https://algoplay-eta.vercel.app/assignment) • [**📚 Problem Catalog**](https://algoplay-eta.vercel.app/#catalog)

</div>

---

## 📌 Table of Contents
1. [Team Information](#-team-information)
2. [Live Deployment](#-live-deployment)
3. [🎨 Design System: "Neo-Brutalist Doodle & Arcade" Theme](#-design-system-neo-brutalist-doodle--arcade-theme)
   - [Aesthetic Philosophy](#aesthetic-philosophy)
   - [Color Palette Tokens](#color-palette-tokens)
   - [Brutalist Geometry & Tactile Physics](#brutalist-geometry--tactile-physics)
   - [State-to-Color Pedagogical Mapping](#state-to-color-pedagogical-mapping)
4. [Coursework Assignment: N-Queens Problem (#51 & #52)](#-coursework-assignment-n-queens-problem-51--52)
   - [Backtracking & State Space Pruning](#backtracking--state-space-pruning)
   - [Interactive 2D Chessboard Visualizer](#interactive-2d-chessboard-visualizer)
   - [Solving the "1,500-Step" Pedagogical Dilemma (Key Decisions Mode)](#solving-the-1500-step-pedagogical-dilemma-key-decisions-mode)
   - [Interactive Discovered Solutions Gallery](#interactive-discovered-solutions-gallery)
5. [Project Extension: AlgoPlay (LeetCode Top Interview 150)](#-project-extension-algoplay-leetcode-top-interview-150)
   - [Core Architecture & Philosophy](#core-architecture--philosophy)
   - [Implemented Problem Categories (44+ Solved)](#implemented-problem-categories-44-solved)
   - [5-Language Drift-Free Synchronized Code Viewer](#5-language-drift-free-synchronized-code-viewer)
6. [Roadmap & What's In Progress](#-roadmap--whats-in-progress)
7. [System Architecture & Tracing Pipeline](#-system-architecture--tracing-pipeline)
8. [Player Controls & Keyboard Shortcuts](#-player-controls--keyboard-shortcuts)
9. [Local Development & Testing](#-local-development--testing)

---

## 👥 Team Information

* **Team Name:** Cognova
* **Course Code:** AI (CS24307)
* **Project Track:** AI TEAM — Algorithm Animation & Interactive Education Engine
* **Project Code:** AlgoPlay (`algoplay@0.1.0`)
* **Live Deployment:** [https://algoplay-eta.vercel.app](https://algoplay-eta.vercel.app)
* **Assignment Direct Route:** [https://algoplay-eta.vercel.app/assignment](https://algoplay-eta.vercel.app/assignment)

### Team Members
* **RAJ YASH GUPTA** (`BTECH/15103/24`)
* **VERTIKA** (`BTECH/15111/24`)
* **ANJALI KUMARI** (`BTECH/15010/24`)
* **RAM KISHAN MEHTA** (`BTECH/15016/24`)
* **NISHANT KUMAR** (`BTECH/15130/24`)

---

## 🚀 Live Deployment

The project is deployed and hosted on **Vercel**:

* **Main Application URL:** [https://algoplay-eta.vercel.app](https://algoplay-eta.vercel.app)
* **N-Queens Assignment Focus:** [https://algoplay-eta.vercel.app/assignment](https://algoplay-eta.vercel.app/assignment) (or click the **👑 N-Queens Assignment** pill in the top navigation bar)
* **Zero Cold Starts:** Built with the Next.js 14 App Router, dynamic code execution runs in-browser via an isolated Babel AST tracing sandbox with zero external API dependencies.

---

## 🎨 Design System: "Neo-Brutalist Doodle & Arcade" Theme

AlgoPlay rejects sterile, generic corporate dashboards in favor of a signature **Neo-Brutalist Doodle with Retro Arcade Touches** design language.

### Aesthetic Philosophy
Traditional algorithm visualizers are either overly dry or visually noisy. Our theme combines:
1. **High-Contrast Neo-Brutalism:** Heavy solid black borders (`2px`–`4px #121212`), high-contrast flat backgrounds, and hard zero-blur offset drop shadows create instantaneous visual clarity.
2. **Playful Doodle Character:** Hand-drawn parchment textures, expressive badges, and friendly typography turn intimidating LeetCode problems into approachable, interactive puzzle toys.
3. **Subtle Arcade Touches:** Level progression badges, confetti celebration on problem completion, and arcade-style HUD elements motivate learning without cluttering the visualization itself.

---

### Color Palette Tokens
All colors, borders, shadows, and typography are governed by a centralized design token system ([tokens.ts](file:///Users/rajyash/projects/algoPlay/src/lib/tokens.ts)):

| Token | Hex | Role & Meaning |
| :--- | :---: | :--- |
| **Canvas** | `#FAF7F0` | Warm tactile newsprint background (replaces harsh sterile white) |
| **Surface** | `#FFFFFF` | Crisp white card surface with hard drop shadows |
| **Surface Muted** | `#F4EFE6` | Secondary panel backgrounds and code gutters |
| **Doodle Ink** | `#121212` | Solid black outlines, primary typography, and pointer pills |
| **Electric Canary** | `#FFE600` | **Primary Brand Color**: Active pointers, inspected cells, play triggers |
| **Bubblegum Pink** | `#FF5E7E` | **Mutations**: Array swaps, modified elements, backtracked states |
| **Neo-Cyan** | `#4DEEEA` | **Comparisons**: Evaluated elements, binary search midpoints |
| **Mint Neon Green** | `#00F0A0` | **Success**: Placed queens, completed targets, valid states |
| **Tangerine Orange** | `#FFA800` | **Alerts**: Medium difficulty, active ray scanning |
| **Coral Red** | `#FF3366` | **Danger**: Hard difficulty, attack ray conflicts |
| **Electric Lavender** | `#B388FF` | **Milestones**: Sliding window brackets, solved configurations |

---

### Brutalist Geometry & Tactile Physics
* **Zero-Blur Hard Shadows:** Unlike standard blurred CSS shadows, our elements use crisp, comic-style offset shadows:
  ```css
  box-shadow: 4px 4px 0px #121212;   /* Standard Card Shadow */
  box-shadow: 6px 6px 0px #121212;   /* Heavy Modal / Board Shadow */
  ```
* **Mechanical Tactile Feedback:** Buttons physically depress into the canvas on interaction:
  ```css
  button:hover { transform: translate(1px, 1px); box-shadow: 2px 2px 0px #121212; }
  button:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0px #121212; }
  ```
* **Heavy Borders:** Consistent `2px solid #121212` up to `4px solid #121212` brutalist outlines on all components, nodes, and boards.

---

### State-to-Color Pedagogical Mapping
Every data structure renderer shares identical semantic colors:
* 🟨 **Visited / Current Pointer:** Canary Yellow (`#FFE600`)
* 🟦 **Compared / Read:** Neo-Cyan (`#4DEEEA`)
* 🟥 **Modified / Swapped:** Bubblegum Pink (`#FF5E7E`)
* 🟩 **Settled / Sorted / Target Match:** Mint Neon Green (`#00F0A0`)
* 🟪 **Sliding Window / Solved Set:** Electric Lavender (`#B388FF`)

---

## 👑 Coursework Assignment: N-Queens Problem (#51 & #52)

Direct link: [**algoplay-eta.vercel.app/assignment**](https://algoplay-eta.vercel.app/assignment)

As the focal piece of the AI coursework assignment, we implemented and animated the classic **N-Queens Puzzle** ([LeetCode #51: N-Queens](https://leetcode.com/problems/n-queens/) and [LeetCode #52: N-Queens II](https://leetcode.com/problems/n-queens-ii/)).

### Problem Summary
Given an integer $N$, place $N$ queens on an $N \times N$ chessboard such that no two queens attack each other. A queen can attack horizontally, vertically, and along both diagonals.
* **#51 (N-Queens):** Return all distinct valid board arrangements.
* **#52 (N-Queens II):** Return the total count of distinct valid configurations.

```
Sample Output for N = 4 (2 Distinct Solutions):
Solution 1:               Solution 2:
. Q . .                   . . Q .
. . . Q                   Q . . .
Q . . .                   . . . Q
. . Q .                   . Q . .
```

---

### Backtracking & State Space Pruning
The solution executes a recursive depth-first search (DFS) with mathematical state-tracking sets:
* `cols`: Set of columns occupied by placed queens.
* `diag1` ($r - c$): Main diagonal ray indices ($N-1$ down to $1-N$).
* `diag2` ($r + c$): Anti-diagonal ray indices ($0$ up to $2N-2$).

At each row $r$, candidate columns $c \in [0, N-1]$ are inspected. If any ray is in conflict, the branch is **pruned immediately**. When $r == N$, a full safe configuration is recorded; otherwise, it backtracks by undoing the placement.

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

The dedicated **`GridRenderer`** turns abstract recursion into an intuitive board game:
1. **8-Direction Attack Rays:** When candidate square $(r, c)$ is evaluated, the visualizer casts soft amber attack rays along its row, column, and both diagonals to illustrate queen sightlines.
2. **Real-time Conflict Crosshairs:**
   * ⚔️ **Attacked Square:** Displays animated coral crosshairs with an alert badge (`⚔️ Conflict at (r, c)`) indicating which ray is threatened.
   * ✓ **Safe Square:** Highlights in vibrant yellow with (`✓ Testing (r, c)`).
3. **Framer Motion Spring Physics:** Queens pop onto the board with dynamic spring rotation, and gracefully exit during backtracking.
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

### Core Architecture & Philosophy
1. **Separation of Concerns:** Solution algorithms never draw directly. Solutions run in plain JavaScript and record an immutable execution trace composed of `Step` snapshots.
2. **Reusable Data Structure Renderers:** Renderers are built per *data structure*, not per problem:
   * **`ArrayRenderer`:** 1D array visualization with multi-pointer tracking (`left`, `right`, `slow`, `fast`), sliding windows, and bar heights.
   * **`LinkedListRenderer`:** Nodes, directional arrows, cycle detection loopback edges, and animated relinking.
   * **`TreeRenderer`:** Automatic tidy-tree hierarchical layout, BFS/DFS traversal ordering, node inspection badges, and traversal result output drawer.
   * **`StackQueueRenderer`:** Vertical stack and horizontal queue with push, pop, and enqueue animations.
   * **`GridRenderer`:** 2D grid/board visualizer with coordinate inspection and attack ray tracing.

---

### Implemented Problem Categories (44+ Solved)

| Category | Problems | Sample Problems Included | Active Renderer |
| :--- | :---: | :--- | :--- |
| **Backtracking (Assignment)** | 2 | #51 N-Queens, #52 N-Queens II | `GridRenderer` |
| **Array & Two Pointers** | 5 | Two Sum, Two Sum II, Valid Palindrome, Best Time to Buy/Sell Stock, Search Insert Position | `ArrayRenderer` |
| **Stack** | 5 | Valid Parentheses, Simplify Path, Min Stack, Evaluate Reverse Polish Notation, Basic Calculator | `StackQueueRenderer` |
| **Linked List** | 11 | Linked List Cycle, Add Two Numbers, Merge Two Sorted Lists, Copy List with Random Pointer, Reverse Linked List II, Reverse Nodes in k-Group, Remove Nth Node, Remove Duplicates II, Rotate List, Partition List, LRU Cache | `LinkedListRenderer` |
| **Binary Tree (General)** | 14 | Max Depth, Same Tree, Invert Tree, Symmetric Tree, Construct Tree (Pre/In, In/Post), Populating Next Right Pointers, Flatten Tree, Path Sum, Sum Root to Leaf, Max Path Sum, Lowest Common Ancestor, Count Complete Nodes, BST Iterator | `TreeRenderer` |
| **Binary Tree BFS** | 4 | Right Side View, Average of Levels, Level Order Traversal, Zigzag Level Order Traversal | `TreeRenderer` |
| **Binary Search Tree** | 3 | Minimum Absolute Difference in BST, Kth Smallest Element in BST, Validate BST | `TreeRenderer` |

---

### 5-Language Drift-Free Synchronized Code Viewer

Every problem in AlgoPlay features clean code implementations across **5 major programming languages**:
1. **JavaScript** (traced & executed in-engine)
2. **TypeScript**
3. **Python**
4. **Java**
5. **C++**

#### Drift-Free Line Mapping
* Internal engine hooks (such as `note(...)`) are stripped from display code.
* A line-mapping table (`rawToDisplayLine`) keeps the active line highlighted simultaneously across all 5 languages without drifting, verified by automated test suites.

---

## 🚧 Roadmap & What's In Progress

AlgoPlay is built in modular phases:

* [x] **Phase 1: Core Engine & Array/Two Pointers** *(Completed & Shipped)*
  * Babel AST transformation pipeline, immutable state snapshots, and `ArrayRenderer`.
  * Top LeetCode Array & Two-Pointer problems with multi-language line maps.
* [x] **Phase 2: Pointer, Tree, Stack & Backtracking Structures** *(Completed & Shipped)*
  * Node ID registry for permanent object graph identities across steps.
  * `LinkedListRenderer`, `TreeRenderer`, `StackQueueRenderer`, and `GridRenderer`.
  * 37+ LeetCode problems across Stack, Linked List, Tree BFS/DFS, BST, and N-Queens.
  * **Key Decisions Mode** (filtering 1,505 steps $\rightarrow$ 232 moves) + quick solution jumps.
  * Production deployment to Vercel: [algoplay-eta.vercel.app](https://algoplay-eta.vercel.app).
* [ ] **Phase 3: Graphs, Dynamic Programming & Custom Code Generator** *(In Progress 🚧)*
  * **`GraphRenderer`:** Adjacency list and matrix visualizations with cycle detection and topological sort.
  * **`DPRenderer`:** 2D dynamic programming grid table with memoization state transitions.
  * **`IntervalRenderer`:** 1D range timelines for interval scheduling and merging.
  * **User Custom Code Playground:** Allow students to paste arbitrary JavaScript code and auto-generate step-by-step animations on the fly.

---

## 🏗 System Architecture & Tracing Pipeline

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

## 🎮 Player Controls & Keyboard Shortcuts

| Key / Control | Action | Function |
| :---: | :--- | :--- |
| <kbd>Space</kbd> | **Play / Pause** | Toggles continuous animated playback |
| <kbd>→</kbd> | **Step Forward** | Moves forward by 1 step (or 1 key decision) |
| <kbd>←</kbd> | **Step Backward** | Moves backward by 1 step (or 1 key decision) |
| <kbd>Shift</kbd> + <kbd>→</kbd> | **Next Decision** | Jumps directly to next queen placement/backtrack |
| <kbd>Shift</kbd> + <kbd>←</kbd> | **Prev Decision** | Jumps directly to previous queen placement/backtrack |
| <kbd>K</kbd> | **Toggle Key Steps** | Toggles between Key Decisions Mode and All Code Lines |
| <kbd>R</kbd> | **Restart** | Resets playback to Step 0 |
| **Slider** | **Speed Control** | Continuous speed adjustment from 0.10x (slow) to 1.00x |
| **Card Click** | **Jump to Solution** | Snaps to any discovered solution configuration instantly |

---

## 💻 Local Development & Testing

While the app is deployed live at [algoplay-eta.vercel.app](https://algoplay-eta.vercel.app), you can also run it locally:

```bash
# Clone the repository
git clone https://github.com/rajyash-17/algoPlay.git
cd algoPlay

# Install dependencies
npm install

# Run the local development server
npm run dev

# Run all 181 test suites
npm test

# Verify strict TypeScript types (zero errors, no any)
npm run typecheck

# Build for production
npm run build
```

---

<div align="center">
  <b>Team Cognova — AI (CS24307) Coursework Assignment & Extended Platform</b><br />
  Built with Next.js 14, TypeScript, Tailwind, Framer Motion, Zustand & Babel AST Tracing.<br />
  <a href="https://algoplay-eta.vercel.app"><b>algoplay-eta.vercel.app</b></a>
</div>
