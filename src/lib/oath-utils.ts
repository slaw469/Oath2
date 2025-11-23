// Utility functions for oath status, time calculations, and formatting

export type StatusType = 'safe' | 'moderate' | 'at-risk';

export interface TimeStatus {
  status: StatusType;
  color: string;
  bgColor: string;
  label: string;
}

/**
 * Calculate status based on time remaining until deadline
 * Green (Safe): > 18 hours remaining (0-6 hours elapsed in 24hr period)
 * Yellow (Moderate): 2-6 hours remaining (18-22 hours elapsed)
 * Red (At Risk): < 2 hours remaining (22-24 hours elapsed)
 */
export function getDeadlineStatus(deadline: Date): TimeStatus {
  const now = new Date();
  const timeRemaining = deadline.getTime() - now.getTime();
  const hoursRemaining = timeRemaining / (1000 * 60 * 60);

  if (hoursRemaining > 6) {
    return {
      status: 'safe',
      color: 'text-success',
      bgColor: 'bg-success/20',
      label: 'Your status: Safe',
    };
  } else if (hoursRemaining > 2) {
    return {
      status: 'moderate',
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      label: 'Your status: Moderate',
    };
  } else {
    return {
      status: 'at-risk',
      color: 'text-danger',
      bgColor: 'bg-danger/20',
      label: 'Your status: At Risk',
    };
  }
}

/**
 * Format time remaining in human-readable format
 */
export function formatTimeRemaining(deadline: Date): string {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff < 0) return 'Overdue';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m ${seconds}s`;
}

/**
 * Format date for upcoming deadlines
 */
export function formatDeadlineDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deadlineDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const daysDiff = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else if (daysDiff === 1) {
    return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

/**
 * Calculate streak from check-ins
 */
export function calculateStreak(checkIns: Array<{ dueDate: Date; status: string }>): number {
  const sortedCheckIns = [...checkIns]
    .filter(c => c.status === 'VERIFIED_COMPLETE' || c.status === 'RESOLVED_COMPLETE')
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  let streak = 0;
  let expectedDate = new Date();
  expectedDate.setHours(0, 0, 0, 0);

  for (const checkIn of sortedCheckIns) {
    const checkInDate = new Date(checkIn.dueDate);
    checkInDate.setHours(0, 0, 0, 0);

    if (checkInDate.getTime() === expectedDate.getTime()) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Format currency (gems or dollars)
 */
export function formatCurrency(amount: number, type: 'GEMS' | 'REAL_MONEY'): string {
  if (type === 'GEMS') {
    return `💎 ${amount.toLocaleString()}`;
  }
  return `$${amount}`;
}

/**
 * Get deadline color based on oath type and time remaining
 * For DAILY oaths: Always red (high urgency every day)
 * For WEEKLY oaths: Green (> 4 days) → Yellow (2-4 days) → Red (< 2 days)
 * For CUSTOM/ONE_TIME: Use standard time-based logic
 */
export function getDeadlineColorByType(
  deadline: Date,
  oathType: 'DAILY' | 'WEEKLY' | 'CUSTOM',
  startDate: Date
): { status: StatusType; color: string; bgColor: string } {
  const now = new Date();
  const timeRemaining = deadline.getTime() - now.getTime();
  const hoursRemaining = timeRemaining / (1000 * 60 * 60);
  const daysRemaining = hoursRemaining / 24;

  // Daily recurring oaths: Always show red (urgent every day)
  if (oathType === 'DAILY') {
    return {
      status: 'at-risk',
      color: 'text-danger',
      bgColor: 'bg-danger',
    };
  }

  // Weekly recurring oaths: Time-based with longer thresholds
  if (oathType === 'WEEKLY') {
    if (daysRemaining > 4) {
      return {
        status: 'safe',
        color: 'text-success',
        bgColor: 'bg-success',
      };
    } else if (daysRemaining > 2) {
      return {
        status: 'moderate',
        color: 'text-warning',
        bgColor: 'bg-warning',
      };
    } else {
      return {
        status: 'at-risk',
        color: 'text-danger',
        bgColor: 'bg-danger',
      };
    }
  }

  // Custom/one-time oaths: Standard time-based logic
  if (hoursRemaining > 6) {
    return {
      status: 'safe',
      color: 'text-success',
      bgColor: 'bg-success',
    };
  } else if (hoursRemaining > 2) {
    return {
      status: 'moderate',
      color: 'text-warning',
      bgColor: 'bg-warning',
    };
  } else {
    return {
      status: 'at-risk',
      color: 'text-danger',
      bgColor: 'bg-danger',
    };
  }
}

/**
 * Format oath type for display
 */
export function formatOathType(type: string): string {
  switch (type) {
    case 'DAILY':
      return 'Daily Recurring';
    case 'WEEKLY':
      return 'Weekly Recurring';
    case 'CUSTOM':
      return 'Custom';
    default:
      return type;
  }
}

