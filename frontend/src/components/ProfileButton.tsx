"use client"
import Link from "next/link"
import { Account } from "./SVGS"
import { useAuth } from "@/hooks/useAuth"


const ProfileButton = () => {
    const { user } = useAuth()

    return (
			<>
				{user !== null ? (
					<Link href={`/profile`}>
						<Account style={{ width: "20px", height: "20px" }} />
					</Link>
				) : (
					<Link href={`/auth/login`}>
						<Account style={{ width: "20px", height: "20px" }} />
					</Link>
				)}
			</>
		)
}

export default ProfileButton