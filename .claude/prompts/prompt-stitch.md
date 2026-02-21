Design a modern, minimal web application called **"Proba-Map"**, a learning platform for probability topics. The UI should be clean, black-and-white themed, with green used only for progress and success states.

---

# 🎨 GLOBAL DESIGN

- Theme: Minimal, dark/light neutral (black, white, gray)
- Accent color: Green (used for progress bars, success states, completed items)
- Typography: Clean, modern (similar to Notion / Linear / Vercel style)
- Components style: Rounded corners, soft shadows, subtle borders
- Design system similar to: shadcn/ui

---

# 🧭 NAVIGATION

Create a **top navigation bar** (sticky):

Left:

- App name: "Proba-Map"

Center:

- Roadmap
- Exercises
- Profile

Right:

- User avatar icon

---

# 📄 PAGE 1 — ROADMAP

## Goal:

Display a structured learning roadmap (like NeetCode), not a random graph.

## Layout:

- Centered main area with a **structured graph (grid/tree layout)**
- Nodes connected from left to right (learning progression)

## Nodes (Topics):

Each node represents a topic (e.g. Combinatorics, Bayes, Markov Chains)

Each node should include:

- Title
- Small horizontal progress bar (green)

## Node States:

- Not started → gray border
- In progress → green border
- Completed → filled green or strong green border

## Interaction:

- On click → open a **right-side drawer (sheet panel)**

---

## Drawer (Right Panel)

### Header:

- Topic title
- Progress (e.g. "6 / 12 exercises completed")

### Body:

Display a table of exercises:

Columns:

- Exercise name
- Difficulty (Easy / Medium / Hard)
- Status (Not started / In progress / Solved)

### Features:

- Click on exercise → navigate to Exercise page

- Filter options:
    - All
    - Unsolved
    - Solved

- Button: "Start next exercise"

---

# 📄 PAGE 2 — EXERCISE

## Goal:

Focused page for solving a single exercise

## Layout:

- Centered content
- Clean reading experience

---

## Top Bar:

- Exercise title
- Difficulty badge (Easy / Medium / Hard)
- Button: "Mark as solved"
- Navigation arrows (previous / next)
- Icon button → opens problem list panel

---

## Problem List (Toggle Panel):

- Opens as overlay or side panel
- List of exercises in the current topic
- Each item shows:
    - Name
    - Status

- Click → navigate to another exercise

---

## Content Sections:

### 1. Problem Description

- Clean text (support markdown formatting)

---

### 2. Hints (Accordion)

- Collapsed by default
- Multiple hints:
    - Hint 1
    - Hint 2
    - Final hint

---

### 3. Solution (Hidden)

- Button: "Show Solution"
- When clicked:
    - Reveal full explanation

- Optional: confirmation before revealing

---

## Extra:

- Show progress indicator (e.g. "Exercise 3 / 12")

---

# 📄 PAGE 3 — PROFILE

## Goal:

Show user progress and statistics (like LeetCode)

---

## Main Card:

Display solved problems by difficulty:

- Easy: X / Total
- Medium: X / Total
- Hard: X / Total

Each with:

- Progress bar (green shades)

---

## Additional Stats:

- Total solved problems
- Completion percentage

---

## Optional:

- Activity heatmap (like GitHub contributions)
- Current streak

---

# 🧱 COMPONENTS TO USE

- Button
- Card
- Progress bar
- Badge (difficulty)
- Table
- Drawer (Sheet)
- Accordion
- Tabs (optional)

---

# 🎯 UX REQUIREMENTS

- Smooth transitions
- Clear visual hierarchy
- Minimal distractions
- Focus on learning experience

---

# ⚠️ STATES TO HANDLE

- Loading state
- Empty state
- Error state

---

# 📱 RESPONSIVENESS

- Desktop-first
- Should adapt to tablet
- Mobile optional (stack layout)

---

# 🎯 FINAL GOAL

The app should feel like a mix of:

- NeetCode (structured roadmap)
- LeetCode (exercise solving + stats)
- Notion (clean UI)

Focus on clarity, simplicity, and user progress tracking.
