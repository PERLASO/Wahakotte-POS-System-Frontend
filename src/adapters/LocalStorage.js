import jwt_decode from "jwt-decode";



export const setTokens = (authRes) => {
  localStorage.setItem('token', authRes.data);

};

export const setRole = async (Res) => {
 
 
 localStorage.setItem('user', Res.data.id);
 localStorage.setItem('role', Res.data.role.title);
  return await "Success";
};

export const removeTokens = () => {
  
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  localStorage.removeItem('token');
  
  console.log("logout");
  
};

export const getAccessToken = () => localStorage.getItem('token');
export const getUser = () => localStorage.getItem('user');
export const getRole = () => localStorage.getItem('role');