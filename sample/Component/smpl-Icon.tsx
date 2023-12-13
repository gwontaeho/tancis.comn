import { Icon, IconsType } from "@/comn/components";
import { icons } from "@/comn/assets/icons";

export const SampleIcon = () => {
    const handleClick = () => {
        navigator.clipboard.writeText("asd");
    };

    return (
        <div className="grid grid-cols-8 gap-4">
            {(Object.keys(icons) as IconsType[]).map((icon) => {
                return (
                    <div
                        className=" cursor-copy border rounded p-4 flex flex-col items-center justify-center space-y-4"
                        onClick={handleClick}
                    >
                        <div>{icon}</div>
                        <Icon icon={icon} />
                    </div>
                );
            })}
        </div>
    );
};
