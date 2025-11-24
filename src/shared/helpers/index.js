import dayjs from "dayjs"

const utcDateTimeToLocal= (dateTime)=>{
    return dayjs.utc(dateTime).local().format("YYYY-MM-DD hh:mm A")
}
const greaterThanEqualTo = (expiry)=> {
    if (dayjs().isSameOrAfter(expiry)) 
        return true
    return false
}
export {utcDateTimeToLocal, greaterThanEqualTo}
export * from "./TableLoader"
