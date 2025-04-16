import useComboActions from "./useComboActions";
import useComboLogic from "./useComboLogic";
import useComboState from "./useComboState";

const useCombo = () => {
  const createState = useComboState();
  useComboLogic(createState);
  const actions = useComboActions(createState);

  return { ...createState, ...actions };
};

export default useCombo;
