# Theme System & UI Components

## 🌗 Dark / Light Mode
A system-wide theme engine that respects user preference and ensures a high-quality visual experience.

*   **State Persistence:** Managed via `themeSlice` in Redux and persisted in `localStorage`.
*   **CSS Architecture:** Uses Tailwind CSS 4 with a high-contrast `oklch` color palette for the dark theme.
*   **Theme Toggle:** A modern Sun/Moon button in the Navbar with smooth entry animations.
*   **Deep Integration:** Backgrounds, borders, and text colors across all layout containers (Navbar, Sidebar, Main) are theme-aware.

## 📱 Responsive Layouts
Every core component has been optimized for a broad range of devices:
*   **Grids:** Adaptive columns that shift from 1 -> 4 based on screen width (Stats, Charts).
*   **Tables:** Replaced fixed widths with a robust `overflow-x-auto` strategy, ensuring long rows remain usable on laptops.
*   **Modals:** Centered overlays with max-height management and scrollable content for tablet/mobile safety.

## 🛠️ Specialized Components

### 💬 Custom Tooltip
A high-performance portal-based tooltip component:
*   **Purpose:** Automatically handles character-limited table cells.
*   **Logic:** If text is truncated, hovering reveals the full content in a sleek floating bubble.
*   **Portals:** Rendered outside the table container to avoid `overflow: hidden` clipping.

### 🖼️ Enhanced Profile Image
A modern, accessible profile picture module:
*   **Interactive Zone:** Clickable hotspot with a "Change Photo" hover overlay.
*   **Live Preview:** Integrated `Loader2` spinner and blurred effects during real-time uploads.
*   **Fallback:** Professional avatar logic for users without custom images.
