// Layout.jsx
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <>
      <header>Navbar</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
