import { Logout } from "components/logout";
import { useUser } from "contexts/user-context";
import { environment } from "libs/environment";
import Router from "next/router";
import { useEffect } from "react";

import captain from "@libs/captain";

export default function Me() {
  const { user, dispatch } = useUser();

  const getMe = async () => {
    const res = await captain.get(`${environment.apiUrl}/api/users/me`);
    if (res.ok && res.data) dispatch({ type: "setuser", payload: res.data });
    else Router.push("/");
  };

  useEffect(() => {
    if (!user) getMe();
  }, []);

  return (
    <main className="flex items-center justify-center h-full">
      <div className="space-y-4 text-center">
        <h1 className="px-4 py-2 text-lg font-medium bg-gray-200 rounded">
          Client side authentication
        </h1>
        {user ? <p>Hi, {user.email} 👋</p> : <p>Loading...</p>}
        <Logout />
      </div>
    </main>
  );
}
