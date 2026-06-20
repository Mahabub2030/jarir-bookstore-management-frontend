import { Header } from "./Header";
import { Footer } from "../Footer";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        lang={"en"}
        setLang={function (lang: "en" | "ar"): void {
          throw new Error("Function not implemented.");
        }}
        user={null}
        logoutUser={function (): Promise<void> {
          throw new Error("Function not implemented.");
        }}
        cartCount={0}
      />

      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
