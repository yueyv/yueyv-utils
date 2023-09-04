import dayjs from 'dayjs';

const timeCompare = (compareTime) => {
  let now = dayjs()
  const timeDifferenceInDays = now.diff(compareTime, 'day');
  if (timeDifferenceInDays > 15) {
    return true
  } else {
    return false
  }
}
export { timeCompare }


