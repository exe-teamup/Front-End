export const hasStudentJoinGroup = (
  profile?: { groupId?: string } | null
): boolean => {
  return !!profile?.groupId;
};
