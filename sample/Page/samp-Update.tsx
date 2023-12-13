import { useNavigate, useParams } from "react-router-dom";
import { Page, Wijmo, Group, Layout, Tab, Button } from "@/com/components";
import { useForm, useWijmo, useFetch, useModal, useToast, FormValuesType } from "@/com/hooks";
import { SCHEMA_FORM_REGIST, SCHEMA_GRID_COMPONENTS_REGIST, APIS } from "./samp-Service";

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
 * 샘플 수정 페이지
 */
export const SampleUpdate = () => {
    // const { id } = useParams();
    // const navigate = useNavigate();
    // const { openModal } = useModal();
    // const { showToast } = useToast();
    // const { schema, handleSubmit, clearValues, setValues } = useForm({ defaultSchema: SCHEMA_FORM_REGIST });
    // const { grid } = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS_REGIST });
    // const {
    //     data: [group, components],
    // } = useFetch({
    //     api: [() => APIS.getComponentGroup(id), () => APIS.getComponents(id)],
    //     enabled: !!id,
    //     onSuccess: ([_]) => setValues(_),
    // });
    // const ccg = useFetch({ api: APIS.updateComponentGroup });
    // const onSubmit = (data: FormValuesType) => {
    //     console.log(data);
    //     openModal({
    //         content: "그룹을 수정하시겠습니까",
    //         onConfirm: () => handleConfirm(data),
    //     });
    // };
    // const handleConfirm = async (data: FormValuesType) => {
    //     try {
    //         await ccg.fetch(id, data);
    //         showToast({ content: "그룹이 수정되었습니다" });
    //         navigate(-1);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // return (
    //     <Page>
    //         <Page.Navigation base="/page/sample" nodes={[{ path: "/", label: "List" }, { path: `/${id}`, label: "Detail" }, { label: "Update" }]} />
    //         <Page.Header title="Sample Update" description={`${id}`} />
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
    //                         <Button onClick={clearValues}>초기화</Button>
    //                     </Layout.Left>
    //                     <Layout.Right>
    //                         <Button onClick={() => navigate(`/page/sample/${id}`)}>취소</Button>
    //                         <Button type="submit">저장</Button>
    //                     </Layout.Right>
    //                 </Layout>
    //             </Group>
    //         </form>
    //         <Group>
    //             <Tab tab={["첫번째"]}>
    //                 <Tab.Panel>{/* <Wijmo {...grid} data={components} /> */}</Tab.Panel>
    //             </Tab>
    //         </Group>
    //     </Page>
    // );

    return null;
};
