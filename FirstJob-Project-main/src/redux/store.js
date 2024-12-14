import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
    reducer: rootReducer,

})


export default store;