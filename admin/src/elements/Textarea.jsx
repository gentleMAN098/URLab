import { useState, useCallback } from 'react';
import { useI18n } from '@wordpress/react-i18n';
import { delay } from '../lib/helpers';

import '../assets/styles/elements/_Inputs.scss';
import Tooltip from './Tooltip';

export default function TextArea( { defaultValue, autoFocus, placeholder, liveUpdate, className, readonly, disabled, label, description, required, labelInline, onChange, children, style, rows } ) {
	const { __ } = useI18n();
	const [ val, setVal ] = useState( defaultValue || '' );

	const handleVal = useCallback( ( event ) => {
		if ( onChange && ( defaultValue !== val || ! val ) ) {
			onChange( event.target.value );
		}
	}, [ onChange, defaultValue, val ] );

	const handleValLive = ( event ) => {
		if ( liveUpdate ) {
			delay( () => handleVal( event ), 800 )();
		}
	};

	return (
		<label className={ `urlslab-inputField-wrap ${ className || '' } ${ labelInline ? 'inline' : '' } ${ val ? 'has-value' : '' }` } style={ style }>
			{ label
				? <span className={ `urlslab-inputField-label ${ required ? 'required' : '' }` }>{ label }</span>
				: null
			}
			<div className={ `urlslab-inputField ${ val ? 'valid' : '' }` }>
				{ children }
				<textarea
					className="urlslab-input input__text"
					defaultValue={ val }
					autoFocus={ autoFocus }
					onChange={ ( event ) => {
						setVal( event.target.value );
						handleValLive( event );
					} }
					onBlur={ ( event ) => handleVal( event ) }
					placeholder={ placeholder }
					readOnly={ readonly }
					disabled={ disabled ? 'disabled' : '' }
					rows={ rows || 3 }
				/>
				{ required && <Tooltip className="showOnHover">{ __( 'Required field' ) }</Tooltip> }
			</div>
			{ description && <p className="urlslab-inputField-description">{ description }</p> }
		</label>
	);
}
