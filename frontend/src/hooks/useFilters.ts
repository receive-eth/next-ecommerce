import { useTypedSelector } from "./useTypedSelector";

export const useFilters = () => useTypedSelector((state) => state.filters)