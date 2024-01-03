import { useEffect, useReducer, useRef } from "react";
import lodash from "lodash";
import { useToast } from "@/comn/hooks";

const initializerArg = (initialData: any) => {
    return {
        data: initialData,
        isLoading: false,
        isSuccess: false,
        isError: false,
    };
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "success":
            return { ...state, isLoading: false, isError: false, isSuccess: true, data: action.payload };
        case "error":
            return { ...state, isLoading: false, isError: true, isSuccess: false };
    }
};

type ApiType = (...variables: any) => any;

type UseFetchProps = {
    api: ApiType | ApiType[];
    key?: any[];
    enabled?: boolean;
    notifyStatus?: boolean;
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
    showToast?: boolean;
};

type UseFetchReturn = {
    data: any;
    fetch: (...args: any) => void;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

export const useFetch = (props: UseFetchProps): UseFetchReturn => {
    const { api, key = [], enabled, showToast = false, onSuccess, onError, notifyStatus } = props;

    const toast = useToast();

    const isArray = Array.isArray(api);
    const initialData = isArray ? Array(api.length).fill(undefined) : undefined;

    const keyRef = useRef<any>({});
    const statusRef = useRef({ isLoading: false, isSuccess: false, isError: false });

    const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(reducer, initializerArg(initialData));

    useEffect(() => {
        if (!enabled) return;

        if (lodash.isEqual(keyRef.current.key, key)) return;

        keyRef.current.key = key;
        keyRef.current.t = new Date().getTime();
        fetch();
    }, [enabled, ...key]);

    const fetch = async (...variables: any) => {
        if (statusRef.current.isLoading) return;
        try {
            statusRef.current.isLoading = true;
            if (notifyStatus) dispatch({ type: "loading" });

            const fn = () => (isArray ? Promise.all(api.map((_) => _(...variables))) : api(...variables));
            const res = await fn();
            const data = isArray ? res.map(({ data }: any) => data) : res.data;
            dispatch({ type: "success", payload: data });
            if (onSuccess) {
                if (showToast) toast.showToast({ type: "success", content: "msg.00003" });
                onSuccess(data);
            }

            statusRef.current.isLoading = false;
            statusRef.current.isSuccess = true;
            return data;
        } catch (error) {
            console.log(error);
            if (notifyStatus) dispatch({ type: "error" });
            if (onError) {
                if (showToast) toast.showToast({ type: "error", content: "An error occurred " });
                onError(error);
            }
            statusRef.current.isLoading = false;
            statusRef.current.isError = true;
        }
    };

    return { data, fetch, isLoading, isSuccess, isError };
};
