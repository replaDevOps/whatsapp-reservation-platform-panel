const getUserID = () => {
  try {
    const userId = localStorage?.getItem("userId")
    return userId || null
  }
  catch (e){
    return null
  }
}
const getBusinessId = () => {
  try {
    const businessId = localStorage.getItem("businessId");
    return businessId || null;
  } catch (e) {
    return null;
  }
};

const getBranchId = () => {
  try {
    const branchId = localStorage.getItem("branchId");
    return branchId || null;
  } catch (e) {
    return null;
  }
};
export {
    getUserID,
    getBusinessId,
    getBranchId,
}