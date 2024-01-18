export const useAuth = () => {
    const auth: { [key: string]: any } = {
        /* tin number dummy */
        tin: "123456789",
    };

    const get = (key: string): any => {
        return auth[key];
    };
    return {
        get,
    };
};
