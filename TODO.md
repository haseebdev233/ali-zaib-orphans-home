# Database Connection Tasks

## Firebase Setup
- [x] Install Firebase SDK
- [x] Create Firebase configuration file
- [ ] Update Firebase config with actual credentials
- [x] Create Firestore collections for donations and volunteers (auto-created on first write)

## Volunteer Form (Volunteer.jsx)
- [x] Import Firebase and Firestore functions
- [x] Update handleSubmit to save data to Firestore
- [x] Add error handling and success feedback
- [x] Add loading state during submission

## Donation Form (Donate.jsx)
- [x] Import Firebase and Firestore functions
- [x] Update payment success handler to save donation data
- [x] Save donor info, amount, payment method, etc.
- [x] Add error handling for database operations

## Testing
- [x] Start development server (running on localhost:5176)
- [ ] Update Firebase config with real credentials
- [ ] Test volunteer form submission
- [ ] Test donation form submission
- [ ] Verify data is saved correctly in Firestore

## Firebase Setup Instructions
To complete testing, you need to:
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Get your Firebase config from Project Settings
4. Replace the placeholder values in src/firebase.js with your actual config
5. Update Firestore security rules to allow writes from your domain
