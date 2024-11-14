// import { useAppSelector } from "../store";
// import { combineReducers } from "redux";
// import { useReducer } from "react";
// import { io } from "socket.io-client";
// import { socket } from "../../main";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStatus, IUser, userState } from "../../types/redux";

const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null,
};

export const fetchLogin = createAsyncThunk("user/login",
    async (user: { username: string; password: string }, thunkApi) => {
        try {
            const res = await fetch("http://localhost:2020/api/users/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't login, please try again");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token)
            console.log(data);
            return data
            // thunkApi.fulfillWithValue(data);
        } catch (err) {
            console.log("sorry", err);
            thunkApi.rejectWithValue("Can't login, please try again");
        }
    }
);

export const fetchRegister = createAsyncThunk(
    "user/register",
    async (user: { username: string, password: string, org: string, location: string }, thunkApi) => {
        try {
            console.log(JSON.stringify(user));
            const res = await fetch("http://localhost:2020/api/users/register", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't create new user, please try again");
            }
            const data = await res.json();
            thunkApi.fulfillWithValue(data);
        } catch (err) {
            thunkApi.rejectWithValue("Can't create new user, please try again");
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
        },
        // vote: (state, action) => {
        //   state.user!.hasVoted = true,
        //   state.user!.votedFor = action.payload
        // }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = DataStatus.LOADING;
                state.error = null;
                state.user = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS;
                state.error = null;
                state.user = action.payload as IUser;
                console.log("Login successfuly");
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = DataStatus.FAILED;
                state.error = action.payload as string;
                state.user = null;
            })
    },

});

export default userSlice
