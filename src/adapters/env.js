const env = {
    development: {
      BASE_URL: 'https://localhost:7124/',
     //BASE_URL: 'http://localhost:8082/',
     BASE_URL: 'https://wahakotte-pos-system-backend.azurewebsites.net/',
      
    },
   
  };
  
  export const env_var = env[process.env.NODE_ENV];