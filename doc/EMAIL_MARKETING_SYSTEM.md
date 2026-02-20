# Email Marketing & Queue System

## 📧 Campaign Creator
A multi-step workflow for broadcasting messages to the platform's user base.

### Step 1: Compose
*   **Rich Text:** Integrated `ReactQuill` for formatted email bodies.
*   **Templates:** Support for "Minimal" and "Marketing" layouts.
*   **UX Fixes:** Custom CSS overrides ensure the editor fills the entire message container without layout shifts.

### Step 2: Targeting
*   **Role Boxes:** Three dedicated selection areas for Sub-Admins, Employers, and Employees.
*   **Search & Select:** Each role box has a dedicated internal search bar.
*   **Bulk Selection:** "Select All" functionality per role for rapid targeting.
*   **Individual Precision:** Granular selection via user cards with real-time feedback.

## ⚙️ Backend Queue (BullMQ)
*   **Decoupled Architecture:** The email worker is a standalone process, ensuring the API server remains fast.
*   **Job Processing:** Jobs are added to a `Redis` queue and processed sequentially by the `email-worker`.
*   **Resend Logic:** Completed campaigns can be re-queued with a single click.

## 📊 Real-Time Monitoring
*   **Live Metrics:** Integrated WebSockets (`socket.io`) to show "Mails in Queue" and "Currently Sending" counts without refreshing.
*   **Progress Bars:** Active campaigns display a pulsing progress bar that updates live as the worker moves through the recipient list.
*   **Status Tracking:** Campaigns transition from `draft` -> `active` -> `completed` automatically.
