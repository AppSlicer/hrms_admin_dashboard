# Authentication & Role Management

## 🔐 Login Flow
The authentication system uses a multi-layered approach to ensure security and user state consistency.

1.  **Submission:** `SignInPage.tsx` captures credentials and calls `authService.login`.
2.  **Role Verification:** Immediately upon successful login, the frontend verifies if the user has `SUPER_ADMIN` or `SUB_ADMIN` privileges. Non-admin roles are blocked from entering.
3.  **State Dispatch:** The user object and access token are dispatched to the Redux `auth` slice.
4.  **Persistence:** 
    *   **Access Token:** Stored in `localStorage` and a secure cookie (`HRM_FIRM`).
    *   **User Info:** Stored in a JSON-formatted cookie (`USER_INFO`).
    *   **Refresh:** On app initialization (`App.tsx`), the Redux state is re-hydrated from these cookies.

## 👥 Supported Roles
The frontend is fully aligned with the Prisma backend enums:
*   `SUPER_ADMIN`: Global access to all management modules and system settings.
*   `SUB_ADMIN`: Restricted access to manage specific employers and their employees.
*   `EMPLOYER`: Can access the dashboard (if permitted) to manage their workforce.
*   `EMPLOYEE`: Standard user access.

## 🛡️ Route Protection
The `ProtectedRoute.tsx` component wraps all dashboard routes and performs two checks:
1.  **Token Check:** Redirects to `/sign-in` if no valid token exists.
2.  **Role Check:** Redirects to `/sign-in` with an error toast if the logged-in user is not an Admin or Sub-Admin.

## 🔌 API Utility
A centralized `src/lib/api.ts` handles all fetch requests:
*   Automatically attaches the `Bearer` token to the `Authorization` header.
*   Handles base URL management (`http://localhost:8080/api/v1`).
*   Intelligently skips auth headers for public routes (Terms, Privacy).
