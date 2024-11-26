import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { actionState, DataStatus, IAction } from "../../types/redux";

const initialState: actionState = {
    error: null,
    status: DataStatus.IDLE,
    action: [],
};

export const fetchActions = createAsyncThunk("api/actions",
    async () => {
        try {            
            const res = await fetch( process.env.BASE_URL || "http://localhost:2020/api/actions");
            if (res.status != 200) {
                return "Can't get actions, please try again"
            }
            const data = await res.json();
            return data
        } catch (err) {
            return "Can't attack!, please try again"
        }
    }
);

export const fetchAttackShut = createAsyncThunk("api/attacks",
    async (attack: { user_id: string, missileName: string, area: string }, thunkApi) => {
        try {
            console.log(JSON.stringify(attack));            
            const res = await fetch(process.env.BASE_URL || "http://localhost:2020/api/attacks", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(attack),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't attack, please try again");
            }
            const data = await res.json();
            thunkApi.fulfillWithValue(data);
        } catch (err) {
            thunkApi.rejectWithValue("Can't attack!, please try again");
        }
    }
);

export const fetchIntercept = createAsyncThunk("api/protects", 
    async (attack: { action_id: string, intercept_id: string }, thunkApi) => {
        try {
            console.log(JSON.stringify(attack));
            const res = await fetch(process.env.BASE_URL || "http://localhost:2020/api/protects", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(attack),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't attack, please try again");
            }
            const data = await res.json();
            thunkApi.fulfillWithValue(data);
        } catch (err) {
            thunkApi.rejectWithValue("Can't attack!, please try again");
        }
    }
);

const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<actionState | any>) => {
        builder
            .addCase(fetchActions.pending, (state) => {
                state.status = DataStatus.LOADING;
                state.error = null;
                state.action = null;
            })
            .addCase(fetchActions.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS;
                state.error = null;
                state.action = action.payload as IAction[];                
            })
            .addCase(fetchActions.rejected, (state, action) => {
                state.status = DataStatus.FAILED;
                state.error = action.payload as string;
                state.action = null;
            })
            .addCase(fetchAttackShut.pending, (state) => {
                state.status = DataStatus.LOADING;
                state.error = null;
                state.action = null;
            })
            .addCase(fetchAttackShut.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS;
                state.error = null;
                state.action = state.action?.push(action.payload);
            })
            .addCase(fetchAttackShut.rejected, (state, action) => {
                state.status = DataStatus.FAILED;
                state.error = action.payload as string;
                state.action = null;
            })
    },

});

export default actionSlice
