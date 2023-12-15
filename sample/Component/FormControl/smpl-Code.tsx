import { Page, Group, FormControl } from "@/comn/components";
import { InputCode } from "@/comn/components/_";

import { useForm, useController } from "react-hook-form";

export const SampleFormControlCode = () => {
    const { register, setValue, control, getValues } = useForm();

    const { field } = useController({ name: "test", control });

    return (
        <Page>
            <Group>
                <InputCode comnCd="COM_0015" minLength={2} value={field.value} onChange={field.onChange} />
                <button onClick={() => setValue("test", "a05")}>test</button>
                <button onClick={() => console.log(getValues())}>getValues</button>
            </Group>
        </Page>
    );
};
