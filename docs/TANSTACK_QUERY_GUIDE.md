# TanStack Query Integration Guide

## Overview

This project now uses **TanStack Query v5** for all API data fetching, caching, and synchronization. This provides:

- ✅ **Real-time data synchronization** (30-second auto-refetch)
- ✅ **Smart caching** (reduces unnecessary API calls)
- ✅ **Automatic refetching** (on window focus, reconnect)
- ✅ **Optimistic updates** (instant UI feedback)
- ✅ **Type-safe API calls** (full TypeScript support)

---

## 📁 Project Structure

```
src/
├── hooks/
│   ├── queryFactory.ts          # Utility functions for creating hooks
│   ├── api/                     # API hooks for all controllers
│   │   ├── index.ts            # Central export file
│   │   ├── useUsersApi.ts      # User API hooks
│   │   ├── useGroupsApi.ts     # Group API hooks
│   │   ├── usePostsApi.ts      # Post API hooks
│   │   ├── useJoinRequestsApi.ts
│   │   ├── useCoursesApi.ts
│   │   ├── useSemestersApi.ts
│   │   ├── useMajorsApi.ts
│   │   ├── useLecturersApi.ts
│   │   ├── useNotificationsApi.ts
│   │   ├── useAccountNotificationsApi.ts
│   │   ├── useAuthApi.ts
│   │   ├── useModeratorApi.ts
│   │   ├── useDashboardApi.ts
│   │   ├── useGroupTemplatesApi.ts
│   │   └── useAccountsApi.ts
│   └── usePostsQuery.ts        # Enhanced post hooks with filtering
```

---

## 🚀 Quick Start

### 1. Basic GET Request

```typescript
import { useGetAllGroups } from '@/hooks/api';

function GroupsList() {
  const { data: groups, isLoading, isError, error } = useGetAllGroups();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {groups?.map(group => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
}
```

### 2. GET with Path Parameter

```typescript
import { useGetGroupById } from '@/hooks/api';

function GroupDetail({ groupId }: { groupId: string }) {
  const { data: group, isLoading } = useGetGroupById(groupId);

  if (isLoading) return <div>Loading...</div>;

  return <div>{group?.name}</div>;
}
```

### 3. POST/Create Mutation

```typescript
import { useCreateGroup } from '@/hooks/api';
import { toast } from 'sonner';

function CreateGroupForm() {
  const { mutate: createGroup, isPending } = useCreateGroup();

  const handleSubmit = (data: CreateGroupData) => {
    createGroup()(data, {
      onSuccess: () => {
        toast.success('Group created!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Group'}
      </button>
    </form>
  );
}
```

### 4. PUT/Update Mutation

```typescript
import { useUpdateGroup } from '@/hooks/api';

function EditGroup({ groupId }: { groupId: string }) {
  const { mutate: updateGroup, isPending } = useUpdateGroup();

  const handleUpdate = (data: UpdateGroupData) => {
    updateGroup()({ id: groupId, data }, {
      onSuccess: () => {
        toast.success('Group updated!');
      },
    });
  };

  return <button onClick={handleUpdate}>Update</button>;
}
```

### 5. DELETE Mutation

```typescript
import { useDeleteGroup } from '@/hooks/api';

function DeleteGroupButton({ groupId }: { groupId: string }) {
  const { mutate: deleteGroup, isPending } = useDeleteGroup();

  const handleDelete = () => {
    deleteGroup()(groupId, {
      onSuccess: () => {
        toast.success('Group deleted!');
      },
    });
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

---

## 📋 Available API Hooks

### User Controller (`useUsersApi.ts`)

#### Query Hooks

- `useGetUserById(id)` - Get user by ID
- `useGetAllUsers()` - Get all users
- `useGetUsersWithoutGroup()` - Get users without group
- `useSearchUsers(searchParams)` - Search users
- `useGetUserProfile()` - Get current user profile
- `useGetUsersPaginated()` - Get users with pagination
- `useGetUsersByCourse(courseId)` - Get users by course

#### Mutation Hooks

- `useUpdateUser()` - Update user
- `useDeleteUser()` - Delete user
- `useMoveCourse()` - Move user to different course
- `useSwapCourse()` - Swap course between users
- `useImportUsers()` - Import users from file
- `useImportNotEligibleUsers()` - Import not eligible users

### Group Controller (`useGroupsApi.ts`)

#### Query Hooks

- `useGetGroupById(id)` - Get group by ID
- `useGetAllGroups()` - Get all groups
- `useGetGroupsByCourse(courseId)` - Get groups by course
- `useGetGroupsByLecturer(lecturerId)` - Get groups by lecturer
- `useFilterGroups()` - Filter groups

#### Mutation Hooks

- `useCreateGroup()` - Create new group
- `useUpdateGroup()` - Update group
- `useDeleteGroup()` - Delete group
- `useTransferLeader(groupId)` - Transfer group leadership
- `useKickMember(groupId)` - Kick member from group
- `useLeaveGroup(groupId)` - Leave group
- `useAddMember(groupId)` - Add member to group

### Post Controller (`usePostsApi.ts`)

#### Query Hooks

- `useGetAllPosts()` - Get all posts
- `useGetGroupPosts()` - Get group posts (recruiting)
- `useGetPostById(postId)` - Get post by ID
- `useGetPostsByGroup(groupId)` - Get posts by group

#### Mutation Hooks

- `useCreateUserPost()` - Create user post (looking for group)
- `useCreateGroupPost()` - Create group post (recruiting)
- `useUpdatePost()` - Update post
- `useDeletePost()` - Delete post

### Join Request Controller (`useJoinRequestsApi.ts`)

#### Query Hooks

- `useGetAllJoinRequests()` - Get all join requests
- `useGetJoinRequestById(id)` - Get join request by ID
- `useGetJoinRequestsByStudent(studentId)` - Get requests by student

#### Mutation Hooks

- `useCreateJoinRequest()` - Create join request
- `useHandleJoinRequest()` - Approve/reject join request
- `useDeleteJoinRequest()` - Delete join request

### Course Controller (`useCoursesApi.ts`)

- `useGetAllCourses()` - Get all courses
- `useGetCourseById(id)` - Get course by ID
- `useGetCoursesBySemester(semesterId)` - Get courses by semester
- `useGetCoursesByLecturer(lecturerId)` - Get courses by lecturer
- `useCreateCourse()` - Create course
- `useUpdateCourse()` - Update course
- `useDeleteCourse()` - Delete course
- `useImportCourses()` - Import courses from file

### Semester Controller (`useSemestersApi.ts`)

- `useGetAllSemesters()` - Get all semesters
- `useGetSemesterById(id)` - Get semester by ID
- `useCreateSemester()` - Create semester
- `useUpdateSemester()` - Update semester
- `useDeleteSemester()` - Delete semester

### Major Controller (`useMajorsApi.ts`)

- `useGetAllMajors()` - Get all majors
- `useGetMajorsByParent(parentId)` - Get majors by parent
- `useGetMajorsByLevel(level)` - Get majors by level
- `useCreateMajor()` - Create major
- `useUpdateMajor()` - Update major
- `useDeleteMajor()` - Delete major
- `useImportMajors()` - Import majors from file

---

## 🔄 Real-Time Synchronization

TanStack Query automatically refetches data:

- Every 30 seconds (configurable via `refetchInterval`)
- When window regains focus
- When network reconnects
- After mutations (automatic cache invalidation)

### Example: Real-time group list

```typescript
function GroupsList() {
  // Automatically refetches every 30 seconds
  const { data: groups } = useGetAllGroups({
    refetchInterval: 30000, // 30 seconds
  });

  return <div>Groups will update automatically!</div>;
}
```

---

## ⚙️ Advanced Usage

### Custom Refetch Interval

```typescript
// Refetch every 10 seconds
const { data } = useGetAllGroups({
  refetchInterval: 10000,
});

// Disable auto-refetch
const { data } = useGetAllGroups({
  refetchInterval: false,
});
```

### Conditional Fetching

```typescript
// Only fetch when groupId is available
const { data: group } = useGetGroupById(groupId, {
  enabled: !!groupId,
});
```

### Manual Refetch

```typescript
function GroupsList() {
  const { data, refetch } = useGetAllGroups();

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {/* ... */}
    </div>
  );
}
```

### Optimistic Updates

```typescript
const { mutate: updateGroup } = useUpdateGroup();

const handleUpdate = updatedData => {
  // UI updates immediately, reverts if API fails
  updateGroup()(
    { id: groupId, data: updatedData },
    {
      onMutate: async newData => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['groups'] });

        // Snapshot previous value
        const previousGroups = queryClient.getQueryData(['groups']);

        // Optimistically update to new value
        queryClient.setQueryData(['groups'], old => {
          return old.map(g =>
            g.id === groupId ? { ...g, ...newData.data } : g
          );
        });

        return { previousGroups };
      },
      onError: (err, newData, context) => {
        // Rollback on error
        queryClient.setQueryData(['groups'], context.previousGroups);
      },
      onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries({ queryKey: ['groups'] });
      },
    }
  );
};
```

---

## 🐛 Debugging

### Enable DevTools (Development only)

Add to `main.tsx`:

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
```

---

## 📦 Migration Guide

### Old Approach (Zustand)

```typescript
// OLD: Using Zustand store
const { posts, fetchAllPosts, isLoading } = usePostStore();

useEffect(() => {
  fetchAllPosts();
}, []);
```

### New Approach (TanStack Query)

```typescript
// NEW: Using TanStack Query
const { data: posts, isLoading } = useGetAllPosts();
// That's it! Auto-fetches, caches, and syncs
```

---

## ✅ Best Practices

1. **Always use the hooks from `@/hooks/api`** - Don't call ApiClient directly
2. **Handle loading and error states** - Provide good UX feedback
3. **Use optimistic updates** for instant UI feedback
4. **Leverage automatic refetching** - Don't manually refetch unless needed
5. **Use proper TypeScript types** - Import types from your API types file

---

## 🎯 Benefits Summary

| Feature                | Before                       | After                             |
| ---------------------- | ---------------------------- | --------------------------------- |
| **Data Fetching**      | Manual `useEffect` + Zustand | Automatic with TanStack Query     |
| **Caching**            | Manual state management      | Built-in smart caching            |
| **Real-time Sync**     | Not implemented              | 30-second auto-refetch            |
| **Loading States**     | Manual tracking              | Built-in `isLoading`, `isPending` |
| **Error Handling**     | Manual try-catch             | Built-in `isError`, `error`       |
| **Refetch on Focus**   | Not implemented              | Automatic                         |
| **Optimistic Updates** | Manual implementation        | Built-in support                  |
| **TypeScript Support** | Partial                      | Full type safety                  |

---

## 📚 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Query Keys Best Practices](https://tkdodo.eu/blog/effective-react-query-keys)
- [Mutations & Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)

---

**Happy Coding! 🚀**
