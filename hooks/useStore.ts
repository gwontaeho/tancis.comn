import { useRecoilState } from 'recoil'
import { storeState } from '@/comn/recoil'

type UseStoreProps = {
    pgeUid?: string
}

/**
 *
 * @param props
 * @returns
 */
export const useStore = (props?: UseStoreProps) => {
    const [_store, _setStore] = useRecoilState(storeState)

    /**
     *
     * @param pgeUid
     * @returns
     */
    const getStore = (pgeUid?: string) => {
        if (!pgeUid) return _store
        return _store[pgeUid]
    }

    /**
     *
     * @param pgeUid
     * @param value
     * @returns
     */
    const setStore = (pgeUid?: string, value?: any) => {
        if (!pgeUid) return
        _setStore((prev) => {
            return { ...prev, [pgeUid]: typeof value === 'function' ? value(prev[pgeUid]) : value }
        })
    }

    return { store: _store, pgeStore: props?.pgeUid && _store[props.pgeUid], getStore, setStore }
}
