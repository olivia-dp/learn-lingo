🇺🇦 LearnLingo — Online Platform for Finding English Teachers
LearnLingo is a modern web application designed for students looking for English teachers. Users can browse teacher profiles, read reviews, and book trial lessons.

🧰 Technologies
React — for building the user interface

Redux Toolkit — for global state management (authentication, favorites, modals)

React Router — for page routing

Firebase Firestore — cloud NoSQL database for storing information about teachers, levels, languages, and reviews

Firebase Auth — user authentication

React Hook Form + Yup — convenient forms with validation

React Hot Toast — for showing notifications

📦 Main Features
Viewing teacher cards with languages, levels, pricing, ratings, and reviews

Adding teachers to favorites (available only for authenticated users)

Ability to book a trial lesson

Pagination and dynamic data loading

Modal windows with form validation and user-friendly interactions

🔐 Authentication and Favorites
Authentication is implemented using Firebase Authentication

After logging in, users can add teachers to their favorites

Favorites are saved in localStorage and cleared on logout

Attempting to add a favorite without authentication triggers a toast notification: "Please Log In or Register to use favorites"

🧾 Modal Windows
The app includes modals with validation:

Login / Registration

Email and password input

Validation: proper email format and minimum password length

Token management via Firebase Auth

Error handling with notifications

Trial Lesson Modal

Choice of main reason for learning English (custom styled radio buttons)

Required fields: full name, email, phone number

Validation via Yup

Incorrect input disables the submit button

📁 Project Structure (simplified)
src/
├── components/
│   ├── TeacherCard
│   ├── TeachersList
│   ├── FilterBar
│   ├── TrialLessonModal
│   └── ...
├── redux/
│   ├── auth/
│   ├── favorite/
│   ├── modal/
│   └── teachers/
├── firebase/
│   └── firebase.js
└── App.jsx


🌐 Navigation
/ — Home page

/teachers — Teachers list

/favorite — Favorites (only accessible to authenticated users)

https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0 
https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0

Develop by: https://github.com/olivia-dp/
