import React from "react";

function Main({ children, className, hScreen = true }: any) {
  return (
    <main
      className={`${hScreen && "min-h-screen"} overflow-y-auto ${className}`}
    >
      <div className="container grid px-6 mx-auto">{children}</div>
    </main>
  );
}

export default Main;
