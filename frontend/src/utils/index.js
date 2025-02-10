export const color = () => {
  return `rgba(${(Math.random() * 255).toFixed()},${(
    Math.random() * 255
  ).toFixed()},${(Math.random() * 255).toFixed()},0.8)`;
};

export const getInitials = (name) => {
  if (!name) return "GUEST";

  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
};

export const formatDate = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
};

export const formatTime = (date) => 
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

export const formatOrderTime = (date) => {
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return date.toLocaleTimeString(undefined, options); // e.g., "03:25 PM"
};
