import { useNavigate } from "react-router-dom";
import { Page, Wijmo, Group, Layout, Tab, Button } from "@/comn/components";
import {
    useForm,
    useWijmo,
    useFetch,
    useModal,
    useToast,
    FormValuesType,
} from "@/comn/hooks";
import {
    SCHEMA_FORM_REGIST,
    SCHEMA_GRID_COMPONENTS_REGIST,
    APIS,
} from "./smpl-Service";

const options1 = [
    { label: "s1", value: "s1" },
    { label: "s2", value: "s2" },
    { label: "s3", value: "s3" },
];

const option2 = [
    { label: "r1", value: "r1" },
    { label: "r2", value: "r2" },
    { label: "r3", value: "r3" },
];

/**
 * 샘플 등록 페이지
 */
export const SampleRegist = () => {
    // const navigate = useNavigate();
    // const { openModal } = useModal();
    // const { showToast } = useToast();
    // const { schema, handleSubmit, clearValues } = useForm({ defaultSchema: SCHEMA_FORM_REGIST });
    // const { grid, getData } = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS_REGIST });
    // const ccg = useFetch({ api: APIS.createComponentGroup });
    // const cgc = useFetch({ api: APIS.createGroupComponents });
    // const onSubmit = (data: FormValuesType) => {
    //     // submit handler
    //     // validation 성공 시 modal
    //     openModal({
    //         content: "그룹을 등록하시겠습니까",
    //         onConfirm: () => handleConfirm(data),
    //     });
    // };
    // const handleConfirm = async (data: FormValuesType) => {
    //     try {
    //         // 1. group 생성
    //         const { id } = await ccg.fetch(data);
    //         // 2. group components 생성
    //         const componentsData = { id, components: getData().map((_: any) => ({ ..._, grpId: id })) };
    //         await cgc.fetch(componentsData);
    //         // 3. 성공 toast
    //         showToast({ content: "그룹이 등록되었습니다" });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // return (
    //     <Page>
    //         <Page.Navigation base="/sample/pages" nodes={[{ path: "/", label: "List" }, { label: "Regist" }]} />
    //         <Page.Header title="Sample Regist" description="Sample Regist Description" />
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <Group>
    //                 <Group.Body>
    //                     <Group.Row>
    //                         <Group.Control {...schema.textField} />
    //                         <Group.Control {...schema.passwordField} />
    //                     </Group.Row>
    //                     <Group.Row>
    //                         <Group.Control {...schema.integerField} />
    //                         <Group.Control {...schema.selectField} options={options1} />
    //                     </Group.Row>
    //                     <Group.Row>
    //                         <Group.Control {...schema.dateField} />
    //                         <Group.Control {...schema.radioField} options={option2} />
    //                     </Group.Row>
    //                     <Group.Row>
    //                         <Group.Control {...schema.textareaField} />
    //                     </Group.Row>
    //                 </Group.Body>
    //                 <Layout direction="row">
    //                     <Layout.Left>
    //                         <Button onClick={() => navigate("/sample/pages")}>목록</Button>
    //                         <Button onClick={clearValues}>초기화</Button>
    //                     </Layout.Left>
    //                     <Layout.Right>
    //                         <Button type="submit">저장</Button>
    //                     </Layout.Right>
    //                 </Layout>
    //             </Group>
    //         </form>
    //         <Group>
    //             <Tab tab={["첫번째"]}>
    //                 <Tab.Panel>{/* <Wijmo {...grid} /> */}</Tab.Panel>
    //             </Tab>
    //         </Group>
    //     </Page>
    // );

    return null;
};
