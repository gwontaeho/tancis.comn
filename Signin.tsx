export const Signin = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex h-96">
                <div className="w-96 bg-disabled" />
                <div className="w-96 p-8 bg-white space-y-8">
                    <div className="space-y-2">
                        <input className="input h-12 px-2" placeholder="ID" />
                        <input className="input h-12 px-2" placeholder="PW" />
                    </div>
                    <button className="button h-12 w-full">Sign</button>
                </div>
            </div>
        </div>
    );
};
