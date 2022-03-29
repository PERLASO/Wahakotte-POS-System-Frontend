const env = {
    development: {
      BASE_URL: 'https://localhost:7124/',
      
    },
   
  };
  
  export const env_var = env[process.env.NODE_ENV];