import { Sample } from "@/comn/components/_";
import { Button, Layout } from "@/comn/components";
import { useGrid } from "@/comn/hooks";

export const SampleButton = () => {
    return (
        <Sample title="Layout" description="레이아웃">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Props", "Description"],
                        ["", ""],
                    ]}
                />
            </Sample.Section>
            {/* color?: "black" | "white" | "darkgray" | "gray" | "lightgray" | "blue" | "success" | "error" | "info" | "warning"; */}

            <Sample.Section title="1. Color" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <div className="flex flex-wrap gap-4">
                            <Button>Button</Button>
                            <Button color="black">Button</Button>
                            <Button color="darkgray">Button</Button>
                            <Button color="gray">Button</Button>
                            <Button color="lightgray">Button</Button>
                            <Button color="blue">Button</Button>
                            <Button color="success">Button</Button>
                            <Button color="error">Button</Button>
                            <Button color="info">Button</Button>
                            <Button color="warning">Button</Button>
                        </div>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            <Button>Button</Button>
            <Button color="black">Button</Button>
            <Button color="darkgray">Button</Button>
            <Button color="gray">Button</Button>
            <Button color="lightgray">Button</Button>
            <Button color="blue">Button</Button>
            <Button color="success">Button</Button>
            <Button color="error">Button</Button>
            <Button color="info">Button</Button>
            <Button color="warning">Button</Button>
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. Size" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <div className="flex flex-wrap gap-4">
                            <Button height="sm">Button</Button>
                            <Button height="lg">Button</Button>
                        </div>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            <Button height="sm">Button</Button>
            <Button height="lg">Button</Button>
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            {/* contained: { style: "uf-button", color: "" },
    outlined: { style: "uf-button-outlined", color: "" },
    underlined: { style: "uf-button-underlined", color: "" },
    primary: { style: "uf-button", color: "blue" },
    warning: { style: "uf-button", color: "warning" },
    danger: { style: "uf-button", color: "error" },
    secondary: { style: "uf-button", color: "gray" },
    info: { style: "uf-button", color: "info" },
    "outline-info": { style: "uf-button-outlined", color: "info" },
    "outline-primary": { style: "uf-button-outlined", color: "blue" },
    "outline-danger": { style: "uf-button-outlined", color: "error" },
    "outline-secondary": { style: "uf-button-outlined", color: "gray" },
    "outline-bg": { style: "uf-button-outlined", color: "" },
    "outline-warning": { style: "uf-button-outlined", color: "warning" }, */}

            <Sample.Section title="3. Variants" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <div className="flex flex-wrap gap-4">
                            <Button variant="contained">contained</Button>
                            <Button variant="outlined">outlined</Button>
                            <Button variant="underlined">underlined</Button>
                            <Button variant="primary">primary</Button>
                            <Button variant="warning">warning</Button>
                            <Button variant="danger">danger</Button>
                            <Button variant="secondary">secondary</Button>
                            <Button variant="info">info</Button>
                            <Button variant="outline-info">outline-info</Button>
                            <Button variant="outline-primary">outline-primary</Button>
                            <Button variant="outline-danger">outline-danger</Button>
                            <Button variant="outline-secondary">outline-secondary</Button>
                            <Button variant="outline-bg">outline-bg</Button>
                            <Button variant="outline-warning">outline-warning</Button>
                        </div>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            <Button variant="contained">contained</Button>
            <Button variant="outlined">outlined</Button>
            <Button variant="underlined">underlined</Button>
            <Button variant="primary">primary</Button>
            <Button variant="warning">warning</Button>
            <Button variant="danger">danger</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="info">info</Button>
            <Button variant="outline-info">outline-info</Button>
            <Button variant="outline-primary">outline-primary</Button>
            <Button variant="outline-danger">outline-danger</Button>
            <Button variant="outline-secondary">outline-secondary</Button>
            <Button variant="outline-bg">outline-bg</Button>
            <Button variant="outline-warning">outline-warning</Button>
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="4. Roles" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <div className="flex flex-wrap gap-4">
                            <Button role="save" />
                            <Button role="list" />
                            <Button role="submit" />
                            <Button role="search" />
                            <Button role="close" />
                            <Button role="delete" />
                            <Button role="reset" />
                            <Button role="confirm" />
                            <Button role="ok" />
                            <Button role="edit" />
                            <Button role="new" />
                            <Button role="cancel" />
                            <Button role="apply" />
                            <Button role="gridAdd" />
                            <Button role="gridDelete" />
                        </div>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            <Button role="save" />
            <Button role="list" />
            <Button role="submit" />
            <Button role="search" />
            <Button role="close" />
            <Button role="delete" />
            <Button role="reset" />
            <Button role="confirm" />
            <Button role="ok" />
            <Button role="edit" />
            <Button role="new" />
            <Button role="cancel" />
            <Button role="apply" />
            <Button role="gridAdd" />
            <Button role="gridDelete" />
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="5. Icon" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <div className="flex flex-wrap gap-4">
                            <Button icon="search" />
                            <Button icon="search">Search</Button>
                        </div>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            <Button icon="search" />
            <Button icon="search">Search</Button>
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="6. Disabled" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <div className="flex flex-wrap gap-4">
                            <Button disabled={true} onClick={() => console.log("a")}>
                                Disabled
                            </Button>
                        </div>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            <Button icon="search" />
            <Button icon="search">Search</Button>
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
