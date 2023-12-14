import { Page, Group, FormControl } from "@/comn/components";
import { InputCode } from "@/comn/components/_";

export const SampleFormControlCode = () => {
    return (
        <Page>
            <Group>
                <InputCode onChange={(a) => console.log(a)} />
            </Group>
        </Page>
    );
};
