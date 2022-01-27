import React from "react";
import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <div>
      <div className="fixed">
        <Navigation />
      </div>
      <main className="outside">{props.children}</main>
    </div>
  );
};
export default Layout;
