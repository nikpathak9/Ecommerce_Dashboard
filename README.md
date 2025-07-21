# Ecommerce Dashboard

A modern, responsive, and animated ecommerce analytics dashboard built with **React**, **Tailwind CSS**, **ShadCN UI**, and **Recharts**. Features theme toggling, skeleton loading states, dynamic routing, and smooth micro-interactions.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open-blue?style=for-the-badge&logo=netlify)](https://e-comm-dash-board.netlify.app/)  
**Try it now:** [https://e-comm-dash-board.netlify.app/](https://e-comm-dash-board.netlify.app/)

## Previw
<img src="https://github.com/user-attachments/assets/6575cc67-c248-4c7a-9c5c-4dcfcb4dc0d8" alt="Dashboard Preview" width="800" />

## Features

### UI/UX
- Fully responsive dashboard layout
- Dark/Light theme toggle with context API
- Subtle micro-interactions (Framer Motions and Tailwind Animations)
- Dynamic routing with `react-router-dom`
- Custom Fallback UI for undefined routes

### Loading States
- Skeleton screens for:
  - Main dashboard
  - Left sidebar
  - Right sidebar
  - Order list (Inside E-Commerce drop down)

### Data Visualization
- Interactive charts using Recharts
- Animated data transitions
- Responsive chart scaling

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- ShadCN UI Components
- Recharts
- Vite

**State Management:**
- Custom Theme Context
- React Router DOM

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nikpathak9/Ecommerce_Dashboard.git
   cd Ecommerce_Dashboard
   ```

2. **Install dependencies**
  ```bash
  npm install
  ```

3. **Run the development server**
  ```bash
  npm run dev
  ```

4. **Run the dev server on http://localhost:5173**

## Design Decisions & Improvements

- **Built reusable and responsive components to ensure consistent design and reduce code duplication.**
- **Implemented a custom ThemeContext to manage dark and light themes dynamically throughout the app.**
- **Added skeleton loaders to improve user experience during data fetch delays and simulate loading animations for better feedback.**
- **Chose Vite for its fast build times**
- **Used Recharts and Shadcn for clean, minimalistic charts with animation support to enhance the dashboard’s UX.**

## Challenges Faced
- **Ensuring all layouts remained fully responsive across different screen sizes, which was crucial for usability, resolved by leveraging Tailwind’s responsive utility classes and testing across multiple viewports to fine-tune layout breakpoints.**

- **Creating a consistent theme toggle experience across nested components, solved by implementing a centralized ThemeContext and ensuring all components consumed the context properly to reflect the correct theme dynamically.**

- **Managing animation resets when switching routes and loading skeletons caused visual inconsistencies, fixed by introducing controlled loading states and delaying skeletons with subtle transitions for a smoother experience.**

- **The animation on charts was not consistent for each render, which was not optimal, solved by generating a random identification key to force consistent animation re-renders.**
