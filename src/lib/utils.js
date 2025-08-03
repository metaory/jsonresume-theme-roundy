// Date formatting utilities
export const formatDate = (dateStr) => 
  dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''; 