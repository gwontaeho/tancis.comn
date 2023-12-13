import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/com/layouts/MainLayout";
import { SampleMain } from "@/com/sample/SampleMain";

export const Main = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/samples/*" element={<SampleMain />} />
            </Routes>
        </MainLayout>
    );
};
