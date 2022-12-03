export const isValidTimeSlot = (data: string) => {
  let regex = /[0-9][0-9]+:[0-9][0-9]+-[0-9][0-9]+:[0-9][0-9]+/i;
  return regex.test(data);
};

export const isValidPostalCode = (data: number) => {
  if (data.toString().length !== 4) {
    return false;
  } else {
    return true;
  }
};
