import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setCredentials, logout, setLoading, updateUser } from './slices/authSlice';
import uiReducer, { toggleSidebar, setTheme, addNotification, markNotificationRead, clearNotifications } from './slices/uiSlice';
import compareReducer, { addToCompare, removeFromCompare, clearCompare } from './slices/compareSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    compare: compareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { setCredentials, logout, setLoading, updateUser };
export { toggleSidebar, setTheme, addNotification, markNotificationRead, clearNotifications };
export { addToCompare, removeFromCompare, clearCompare };
