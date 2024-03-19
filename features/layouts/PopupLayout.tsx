import { Outlet } from "react-router-dom";

export const PopupLayout = () => {
    return (
        <div className="p-4">
            <Outlet />
        </div>
    );
};
