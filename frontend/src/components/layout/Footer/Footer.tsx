import styles from "./footer.module.css"
import Link from "next/link"
import { Logo, Facebook, Instagram, Twitter} from "../../SVGS"

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.underline} />

			<div className={styles.signup_newsletter}>
				<p className={styles.signup_title}>sign up to our newsletter</p>
				<p className={styles.signup_subtitle}>
					be the first to know the latest releases, news, collaborations,
					exclusives and offers!
				</p>
				<div className={styles.form}>
					<input className={styles.input} placeholder="Your e-mail"/>
					<button className={styles.button}>SIGN UP</button>
				</div>
			</div>

			<div className={styles.black_panel}>
				<div className={styles.content_block}>
					<div className={styles.fiirst_block}>
						<Logo className={styles.logotype} />
						<ul className={styles.social_media_container}>
							<li className={styles.logo_wrapper}>
								<Link href={"*"}>
									<Instagram className={styles.logo} />
								</Link>
							</li>
							<li className={styles.logo_wrapper}>
								<Link href={"*"}>
									<Facebook className={styles.logo} />
								</Link>
							</li>
							<li className={styles.logo_wrapper}>
								<Link href={"*"}>
									<Twitter className={styles.logo} />
								</Link>
							</li>
						</ul>
					</div>

					<div className={styles.links_container}>
						<div className={styles.links_block}>
							<p>Company</p>
							<span>About</span>
							<span>The Stores</span>
							<span>Jobs</span>
							<span>Imprint</span>
						</div>

						<div className={styles.links_block}>
							<p>Customer service</p>
							<span>Contact Us</span>
							<span>Shipping</span>
							<span>Terms & Conditions</span>
							<span>Payment</span>
							<span>Giftcards</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.additional_info}>
				<div>SNEAKERS</div>
				<p>
					Sneakers have always been associated with both comfort and style! No
					other category of shoes can give you the same vibe like a pair of hip
					sneakers. Sneakers are the type of shoes that see no gender, making
					them the perfect unisex choice. Both men and women can wear the same
					designs and styles. Isn’t that awesome! Titolo is your one-stop-shop
					for all the diverse varieties of sneakers out there, whether you are
					looking for classic, retro, streetwear, fashionable, or just
					functional styles. Can’t decide on what to buy? No worries, log in to
					Titoloshop.com and browse through our thousands of sneaker choices to
					find the right match for you. As someone wise once said, people make
					shoe contact before making eye contact; hence one can’t compromise
					sneakers!
				</p>
				<div>STREETWEAR</div>
				<p>
					Streetwear is a term for casual clothing that became global in the
					1990s. It all started in New York where fashion was influenced by
					hip-hop culture and skateboarders. The term quickly spread from New
					York to the rest of the world. Streetwear includes anything casual and
					comfortable, like baggy denim jeans, caps and sneakers. Streetwear
					style is constantly evolving and developing. In the past couple of
					years, 90s fashion has started to become trendy again and that decade
					is having a big influence on streetwear styles. The hype for trendy
					sneakers and the baggy jeans look is back – at least until the next
					trend comes along.
				</p>
			</div>
		</footer>
	)
}
