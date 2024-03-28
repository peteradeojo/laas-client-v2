import styles from './card.module.scss';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className = '',
}) => {
	return (
		<div className={`col-5 p-3 rounded ${styles.card} ${className}`}>
			{children}
		</div>
	);
};

export default Card;
