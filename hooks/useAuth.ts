export const useAuth = () => {
    const auth: { [key: string]: any } = {
        tin: "111111111",
    };

    const get = (key: string): any => {
        return auth[key];
    };
    return {
        get,
    };
};
