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

type TApi = (...variables: any) => any;

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
    fetch: (...args: any) => void;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    setShowToast: (showToast: boolean) => void;
};

export const useFetch = (props: UseFetchProps): UseFetchReturn => {
    const { api, key = [], enabled, showToast = false, onSuccess, onError, notifyStatus } = props;

    const toast = useToast();
    const _showToast = useRef(showToast);

    const isArray = Array.isArray(api);

    const keyRef = useRef<any>({});
    const statusRef = useRef({ isLoading: false, isSuccess: false, isError: false });

    const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(
        reducer,
        isArray ? Array(api.length).fill(undefined) : undefined,
        initializerArg,
    );

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
            const current = new Date();

            const data = isArray
                ? res.map((_: any) => {
                      if (typeof _ !== "object") return _;
                      const { data } = _;

                      return Object.fromEntries(
                          Object.entries(data).map(([k, v]: any) => {
                              return [k, { ...v, __t: current }];
                          }),
                      );
                  })
                : typeof res !== "object"
                  ? res
                  : Object.fromEntries(
                        Object.entries(res.data).map(([k, v]: any) => {
                            return [k, { ...v, __t: current }];
                        }),
                    );

            dispatch({ type: "success", payload: data });

            if (onSuccess) {
                if (_showToast.current) toast.showToast({ type: "success", content: "msg.00003" });
                onSuccess(data);
            }

            statusRef.current.isLoading = false;
            statusRef.current.isSuccess = true;

            return data;
        } catch (error) {
            if (notifyStatus) dispatch({ type: "error" });

            if (onError) {
                if (_showToast.current) toast.showToast({ type: "error", content: "An error occurred " });
                onError(error);
            }

            statusRef.current.isLoading = false;
            statusRef.current.isError = true;
        }
    };

    const setShowToast = (showToast: boolean) => {
        _showToast.current = showToast;
    };

    return { data, fetch, isLoading, isSuccess, isError, setShowToast };
};
