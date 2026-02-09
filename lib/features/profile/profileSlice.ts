import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store/store";
import { profileApi } from "./profileApi";

// Define the User interface based on the API response
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  vendorProfile: boolean;
  onboarding: {
    percentage: number;
    status: string;
    accountStatus: string;
    isBusinessInfoComplete: boolean;
    isDocumentsComplete: boolean;
    isAccountDetailsComplete: boolean;
  };
}

interface ProfileState {
  user: User | null;
}

const initialState: ProfileState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearProfile: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      profileApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.data;
      },
    );
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export const selectUserProfile = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
