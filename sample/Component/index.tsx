import { useId } from "react";
import { Group, Button, BUTTON_ROLES, BUTTON_VARIANTS, FormControl, FormControlList } from "@/comn/components";
import { Icon } from "@/comn/components";
import { icons } from "@/comn/assets/icons";

export const Components = () => {
    const id = useId();
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                    {Object.keys(BUTTON_ROLES).map((role: any) => {
                        return <Button key={id + role} role={role} />;
                    })}
                </div>
                <div className="flex gap-1">
                    {Object.keys(BUTTON_VARIANTS).map((variant: any) => {
                        return (
                            <Button key={id + variant} variant={variant}>
                                {variant}
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="flex gap-1">
                    {Object.keys(icons).map((icon: any) => {
                        return <Icon key={id + icon} icon={icon} />;
                    })}
                </div>
            </div>

            <div className="">
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Cell root>
                                <Group.Cell>
                                    <FormControl type="text" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="number" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="password" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="select" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="radio" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="checkbox" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="textarea" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="date" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="time" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="datetime" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="daterange" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="timerange" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="code" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="file" />
                                </Group.Cell>
                                <Group.Cell>
                                    <FormControl type="boolean" />
                                </Group.Cell>
                            </Group.Cell>
                        </Group.Section>
                    </Group.Body>
                </Group>
            </div>
        </div>
    );
};
