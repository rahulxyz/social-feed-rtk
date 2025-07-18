import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { selectCurrentUsername } from "../auths/authSlice";

interface User {
  id: string;
  name: string;
}

const initialState: User[] = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
//   selectors: {
//     selectAllUsers: (state: RootState) => state.users,
//     selectUserById: (state: RootState, userId: string | null) =>
//       state.users.find((user) => user.id === userId),
//   },
});

export default usersSlice.reducer;

// export const {selectAllUsers, selectUserById} = usersSlice.selectors;
export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find(user => user.id === userId)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}