import React from "react";
import { useTheme } from "@/comn/hooks";

export const LangManager = (props: { onChange: any }) => {
    const {
        theme: { lang },
    } = useTheme();

    React.useEffect(() => {
        if (!props.onChange) return;
        props.onChange(lang);
    }, [lang]);

    return null;
};
