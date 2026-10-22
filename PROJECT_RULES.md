# AlgoPlay Permanent Architecture & Design Rules

Whenever implementing new phases, renderers, problems, or features in AlgoPlay, always strictly follow these core rules:

## 1. Problem Statement Dropdown
- Every problem page must feature a collapsible/expandable `Problem Statement ▼` dropdown.
- It displays the full problem description, constraints, and active test case without cluttering or shifting the animation canvas.

## 2. Multi-Language Support & Synchronization
- Every problem must provide idiomatic solutions in **JavaScript, TypeScript, Python, Java, and C++**.
- **Harmonized Variable Names**: All languages must use the exact same variable identifiers as the execution engine (`left`, `right`, `mid`, `nums`, `target`, `prices`, `minPrice`, `chars`, etc.) so pointers and step captions remain consistent.
- **Synchronized Line Highlighting**: Maintain a `lineMap` per language so that execution in the JS worker accurately highlights the corresponding line in Python, Java, C++, TypeScript, or JavaScript.

## 3. Pure Code Display (Hide Emit Points on UI)
- The UI code panel must **never display raw engine instrumentation or emit calls** like `note(...)`.
- Use `getCleanDisplayCode` to strip emit points and preserve exact line mapping between raw AST steps and clean display lines.

## 4. Playback Speed Controls
- Speed control must feature a continuous range slider spanning **`0.1x` (slowest) to `1.0x` (standard)** in `0.05x` increments.
- Include a live speed readout badge and quick preset jump buttons (`0.1x`, `0.25x`, `0.5x`, `0.75x`, `1.0x`).

## 5. Design Tokens (Neo-Brutalist Doodle)
- **All colors, borders, shadows, and fonts must originate strictly from `src/lib/tokens.ts`**.
- Thick black borders (`border-3 border-ink`), hard offset shadows (`4px 4px 0px #121212`), high contrast, doodle feel.
- Arcade touches (levels, XP, confetti) strictly in navigation and progress areas—never covering or obscuring animations.

## 6. Strict Decoupling & Reusability
- Solutions never draw anything; they only run and produce deterministic immutable `Step[]`.
- Renderers are reusable per data structure (Array, Linked List, Tree, Graph, Grid, DP Table, Stack/Queue, Heap), never per problem.
- Strict TypeScript with zero `any`.
