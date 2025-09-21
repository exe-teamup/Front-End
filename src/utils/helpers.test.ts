import { calculateAge, debounce, formatName } from './helpers';

describe('Utility Functions', () => {
  describe('formatName', () => {
    it('should format name to title case', () => {
      expect(formatName('john doe')).toBe('John Doe');
      expect(formatName('JANE SMITH')).toBe('Jane Smith');
      expect(formatName('mary jane watson')).toBe('Mary Jane Watson');
    });

    it('should handle edge cases', () => {
      expect(formatName('')).toBe('');
      expect(formatName('   ')).toBe('');
      expect(formatName('  john  doe  ')).toBe('John Doe');
    });

    it('should handle invalid inputs', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(formatName(null as any)).toBe('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(formatName(undefined as any)).toBe('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(formatName(123 as any)).toBe('');
    });
  });

  describe('calculateAge', () => {
    beforeEach(() => {
      // Mock current date to 2025-09-21 for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-09-21'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should calculate age correctly', () => {
      expect(calculateAge('2000-09-21')).toBe(25);
      expect(calculateAge('2000-09-20')).toBe(25);
      expect(calculateAge('2000-09-22')).toBe(24);
      expect(calculateAge('1995-01-01')).toBe(30);
    });

    it('should handle Date objects', () => {
      expect(calculateAge(new Date('2000-09-21'))).toBe(25);
    });

    it('should throw error for invalid dates', () => {
      expect(() => calculateAge('invalid-date')).toThrow('Invalid birth date');
      expect(() => calculateAge('')).toThrow('Invalid birth date');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      // Call multiple times quickly
      debouncedFn('arg1');
      debouncedFn('arg2');
      debouncedFn('arg3');

      // Function should not be called yet
      expect(mockFn).not.toHaveBeenCalled();

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      // Function should be called once with the last arguments
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg3');
    });

    it('should handle multiple separate calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);

      debouncedFn('first');
      jest.advanceTimersByTime(500);
      expect(mockFn).toHaveBeenCalledWith('first');

      debouncedFn('second');
      jest.advanceTimersByTime(500);
      expect(mockFn).toHaveBeenCalledWith('second');

      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});
