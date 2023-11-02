import ItemsLoader from "@/components/preloaders/ItemsLoader/ItemsLoader"
import { useFavorites } from "@/hooks/useFavorites"
import { useCart } from "@/hooks/useCart"

const EffectsProvider = ({ children }: { children: React.ReactNode }) => {

    const { isCartDataChanging } = useCart()
    const { isFavoritesDataChanging } = useFavorites()

    return (
        <>
            { (isCartDataChanging || isFavoritesDataChanging) && <ItemsLoader /> }
            { children }
        </>
    )
}

export default EffectsProvider