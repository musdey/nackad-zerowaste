const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (someDate: Date) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return (
    someDate.getDate() === tomorrow.getDate() &&
    someDate.getMonth() === tomorrow.getMonth() &&
    someDate.getFullYear() === tomorrow.getFullYear()
  );
};

const isDayAfterTomorrow = (someDate: Date) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 2);
  return (
    someDate.getDate() === tomorrow.getDate() &&
    someDate.getMonth() === tomorrow.getMonth() &&
    someDate.getFullYear() === tomorrow.getFullYear()
  );
};

export { isToday, isTomorrow, isDayAfterTomorrow };
