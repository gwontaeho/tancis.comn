import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Fallback = () => {
    return <div></div>;
};

const Suspenser = () => {
    return (
        <Suspense fallback={<Fallback />}>
            <Outlet />
        </Suspense>
    );
};

export default Suspenser;
