import { useEffect, useReducer, useRef } from "react";
import lodash from "lodash";
import { useToast } from "@/comn/hooks";

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
        case "success":
            return { ...state, isLoading: false, isError: false, isSuccess: true, data: payload };
        case "error":
            return { ...state, isLoading: false, isError: true, isSuccess: false };
    }
};

type TApi = (...args: any) => any;

type UseFetchProps = {
    api: TApi | TApi[];
    key?: any[];
    enabled?: boolean;
    notifyStatus?: boolean;
    showToast?: boolean;
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
};

type UseFetchReturn = {
    data: any;
    fetch: (...args: any) => Promise<any> | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    setShowToast: (showToast: boolean) => void;
};

export const useFetch = (props: UseFetchProps): UseFetchReturn => {
    const { api, key = [], enabled, showToast = false, onSuccess, onError, notifyStatus } = props;
    const multi = Array.isArray(api);

    const toast = useToast();
    const ref = useRef<any>({
        key: [],
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

    const fetch = (...variables: any) => {
        if (ref.current.isLoading) return;
        ref.current.isLoading = true;

        if (notifyStatus) dispatch({ type: "loading" });

        const current = new Date();

        if (multi) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await Promise.all(api.map((_) => _(...variables)));
                    const data = response.map((_: any) => {
                        if (typeof _ !== "object") return _;
                        const { data } = _;

                        return Object.fromEntries(
                            Object.entries(data).map(([k, v]: any) => {
                                return [k, { ...v, __t: current }];
                            }),
                        );
                    });

                    dispatch({ type: "success", payload: data });
                    if (onSuccess) {
                        if (ref.current.toast) toast.showToast({ type: "success", content: "msg.00003" });
                        onSuccess(data);
                    }
                    ref.current.isLoading = false;
                    ref.current.isSuccess = true;

                    resolve(data);
                } catch (error) {
                    if (notifyStatus) dispatch({ type: "error" });
                    if (onError) {
                        if (ref.current.toast) toast.showToast({ type: "error", content: "An error occurred" });
                        onError(error);
                    }

                    ref.current.isLoading = false;
                    ref.current.isError = true;

                    resolve(error);
                }
            });
        } else {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await api(...variables);
                    let data;
                    if (typeof response?.data === "object" && !Array.isArray(response?.data)) {
                        data = Object.fromEntries(
                            Object.entries(response.data).map(([k, v]: any) => {
                                return [k, { ...v, __t: current }];
                            }),
                        );
                    } else {
                        data = response;
                    }

                    dispatch({ type: "success", payload: data });
                    if (onSuccess) {
                        if (ref.current.toast) toast.showToast({ type: "success", content: "msg.00003" });
                        onSuccess(data);
                    }
                    ref.current.isLoading = false;
                    ref.current.isSuccess = true;

                    resolve(data);
                } catch (error) {
                    if (notifyStatus) dispatch({ type: "error" });
                    if (onError) {
                        if (ref.current.toast) toast.showToast({ type: "error", content: "An error occurred" });
                        onError(error);
                    }

                    ref.current.isLoading = false;
                    ref.current.isError = true;

                    resolve(error);
                }
            });
        }
    };

    const setShowToast = (arg: boolean) => {
        ref.current.toast = arg;
    };

    return { data, fetch, isLoading, isSuccess, isError, setShowToast };
};
