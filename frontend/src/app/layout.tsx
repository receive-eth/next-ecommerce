import './globals.css'
import Content from '../components/layout/Content/Content'
import Header from '@/components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"
import AuthProvider from '@/providers/AuthProvider'
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'SHOP',
  description: 'My next js shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
		<html lang="en">
			<body className={montserrat.className}>
				<RootProvider>
					<Header />
					<Content>
						<AuthProvider>{children}</AuthProvider>
					</Content>
					<Footer />
				</RootProvider>
			</body>
		</html>
	)
}
