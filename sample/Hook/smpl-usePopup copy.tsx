import { usePopup } from "@/comn/hooks";
import { Button } from "@/comn/components";
import { Sample } from "@/comn/components/_";

export const SampleUsePopupTarget = () => {
    const popup = usePopup();

    const postMessageToParent = () => {
        popup.postMessage("message");
        popup.close();
    };

    return (
        <div>
            {(() => {
                try {
                    return JSON.stringify(popup.getParams());
                } catch (error) {
                    return null;
                }
            })()}
            <Button onClick={postMessageToParent}>부모 callback 실행</Button>
        </div>
    );
};

export const SampleUsePopup = () => {
    const popup = usePopup();

    const open = () => {
        popup.openPopup({ url: "/comn/smpl/hooks/usePopupTarget" });
    };

    const withParams = () => {
        popup.openPopup({ url: "/comn/smpl/hooks/usePopupTarget", params: { test1: 1, test2: 2 } });
    };

    const withCallback = () => {
        popup.openPopup({ url: "/comn/smpl/hooks/usePopupTarget", id: "sample", callback: (data) => alert(data) });
    };

    const closeAll = () => {
        popup.closePopup();
    };

    const withId = () => {
        popup.openPopup({ url: "/comn/smpl/hooks/usePopupTarget", id: "test" });
    };

    const closeId = () => {
        popup.closePopup("sample");
    };

    return (
        <Sample title="usePopup">
            <Sample.Section title="usePopup(): UsePopupReturn">
                <Sample.Table
                    data={[
                        ["Return", "Type", "Note", "Description"],
                        ["openPopup", "(args: OpenPopupArgs) => void", "only parent", ""],
                        ["closePopup", "(id?: string) => void", "only parent", ""],
                        [
                            "postMessage",
                            "(data?: any) => void",
                            "only parent",
                            "팝업을 호출한 window의 callback을 실행",
                        ],
                        [
                            "getParams",
                            "() => Record<string, any>",
                            "only target",
                            "팝업을 호출할 때 인자로 받은 parameter를 가져옴",
                        ],
                        ["close", "() => void", "only target", "팝업 컴포넌트 내부에서 실행하는 window close method"],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="openPopup(args: OpenPopupArgs): void">
                <Sample.Table
                    data={[
                        ["Arguments", "Type", "Default", "Description"],
                        ["args", "OpenPopupArgs", "", ""],
                        ["- id", "", "", ""],
                        ["- url", "", "", ""],
                        ["- params", "", "", ""],
                        ["- layout", "", "", ""],
                        ["- size", "", "", ""],
                        ["- callback", "", "", ""],
                    ]}
                />
                <Sample.Code exec={open}>{`/* 기본 */

openPopup({
    url: "/comn/smpl/hooks/usePopupTarget"
});`}</Sample.Code>
                <Sample.Code exec={withParams}>{`/* with parameters */

openPopup({
    url: "/comn/smpl/hooks/usePopupTarget",
    params: { test1: 1, test2: 2 }
});`}</Sample.Code>

                <Sample.Code exec={withCallback}>{`/* with callback */

openPopup({
    url: "/comn/smpl/hooks/usePopupTarget",
    id: "sample",
    callback: (data) => alert(data)
});`}</Sample.Code>
            </Sample.Section>

            <Sample.Section title="closePopup(id?: string): void">
                <Sample.Code exec={closeAll}>{`/* 모든 팝업 닫기 */

closePopup();
`}</Sample.Code>
                <Sample.Code exec={closeId}>{`/* 아이디를 지정하여 닫기 */

closePopup("sample")`}</Sample.Code>
            </Sample.Section>

            <Sample.Section title="getParams():  Record<string, any>">
                <Sample.Code>{`/* get parameters */

getParams();
`}</Sample.Code>
            </Sample.Section>

            <Sample.Section title="postMessage(data?: any): void">
                <Sample.Code>{`/* callback 실행 */

postMessage({ data: "test" });
`}</Sample.Code>
            </Sample.Section>

            <Sample.Section title="close(): void">
                <Sample.Code>{`/* close */

close();
`}</Sample.Code>
            </Sample.Section>
        </Sample>
    );
};
