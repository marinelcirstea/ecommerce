import captain from "@libs/captain";
import { environment } from "@libs/environment";
import * as React from "react";

type Action = { type: "setuser"; payload: any } | { type: "decrement" };
type Dispatch = (action: Action) => void;
type State = {
  user:
    | {
        firstName: string;
        lastName: string;
        email: string;
      }
    | undefined;
};
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "setuser": {
      return { user: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(userReducer, { user: undefined });

  // try to get initial user internally
  React.useEffect(() => {
    (async () => {
      if (state.user === undefined) {
        const res = await captain.get(`${environment.apiUrl}/api/users/me`);
        if (res.ok && res.data) {
          dispatch({ type: "setuser", payload: res.data });
        }
      }
    })();
  }, []);

  const value = { state, dispatch };

  return <UserStateContext.Provider value={value}>{children}</UserStateContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const {
    state: { user },
    dispatch,
  } = context;
  return { user, dispatch };
}

export { UserProvider, useUser };
export default useUser;
