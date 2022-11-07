import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { AppActionEnum, AppActionType, AppStateType } from './types';

// initial state
const appInitialState: AppStateType = {
  appState: 'Loading',
  alert: { isShown: false, message: '', mode: 'success' },
};

// reducer
const reducer = (state: AppStateType, action: AppActionType): AppStateType => {
  //

  if (action.type === AppActionEnum.SET_APP_STATE) {
    return { ...state, appState: action.payload };
  }

  if (action.type === AppActionEnum.SET_APP_ALERT) {
    return { ...state, alert: action.payload };
  }

  return state;
};

// controller hook
const useMyReducer = ({ initialState }: { initialState?: Partial<AppStateType> }) => useReducer(reducer, { ...appInitialState, ...initialState });

// react-tracked container
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: AppProvider, useTrackedState: useAppValues, useUpdate: useAppDispatch } = container;

// actions
export const setAppState = (appState: AppStateType['appState']): AppActionType => ({ type: AppActionEnum.SET_APP_STATE, payload: appState });
export const setAppAlert = (alert: AppStateType['alert']): AppActionType => ({ type: AppActionEnum.SET_APP_ALERT, payload: alert });
export const clearAppAlert = (): AppActionType => ({ type: AppActionEnum.SET_APP_ALERT, payload: { isShown: false, message: '', mode: 'success' } });
