import { useFetch } from "@/comn/hooks";
import { Sample } from "@/comn/components/_";

export const SampleUseFetch = () => {
    const dummyApi = (type: boolean) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type) resolve({ data: "success" });
                else reject("error");
            }, 1000);
        });

    const fetch1 = useFetch({
        api: dummyApi,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <Sample title="useFetch">
            <Sample.Section title="useFetch(props: UseFetchProps): UseFetchReturn">
                <Sample.Table
                    data={[
                        ["Props", "Type", "Description"],
                        ["api", "Api | Api[]", "단일 api 또는 api의 배열"],
                        ["key?", "any[]", ""],
                        [
                            "enabled?",
                            "boolean",
                            "참조하는 key의 변화를 감지하여 자동으로 fetch method를 실행할지에 대한 여부",
                        ],
                        ["notifyStatus?", "boolean", ""],
                        ["onSuccess", "(data?: any) => void", "성공 callback"],
                        ["onError", "(error?: any) => void", "실패 callback"],
                        ["showToast", "boolean", ""],
                    ]}
                />
                <Sample.Table
                    data={[
                        ["Return", "Type", "Description"],
                        ["data", "any", ""],
                        ["fetch", "(...args: any) => void", ""],
                        ["isLoading", "boolean", ""],
                        ["isSuccess", "boolean", ""],
                        ["isError", "boolean", ""],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="useFetch()">
                <Sample.Code exec={() => fetch1.fetch(true)}>{`/* 성공 case */

const fetch = useFetch({
    api: dummyApi
    onSuccess: (data) => console.log(data)
})`}</Sample.Code>
                <Sample.Code exec={() => fetch1.fetch(false)}>{`/* 에러 case */

const fetch = useFetch({
    api: dummyApi
    onError: (error) => console.log(error)
})`}</Sample.Code>
            </Sample.Section>
        </Sample>
    );
};

//     id?: string;
//     content?: React.ReactNode;
//     backdrop?: boolean;
//     size?: keyof typeof MODAL_SIZES;
//     onConfirm?: () => void;
//     onCancel?: () => void;

/* <div className="space-y-8">
<Table></Table>
<div>
    <Button onClick={withMessage}>기본</Button>
    <Button onClick={withOnConfirm}>onConfirm handler 추가</Button>
    <Button onClick={withOnCancel}>onCancel handler 추가</Button>
    <Button onClick={withoutBackdrop}>backdrop 제거</Button>
    <Button onClick={withSizeSm}>size sm</Button>
    <Button onClick={withSizeMd}>size md</Button>
    <Button onClick={withSizeLg}>size lg</Button>
    <Button onClick={withSizeXl}>size xl</Button>
    <Button onClick={withComponent}>컴포넌트 모달</Button>
</div>

<div className="text-[1.8rem]">useModal</div>
</div> */
