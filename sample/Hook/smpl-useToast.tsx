import { useToast } from "@/comn/hooks";
import { Button } from "@/comn/components";
import { Sample } from "@/comn/components/_";

export const SampleUseToast = () => {
    const toast = useToast();

    const withMessage = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        });
    };
    const withSuccess = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "success",
        });
    };
    const withError = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "error",
        });
    };
    const withInfo = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "info",
        });
    };
    const withWarning = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "warning",
        });
    };

    // type UseToastReturn = {
    //     showToast: (args: ShowToastArgs) => void;
    //     hideToast: () => void;
    // };

    return (
        <Sample title="useToast">
            <Sample.Section title="useToast(): UseToastReturn">
                <Sample.Table
                    data={[
                        ["Return", "Type", "Description"],
                        ["showToast", "(args: ShowToastArgs) => void", ""],
                        ["hideToast", "() => void", ""],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="showToast(args: ShowToastArgs): void">
                <Sample.Table
                    data={[
                        ["Arguments", "Type", "Default", "Description"],
                        ["args", "ShowToastArgs", "", ""],
                        ["- type", "string", "", ""],
                        ["- content", "string", "", ""],
                    ]}
                />
                <Sample.Code exec={withMessage}>{`/* show */

showToast({
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
})`}</Sample.Code>
                <Sample.Code exec={withSuccess}>{`/* success */

showToast({
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    type: "success",
});`}</Sample.Code>
                <Sample.Code exec={withError}>{`/* error */

showToast({
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    type: "error",
});`}</Sample.Code>
                <Sample.Code exec={withInfo}>{`/* info */

showToast({
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    type: "info",
});`}</Sample.Code>
                <Sample.Code exec={withWarning}>{`/* warning */

showToast({
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    type: "warning",
});`}</Sample.Code>
            </Sample.Section>
        </Sample>
    );
};
