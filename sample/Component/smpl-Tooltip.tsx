import { useState } from "react";
import { Tooltip, Button } from "@/comn/components";

export const SampleTooltip = () => {
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="flex space-x-10">
            <Tooltip content="tooltip" mode="always">
                <div>always=true</div>
            </Tooltip>
            <Tooltip content="tooltip">
                <div>hover 툴팁</div>
            </Tooltip>

            <Tooltip content="tooltip" enabled={enabled}>
                <Button onClick={() => setEnabled((prev) => !prev)}>enabled={String(enabled)}</Button>
            </Tooltip>
        </div>
    );
};
