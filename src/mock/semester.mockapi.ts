export interface Semester {
  semesterId: number;
  semesterCode: string;
  semesterName: string;
  startDate: string;
  endDate: string;
  semesterStatus: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
}

export const mockSemesters: Semester[] = [
  {
    semesterId: 1,
    semesterCode: 'FALL2024',
    semesterName: 'Học kỳ Fall 2024',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    semesterStatus: 'COMPLETED',
  },
  {
    semesterId: 2,
    semesterCode: 'SPRING2025',
    semesterName: 'Học kỳ Spring 2025',
    startDate: '2025-01-15',
    endDate: '2025-05-31',
    semesterStatus: 'COMPLETED',
  },
  {
    semesterId: 3,
    semesterCode: 'SUMMER2025',
    semesterName: 'Học kỳ Summer 2025',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    semesterStatus: 'ACTIVE',
  },
  {
    semesterId: 4,
    semesterCode: 'FALL2025',
    semesterName: 'Học kỳ Fall 2025',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    semesterStatus: 'ACTIVE',
  },
  {
    semesterId: 5,
    semesterCode: 'SPRING2026',
    semesterName: 'Học kỳ Spring 2026',
    startDate: '2026-01-15',
    endDate: '2026-05-31',
    semesterStatus: 'UPCOMING',
  },
];

// Mock API functions
export const semesterMockAPI = {
  // Get all semesters
  getAllSemesters: (): Promise<Semester[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockSemesters);
      }, 500);
    });
  },

  // Get semester by ID
  getSemesterById: (id: number): Promise<Semester | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const semester = mockSemesters.find(s => s.semesterId === id);
        resolve(semester);
      }, 300);
    });
  },

  // Get active semesters
  getActiveSemesters: (): Promise<Semester[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const active = mockSemesters.filter(s => s.semesterStatus === 'ACTIVE');
        resolve(active);
      }, 400);
    });
  },

  // Create semester
  createSemester: (
    semester: Omit<Semester, 'semesterId'>
  ): Promise<Semester> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newSemester = {
          ...semester,
          semesterId: Math.floor(Math.random() * 9007199254740991),
        };
        mockSemesters.push(newSemester);
        resolve(newSemester);
      }, 600);
    });
  },

  // Update semester
  updateSemester: (
    id: number,
    updates: Partial<Semester>
  ): Promise<Semester | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockSemesters.findIndex(s => s.semesterId === id);
        if (index !== -1) {
          mockSemesters[index] = { ...mockSemesters[index], ...updates };
          resolve(mockSemesters[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  // Delete semester
  deleteSemester: (id: number): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockSemesters.findIndex(s => s.semesterId === id);
        if (index !== -1) {
          mockSemesters.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  },
};
