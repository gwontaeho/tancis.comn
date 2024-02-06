import { useState } from "react";
import { useFetch } from "@/comn/hooks";
import { Sample } from "@/comn/components/_";
import { Layout } from "@/comn/components";

export const SampleUseFetch = () => {
    const [test, setTest] = useState(0);

    const dummyApi = (type: boolean) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type) resolve({ data: "success" });
                else reject("error");
            }, 1000);
        });

    const { data, fetch, isLoading, isSuccess, isError, setShowToast } = useFetch({
        api: dummyApi,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const test22 = useFetch({
        api: () => {
            console.log("fetching");
        },
        key: [test],
        enabled: test !== 0 && test <= 3,
        onSuccess: (data) => {
            console.log("success");
        },
        onError: (error) => {
            console.log(error);
        },
        showToast: true,
    });

    // api: TApi | TApi[];
    // key?: any[];
    // enabled?: boolean;
    // notifyStatus?: boolean;
    // showToast?: boolean;
    // onSuccess?: (data?: any) => void;
    // onError?: (error?: any) => void;

    return (
        <Sample title="useFetch">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Parameters", "Description"],
                        ["api", "api 또는 api[]"],
                        ["key?", ""],
                        ["enabled?", "key의 변화를 감지하여 fetch를 호출할 지에 대한 여부"],
                        ["showToast", ""],
                        ["onSuccess", "성공 callback"],
                        ["onError", "실패 callback"],
                    ]}
                />
                <Sample.Table
                    data={[
                        ["Returns", "Description"],
                        ["data", "state"],
                        ["fetch", "function"],
                        ["isLoading", ""],
                        ["isSuccess", ""],
                        ["isError", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. useFetch">
                <Layout>
                    <Sample.Section>
                        <p className="text-xl">
                            다음은 test를 key로 참조하는 useFetch입니다
                            <br />
                            <br />
                            아래 버튼을 클릭시 test값이 1씩 증가하며
                            <br />
                            fetch가 호출되어 api로 전달된 함수가 실행됩니다
                            <br />
                            <br />
                            enabled 조건에 따라 test의 값이 3보다 커질 시
                            <br />
                            key값이 변경되어도 fetch는 호출되지않습니다
                        </p>
                        <div className="flex gap-4">
                            <Sample.Button onClick={() => setTest((prev) => prev + 1)}>setTest + 1</Sample.Button>
                            <Sample.Button onClick={() => setTest(0)}>test 초기화</Sample.Button>
                            <div>현재 : {test}</div>
                        </div>
                    </Sample.Section>
                    <Sample.Section>
                        <Sample.Code>{`
const Sample = () => {
    const [test, setTest] = useState(0);

    const {
        data,
        fetch,
        isLoading,
        isSuccess,
        isError,
    } = useFetch({
        api: () => { console.log("fetching") },
        key: [test],
        enabled: test !== 0 && test <= 3,
        showToast: true,
        onSuccess: (data) => console.log("success"),
        onError: (error) => console.log(error),
    });

    ·
    ·
    ·
}
`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
