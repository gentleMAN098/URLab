import { useI18n } from '@wordpress/react-i18n';
import IconButton from './IconButton';
import { ReactComponent as SortIcon } from '../assets/images/icons/icon-sort.svg';
import { ReactComponent as SortASC } from '../assets/images/icons/icon-sort-asc.svg';
import { ReactComponent as SortDESC } from '../assets/images/icons/icon-sort-desc.svg';

const SortBy = ( ( { props, children } ) => {
	const { sorting, header, th, onClick } = props;
	const { __ } = useI18n();
	const key = th.header.id;
	let sortedBy = sorting?.filter( ( k ) => k.key === key )[ 0 ];
	sortedBy = sortedBy ? sortedBy.dir : undefined;

	const sortIcon = () => {
		switch ( sortedBy ) {
			case 'ASC':
				return <SortASC />;
			case 'DESC':
				return <SortDESC />;
			default:
				return <SortIcon />;
		}
	};

	return (
		<div className="flex flex-align-center">
			<IconButton
				onClick={ onClick }
				className={ `${ sortedBy ? 'active' : '' }` }
				tooltip={ `${ __( 'Sort by' ) } ${ header[ key ] }` }
			>{ sortIcon() }
			</IconButton>
			{ children }
		</div>
	);
} );

export default SortBy;
