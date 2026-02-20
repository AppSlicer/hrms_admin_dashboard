# Routing & Navigation System

## 🗺️ Page-Based Architecture
The dashboard has been migrated from a state-based "tab" system to a proper routing architecture using `react-router-dom`.

### New Routes
*   `/overview`: Main analytics dashboard.
*   `/sub-admin-management`: CRUD for system sub-admins.
*   `/employer-management`: Real-time employer fleet management.
*   `/email-marketing`: Campaign creation and queue monitoring.
*   `/help-and-support`: Support ticket system with admin replies.
*   `/profile`: User identity and security settings.
*   `/messages` & `/notifications`: Global communication centers.

## 🧭 Modern Sidebar
The sidebar (`Sidebar.tsx`) is the primary navigation hub and features:
*   **Path Awareness:** Automatically highlights the active menu item by matching the browser URL path.
*   **Cognitive Sectioning:** Items are grouped into "Menu" and "Management" sections for better UX.
*   **Visual Feedback:** Features a vertical active indicator line and smooth scaling animations on hover.
*   **Custom Scrollbar:** A thin, themed scrollbar implemented via Tailwind utilities to replace the default browser UI.

## 🔍 Contextual Search
The search bar in the `Navbar.tsx` is no longer a placeholder. It now acts as a dynamic filter:
1.  **State Management:** Search queries are stored in a global Redux `search` slice.
2.  **Live Filtering:** Components like `UserManagement` and `HelpAndSupport` subscribe to this slice and filter their data arrays in real-time as the user types.
3.  **Global Reset:** The search state is automatically cleared when navigating to the homepage or clicking the "Clear" button.
