import React from "react";

const Main = React.memo(({ children }: { children: React.JSX.Element }) => {
    return <main className="main-container">
        {children}
    </main>
});

export default Main;