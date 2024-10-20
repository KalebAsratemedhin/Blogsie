import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { authAPI } from '../redux/api/authAPI'
import { userAPI } from '../redux/api/userAPI'


export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,


  },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
          .concat(userAPI.middleware)

})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>