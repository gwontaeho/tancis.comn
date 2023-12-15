import { Page, Group, FormControl } from "@/comn/components";
import { InputCode } from "@/comn/components/_";

import { useForm, useController } from "react-hook-form";

export const SampleFormControlCode = () => {
    const { register, setValue, control, getValues } = useForm();

    const { field } = useController({ name: "test", control });
    const { field: field2 } = useController({ name: "test2", control });
    const { field: field3 } = useController({ name: "test3", control });

    return (
        <Page>
            <Group>
                <InputCode
                    comnCd="COM_0015"
                    area="comnCd"
                    maxLength={3}
                    value={field.value}
                    onChange={field.onChange}
                />

                <InputCode
                    area="cntyCd"
                    maxLength={2}
                    value={field2.value}
                    onChange={field2.onChange}
                />

                <InputCode
                    area="currCd"
                    maxLength={3}
                    value={field3.value}
                    onChange={field3.onChange}
                />

                <button onClick={() => setValue("test", "a05")}>test</button>
                <button onClick={() => console.log(getValues())}>getValues</button>
            </Group>
        </Page>
    );
};
