import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usePageContext } from "../context";
import { useModal } from "@/comn/hooks";

const Fallback = () => {
    console.log("fallback");

    const { ref } = usePageContext();
    const { openModal } = useModal();

    useEffect(() => {
        console.log("new fallback");

        (async () => {
            try {
                await ref.current.holder.promise;
                callback();
            } catch (error) {}
        })();

        return () => {
            console.log("delete");
            delete ref.current.cache;
            delete ref.current.holder;
        };
    }, []);

    const callback = () => {
        openModal({ content: "asd" });
    };

    return <div>pending.....</div>;
};

const Suspenser = () => {
    return (
        <Suspense fallback={<Fallback />}>
            <Outlet />
        </Suspense>
    );
};

export default Suspenser;
