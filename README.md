# Softuni React Native project

### Application Name:
Gym Exercises
### Main Purpose:
The main purpose of the app is to educate users about gym exercises. The app is providing reliable information and resources to help every user before enter the gym. 

### Describe what the application is for and what problem it solves for the user.
The application is designed to provide users with reliable information about exercises and fitness techniques. It solves the problem of misinformation and confusion by offering a centralized source of guidance, helping users make informed decisions about their fitness routines and maintain a healthier lifestyle. 

### User Access & Permissions
#### Guest (Not Authenticated)

Describe what an unauthenticated user can access: - Available screens or actions: 
* Guest users can access Home screen, Exercises screen, Details Screen - here the user cannot like or add comment to the exercise, user only can see the count of likes and the comments, Info screen, Sign in and Sign up screens.

#### Authenticated User

Describe what a logged-in user can access: - Main sections / tabs: - Details screens: - Create / Edit / Delete actions:
* Authenticated users can access Home screen, Exercises screen, Details screen and to like or remove their like from this exercise and add comment(user can delete their own comment), authenticated users can also go to Info screen, Profile screen - here they can edit their profiles or add profile image.

#### Authentication & Session Handling

##### Authentication Flow

Explain step-by-step: 
1. What happens when the app starts:
* The home screen is visualized and the three of the most liked exercises are shown.
2. How authentication status is checked 
* The application checks the user’s authentication status by using Firebase’s onAuthStateChanged listener. When the app loads, this listener automatically triggers and verifies whether a user is currently logged in. If Firebase returns a valid user object, the app updates the authentication state with the user’s details; if not, it sets the user to null. This ensures the app always stays in sync with the user’s login state in real time.
3. What happens on successful login or registration 
* User is navigated to Home screen, tab bar navigation is changed to show Profile tab not Sign in and AuthProvider holds the user data.
4. What happens on logout
* The application handles logout by calling Firebase’s signOut method. When the logout action is triggered, signOut(auth) clears the user’s session from Firebase, and the app updates its internal authentication state by setting the user to null. If an error occurs during the process, it is catched and stored in authError state.

#### Session Persistence

1. How is the user session stored?
* User session is stored in auth state.
2. How is automatic login handled after app restart?
* By using Firebase’s onAuthStateChanged listener. When the app loads, this listener automatically triggers and verifies whether a user is currently logged in. If Firebase returns a valid user object, the app updates the authentication state with the user’s details; if not, it sets the user to null. 
#### Navigation Structure

Root Navigation Logic

1. How is navigation split between authenticated and unauthenticated users?
* Navigation is controlled by checking the auth state of the user.
Main Navigation

Describe the main navigation structure: - Number and type of main sections (e.g. Tabs):
* Bottom tab navigation with 4 screens, which provides quick access to the core sections of the app. Each tab represents a major section, such as Home, Exercises, Info, and Sign in. Some of these tabs include their own stack navigators, allowing users to navigate deeper into related screens.

Nested Navigation

2. Is there nested navigation (e.g. Stack inside a Tab)?
* Yes. The app uses nested navigation by placing stack navigators inside certain bottom tab sections. This allows deeper navigation such as opening detail pages while staying within the same tab.
3. What type of screens are included?
* The nested stack navigation includes screens such as Details, Sign Up, and About Us,
#### List → Details Flow

List / Overview Screen

1. What type of data is displayed?
* The application displays exercise-related data retrieved from Firebase. Currently, it shows only the exercise name with an option to see the details of the exercise.
2. How does the user interact with the list?
* The user can scroll through the list of exercises and tap on an item to view more information related to that exercise.

Details Screen

3. How is navigation triggered?
* By clicking on the exercise
4. What data is received via route parameters?
* Exercise id
#### Data Source & Backend

Backend Type:
* Real backend - Firebase

#### Data Operations (CRUD)

Describe the implemented data operations:

Read (GET)

1. Where is data fetched and displayed?
* Home screen, Exercises, Details, Profile

Create (POST)
* Add comments and like.

2. How does the user create new data?
* With click on like button or add comment

Update / Delete (Mutation)

3. Which operation is implemented (Update and/or Delete)?
* Every user can delete their own comment and remove like. Users can update their profile info(Username and password)
4. How is the UI updated after the change?
* The react component is re-rendered.
#### Forms & Validation

Forms Used:
* The application uses forms for actions such as Sign Up and Sign In, where users enter information like email, password, and username. Validation is applied to ensure that the input is correct and complete
List all forms in the application:

Validation Rules

Describe at least three validated fields: 
1. Field name and rules: 
* email, I've used regex validator that ensures the input looks like a valid email, e.g., user.name123@example.com, and rejects strings that don’t follow the standard email pattern.
2. Field name and rules: 
* username, Length should be more than 2 characters.
3. Field name with multiple validation rules:
* password, Password must be at least 6 characters long and include at least uppercase letter, lowercase letter, number, and special character

#### Native Device Features

Used Native Feature(s)
- Image Picker
- Camera Capture
- Open phone 
- Open email
- Open android map


Usage Description

1. Where is it used?
* In profile screen
2. What functionality does it provide?
* The application uses an Image Picker to allow users to select images from their device’s gallery. This feature provides a simple way for users to upload images, which can be used for profile picture.
#### Typical User Flow

Describe a normal user journey through the app: 
1. Visit home screen, search some exercise by name.
2. Visit exercise screen to see all exercises, then go to read the details.
3. Sign up.
4. Like or comment some exercise.

#### Error & Edge Case Handling

Describe how the app handles: - Authentication errors - Network or data errors - Empty or missing data states
1. Authentication errors
When a login, signup, or logout operation fails, the app captures the error from Firebase and stores it in the authError state. The user is then shown an error message.
2. Network or data errors
If there is a problem retrieving data from Firebase, the app handles it by displaying an error message to the user. Errors are caught and stored in the app state to prevent crashes.
3. Empty or missing data states
When a list or content section has no data, the app displays a friendly message such as “No content” or spinner to inform the user. This ensures the interface remains clear and the user understands that the absence of content is expected, not a bug.