import { useEffect, useState, useRef } from 'react';
import Checkbox from './Checkbox';

import '../assets/styles/elements/_FilterMenu.scss';

export default function SortMenu( {
	className, name, style, children, items, checkedId, onChange,
} ) {
	const [ isActive, setActive ] = useState( false );
	const [ isVisible, setVisible ] = useState( false );
	const [ checked, setChecked ] = useState( checkedId );
	const ref = useRef( null );

	useEffect( () => {
		const handleClickOutside = ( event ) => {
			if ( ! ref.current?.contains( event.target ) ) {
				setActive( false );
				setVisible( false );
			}
		};
		document.addEventListener( 'click', handleClickOutside, true );
	} );

	const checkedCheckbox = ( targetId ) => {
		setChecked( targetId );
		if ( onChange ) {
			onChange( targetId );
		}
	};

	const handleMenu = () => {
		setActive( ! isActive );

		setTimeout( () => {
			setVisible( ! isVisible );
		}, 100 );
	};

	return (
		<div className={ `urlslab-FilterMenu ${ className || '' }` } style={ style } ref={ ref }>
			<div
				className={ `urlslab-FilterMenu__title ${ isActive ? 'active' : '' }` }
				onClick={ handleMenu }
				onKeyUp={ ( event ) => handleMenu( event ) }
				role="button"
				tabIndex={ 0 }
			>
				{ children }
			</div>
			<div className={ `urlslab-FilterMenu__items ${ isActive ? 'active' : '' } ${ isVisible ? 'visible' : '' }` }>
				<div className={ `urlslab-FilterMenu__items--inn ${ Object.values( items ).length > 8 ? 'has-scrollbar' : '' }` }>
					{ Object.entries( items ).map( ( [ id, value ] ) => {
						return (
							<Checkbox
								className="urlslab-FilterMenu__item"
								key={ id }
								id={ id }
								onChange={ () => checkedCheckbox( id ) }
								name={ name }
								checked={ id === checked }
								radial
							>
								{ value }
							</Checkbox>
						);
					} ) }
				</div>
			</div>
		</div>
	);
}