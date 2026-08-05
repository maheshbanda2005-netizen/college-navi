import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

const initialState: UIState = {
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const n = state.notifications.find((n) => n.id === action.payload);
      if (n) n.read = true;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { toggleSidebar, setTheme, addNotification, markNotificationRead, clearNotifications } = uiSlice.actions;
export default uiSlice.reducer;
