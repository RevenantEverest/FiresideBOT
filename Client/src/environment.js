const { 
    REACT_APP_CLIENT_ID, 
    REACT_APP_API, 
    REACT_APP_REDIRECT 
} = process.env;

const ENVIRONMENT = {
    API: REACT_APP_API,
    CLIENT_ID: REACT_APP_CLIENT_ID,
    REDIRECT: REACT_APP_REDIRECT
};

export default ENVIRONMENT;