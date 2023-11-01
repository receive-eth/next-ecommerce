import Link from "next/link"

export const withLink = (Component: any, {href}: {href: string}) => {

	return (props: any) => {
		return (
			<Link href={href}>
				<Component {...props} />
			</Link>
		)
	}
}
