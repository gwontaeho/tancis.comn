import { useRecoilState } from "recoil";
import { conditionState } from "@/com/recoil";
import { useLocation } from "react-router-dom";

export const useCondition = ({ pathname } = {}) => {
  const location = useLocation();
  const [_condition, _setCondition] = useRecoilState(conditionState);

  const _pathname = pathname || location.pathname;
  const condition = _condition[_pathname];

  const setCondition = (data) => {
    _setCondition((prev) => ({ ...prev, [_pathname]: data }));
  };

  return { condition, setCondition };
};
