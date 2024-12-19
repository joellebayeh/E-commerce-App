import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API } from "@/app/screens/endpoints";

// Async thunk to get user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (values: { token: string; activeTab: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API.USER.GET_USER_DETAILS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${values.token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      if (values.activeTab !== data.role) {
        throw new Error(
          `This user does not exist as ${
            values.activeTab === "admin" ? "an" : "a"
          } ${values.activeTab}`
        );
      }
      localStorage.setItem('token', values.token);
      localStorage.setItem("role", data.role);
      return data; // Return the user details
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: "",
    status: "", // "" | "loading" | "succeeded" | "failed"
    error: "",
  },
  reducers: {
    clearUserState: (state) => {
      localStorage.removeItem("role");
      state.userDetails = "";
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
