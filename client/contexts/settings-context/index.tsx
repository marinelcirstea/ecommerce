import * as React from "react";

type Action = { type: "SET_SETTINGS"; payload: any };
type Dispatch = (action: Action) => void;
type State = {
  settings: any | undefined; // TODO fix type any after settings implementation
};
type SettingsProviderProps = { children: React.ReactNode };

const SettingsStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function settingsReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SETTINGS": {
      return { settings: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = React.useReducer(settingsReducer, { settings: undefined });

  // try to get initial settings internally
  // after that, we will use the settings from the server when available
  //   React.useEffect(() => {
  //     (async () => {
  //       if (state.settings === undefined) {
  //         const res = await captain.get(`${environment.apiUrl}/api/settings`);
  //         if (res.ok && res.data) {
  //           dispatch({ type: "SET_SETTINGS", payload: res.data });
  //         }
  //       }
  //     })();
  //   }, []);

  const value = { state, dispatch };

  return <SettingsStateContext.Provider value={value}>{children}</SettingsStateContext.Provider>;
}

function useSettings() {
  const context = React.useContext(SettingsStateContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  const {
    state: { settings },
    dispatch,
  } = context;
  return { settings, dispatch };
}

export { SettingsProvider, useSettings };
