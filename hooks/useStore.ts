import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { storeState } from "@/comn/features/recoil";

type UseStoreProps = {
    pgeUid?: string;
};

/**
 *
 * @param props
 * @returns
 */
export const useStore = (props?: UseStoreProps) => {
    const [_store, _setStore] = useRecoilState(storeState);
    const _storeRef = useRef<Record<string, any>>({});

    useEffect(() => {
        _storeRef.current = _store;
    }, [_store]);

    /**
     *
     * @param pgeUid
     * @returns
     */
    const getStore = (pgeUid?: string) => {
        if (!pgeUid) return _storeRef.current;
        return _storeRef.current[pgeUid];
    };

    /**
     *
     * @param pgeUid
     * @param value
     * @returns
     */
    const setStore = (pgeUid?: string, value?: any) => {
        if (!pgeUid) return;
        _setStore((prev) => {
            return { ...prev, [pgeUid]: typeof value === "function" ? value(prev[pgeUid]) : value };
        });
    };

    const pgeStore = props?.pgeUid && _store[props.pgeUid];

    return { store: _store, pgeStore, getStore, setStore };
};
