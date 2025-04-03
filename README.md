# React URL Shortener with Firebase

A simple, yet functional URL shortener web application built with React.js and utilizing Firebase Realtime Database for storing URL mappings and tracking clicks.

## Table of Contents

*   [Introduction]
*   [Key Features]
*   [Tech Stack]
*   [Live Demo (Optional)]
*   [Screenshots (Optional)]
*   [Prerequisites]
*   [Firebase Setup]
*   [Installation & Setup]
*   [Running the Application]
*   [Building for Production]
*   [Database Structure]

## Introduction

This project provides a client-side interface to shorten long URLs into more manageable short links. It uses Firebase Realtime Database to store the mapping between the original and shortened URLs, tracks click counts in real-time, and includes basic link expiration handling.

## Key Features

*   **URL Shortening:** Input form to paste long URLs.
*   **Short Link Generation:** Generates unique\* short codes using SHA-256 hashing and Base62 encoding. (\*Collision probability is low but not zero).
*   **Firebase Integration:** Uses Firebase Realtime Database for persistent storage.
*   **Redirection:** Handles redirection from short URLs to their original destinations.
*   **Click Tracking:** Counts and displays the number of times each short link is visited (updates in real-time on the creation page).
*   **Result Prompt:** Displays the shortened URL, click count, and action buttons in a modal-like prompt after successful creation.
*   **Input Validation:** Basic checks for empty input, valid URL structure (HTTP/HTTPS), and plausible hostnames.
*   **Responsive Design:** Basic CSS structure aiming for usability across devices.

## Tech Stack

*   **Frontend:** React.js (v18+)
*   **Routing:** React Router DOM (v6+)
*   **Database:** Firebase Realtime Database
*   **Styling:** CSS3
*   **Hosting (Recommended):** Vercel
*   **Language:** JavaScript (ES6+)

## Live Demo 

https://youtu.be/UEWUfIgzQx4

## Screenshots 

![Screenshot 2025-04-03 024438](https://github.com/user-attachments/assets/425f20ca-ade7-4fc3-a8bc-6f2729ff1908)
![Screenshot 2025-04-03 024500](https://github.com/user-attachments/assets/0c29f2d1-50d6-4d9a-b140-b238d3111b05)
![Screenshot 2025-04-03 024527](https://github.com/user-attachments/assets/f4327121-50d9-48fb-8c9e-6ae0b8a25622)

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (which includes npm) - LTS version recommended.
*   A package manager like `npm` or `yarn`.
*   A [Firebase](https://firebase.google.com/) account.

## Firebase Setup

1.  **Create Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
2.  **Add Web App:** Within your project, add a new Web App. Give it a nickname.
3.  **Get Config Credentials:** Firebase will provide you with configuration credentials (apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId). Copy these.
4.  **Enable Realtime Database:** In the Firebase console, navigate to "Build" -> "Realtime Database". Click "Create database", choose a location, and start in **test mode** (for initial development) or **locked mode** (recommended for production, requires setting rules).
5.  **Database Rules:** Configure your Realtime Database rules. For this application to work, you need rules like the following (adjust security as needed for production):

    ```json
    {
      "rules": {
        "shortURLs": {
          // Anyone can read the 'link' and 'expiresAt' data for redirection
          ".read": "true",
          "$shortcode": {
             // Anyone can write a new entry if it doesn't exist yet
            ".write": "!data.exists()",
             // Anyone can read all data for a specific code (needed for click listener)
            ".read": "true",
             // Anyone can update 'hits' and 'lastAccessedAt' fields
            "hits": { ".write": "true" },
            "lastAccessedAt": { ".write": "true" }
            // Prevent writing other fields after creation (optional security)
            // "link": { ".write": "!data.exists()" },
            // "createdAt": { ".write": "!data.exists()" },
            // "expiresAt": { ".write": "!data.exists()" }
          }
        }
      }
    }
    ```
    *   **Important:** Review and tighten these rules for production use cases (e.g., require authentication for creating links).

## Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory-name>
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create Firebase Config File:**
    *   In the `src/` directory (or wherever your `firebaseConfig/firebaseConfig.js` is imported from), create a file named `firebaseConfig.js`.
    *   Paste your Firebase configuration credentials into this file, exporting the initialized Firebase app and database instance.
    *   **Example `src/firebaseConfig/firebaseConfig.js`:**
        ```javascript
        import { initializeApp } from "firebase/app";
        import { getDatabase } from "firebase/database";

        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          databaseURL: "YOUR_DATABASE_URL", // Make sure this is correct!
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Get a reference to the database service
        const db = getDatabase(app);

        export { db, app }; // Export db and potentially app if needed elsewhere
        ```
    *   **SECURITY NOTE:** Do **not** commit your actual `firebaseConfig.js` file with credentials directly to public Git repositories. Use environment variables (e.g., via `.env` files and `react-scripts`) for production builds and secure configurations.

## Running the Application

1.  **Start the Development Server:**
    ```bash
    npm start
    # or
    yarn start
    ```
2.  **Open in Browser:** Navigate to `http://localhost:3000` (or the port specified in the console).

## Building for Production

1.  **Create a Production Build:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This command bundles the app into static files in the `build/` directory.
2.  **Deploy:** Deploy the contents of the `build/` directory to your preferred hosting provider (Firebase Hosting is a good option).

## Database Structure

Data is stored in the Firebase Realtime Database under the `shortURLs` node. Each key within this node is the generated `shortCode`.

```json
{
  "shortURLs": {
    "hUCd5rsB": {
      "link": "https://facebook.com",
      "hits": 2,
      "createdAt": 1678886400000, // Example timestamp (ms since epoch)
      "lastAccessedAt": 1678886450000, // Example timestamp (ms since epoch)
      "expiresAt": 1686662400000 // Example timestamp (ms since epoch)
    },
    "aBcDeF1": {
      "link": "https://google.com",
      "hits": 0,
      "createdAt": 1678886500000,
      "lastAccessedAt": 1678886500000,
      "expiresAt": 1686662500000
    }
    // ... other entries
  }
}
