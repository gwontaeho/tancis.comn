import Header from "./MainHeader";
import Footer from "./MainFooter";
import Navigation from "./MainNavigation";
import Suspenser from "./Suspenser";

export const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="uf-container">
                <Navigation />
                <main className="uf-main">
                    <Suspenser />
                </main>
                <Footer />
            </div>
        </>
    );
};
