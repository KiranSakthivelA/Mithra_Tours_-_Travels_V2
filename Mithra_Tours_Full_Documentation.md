# Mithra Tours & Travels: Comprehensive Project & Handover Documentation

**Date:** May 30, 2026  
**Project:** Mithra Tours & Travels Web Platform  
**Purpose:** A complete architectural overview, feature summary, and technical handover guide detailing the development cycle from initial concept to production deployment.

---

## 1. Executive Summary

This document serves as the official technical blueprint for the Mithra Tours & Travels web platform. Built to modernize a local travel and cab service agency, the project evolved into a fully-fledged, responsive web application featuring custom dynamic booking calculators, a secure PHP/MySQL backend, an administrative control panel, and real-time Google Sheets automation.

---

## 2. Frontend Architecture & UI/UX

The frontend was engineered with a strict adherence to modern, premium aesthetics without relying on heavy frameworks, ensuring maximum performance and SEO score.

* **Tech Stack:** Vanilla HTML5, CSS3, ES6 JavaScript.
* **Design Philosophy:** Implemented a modern, responsive aesthetic with a focus on ease of use, custom typography, and fluid micro-animations to create a high-trust, premium user experience.
* **Core Pages:** 
  * `index.html` (Landing & Booking flow)
  * `services.html` (Offerings)
  * `routes.html` (Popular destinations)
  * `our-fleet.html` (Vehicle showcase)
  * `feedback.html` (User reviews)
* **Dynamic Booking Engine:** Engineered a highly complex frontend booking calculator handling distinct user flows like local trips, outstation, drop, and round trips.
* **Dual-Channel Lead Capture:** Forms simultaneously trigger a formatted WhatsApp deep-link generation for instant communication while pushing the payload to the backend database.

---

## 3. Backend API & Database (PHP/MySQL)

The backend handles central persistence and state management for the agency.

* **Database Engine (`database.sql`):** MySQL. Comprises two primary normalized tables:
  * `inquiries`: Stores comprehensive lead data.
  * `feedbacks`: Stores user submitted ratings and reviews.
* **RESTful API Structure:** PHP endpoints designed for speed.
  * Submission: `submit_inquiry.php`, `submit_feedback.php`
  * Retrieval: `get_inquiries.php`, `get_feedbacks.php`, `get_history.php`
  * Updates: `update_status.php`
* **Security Implementations:**
  * **SQL Injection Prevention:** Utilization of parameterized queries.
  * **CORS Restriction:** Strict Origin enforcing.

---

## 4. Administrative Dashboard

To allow staff to manage operations securely without direct database access.

* **Location:** `/admin/index.html`
* **Features:**
  * **Google OAuth Login:** Secured by Google Sign-In, allowing only authorized email addresses (e.g. `contact@mithratoursandtravels.in`) to access the portal.
  * **Lead Pipeline:** Visual categorization of inquiries.
  * **Status Toggling:** Staff can update the status of trips, which instantly syncs to the SQL database.

---

## 5. Third-Party Automations (Google Workspace)

To accommodate operational preferences for spreadsheet tracking.

* **The Webhook:** A Google Apps Script operates as a secure Web App.
* **Data Flow:** When inquiries are submitted or updated, a secondary asynchronous request posts a JSON payload to Google Sheets.
* **Security Handshake:** To prevent unauthorized entries, the Google Script mandates a hardcoded `secret_token` (`MITHRA_SECURE_AUTH_8842`). Unauthorized POST requests are explicitly rejected.

---

## 6. Deployment & Infrastructure

* **Hosting Environment:** MilesWeb Shared/Cloud environment.
* **Database configuration:** Automatic detection inside `api/config.php` switching between `localhost` and the MilesWeb production database (`mithrato1_mithradb`).
* **Deployment Archives:** Deployment is managed via the `milesweb_deploy.zip` archive containing the production-ready build of the site.

---

## 💡 Notes for Future Developers

If you are onboarding onto this project, please adhere to the following established paradigms:

1. **Local vs Live:** The `api/config.php` utilizes auto-environment detection. DO NOT hardcode local database credentials over the production ones. 
2. **Google Script Edits:** If the spreadsheet formats change, you must update the Apps Script via Google Workspace and redeploy as a *"New Version"*. Copy the new URL into `api/config.php` and `export_to_sheets.js`.
3. **Admin Access:** To add new administrators, append their Google email address to the `AUTHORIZED_ADMIN_EMAILS` array inside `api/config.php`.
