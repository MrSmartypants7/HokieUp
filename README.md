# HokieUp

HokieUp is a mobile app built with React Native for Virginia Tech students to connect.

## Key Features

- Home page lists upcoming events
- Users can create new events
- Join event groups and group chat
- Global chat room
- Private direct messaging
- User profile displays icon, logout button
- Login/logout with @vt.edu emails only
- Email verification on signup

## Events

- Browse and join upcoming events
- Create new events with details
- Chat and discuss in event groups

## Messaging

- Open global chat room
- DM other users
- Chat in event groups

## Accounts

- Signup with @vt.edu email
- Verify email to activate account
- Profile with user icon and logout button
- Login and logout

## Unit Test Cases

We have meticulously crafted comprehensive test cases to ensure the robust functionality of HokieUp.

1. **Home Page:**
   - Events are correctly listed on the home page after refreshing the home page.
   - Users can successfully create new events.

2. **Event Groups:**
   - Users can join specific event groups.
   - Group chat functions seamlessly within each event group.

3. **Messaging:**
   - Global chat room operates effectively.
   - Direct messaging is reliable.
   - Event group messaging is functional.

4. **User Accounts:**
   - Signup process ensures the use of @vt.edu email addresses.
   - Email verification sends notifications for successful account activation.
   - User profiles display icons and a functional logout button.
   - Users can log in and log out without issues.

## Acceptance Criteria

1. **Home Page:**
   - Events are consistently listed, and new events appear promptly.

2. **Event Groups:**
   - Joining event groups adds users correctly.
   - Group chat displays messages accurately.

3. **Messaging:**
   - Global chat room maintains real-time conversation.
   - Direct messaging between users works seamlessly.
   - Event group messaging provides a smooth chat experience.

4. **User Accounts:**
   - Signup process accepts only @vt.edu emails.
   - Email verification sends notifications to activate accounts.
   - User profiles showcase icons and provide a reliable logout function.
   - Login and logout processes function smoothly.

## Setup

To run HokieUp locally:

1. Clone this repo
2. Install dependencies: `npm install`
3. Start metro bundler: `npx expo start`
4. Run on iOS or Android:
   - iOS: `npx react-native run-ios`
   - Android:
     - Start Android Emulator
     - `npx react-native run-android`

The app should now open in your emulator or device.

## Contributing

Contributions are welcome to improve HokieUp!

### Reporting bugs

- File detailed bug reports with clear steps for reproduction. Screenshots and emulator/device info are helpful.

### Suggesting features

- Open issues discussing potential features and improvements. Share why a feature is important and how it benefits users.

### Pull requests

- Target the `develop` branch
- Follow style guides and naming conventions
- Update any related documentation
- Add tests for new functionality

Some areas that could use contributions:

- Visual design
- Add more event options
- Enhance messaging experience
- Improve account management
- Automated testing

Let's connect Hokies and improve student life at VT!
