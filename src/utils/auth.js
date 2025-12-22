const getUserID = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.userId || null
  }
  catch (e){
    return null
  }
}

const getUserName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.firstName + ' ' + user?.lastName || null;
  } catch (e) {
    return null;
  }
};

const getUserFirstName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.firstName || null;
  } catch (e) {
    return null;
  }
};

const getUserLastName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.lastName || null;
  } catch (e) {
    return null;
  }
};

const getRole = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.role  || null;
  } catch (e) {
    return null;
  }
};

const getUserImage = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.imageUrl  || null;
  } catch (e) {
    return null;
  }
};
export {
    getUserID,
    getUserName,
    getRole,
    getUserFirstName,
    getUserLastName,
    getUserImage,
}