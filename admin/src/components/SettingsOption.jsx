
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setSettings } from '../api/settings';
import { parseURL } from '../lib/helpers';
import DatePicker from 'react-datepicker';
import InputField from '../elements/InputField';
import Switch from '../elements/Switch';
import SingleSelectMenu from '../elements/SingleSelectMenu';
import MultiSelectMenu from '../elements/MultiSelectMenu';
import Button from '../elements/Button';

import '../assets/styles/components/datepicker/datepicker.scss';
import { fetchData } from '../api/fetching';

export default function SettingsOption( { settingId, option, renderTooltip } ) {
	const queryClient = useQueryClient();
	const { id, type, title, description, placeholder, value, possible_values } = option;
	const [ date, setDate ] = useState( type !== 'datetime' || new Date( value ) );
	const [ status, setStatus ] = useState( );

	const handleApiCall = async () => {
		renderTooltip( { status: 'activeApiCall', message: 'Job is running…' } );
		const result = await fetchData( value );
		if ( result ) {
			renderTooltip( { status: 'successApiCall', message: result } );
			setTimeout( () => {
				renderTooltip();
			}, 3000 );
			return false;
		}
		renderTooltip( { status: 'errorApiCall', message: 'Error occured' } );
		setTimeout( () => {
			renderTooltip();
		}, 3000 );
	};

	const handleChange = useMutation( {
		mutationFn: async ( changeValue ) => {
			setStatus( 'active' );
			renderTooltip( 'active' );
			const response = await setSettings( `${ settingId }/${ id }`, {
				value: changeValue } );
			return { response };
		},
		onSuccess: async ( { response } ) => {
			const { ok } = response;

			if ( ok ) {
				setStatus( 'success' );
				renderTooltip( 'success' );
				setTimeout( () => {
					setStatus();
					renderTooltip();
				}, 3000 );

				return false;
			}
			queryClient.invalidateQueries( [ 'settings', settingId ] );
			setStatus( 'error' );
			renderTooltip( 'error' );
			setTimeout( () => {
				setStatus();
				renderTooltip();
			}, 3000 );
		},
	} );

	const processDate = ( ) => {
		const thisDate = new Date( date );
		const currentDate = new Date( thisDate.getTime() - ( thisDate.getTimezoneOffset() * 60000 ) );
		return currentDate;
	};

	const handleDate = useMutation( {
		mutationFn: async ( ) => {
			setStatus( 'active' );
			renderTooltip( 'active' );

			const response = await setSettings( `${ settingId }/${ id }`, {
				value: processDate().toISOString().replace( /^(.+?)T(.+?)\..+$/g, '$1 $2' ),
			} );
			return { response };
		},
		onSuccess: async ( { response } ) => {
			const { ok } = response;
			if ( ok ) {
				setStatus( 'success' );
				renderTooltip( 'success' );
				queryClient.invalidateQueries( [ 'settings', settingId ] );
				setTimeout( () => {
					setStatus();
					renderTooltip();
				}, 3000 );
				return false;
			}
			setStatus( 'error' );
			renderTooltip( 'error' );
			setTimeout( () => {
				setStatus();
				renderTooltip();
			}, 3000 );
		},
	} );

	const renderOption = ( ) => {
		switch ( type ) {
			case 'text':
			case 'password':
			case 'number':
				return (
					<InputField
						type={ type }
						label={ title }
						placeholder={ placeholder && ! value }
						defaultValue={ value }
						onChange={ ( inputValue ) => handleChange.mutate( inputValue ) }
					/>
				);
			case 'api_button':
				return (
					<Button
						active
						onClick={ handleApiCall }
					>
						{ title }
					</Button>
				);
			case 'checkbox':
				return (
					<Switch
						className="option flex"
						label={ title }
						checked={ value }
						onChange={ ( inputValue ) => handleChange.mutate( inputValue ) }
					/>
				);
			case 'datetime':
				return (
					<div className="urlslab-inputField-datetime">
						<div className="urlslab-inputField-label">{ title }</div>
						<DatePicker
							className="urlslab-input xl"
							selected={ date }
							dateFormat="dd. MMMM yyyy, HH:mm"
							timeFormat="HH:mm"
							showTimeSelect
							onChange={ ( newDate ) => {
								setDate( newDate ); handleDate.mutate();
							} }
						/>
					</div>
				);
			case 'listbox':
				return (
					<SingleSelectMenu key={ id } className="wide" name={ id } items={ possible_values } checkedId={ value } autoClose onChange={ ( selectedId ) => handleChange.mutate( selectedId ) }>
						{ title }
					</SingleSelectMenu>
				);
			case 'multicheck':
				return (
					<MultiSelectMenu className="wide"
						items={ possible_values }
						checkedItems={ value }
						key={ id }
						id={ id }
						asTags
						onChange={ ( selectedItems ) => handleChange.mutate( selectedItems ) }>
						{ title }
					</MultiSelectMenu>
				);
			default:
				break;
		}
	};

	return (
		<div className="urlslab-settingsPanel-option">
			{ status !== 'error' && renderOption() }
			{ status === 'error' && renderOption() /* Duplicate element on error, forces rerender */ }
			{ <p className="urlslab-settingsPanel-option__desc" dangerouslySetInnerHTML={ { __html: parseURL( description ) } } /> }
		</div>
	);
}
