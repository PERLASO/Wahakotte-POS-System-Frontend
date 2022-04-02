import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';


const { setGlobalState, useGlobalState } = createGlobalState({
    username : "wahakotte",
    password : "12345"

});

export { useGlobalState, setGlobalState };