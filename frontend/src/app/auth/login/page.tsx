'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { useActions } from '@/hooks/useActions'
import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function Login() {
	const { login } = useActions()
	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const router = useRouter()

	const handleSendForm = async () => {
		await login({ email: userEmail, password: userPassword })
		router.push("/profile")
	}

    return (
			<div className={styles.login_block_wrapper}>
				<span>You are signed out</span>

				<div className={styles.container}>
					<div className={styles.registered_customers_block}>
						<div className={styles.block_title}>Registered Customers</div>

						<div className={styles.block_content}>
							<div>
								If you have an account, sign in with your email address.
							</div>
							<input
								type="email"
								placeholder="Email"
								className={styles.input}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								className={styles.input}
								onChange={(e) => setUserPassword(e.target.value)}
							/>
							<button onClick={handleSendForm} className={styles.signin_button}>
								SIGN IN
							</button>
							<Link href={"*"} className={styles.forgot_password}>
								Forgot Your Password?
							</Link>
						</div>
					</div>
					<div className={styles.new_customers_block}>
						<div className={styles.block_title}>New Customers</div>
						<div className={styles.block_content}>
							<div>
								Creating an account has many benefits: check out faster, keep
								more than one address, track orders and more.
							</div>
							<Link
								className={styles.create_account_buttton}
								href="/auth/signup"
							>
								CREATE AN ACCOUNT
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
}