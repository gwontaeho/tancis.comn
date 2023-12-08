import { useRecoilState } from "recoil";
import { themeState } from "@/com/recoil";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  return { theme, setTheme };
};
