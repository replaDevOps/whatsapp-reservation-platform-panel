const toArabicDigits = (number) => {
  const arabicNumbers = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return number
    .toString()
    .split("")
    .map(d => arabicNumbers[d] ?? d)
    .join("");
};

const BusinessTitle = ({t}) => {
  const title = t("BUSINESS MANAGEMENT");
  const formatted = title.charAt(0).toUpperCase() + title.slice(1).toLocaleLowerCase();
  return formatted;
};

const subscriptionTitle = ({t}) => {
  const title = t("SUBSCRIPTION");
  const formatted = title.charAt(0).toUpperCase() + title.slice(1).toLocaleLowerCase();
  return formatted;
}

const websitepagesTitle = ({t}) => {
  const title = t("WEBSITE PAGES");
  const formatted = title.charAt(0).toUpperCase() + title.slice(1).toLocaleLowerCase();
  return formatted;
}

const settingTitle = ({t}) => {
  const title = t("ADMIN SETTING");
  const formatted = title.charAt(0).toUpperCase() + title.slice(1).toLocaleLowerCase();
  return formatted;
}


export {toArabicDigits,BusinessTitle, subscriptionTitle, websitepagesTitle, settingTitle}