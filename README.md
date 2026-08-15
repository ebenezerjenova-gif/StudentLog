# 🎓 StudentLog — Complete Student Activity Tracker

StudentLog is a centralized **Student Activity Management Platform** designed to help students manage their personal information, academic details, feedback, and other student-related activities through a single web-based portal.

The project combines **React.js, n8n, Supabase, AI Agents, and Gmail** to create an automated application where n8n acts as the backend workflow orchestration layer.

## ✨ Features

* 🎓 Student registration
* 🔐 Student login and authentication
* 👤 Personal profile management
* 📚 Academic information management
* 📝 Student profile updates
* 💬 Student feedback submission
* 🤖 AI-powered feedback analysis and responses
* 📊 AI-powered CGPA calculation
* 📧 Automated registration emails
* 📩 Personalized feedback response emails
* 🔄 Centralized webhook-based request handling
* 🔀 Action-based workflow routing
* 🗄️ Supabase database integration
* ✅ Input validation and error handling
* 📡 Structured API responses to the frontend
* ⚡ n8n-based backend automation

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Lucide React
* Axios / REST API integration

### Backend & Automation

* n8n
* Webhook
* Switch
* IF
* Set / Edit Fields
* Code Node
* Respond to Webhook

### Database

* Supabase
* Supabase REST/API integration

### AI

* n8n AI Agent
* Mistral Cloud
* Groq

### Communication

* Gmail API / Gmail Node

---

# 🏗️ System Architecture

StudentLog follows a centralized architecture:

```text
React Student Portal
        │
        ▼
Student Portal Webhook
        │
        ▼
   Action Router
      (Switch)
        │
 ┌──────┼────────┬────────────┬─────────────┐
 ▼      ▼        ▼            ▼             ▼
Register Login  Feedback    CGPA Agent   Profile
 │      │        │            │             │
 ▼      ▼        ▼            ▼             ▼
Supabase       AI Agent    AI Processing  Supabase
 │      │        │            │             │
 └──────┴────────┴────────────┴─────────────┘
                    │
                    ▼
              Frontend Response
```

The main advantage of this architecture is that multiple Student Portal operations can be handled through a **single n8n webhook**.

---

# ⚡ Centralized n8n Workflow

The frontend sends a request containing an action such as:

```text
register
login
submitFeedback
calculateCGPA
updateProfile
```

The **Switch node** identifies the requested operation and routes the request to the corresponding process.

For example:

```text
Student Portal
      ↓
Webhook
      ↓
Switch
      ↓
calculateCGPA
      ↓
CGPA AI Agent
      ↓
Validation
      ↓
Response
```

This approach keeps the backend organized and makes it easier to add new Student Portal features in the future.

---

# 📝 Student Registration

The registration module creates a student's account using the information submitted from the frontend.

The process includes:

1. Receive registration request
2. Extract student information
3. Validate required fields
4. Store registration details in Supabase
5. Send a confirmation email
6. Return the registration status to the frontend

### Registration Flow

```text
Registration Form
       ↓
n8n Webhook
       ↓
Data Validation
       ↓
Supabase
       ↓
Gmail
       ↓
Registration Response
```

---

# 🔐 Student Login

The login module verifies the student's credentials against the registered student information stored in Supabase.

The system handles both successful and unsuccessful authentication requests.

```text
Login Form
    ↓
Webhook
    ↓
Extract Credentials
    ↓
Supabase
    ↓
Credential Validation
   ↙        ↘
Success     Failed
   ↓          ↓
Dashboard   Error
```

---

# 👤 Student Profile Management

StudentLog provides a centralized student profile containing both **personal and academic information**.

The profile can include:

### Personal Information

* Name
* Email
* Register Number
* Phone Number
* Gender
* Date of Birth
* Blood Group
* Parent Contact
* Address

### Academic Information

* Degree
* Department
* Course
* Batch
* Current Semester
* Regulation
* Year
* History of Arrears
* Mode
* Type
* Quota
* First Graduate Status

Before updating the profile, n8n validates the required fields and checks whether the student exists in the registration database.

---

# 💬 Student Feedback

Students can submit feedback through the portal by providing information such as:

* Student Name
* Email
* Year
* Department
* Feedback Category
* Feedback Content

The submitted feedback is stored in Supabase for future tracking and management.

```text
Student Feedback
       ↓
Webhook
       ↓
Prepare Data
       ↓
Supabase
       ↓
AI Feedback Agent
       ↓
Personalized Response
       ↓
Gmail
```

---

# 🤖 AI-Powered Feedback Response

StudentLog uses an **AI Agent** to generate personalized responses to student feedback.

Instead of sending the same predefined email to every student, the AI Agent analyzes the feedback and generates a response based on its context.

The Agent can respond differently to:

* Positive feedback
* Negative feedback
* Suggestions
* General concerns
* Academic issues
* Infrastructure-related feedback

The generated response is then sent to the student's registered email through Gmail.

This demonstrates how **AI Agents can be integrated into real-world student service automation**.

---

# 📊 AI CGPA Calculator

StudentLog includes an AI-powered CGPA calculation module.

Students provide semester-level:

* GPA
* Credits

The AI Agent processes the provided academic information using a credit-weighted calculation.

The system produces structured information such as:

```text
CGPA
Total Credits
Semesters Used
Calculation Status
Message
```

The result is then validated and formatted before being returned to the frontend.

### CGPA Flow

```text
Semester GPA + Credits
          ↓
      AI Agent
          ↓
Weighted Calculation
          ↓
Validation & Formatting
          ↓
   Student Portal
```

---

# 📧 Automated Email Communication

Gmail is integrated with n8n to automate student communication.

StudentLog can automatically send:

* Registration confirmation emails
* Feedback response emails
* AI-generated personalized messages

This eliminates the need for manually sending repetitive student communication.

---

# 🗄️ Supabase Data Management

Supabase acts as the main data storage layer.

StudentLog currently uses structured tables such as:

```text
Student Registration
        │
        ├── Login Information
        └── Registration Details

Student Details
        │
        ├── Personal Information
        └── Academic Information

Student Feedback
        │
        ├── Feedback Details
        └── Student Response Data
```

n8n manages the interaction between the React frontend and Supabase.

---

# 📂 Project Structure

A typical frontend structure is organized as:

```text
src/
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── profile/
│   └── ...
│
├── pages/
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   └── ...
│
├── services/
│   └── api.js
│
├── layouts/
├── context/
├── styles/
├── App.js
├── App.css
├── index.css
└── index.js

StudentLog n8n Workflow.json
```

The n8n workflow contains the backend automation and integration logic.

---

# 🔄 Complete Student Activity Flow

The overall application can be represented as:

```text
Student
   ↓
React Student Portal
   ↓
n8n Webhook
   ↓
Action-Based Router
   ↓
Student Service
   ↓
┌───────────────┬──────────────┬──────────────┐
│   Supabase    │   AI Agent   │    Gmail     │
│    Storage    │  Processing  │ Communication│
└───────────────┴──────────────┴──────────────┘
   ↓
Structured Response
   ↓
Student Portal
```

---

# 🧪 Testing

Before deploying StudentLog, the following operations should be tested:

1. Create a student account.
2. Verify registration data in Supabase.
3. Verify the registration email.
4. Login using valid credentials.
5. Test invalid login credentials.
6. Update student profile information.
7. Verify updated profile data.
8. Submit student feedback.
9. Verify feedback storage.
10. Test AI-generated feedback responses.
11. Test CGPA calculation with multiple semesters.
12. Verify the returned CGPA and credit information.
13. Verify frontend responses for successful and failed operations.

---

# 🔮 Future Enhancements

StudentLog can be extended with additional student services such as:

* 📅 Attendance Management
* 📑 Examination Results
* 🕐 Timetable Management
* 📢 Announcements
* 📚 Study Materials
* 📖 Library Management
* 💼 Internship Tracking
* 🚀 Project Management
* 🎉 Event Registration
* 🏆 Student Achievements
* 👥 Club Activities
* 🔔 Student Notifications
* 📈 Academic Performance Analytics
* 🤖 AI Student Assistant

These features can be integrated into the existing **centralized webhook + action-routing architecture**.

---

# 🎯 Project Goal

The goal of **StudentLog** is to provide a centralized digital platform for managing and organizing the overall activities and information of a student.

The project demonstrates how **n8n can work as an application backend and orchestration layer**, connecting a React frontend with databases, AI Agents, and communication services.

### StudentLog in one line:

> **A centralized platform to manage, automate, and track the complete student activity lifecycle.**
