import { configureStore } from "@reduxjs/toolkit";
import frontofficeSlice from './frontoffice/frontofficeSlice';
import backofficeReducer from './backoffice/backofficeSlice';

const store = configureStore({
    reducer: {
        frontoffice: frontofficeSlice,
        backoffice: backofficeReducer,
    }
})

export default store;
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;