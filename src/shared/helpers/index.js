import dayjs from "dayjs"
import { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';

const utcDateTimeToLocal= (dateTime)=>{
    return dayjs.utc(dateTime).local().format("YYYY-MM-DD hh:mm A")
}
const utcDateToLocal = (dateTime) => {
    return dayjs.utc(dateTime).local().format("YYYY-MM-DD");
};
const greaterThanEqualTo = (expiry)=> {
    if (dayjs().isSameOrAfter(expiry)) 
        return true
    return false
}

const handleApolloError = (apolloError, messageApi) => {
    const errorMessage =
        apolloError?.graphQLErrors?.[0]?.message ||
        apolloError?.message ||
        "Something went wrong!";

    messageApi.error(errorMessage);
};


const capitalizeTranslated = (value, t) => {
  if (value === null || value === undefined) return "";

  // Convert value to string first
  let str = String(value);

  // If t is a function, translate it
  if (typeof t === "function") {
    str = String(t(value));
  }

  // Capitalize first letter, rest lowercase
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


function formatTime24to12(timeStr) {
    if (!timeStr) return '';
    // Split the time string into hours and minutes
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

const useDebounce = (value, delay = 500)=> {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}


const notifySuccess = (api, title, description, onClose) => {
    api.success({
        title,
        description,
        showProgress: true,
        pauseOnHover: true,
        onClose,
        duration: 2,
    });
};

const notifyError = (api, error) => {
    api.error({
        title: "Error",
        description: error?.message || error,
        showProgress: true,
        pauseOnHover: true,
        duration:2
    });
};

const FieldMerger = ({ object, fields = [], separator = " " }) => {
    if (!object || !fields.length) return "--"; // fallback if empty
    return fields
        .map(field => object[field])       // extract each field
        .filter(value => value !== undefined && value !== null && value !== "") // remove empty
        .join(separator);                  // join with separator
};

const getInitials = (name) => {
    const safeName = typeof name === 'string' ? name : '';
    const parts = safeName.trim().split(' ').filter(Boolean);

    return (
        (parts[0]?.[0] || '') +
        (parts.length > 1 ? parts[parts.length - 1]?.[0] : '')
    ).toUpperCase();
};

const handleNumberKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
        e.preventDefault();
    }
};

const handleNumberInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
};


export {utcDateTimeToLocal, greaterThanEqualTo, handleApolloError, capitalizeTranslated, formatTime24to12, useDebounce, notifySuccess, notifyError,FieldMerger,utcDateToLocal,getInitials,handleNumberKeyDown,handleNumberInput}
export * from "./TableLoader"
export * from "./SmLoader"
