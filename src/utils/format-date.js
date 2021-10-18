const formatDate = date => {
  const enteredDate = new Date(date);
  const day = enteredDate.getDate().toString().padStart(2, '0');
  const month = (enteredDate.getMonth() + 1).toString().padStart(2, '0');
  const year = enteredDate.getFullYear().toString().padStart(4, '0');
  const minutes = enteredDate.getMinutes().toString().padStart(2, '0');
  let hours = enteredDate.getHours();
  hours = hours % 12;
  hours = hours ? hours.toString().padStart(2, '0') : 12;
  const ampm = hours >= 12 ? 'AM' : 'PM';

  return `${year}-${month}-${day}, ${hours}:${minutes} ${ampm}`;
};

export default formatDate;
