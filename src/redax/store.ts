import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/attackSlice";
import actionSlice from "./slices/actionSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        action: actionSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store
