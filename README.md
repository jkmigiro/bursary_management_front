Bursary Management System Frontend
Overview
The Bursary Management System Frontend is a web application built with Angular and TypeScript, designed to streamline the application and management of bursaries for educational institutions. It provides a user-friendly interface for students to submit applications, administrators to review and process them, and integrates with a Spring Boot backend for data management.
Features

Responsive UI: Mobile-friendly design using Angular Material components.
Form Validation: Robust client-side validation for application forms.
API Integration: Seamless communication with RESTful APIs for data retrieval and submission.
Authentication: Secure user login and role-based access control.
Dashboard: Intuitive interface for tracking application status and administrative tasks.

Tech Stack

Frontend: Angular 14, TypeScript, Angular Material
Build Tools: npm, Angular CLI
Version Control: Git, GitHub

Prerequisites

Node.js (v16 or later)
npm (v8 or later)
Angular CLI (npm install -g @angular/cli)

Installation

Clone the Repository:
git clone https://github.com/jkmigiro/bursary_management_front.git
cd bursary_management_front


Install Dependencies:
npm install


Configure Environment:

Create a .env file in the root directory.
Add the backend API URL (replace with your backend endpoint):VITE_API_URL=http://localhost:8080/api




Run the Application:
ng serve


Open http://localhost:4200 in your browser.



Project Structure

src/app/components: Reusable Angular components (e.g., forms, dashboard).
src/app/services: Services for API calls and state management.
src/app/models: TypeScript interfaces for data models.
src/assets: Static assets like images and styles.

Contributing
We welcome contributions! Please follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request with a clear description of your changes.

See CONTRIBUTING.md for detailed guidelines.
License
This project is licensed under the MIT License. See LICENSE for details.
Contact
For questions or support, reach out to jkmigiro@gmail.com or open an issue on GitHub.
