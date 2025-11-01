# Doctein: Modern Healthcare Practice Management Platform

## Description

Doctein is a healthcare management platform that streamlines medical practice operations through digital prescription management, appointment scheduling, and patient records. The platform enables doctors to create detailed digital prescriptions, track appointments, and maintain secure medical documentation.

## Long Description

Doctein is a digital healthcare management platform that streamlines medical practice operations. The system enables doctors to manage patients, schedule appointments, and create detailed digital prescriptions with medications, diagnosis, and medical history. Built with modern web technologies, it features role-based access control, secure OTP authentication, and robust file upload capabilities for prescription snapshots while ensuring data security through JWT authentication and encrypted storage.

## Technology Used

### Frontend

- **Next.js 14 & React 18** - Server-side rendering and component-based UI
- **TypeScript** - Type-safe development
- **TailwindCSS & NextUI** - Styling and UI components
- **Zustand** - State management
- **Formik, Yup, Axios** - Form handling, validation, and API communication
- **React Hot Toast, React-to-Print** - Notifications and printing

### Backend

- **Node.js & Express.js** - Runtime and web framework
- **TypeScript** - Type-safe backend
- **MongoDB & Mongoose** - Database and ODM
- **JWT, Bcryptjs** - Authentication and password hashing
- **Multer** - File upload middleware
- **Nodemailer** - Email service for OTP
- **Express Validator, Helmet, HPP, CORS, Rate Limit** - Security and validation middleware

### Infrastructure & DevOps

- **Docker & Docker Compose** - Containerization and orchestration
- **Azure VM** - Cloud hosting
- **Git, npm, ESLint, Prettier** - Version control and development tools

## Features

### Doctor Features
- **Multi-Role Authentication**: Login with role-based access for doctors (OTP email verification).
- **Digital Prescription Creation**: Build prescriptions with medications, complaints, diagnosis, investigations, and follow-up dates.
- **Prescription Templates**: Save and reuse prescription templates with drag-and-drop medicine input.
- **Prescription Image Upload**: Securely upload prescription snapshots with automatic file management.
- **Appointment Scheduling**: Create and manage appointments, track status (upcoming, completed, cancelled).
- **Patient Management**: Access patient profiles, view medical history, and track patient data.
- **Prescription Printing**: Generate print-ready prescription formats.
- **Dashboard Analytics**: Visualize appointment stats and patient counts for practice management.
- **Password Reset**: Request OTP-based password reset for secure account recovery.

### Clinic Staff Features
- **Multi-Role Authentication**: Login with staff role, access appropriate tools via OTP verification.
- **Staff & Doctor Management**: Add and manage staff profiles, manage doctor accounts for the clinic.
- **Appointment Scheduling**: View, assist, or update appointments as per staff permissions.
- **Patient Management**: Assist with creation and updating of patient records and appointments.

### Patient Features
- **Multi-Role Authentication**: Login as a patient with OTP email validation.
- **Appointment Scheduling**: Book and view appointments, track appointment status.
- **Patient Profile Management**: Maintain and update personal information, see medical history and prescriptions.
- **Password Reset**: Securely reset password using OTP.

### Platform-Wide Features
- **Responsive Design**: Mobile-first, seamless UI across all devices.
- **Security**: JWT authentication, encrypted storage, secure file uploads.
- **Role-Based Access Control**: Strict segmentation of permissions for doctors, staff, and patients.

## Challenges

- **CORS Configuration**: Managing image loading from different domains (localhost vs Azure VM)
- **File Upload Security**: Securing sensitive medical document uploads while preventing malicious files
- **Environment Configuration**: Seamlessly managing API endpoints between development and production
- **Azure Deployment**: Configuring remote image patterns and static file serving with proper CORS headers
- **JWT Authentication**: Implementing secure token-based auth with HTTP-only cookies
- **Multi-Role Access Control**: Managing different permissions for doctors, staff, and patients
- **Data Integrity**: Ensuring consistency when linking prescriptions to appointments
- **File Path Normalization**: Handling OS differences (Windows vs Unix) for file storage
- **State Synchronization**: Keeping frontend state in sync with backend data changes
- **Type Safety**: Maintaining TypeScript consistency across frontend and backend

## Solution

The project solves these challenges with a robust full-stack setup: Next.js for the frontend, Express.js REST API backend, secure file uploads with Multer, and JWT cookies for auth. Docker ensures consistent deployment. TypeScript, Zustand, and Formik/Yup provide type safety and smooth state and form management. Security and environment settings are handled with best practices across both localhost and Azure VM.
