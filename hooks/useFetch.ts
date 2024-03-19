import { useEffect, useReducer, useRef } from "react";
import lodash from "lodash";
import { useToast } from ".";

const createInitialState = (initialData: any) => {
    return {
        data: initialData,
        isLoading: false,
        isSuccess: false,
        isError: false,
    };
};

const reducer = (state: any, { type, payload }: any) => {
    switch (type) {
        case "loading":
            return { ...state, isLoading: true };
        case "error":
            return { ...state, isLoading: false, isError: true, isSuccess: false };
        case "success":
            return { ...state, isLoading: false, isError: false, isSuccess: true, data: payload };
    }
};

type TApi = (...args: any) => any;
type UseFetchProps = {
    api: TApi | TApi[];
    key?: any[];
    enabled?: boolean;
    showToast?: boolean;
    notifyStatus?: boolean;
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
};
type UseFetchReturn = {
    data: any;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    fetch: (...args: any) => Promise<any> | undefined;
    setShowToast: (showToast: boolean) => void;
};

export const useFetch = (props: UseFetchProps): UseFetchReturn => {
    const { api, key = [], enabled, showToast = false, onSuccess, onError, notifyStatus } = props;
    const multi = Array.isArray(api);

    const toast = useToast();
    const ref = useRef<any>({
        key: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        toast: showToast,
    });

    const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(
        reducer,
        multi ? Array(api.length).fill(undefined) : undefined,
        createInitialState,
    );

    useEffect(() => {
        if (!enabled) return;
        if (lodash.isEqual(ref.current.key, key)) return;
        ref.current.key = key;
        fetch();
    }, [enabled, ...key]);

    const setShowToast = (arg: boolean) => {
        ref.current.toast = arg;
    };

    const handleSuccess = (data: any) => {
        ref.current.isError = false;
        ref.current.isLoading = false;
        ref.current.isSuccess = true;
        dispatch({ type: "success", payload: data });
        if (onSuccess) onSuccess(data);
        if (ref.current.toast) toast.showToast({ type: "success", content: "msg.00003" });
    };

    const handleError = (error: any) => {
        ref.current.isSuccess = false;
        ref.current.isLoading = false;
        ref.current.isError = true;
        if (notifyStatus) dispatch({ type: "error" });
        if (onError) onError(error);
        if (ref.current.toast) toast.showToast({ type: "error", content: "An error occurred" });
    };

    const fetch = (...variables: any) => {
        if (ref.current.isLoading) return;
        ref.current.isLoading = true;
        if (notifyStatus) dispatch({ type: "loading" });

        return new Promise(async (resolve, reject) => {
            const current = new Date();

            try {
                let data;
                if (multi) {
                    const response = await Promise.all(api.map((_) => _(...variables)));
                    response.map((_: any) => {
                        if (typeof _ !== "object") return _;
                        const { data } = _;
                        return Object.fromEntries(
                            Object.entries(data).map(([key, value]: any) => {
                                return [key, { ...value, __t: current }];
                            }),
                        );
                    });
                } else {
                    const response = await api(...variables);
                    if (typeof response?.data === "object" && !Array.isArray(response?.data)) {
                        data = Object.fromEntries(
                            Object.entries(response.data).map(([key, value]: any) => {
                                return [key, { ...value, __t: current }];
                            }),
                        );
                    } else {
                        data = response;
                    }
                }

                handleSuccess(data);
                resolve(data);
            } catch (error) {
                handleError(error);
                resolve(error);
            }
        });
    };

    return { data, fetch, isLoading, isSuccess, isError, setShowToast };
};
