import dayjs from "dayjs"
function mergeDateAndTime(bookingDate, time) {
    return dayjs(bookingDate.format('YYYY-MM-DD') + ' ' + time)
}
function formatDateTime(dateTime) {
    if(!dateTime) return null
    return dayjs(dateTime).format('YYYY-MM-DDTHH:mm')
}
function onlyTime(dateTime) {
    if(!dateTime) return null
    return dayjs(dateTime).format('HH:mm')
}
export { mergeDateAndTime, formatDateTime, onlyTime}
