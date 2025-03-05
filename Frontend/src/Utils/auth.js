
export const checkAuthExpiration = () => {
    const expiration = localStorage.getItem("tokenExpiration");
    if (expiration && Date.now() > parseInt(expiration)) {
      localStorage.removeItem("isAdminAuthenticated");
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("tokenExpiration");
      return false;
    }
    return true;
  };