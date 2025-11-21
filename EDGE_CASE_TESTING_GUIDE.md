# Comprehensive Edge Case Testing Guide

## 🔐 Authentication Edge Cases

### Sign Up Flow

#### Valid Scenarios
- ✅ Sign up with valid email (test@example.com), 6+ char password, matching passwords, terms checked
- ✅ Sign up with Google OAuth (popup flow)
- ✅ Sign up with very long name (100+ characters)
- ✅ Sign up with special characters in name (O'Brien, José, 李明)
- ✅ Sign up with email containing special chars (test+tag@example.com)

#### Invalid Scenarios - Should Show Errors
1. **Empty Fields**
   - Empty name → "Please enter your name"
   - Empty email → Browser validation error
   - Empty password → Browser validation error
   - Empty confirm password → Browser validation error

2. **Password Issues**
   - Password < 6 characters → "Password must be at least 6 characters"
   - Passwords don't match → "Passwords do not match"
   - Password = "12345" → "Password is too weak"

3. **Email Issues**
   - Invalid email format (no @) → Browser validation
   - Email already registered → "This email is already registered. Please sign in instead."

4. **Terms & Conditions**
   - Submit without checking terms → "Please agree to the Terms of Service and Privacy Policy"
   - Google sign up without terms → Same error

5. **Firebase Errors**
   - Network disconnected → "Network error. Please check your connection."
   - Too many attempts → "Too many failed attempts. Please try again later."

### Sign In Flow

#### Valid Scenarios
- ✅ Sign in with correct email and password
- ✅ Sign in with Google OAuth
- ✅ Sign in with "Remember me" checked
- ✅ Sign in and get redirected to dashboard

#### Invalid Scenarios - Should Show Errors
1. **Wrong Credentials**
   - Correct email, wrong password → "Invalid email or password"
   - Non-existent email → "No account found with this email"
   - Wrong email format → Browser validation

2. **Account Issues**
   - Disabled account → "This account has been disabled"
   - Too many failed attempts → "Too many failed attempts. Please try again later."

3. **Google OAuth**
   - Close popup before completing → "Sign-in cancelled"
   - Network error during popup → "Network error. Please check your connection."

### Password Reset

#### Valid Scenarios
- ✅ Enter registered email → Success screen shown
- ✅ Receive reset email in inbox
- ✅ Click link in email → Firebase password reset page

#### Invalid Scenarios
- Non-existent email → Still shows success (security best practice)
- Invalid email format → Browser validation
- Network error → "Network error. Please check your connection."

### Logout

#### Should Work From
- ✅ Dashboard
- ✅ Arena
- ✅ Settings
- ✅ Any protected page

#### After Logout
- ✅ Redirected to landing page
- ✅ Cannot access /dashboard without signin
- ✅ Cannot access any protected route
- ✅ Can sign in again successfully

## 🛡️ Protected Route Edge Cases

### Unauthenticated Access
Test accessing these URLs directly while logged out:
- `/dashboard` → Redirect to `/auth/signin`
- `/arena` → Redirect to `/auth/signin`
- `/ideas` → Redirect to `/auth/signin`
- `/friends` → Redirect to `/auth/signin`
- `/history` → Redirect to `/auth/signin`
- `/settings` → Redirect to `/auth/signin`

### Loading States
- ✅ Shows spinner while checking auth state
- ✅ No flash of protected content before redirect
- ✅ Smooth transition after auth check

### Session Persistence
1. **Page Refresh**
   - Login → Navigate to /dashboard → Refresh page → Should stay logged in
   - Login → Navigate to /settings → Refresh page → Should stay logged in

2. **Direct Navigation**
   - Login → Close tab → Open new tab → Go to /dashboard → Should work
   - Login → Copy /dashboard URL → Open in new tab → Should work

3. **Browser Back/Forward**
   - Login → Navigate through pages → Use browser back button → Should work
   - Logout → Browser back button → Should redirect to signin

## 🎨 UI/UX Edge Cases

### Header Component

#### Profile Display
1. **With Display Name**
   - Email/password signup → Shows name in dropdown
   - Shows first letter of name in avatar circle

2. **With Google Account**
   - Shows Google profile photo
   - Shows name from Google account
   - Shows email from Google account

3. **Long Names/Emails**
   - Name > 50 chars → Should truncate with ellipsis
   - Email > 50 chars → Should truncate with ellipsis

4. **Special Characters**
   - Name with emojis → Should display correctly
   - Name with accents (José) → Should display correctly
   - Name with unicode (李明) → Should display correctly

#### Profile Dropdown
- ✅ Opens on click
- ✅ Closes when clicking outside
- ✅ Stays open when clicking inside
- ✅ Settings link works
- ✅ Logout button works
- ✅ Shows correct user info

#### Navigation
- ✅ All 6 nav links work
- ✅ Active page highlighted with primary color
- ✅ Balance button displays correctly
- ✅ Notification icon shows badge

### Dashboard Page

#### With User Data
- ✅ Shows user's name from Firebase
- ✅ Shows placeholder stats (Active Oaths: 3, etc.)
- ✅ Shows 3 active oaths with progress bars
- ✅ Shows recent activity
- ✅ Shows friends leaderboard

#### Edge Cases
1. **Long Names**
   - Dashboard title with 100+ char name → Should display properly

2. **No Data**
   - Currently shows mock data → Should display gracefully

### Auth Pages (Signin/Signup)

#### Form Validation
1. **Real-time Validation**
   - Typing too-short password → No error until submit
   - Mismatched passwords → Error on submit

2. **Loading States**
   - During signup → Button shows "Creating account..."
   - During signin → Button shows "Signing in..."
   - Button is disabled during loading
   - Can't submit form multiple times

3. **Error Display**
   - Error messages in red alert box
   - Clear on new submission
   - Visible and readable

#### Links
- ✅ Logo → Returns to landing page
- ✅ "Sign in" link from signup → Goes to signin
- ✅ "Sign up" link from signin → Goes to signup
- ✅ "Forgot password?" → Goes to reset password
- ✅ "Back to sign in" from reset → Returns to signin

## 📱 Responsive Design Edge Cases

### Mobile Screens (< 768px)
- ✅ Auth forms fit on screen
- ✅ Dashboard cards stack vertically
- ✅ Header navigation collapses (may need burger menu)
- ✅ Profile dropdown doesn't overflow screen

### Tablet Screens (768px - 1024px)
- ✅ Dashboard grid adjusts (2 columns)
- ✅ Header shows all elements
- ✅ Arena templates grid (2 columns)

### Desktop Screens (> 1024px)
- ✅ Dashboard 3-column layout
- ✅ All navigation visible
- ✅ Arena templates grid (3 columns)
- ✅ Maximum content width (7xl)

## 🌐 Browser Edge Cases

### Different Browsers
Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (Mac/iOS)

### Browser Features
1. **Autofill**
   - Email/password autofill → Should work
   - Google autofill → Should work

2. **Password Managers**
   - 1Password, LastPass, etc. → Should detect forms
   - Should offer to save new passwords

3. **Private/Incognito Mode**
   - Auth should work normally
   - Session shouldn't persist after close

## ⚡ Performance Edge Cases

### Slow Network
1. **Slow 3G**
   - Loading spinners should show
   - Timeouts should be handled
   - Error messages for network issues

2. **Offline**
   - Firebase operations fail gracefully
   - Clear error message shown

### Fast Network
- ✅ No loading flicker
- ✅ Smooth transitions
- ✅ Immediate auth state updates

## 🔒 Security Edge Cases

### Protected Routes
- ✅ Can't access dashboard without auth
- ✅ Can't bypass auth check
- ✅ Token/session properly validated

### Auth State
- ✅ Logout clears all auth data
- ✅ Can't use old session after logout
- ✅ Can't access protected API routes (if added later)

### Input Sanitization
- ✅ Firebase handles SQL injection (NoSQL)
- ✅ Firebase handles XSS in user data
- ✅ Special characters don't break forms

## 🎯 User Flow Edge Cases

### New User Journey
1. Landing page → Click CTA
2. Sign up page → Create account
3. Dashboard → See welcome message
4. Explore → Visit all nav pages
5. Logout → Return to landing

### Returning User Journey
1. Landing page → Navigate to signin
2. Sign in → Go to dashboard
3. Dashboard → Resume where left off
4. Session persists across refreshes

### Forgot Password Journey
1. Signin page → Click "Forgot password?"
2. Reset page → Enter email
3. Check email → Click reset link
4. Firebase reset page → Set new password
5. Return to signin → Login with new password

## 🐛 Known Issues / Future Improvements

### Not Yet Implemented
- Database persistence (currently mock data)
- Email verification after signup
- Custom password requirements (beyond 6 chars)
- Rate limiting on client side
- Social login beyond Google (Facebook, Twitter, etc.)
- Two-factor authentication
- Account deletion
- Email change
- Display name change

### Current Limitations
- Balance is mock data ($120)
- Dashboard stats are placeholder
- Active oaths are mock data
- Friends list is mock data
- No actual oath creation yet
- No payment processing yet

## ✅ Testing Checklist

### Before Deployment
- [ ] Test signup with new email
- [ ] Test signin with created account
- [ ] Test Google OAuth signup
- [ ] Test Google OAuth signin
- [ ] Test logout
- [ ] Test protected route redirect
- [ ] Test password reset flow
- [ ] Test all navigation links
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test in Chrome, Firefox, Safari
- [ ] Verify Firebase config in .env.local
- [ ] Verify no console errors
- [ ] Verify no linter errors
- [ ] Test slow network conditions
- [ ] Test with browser extensions disabled
- [ ] Test password manager integration

### After Each Code Change
- [ ] Run linter: `npm run lint`
- [ ] Check dev server logs
- [ ] Test signin and signup still work
- [ ] Test protected routes still redirect
- [ ] Verify no console errors

## 🎉 Success Criteria

The authentication system is considered fully functional when:
1. ✅ All signup methods work (email, Google)
2. ✅ All signin methods work (email, Google)
3. ✅ Protected routes redirect properly
4. ✅ Logout works from all pages
5. ✅ Session persists across refreshes
6. ✅ All error cases show user-friendly messages
7. ✅ Loading states display during async operations
8. ✅ All pages match the Oath theme
9. ✅ No linter errors
10. ✅ No console errors
11. ✅ Responsive on all screen sizes
12. ✅ Works in all major browsers

