import { Outlet } from "react-router-dom";
import Header from "./Header";
import PageTransition from "../animations/PageTransition";

export default function AppLayout() {
  return (
    <>
      <Header />
      <PageTransition>
        <main style={{ padding: "16px" }}>
          <Outlet />
        </main>
      </PageTransition>
    </>
  );
}
