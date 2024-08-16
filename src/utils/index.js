const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

  // Check if the date matches the format DD-MM-YYYY
  if (!regex.test(date)) {
    return false;
  }

  // Split the date into day, month, and year
  const [day, month, year] = date.split("-").map(Number);

  // List of days in each month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year if the month is February
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (isLeapYear) {
      daysInMonth[1] = 29;
    }
  }

  // Validate the day
  if (day > daysInMonth[month - 1]) {
    return false;
  }

  // Check if the date is in the past
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return false;
  }

  return true;
};

module.exports = { normalizePort, isValidDate };
