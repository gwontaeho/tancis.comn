import { Icon, IconsType } from "@/comn/components";
import { icons } from "@/comn/assets/icons";

export const SampleIcon = () => {
    const handleClick = (icon: any) => {
        navigator.clipboard.writeText(`<Icon icon={${icon}} />`);
    };

    return (
        <div className="grid grid-cols-8 gap-4">
            {(Object.keys(icons) as IconsType[]).map((icon) => {
                return (
                    <div
                        key={`smpl-icon-${icon}`}
                        className="cursor-pointer border rounded p-2 flex flex-col items-center justify-center space-y-4"
                        onClick={() => handleClick(icon)}
                    >
                        <div>{icon}</div>
                        <Icon icon={icon} />
                        <button>복사</button>
                    </div>
                );
            })}
        </div>
    );
};
