import React from "react"; 

function Desktop({ children }: any) {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white  lg:block">
      {children}
    </aside>
  );
}

export default Desktop;
