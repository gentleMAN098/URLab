/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import '../assets/styles/elements/_FilterMenu.scss';
import '../assets/styles/elements/_RangeSlider.scss';

export default function RangeInputs( {
	min, max, onChange, unit,
} ) {
	const [ minimum, setMin ] = useState( min );
	const [ maximum, setMax ] = useState( max );

	const handleMin = ( event ) => {
		// const value = Math.min( +event.target.value, maximum - 1 );
		setMin( event.target.value );
	};

	const handleMax = ( event ) => {
		setMax( event.target.value );
	};

	useEffect( () => {
		if ( onChange ) {
			onChange( { min: minimum, max: maximum } );
		}
	}, [ minimum, maximum ] );

	return (
		<div className="urlslab-rangeslider-inputs">
			<label className="urlslab-inputField dark-text" data-unit={ unit }>
				<input className="urlslab-input" type="number" value={ minimum } onChange={ ( event ) => handleMin( event ) } />
			</label>
			—
			<label className="urlslab-inputField dark-text" data-unit={ unit }>
				<input className="urlslab-input" type="number" value={ maximum } onChange={ ( event ) => handleMax( event ) } />
			</label>
		</div>
	);
}