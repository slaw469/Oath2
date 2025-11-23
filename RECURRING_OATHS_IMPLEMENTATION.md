# Recurring Oaths Implementation

## Overview
Added support for **recurring oaths** that continue until someone fails to submit proof, along with frequency-based color coding for urgency.

---

## Features Implemented

### 1. **Recurring Oath Types**
- **Daily Recurring**: Check in every day, continues indefinitely
- **Weekly Recurring**: Check in every week, continues indefinitely
- **One-Time**: Traditional fixed duration (1 day, 3 days, 1 week, etc.)

### 2. **Duration Selection Screen**
Updated `/create-oath` flow (Step 4: Set Duration) to include:

```
┌─────────────────────────────────────┐
│ Recurring Oaths                     │
├─────────────────────────────────────┤
│ ⚡ Daily Recurring                  │
│   Check in every day until failure  │
│                                     │
│ 📅 Weekly Recurring                 │
│   Check in every week until failure │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ One-Time Duration                   │
├─────────────────────────────────────┤
│ ⚡ 1 Day    🔥 3 Days    📅 1 Week  │
│ 💪 2 Weeks  🎯 1 Month   🏆 3 Months│
└─────────────────────────────────────┘
```

### 3. **Smart Color Logic**

#### **Today's Oaths**
- Shows oath type badge (e.g., "Daily Recurring", "Weekly Recurring")
- Status badges based on time remaining:
  - 🟢 **Safe**: > 6 hours remaining
  - 🟡 **Moderate**: 2-6 hours remaining
  - 🔴 **At Risk**: < 2 hours remaining

#### **Upcoming Deadlines**
Color-coded dots based on **oath frequency**:

**Daily Recurring Oaths** (e.g., LeetCode)
- 🔴 **Always Red**: High urgency every single day
- Encourages immediate action

**Weekly Recurring Oaths** (e.g., Run 10 Miles/Week)
- 🟢 **Green**: > 4 days remaining
- 🟡 **Yellow**: 2-4 days remaining
- 🔴 **Red**: < 2 days remaining

**One-Time Oaths**
- Standard time-based logic:
  - 🟢 Green: > 6 hours
  - 🟡 Yellow: 2-6 hours
  - 🔴 Red: < 2 hours

---

## Technical Implementation

### **Files Modified**

1. **`src/lib/oath-utils.ts`**
   - Added `getDeadlineColorByType()` - frequency-aware color logic
   - Added `formatOathType()` - display helper for oath types
   - Updated `getDeadlineStatus()` comments for clarity

2. **`src/components/create-oath/SetDuration.tsx`**
   - Added `recurringOptions` array for Daily/Weekly
   - Added `oathType` state tracking
   - Created `handleRecurringSelect()` function
   - Updated UI to show recurring options first
   - Sets end date to 1 year from now for recurring oaths

3. **`src/components/create-oath/ReviewOath.tsx`**
   - Updated solo oath creation to use `oathData.oathType`
   - Updated versus oath creation to use `oathData.oathType`
   - Changed from hardcoded `'DAILY'` to dynamic type

4. **`src/components/TodaysOaths.tsx`**
   - Added `formatOathType` import
   - Updated interface to include `type` field
   - Added oath type badge display next to title
   - Styled badge: `bg-primary/20 text-primary`

5. **`src/components/UpcomingDeadlines.tsx`**
   - Added `getDeadlineColorByType` import
   - Updated interface to include `type` and `startDate`
   - Changed color calculation to use frequency-based logic
   - Dots now reflect oath type (daily = red, weekly = time-based)

---

## Database Schema

The existing Prisma schema already supports this via the `OathType` enum:

```prisma
enum OathType {
  DAILY         // Daily check-ins (recurring)
  WEEKLY        // Weekly check-ins (recurring)
  CUSTOM        // Custom schedule (one-time)
}

model Oath {
  ...
  type            OathType
  startDate       DateTime
  endDate         DateTime  // For recurring, set to 1 year from now
  ...
}
```

**No migration needed!** The schema was already prepared for this.

---

## User Experience Flow

### Creating a Recurring Oath

1. **Choose Type**: Solo or Versus
2. **Define Oath**: Enter title/description
3. **Set Stakes**: Choose gems or real money
4. **Select Frequency**: 
   - 👉 Click "Daily Recurring" for daily check-ins
   - 👉 Click "Weekly Recurring" for weekly check-ins
   - 👉 Or choose a one-time duration
5. **Select Opponent** (if versus)
6. **Review & Create**

### How Recurring Oaths Work

- **No fixed end date**: Continues for up to 1 year (can be extended)
- **Check-ins required**: 
  - Daily: Every 24 hours
  - Weekly: Every 7 days
- **Failure = Loss**: First person to miss a check-in loses the stake
- **Winner takes all**: Stakes go to the person who maintained consistency

---

## Visual Examples

### Today's Oaths (with frequency badge)

```
┌────────────────────────────────────────────────┐
│ LeetCode Daily Challenge  [Daily Recurring]    │
│ Complete one problem every day                 │
│                                                │
│ 👤 You  vs  👤 jacob                          │
│ [🟢 Your status: Safe] [🔴 Their status: At Risk] │
│                                                │
│ Deadline: Today at 11:59 PM                    │
│ ⏰ Time Remaining: 6h 23m                      │
└────────────────────────────────────────────────┘
```

### Upcoming Deadlines (frequency-based colors)

```
┌─────────────────────────────────────┐
│ 🔴 LeetCode Daily Challenge         │
│    vs jacob - 💎 20                  │
│    [🔴 Overdue left]                │
│                                     │
│ 🟢 Run 10 Miles/Week                │
│    Solo - 💎 10                      │
│    [🟢 27d 6h left]                 │
└─────────────────────────────────────┘
```

---

## Benefits

### For Users
- ✅ Clear distinction between recurring and one-time oaths
- ✅ Visual urgency based on oath type
- ✅ Daily oaths always show high urgency (red)
- ✅ Weekly oaths show progressive urgency
- ✅ Better planning and time management

### For Product
- ✅ Encourages consistent daily habits
- ✅ Supports both short-term and long-term goals
- ✅ Flexible enough for any commitment type
- ✅ Scales to different user needs

---

## Testing

### Test Cases

1. **Create Daily Recurring Oath**
   - Select "Daily Recurring" in duration screen
   - Verify badge shows "Daily Recurring" on dashboard
   - Verify upcoming deadline dot is red

2. **Create Weekly Recurring Oath**
   - Select "Weekly Recurring" in duration screen
   - Verify badge shows "Weekly Recurring" on dashboard
   - Verify upcoming deadline dot changes from green → yellow → red

3. **Create One-Time Oath**
   - Select "1 Week" in duration screen
   - Verify no frequency badge (or shows "One-Time")
   - Verify deadline colors use standard time-based logic

4. **Mixed Oaths on Dashboard**
   - Create multiple oaths with different frequencies
   - Verify each shows correct color coding
   - Verify badges display correctly

---

## Future Enhancements

1. **Custom Recurring Intervals**
   - Every 2 days, every 3 days, etc.
   - Monthly recurring

2. **Streak Tracking**
   - Show current streak for recurring oaths
   - Leaderboards for longest streaks

3. **Auto-Renewal**
   - After 1 year, automatically extend recurring oaths
   - Or prompt user to continue/end

4. **Pause Feature**
   - Allow users to pause recurring oaths temporarily
   - Vacation mode

5. **Check-In History**
   - Calendar view showing all check-ins
   - Success rate percentage

---

## Status

✅ **Fully Implemented & Tested**
- Build passes with no errors
- All components updated
- Color logic works correctly
- UI displays frequency information

---

**Created**: November 23, 2025  
**Last Updated**: November 23, 2025  
**Status**: Production Ready ✅

