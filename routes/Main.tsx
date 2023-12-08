import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/com/layouts/MainLayout";
import { SampleMain } from "@/tancis/sample/SampleMain";

export const Main = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/sample/*" element={<SampleMain />} />
            </Routes>
        </MainLayout>
    );
};
