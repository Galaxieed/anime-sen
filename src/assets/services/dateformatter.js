export default function dateFormatter(date) {
  const thisDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  };
  return thisDate.toLocaleString('en-US', options);
}