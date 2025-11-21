# Authentication Flow Testing Plan

## Test Cases

### 1. Landing Page Tests
- [ ] Landing page loads correctly at `/`
- [ ] "START YOUR FIRST OATH" button navigates to `/auth/signup`
- [ ] Header is hidden on landing page

### 2. Sign Up Tests
#### Valid Sign Up
- [ ] User can sign up with valid email, password (6+ chars), and name
- [ ] User is redirected to `/dashboard` after successful signup
- [ ] Terms checkbox must be checked to submit

#### Invalid Sign Up
- [ ] Error shown when name is empty
- [ ] Error shown when email is invalid
- [ ] Error shown when password is less than 6 characters
- [ ] Error shown when passwords don't match
- [ ] Error shown when terms checkbox is not checked
- [ ] Error shown when email is already in use
- [ ] Firebase error messages are user-friendly

#### Google Sign Up
- [ ] "Sign up with Google" button triggers Google auth popup
- [ ] User must check terms before Google sign up
- [ ] User is redirected to `/dashboard` after successful Google signup

### 3. Sign In Tests
#### Valid Sign In
- [ ] User can sign in with valid email and password
- [ ] User is redirected to `/dashboard` after successful signin
- [ ] "Remember me" checkbox is visible

#### Invalid Sign In
- [ ] Error shown for incorrect password
- [ ] Error shown for non-existent email
- [ ] Error shown for invalid credentials
- [ ] Firebase error messages are user-friendly

#### Google Sign In
- [ ] "Sign in with Google" button triggers Google auth popup
- [ ] User is redirected to `/dashboard` after successful Google signin

#### Navigation
- [ ] "Don't have an account? Sign up" link navigates to `/auth/signup`
- [ ] "Forgot password?" link is visible (navigates to reset password page)
- [ ] Logo link navigates to landing page

### 4. Dashboard Tests (Protected Route)
#### Authenticated User
- [ ] Dashboard displays user's name from Firebase
- [ ] Dashboard shows quick stats (Active Oaths, Total Staked, Win Rate, Streak)
- [ ] Dashboard shows active oaths with progress bars
- [ ] "Create New Oath" button navigates to `/arena`
- [ ] Recent Activity section displays
- [ ] Friends Leaderboard displays

#### Unauthenticated User
- [ ] Unauthenticated user is redirected to `/auth/signin`
- [ ] Loading spinner shows while checking auth state

### 5. Header Tests
#### When Authenticated
- [ ] Header is visible on all pages except landing and auth pages
- [ ] All navigation links work: Home, Arena, Ideas, Friends, History, Settings
- [ ] Balance displays
- [ ] Notification icon displays with badge
- [ ] Profile dropdown shows user's name and email from Firebase
- [ ] Profile avatar shows first letter of name if no photo
- [ ] Profile avatar shows Google photo if signed in with Google
- [ ] "Logout" button in dropdown logs user out and redirects to landing page

#### When Unauthenticated
- [ ] Header is hidden on landing page
- [ ] Header is hidden on auth pages

### 6. Navigation Tests
- [ ] `/arena` page loads and is protected
- [ ] `/ideas` page loads and is protected
- [ ] `/friends` page loads and is protected
- [ ] `/history` page loads and is protected
- [ ] `/settings` page loads and is protected
- [ ] Settings page shows user's email and name from Firebase

### 7. Logout Tests
- [ ] User can logout from header dropdown
- [ ] After logout, user is redirected to landing page
- [ ] After logout, trying to access protected routes redirects to signin
- [ ] Firebase auth state is cleared

### 8. Session Persistence Tests
- [ ] User remains logged in after page refresh
- [ ] Auth state is properly synced across tabs
- [ ] Protected routes remain accessible after refresh

### 9. Error Handling Tests
- [ ] Network errors show appropriate messages
- [ ] Firebase service errors are handled gracefully
- [ ] Loading states show during auth operations

### 10. UI/UX Tests
- [ ] All pages match the theme (dark background, yellow primary)
- [ ] All pages use Space Grotesk font
- [ ] Forms have proper focus states
- [ ] Buttons have hover states
- [ ] Loading spinners appear during async operations
- [ ] Error messages are clearly visible
- [ ] All pages are responsive

