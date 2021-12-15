import { useUser } from "contexts/user-context";
import { environment } from "@libs/environment";
import Router from "next/router";
import { FC } from "react";
import captain from "@libs/captain";

export const Logout: FC = () => {
  const { user, dispatch } = useUser();

  const onLogout = async () => {
    await captain.post(`${environment.apiUrl}/logout`, null);
    dispatch({ type: "setuser", payload: undefined });
    Router.replace("/");
  };

  const onLogoutAll = async () => {
    await captain.post(`${environment.apiUrl}/logout-all`, null);
    Router.replace("/");
  };

  return (
    <>
      {user && (
        <div className="flex justify-center space-x-2">
          <button className="text-sm font-medium text-blue-500" onClick={onLogout}>
            Logout
          </button>
          <button className="text-sm text-blue-500" onClick={onLogoutAll}>
            Logout All
          </button>
        </div>
      )}
    </>
  );
};
