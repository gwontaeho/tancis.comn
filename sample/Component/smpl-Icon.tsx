import { Sample } from "@/comn/components/_";
import { Icon, Layout, IconsType } from "@/comn/components";
import { icons } from "@/comn/assets/icons";

export const SampleIcon = () => {
    return (
        <Sample title="Icon">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Props", "Description"],
                        ["icon", ""],
                        ["size", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. 사이즈" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Icon icon="search" size="xs" />
                        <Icon icon="search" size="sm" />
                        <Icon icon="search" size="md" />
                        <Icon icon="search" size="lg" />
                        <Icon icon="search" size="xl" />
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
       <>
        <Icon icon="search" size="xs" />
        <Icon icon="search" size="sm" />
        <Icon icon="search" size="md" />
        <Icon icon="search" size="lg" />
        <Icon icon="search" size="xl" />
       </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. 종류" description="">
                <div className="grid grid-cols-8 gap-y-8">
                    {(Object.keys(icons) as IconsType[]).map((icon: any) => {
                        return (
                            <div className="flex flex-col items-center gap-2">
                                <Icon icon={icon} />
                                <p>{icon}</p>
                            </div>
                        );
                    })}
                </div>
            </Sample.Section>
        </Sample>
    );
};
