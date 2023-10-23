import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";


export default function LayoutClient({children}: any) {
    return (
			<>
				<Header />
                <Content>
                    {children}
                </Content>
				<Footer />
			</>
		)
}