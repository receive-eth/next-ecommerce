import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { rootActions } from "@/store/store"
import { bindActionCreators } from "redux"

export const useActions = () => {
    const dispatch = useDispatch()

    // bindActionCreators оборачивает объект action-ов в dispatch; теперь их можно будет вызывать напрямую
    // useMemo производит вычисления лишь в том случае, если зависимость в квадратных скобках изменилась,
    // иначе - покажет предыдущее значение
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}