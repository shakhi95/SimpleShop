//
export type AppStateType = {
  appState: 'Loading' | 'LoggedIn' | 'LoggedOut' | 'Crashed';
  alert: { isShown: boolean; message: string; mode: 'error' | 'success' };
};

export enum AppActionEnum {
  SET_APP_STATE = 'SET_App_State',
  SET_APP_ALERT = 'SET_App_Alert',
}

export type AppActionType =
  | { type: AppActionEnum.SET_APP_ALERT; payload: AppStateType['alert'] }
  | { type: AppActionEnum.SET_APP_STATE; payload: AppStateType['appState'] };
