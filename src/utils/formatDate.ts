const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return 'Vừa xong';
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInHours < 72) {
    return `${Math.floor(diffInHours / 24)} ngày trước`;
  } else {
    return dateString;
  }
};

export { formatDate };
