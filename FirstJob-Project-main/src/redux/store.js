// store.js
import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  // for Redux DevTools support

const store = configureStore({
    reducer: rootReducer
})

export default store;
