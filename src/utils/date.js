import dayjs from 'dayjs'

export const convertTohhmmDDMMYYYY = (date) => {
  return dayjs(date).format('HH:mm DD-MMM-YYYY')
}
