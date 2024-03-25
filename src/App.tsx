import styles from './App.module.scss';
import GuestNav from './components/GuestNav';
import React, { ReactNode } from 'react';

const AB: React.FC<{
	title: string;
	text: string | ReactNode;
	alt?: boolean;
}> = ({ title, text, alt }) => {
	return (
		<div className={alt ? 'bg-white' : ''} style={{ padding: '8em 0' }}>
			<div className="container">
				<div className={'row' + (alt ? ' alt' : '')}>
					<div className={'col-4'}>
						<p className={styles.extraLarge + ' center'}>{title}</p>
					</div>
					<div className="col-1"></div>
					<div className={'col-5'}>{text}</div>
				</div>
			</div>
		</div>
	);
};

const App = () => {
	return (
		<>
			<GuestNav showHome={false} />
			<div className="py-5"></div>
			<div className="container">
				<div className={styles.hero}>
					<h1 className={styles.extraLarge}>
						Who's watching your <br /> back-end? 👀
					</h1>
					<div className="py-5"></div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
						nostrum enim modi perspiciatis dignissimos corporis autem sapiente
						odio et ad praesentium, alias, eveniet cumque voluptas doloremque
						odit. Corporis, a delectus?
					</p>
					<div className="py-3"></div>
				</div>
				<div className="py-5"></div>
				<div className="py-5"></div>
			</div>
			<AB
				title={'Do!, a deer, a female deer'}
				text={
					<p className="center">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
						numquam ipsum commodi dolore earum sed aliquam eum? Voluptatibus
						qui, voluptas quas veniam nisi, repellat fugiat, error dolorem
						corporis ipsum eaque.
					</p>
				}
				alt
			/>
			<AB
				title={'Re!, a drop of golden sun'}
				text={
					<p className="center">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sint
						in, asperiores similique nihil esse mollitia explicabo vero placeat
						numquam vel dignissimos impedit voluptatum ipsa ipsam amet velit
						consequuntur tempora!
					</p>
				}
				// alt={false}
			/>
			<AB
				alt
				title={'Mi!, a name I call myself'}
				text={
					<p className="center">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sint
						in, asperiores similique nihil esse mollitia explicabo vero placeat
						numquam vel dignissimos impedit voluptatum ipsa ipsam amet velit
						consequuntur tempora!
					</p>
				}
			/>

			<div className="py-5"></div>
			<div className="py-5"></div>
			<div className="row spaced center">
				<div className="col-4">
					<div className="bg-teal rounded px-5">
						<h1 className={'' + ' center py-5'}>Low Visibility? 👓</h1>
					</div>
				</div>

				<div className="col-3">
					<div className="px-5 bg-teal rounded">
						<div className="py-5"></div>
						<p className="center">
							👓 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
							aliquam dolores enim suscipit tempora expedita molestias aperiam,
							repellendus maiores, laboriosam eaque nisi deleniti commodi nobis
							laborum dolorum explicabo ea alias?
						</p>
						<div className="py-5"></div>
					</div>
				</div>
			</div>
			<div className="py-5"></div>
			<div className="py-5"></div>
			<div className="bg-teal">
				<div className="container center">
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. In magni,
						ut sapiente incidunt.
					</p>
				</div>
			</div>
		</>
	);
};

export default App;
