import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Notification, University } from '@/types';

interface AuthState {
  user: User | null; token: string | null; isAuthenticated: boolean; loading: boolean;
}

interface UIState {
  sidebarOpen: boolean; theme: 'light' | 'dark'; notifications: Notification[];
}

interface CompareState {
  universities: University[];
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false, loading: true } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user; state.token = action.payload.token;
      state.isAuthenticated = true; state.loading = false;
    },
    logout: (state) => { state.user = null; state.token = null; state.isAuthenticated = false; state.loading = false; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) Object.assign(state.user, action.payload);
    },
  },
});

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: false, theme: 'light', notifications: [] } as UIState,
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => { state.theme = action.payload; },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const n = state.notifications.find(n => n.id === action.payload);
      if (n) n.read = true;
    },
    clearNotifications: (state) => { state.notifications = []; },
  },
});

const compareSlice = createSlice({
  name: 'compare',
  initialState: { universities: [] } as CompareState,
  reducers: {
    addToCompare: (state, action: PayloadAction<University>) => {
      if (state.universities.length < 4 && !state.universities.find(u => u.id === action.payload.id)) {
        state.universities.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.universities = state.universities.filter(u => u.id !== action.payload);
    },
    clearCompare: (state) => { state.universities = []; },
  },
});

export const { setCredentials, logout, setLoading, updateUser } = authSlice.actions;
export const { toggleSidebar, setTheme, addNotification, markNotificationRead, clearNotifications } = uiSlice.actions;
export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    compare: compareSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
