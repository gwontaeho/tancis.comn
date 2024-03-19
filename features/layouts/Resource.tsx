import { useState } from "react";

const Resource = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div>
            <button className="text-white" onClick={handleToggle}>
                CODE
            </button>
            <div
                aria-expanded={open}
                className="fixed mt-16 w-80 transition-transform h-[calc(100vh-4rem)] bg-uf-card-background top-0 right-0 shadow rounded-l-xl translate-x-full aria-expanded:translate-x-0"
            ></div>
        </div>
    );
};

export { Resource };
