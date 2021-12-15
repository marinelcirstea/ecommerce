import NavLink from "@components/link";
import captain from "@libs/captain";
import { environment } from "@libs/environment";
import useToast from "contexts/toast-context";
import { useUser } from "contexts/user-context";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const toast = useToast();

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("register clicked");
    const res = await captain.post(`${environment.apiUrl}/api/users`, {
      email,
      password,
      firstName,
      lastName,
    });
    console.log("res:", res);
  };
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login: ", email, password);
    const login = await captain.post(`${environment.apiUrl}/api/auth/login`, { email, password });
    console.log("login: ", login);
  };

  return (
    <main>
      {user?.email}
      <header className="header">
        <div className="logo">HAHA</div>
        <nav className="nav">
          <ul className="navUl">
            <li className="navLi">
              <NavLink href="/" exact className="navLink">
                Home
              </NavLink>
            </li>
            <li className="navLi">
              <NavLink href="/products" className="navLink">
                Products
              </NavLink>
            </li>
            <li className="navLi">
              <NavLink href="/categories" className="navLink">
                Categories
              </NavLink>
            </li>
            <li className="navLi">
              <button className="logout">Logout</button>
            </li>
            <li className="navLi">
              <NavLink href="/login" className="navLink">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <br />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <br />
      <button onClick={() => toast.error("error")}>Add toast</button>
      <button onClick={() => toast.warn("warning")}>Add toast</button>
      <button onClick={() => toast.notify("notification")}>Add toast</button>
      <button onClick={() => toast.success("success")}>Add toast</button>
    </main>
  );
}
