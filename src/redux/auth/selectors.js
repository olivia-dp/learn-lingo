export const selectUser = (state) => state.auth.user;
export const selectIsAuth = (state) => !!state.auth.user;
export const selectIsAuthLoading = (state) => state.auth.isLoading;