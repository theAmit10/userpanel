import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer"
import userAccessTokenSlice from "./userAccessTokenSlice"
import { locationReducer } from "./reducers/locationReducer"
import { timeReducer } from "./reducers/timeReducer"
import { dateReducer } from "./reducers/dateReducer"
import { resultReducer } from "./reducers/resultReducer"
import { promotionReducer } from "./reducers/promotionReducer"
import userDeviceTokenSlice from "./userDeviceTokenSlice"
import { sincelotUserApi } from "./api"
import { setupListeners } from "@reduxjs/toolkit/query"


export const store = configureStore({
    reducer:{
        user: userReducer,
        userAccessToken: userAccessTokenSlice,
        location: locationReducer,
        time: timeReducer,
        date: dateReducer,
        result: resultReducer,
        promotion: promotionReducer,
        userDeviceToken: userDeviceTokenSlice,
        [sincelotUserApi.reducerPath]: sincelotUserApi.reducer
     
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sincelotUserApi.middleware),

})

setupListeners(store.dispatch)


export const server = "https://adminbackend-lyyx.onrender.com/api/v1/";
export const serverName = "https://adminbackend-lyyx.onrender.com";

