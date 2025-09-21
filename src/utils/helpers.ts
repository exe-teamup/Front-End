/**
 * Format a name to title case
 */
export const formatName = (name: string): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name
    .trim()
    .split(/\s+/) // Split by one or more whitespace characters
    .filter(word => word.length > 0) // Remove empty strings
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Calculate age from birth date
 */
export const calculateAge = (birthDate: string | Date): number => {
  const birth = new Date(birthDate);
  const today = new Date();

  if (isNaN(birth.getTime())) {
    throw new Error('Invalid birth date');
  }

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
