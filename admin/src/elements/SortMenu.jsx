/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import Checkbox from './Checkbox';

import '../assets/styles/elements/_FilterMenu.scss';

export default function SortMenu( {
	className, name, style, children, items, checkedId, isFilter, onChange,
} ) {
	const [ isActive, setActive ] = useState( false );
	const [ isVisible, setVisible ] = useState( false );
	const [ checked, setChecked ] = useState( checkedId );
	const didMountRef = useRef( false );
	const ref = useRef( name );

	useEffect( () => {
		const handleClickOutside = ( event ) => {
			if ( ! ref.current?.contains( event.target ) && isActive ) {
				setActive( false );
				setVisible( false );
			}
		};
		if ( onChange && didMountRef.current && ! isActive && checked !== checkedId ) {
			onChange( checked );
		}
		didMountRef.current = true;
		document.addEventListener( 'click', handleClickOutside, true );
	}, [ checked, isActive ] );

	const checkedCheckbox = ( targetId ) => {
		setChecked( targetId );
	};

	const handleMenu = () => {
		setActive( ! isActive );

		setTimeout( () => {
			setVisible( ! isVisible );
		}, 100 );
	};

	return (
		<div className={ `urlslab-FilterMenu urlslab-SortMenu ${ className || '' } ${ isActive ? 'active' : '' }` } style={ style } ref={ ref }>
			{ ! isFilter && children ? <div className="urlslab-inputField-label" dangerouslySetInnerHTML={ { __html: children } } /> : null }
			<div
				className={ `urlslab-FilterMenu__title ${ isFilter ? 'isFilter' : '' } ${ isActive ? 'active' : '' }` }
				onClick={ handleMenu }
				onKeyUp={ ( event ) => handleMenu( event ) }
				role="button"
				tabIndex={ 0 }
				dangerouslySetInnerHTML={ { __html: isFilter ? children : items[ checked ] } }
			/>
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
