export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatter.format(date);
};

export const headers = (customHeaders = {}) => {
  return {
    "Content-Type": "application/json",
    ...customHeaders,
  };
};
