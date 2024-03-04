import { useRecoilState } from "recoil";
import { themeState } from "@/comn/features/recoil";

/**
 *
 * @returns
 */
export const useTheme = () => {
    const [theme, setTheme] = useRecoilState(themeState);
    return { theme, setTheme };
};
