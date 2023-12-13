import { useRecoilState } from "recoil";
import { themeState } from "@/comn/recoil";

export const useTheme = () => {
    const [theme, setTheme] = useRecoilState(themeState);
    return { theme, setTheme };
};
