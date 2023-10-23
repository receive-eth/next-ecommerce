'use client'

import { FormEvent, useState } from 'react'
import styles from './page.module.css'
import Dropdown from '@/shared/Dropdowns/Dropdown/Dropdown'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/navigation'

export default function Signup() {

	interface IUserData {
		firstName: string
		lastName: string
		gender: string
		email: string
		password: string
		additionalInfo: ""
	}

	const { registration, login } = useActions()
	const router = useRouter()

	const [userData, setUserData] = useState<IUserData>({
		firstName: "",
		lastName: "",
		gender: "",
		email: "",
		password: "",
		additionalInfo: "",
	})

	const handleFormChange = (values: IUserData | any) => {
		setUserData((prev) => ({
			...prev,
			...values,
		}))
	}

	const handleSendForm = async (event: FormEvent) => {
		event.preventDefault()
		try {
			await registration(userData)
			await login({ email: userData.email, password: userData.password })
			router.replace("/profile")
		} catch(e) {
			console.log(e)
		}
	}


    return (
			<>
				<span className={styles.page_title}>Create New Cusomer Account</span>
				<div className={styles.wrapper}>
					<form className={styles.form_block} autoComplete="off" onSubmit={(e) => handleSendForm(e)}>
						<div className={styles.input_group}>
							<span>Personal information</span>
							<input
								className={styles.input}
								placeholder="First Name"
								value={userData.firstName}
								onChange={(e) =>
									handleFormChange({ firstName: e.target.value })
								}
							/>
							<input
								className={styles.input}
								placeholder="Last Name"
								value={userData.lastName}
								onChange={(e) => handleFormChange({ lastName: e.target.value })}
							/>
							{/* Уведомления на почту пока не обрабатываются api */}
							<label>
								Sign up for Newsletter
								<input className={styles.checkbox} type="checkbox" />
							</label>

							<div className={styles.gender_choice}>
								<span className={styles.gender_choice_title}>Gender</span>
								<Dropdown handleFormChange={handleFormChange} />
							</div>
						</div>

						<div className={styles.input_group}>
							<span>Sign-in information</span>
							<input
								className={styles.input}
								placeholder="Email"
								type="email"
								value={userData.email}
								onChange={(e) => handleFormChange({ email: e.target.value })}
							/>
							<input
								className={styles.input}
								placeholder="Password"
								type="password"
								value={userData.password}
								onChange={(e) => handleFormChange({ password: e.target.value })}
							/>
							<input
								className={styles.input}
								placeholder="Confirm password"
								type="password"
							/>
						</div>

						<div className={styles.input_group}>
							<span>Additional information</span>
							<input
								className={styles.input}
								placeholder="Your instagram profile name"
								type="text"
								value={userData.additionalInfo}
								onChange={(e) =>
									handleFormChange({ additionalInfo: e.target.value })
								}
							/>
						</div>

						<button className={styles.create_account_buttton} type="submit">
							Create an account
						</button>
					</form>
				</div>
			</>
		)
}