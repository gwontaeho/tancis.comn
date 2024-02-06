import { useStore } from "@/comn/hooks";
import { Sample } from "@/comn/components/_";
import { Layout } from "@/comn/components";

export const SampleUseStore = () => {
    const { store, pgeStore, getStore, setStore } = useStore({ pgeUid: "Sample" });

    return (
        <Sample title="useStore">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Parameters", "Description"],
                        ["pgeUid", "화면 식별자"],
                    ]}
                />
                <Sample.Table
                    data={[
                        ["Returns", "Description"],
                        ["store", "state"],
                        ["pgeStore", "state"],
                        ["getStore", "function"],
                        ["setStore", "function"],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. useStore">
                <Layout>
                    <Sample.Section>
                        <p className="text-xl">
                            store는 서로 다른 페이지 간 공유가 가능한 전역변수를 담는 저장소입니다 모든 페이지에서
                            store객체에 접근하여 서로간의 상태를 공유할 수 있습니다
                            <br />
                            <br />
                            pgeStore는 Hook 선언시 전달받은 페이지 식별자를 key로 가지는 저장소입니다
                            <br />
                            <br />
                            다음은 Sample이라는 페이지 식별자로 store를 선언한 예제입니다
                        </p>
                    </Sample.Section>
                    <Sample.Section>
                        <Sample.Code>{`
const Sample = () => {
    const {
        store,
        pgeStore,
        getStore,
        setStore,
    } = useStore({ pgeUid: "Sample" });

    ·
    ·
    ·
};
`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. 변수저장 및 변수읽기">
                <Layout direction="col">
                    <Sample.Section>
                        <Sample.Code>{`
const Sample = () => {
    const {
        store,
        pgeStore,
        getStore,
        setStore,
    } = useStore({ pgeUid: "Sample" });

    return (
        <>
            {/* Set Store */}
            <button onClick={() => setStore("Sample", { name: "Name", value: "Value" })}>setStore</button>

            {/* Get Store */}
            <button onClick={() => console.log(getStore("Sample"))}>getStore</button>
        <>
    )
};

`}</Sample.Code>
                    </Sample.Section>
                    <Sample.Section>
                        <div className="flex gap-4">
                            <Sample.Button
                                onClick={() =>
                                    setStore("Sample", {
                                        name: "Name",
                                        value: "Value",
                                    })
                                }
                            >
                                setStore
                            </Sample.Button>
                            <Sample.Button onClick={() => console.log(getStore("Sample"))}>getStore</Sample.Button>
                        </div>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
