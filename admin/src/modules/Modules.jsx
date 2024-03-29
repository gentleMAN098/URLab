import { useState } from 'react';
import { useI18n } from '@wordpress/react-i18n/';
import useCheckApiKey from '../hooks/useCheckApiKey';
import DashboardModule from '../components/DashboardModule';
import SearchField from '../elements/SearchField';
import MultiSelectMenu from '../elements/MultiSelectMenu';

export default function Modules( { modules } ) {
	const { __ } = useI18n();
	const { settingsLoaded, apiKeySet } = useCheckApiKey();
	const [ filterBy, setFilterBy ] = useState( {} );

	const labelsList = {
		paid: { name: 'Paid service', color: '#00c996' },
		// expert: { name: 'Experts', color: '#ffc996' },
		free: { name: 'Free' },
		// experimental: { name: 'Experimental', color: '#ff8875' },
		beta: { name: 'Beta', color: '#75a9ff' },
		// alpha: { name: 'Alpha' },
		// expert: { name: 'Expert' },
		seo: { name: 'SEO', color: '#D4C5F9' },
		// cron: { name: 'Cron' },
		performance: { name: 'Performance', color: '#65B5FF' },
		tools: { name: 'Tools', color: '#FFD189' },
		ai: { name: 'AI', color: '#ff7a7a' },
	};

	const statusList = {
		active: 'Active modules',
		inactive: 'Inactive modules',
	};
	let categoriesList = {};

	Object.entries( { ...labelsList } ).map( ( [ key, val ] ) => {
		const { name } = val;
		if ( key !== 'paid' && key !== 'free' ) {
			categoriesList = { ...categoriesList, [ key ]: name };
		}
		return false;
	} );

	const pricingList = {
		free: labelsList.free.name,
		paid: labelsList.paid.name,
	};

	if ( ! modules.length ) {
		return;
	}

	const handleFiltering = ( { input, type } ) => {
		let inputValue = input;
		if ( typeof input === 'string' ) {
			inputValue = input.toLowerCase();
		}

		setFilterBy( ( filter ) => {
			return { ...filter, [ type ]: inputValue };
		} );
	};

	const filter = ( module ) => {
		const { apikey, active, labels } = module;
		const title = module.title.toLowerCase();
		const description = module.description.toLowerCase();
		const { search, categories, status, pricing } = filterBy;

		const moduleStatus = active ? 'active' : 'inactive';

		if (
			( ! search || ( search && ( title.includes( search ) || description.includes( search ) ) ) ) &&
			( ! categories?.length || labels?.some( ( label ) => categories?.includes( label ) ) ) &&
			( ! status?.length || status?.some( ( val ) => val === moduleStatus ) ) &&
			( ! pricing?.length || labels?.some( ( label ) => pricing?.includes( label ) ) )
		) {
			return true;
		}

		return false;
	};

	return (
		<>
			<div className="urlslab-subheader flex flex-align-center">
				<SearchField liveUpdate autoFocus onChange={ ( input ) => handleFiltering( { input, type: 'search' } ) } placeholder={ __( 'Search' ) } />
				<span className="ml-l mr-s fs-xm">{ __( 'Filters' ) }:</span>
				<MultiSelectMenu id="categories" onChange={ ( input ) => handleFiltering( { input, type: 'categories' } ) }
					className="mr-s" isFilter
					items={ categoriesList }
					defaultValue={ Object.keys( categoriesList ) }>
					{ __( 'Categories' ) }
				</MultiSelectMenu>
				<MultiSelectMenu id="status" onChange={ ( input ) => handleFiltering( { input, type: 'status' } ) }
					className="mr-s" isFilter
					items={ statusList }
					defaultValue={ Object.keys( statusList ) }>
					{ __( 'Status' ) }
				</MultiSelectMenu>
				<MultiSelectMenu id="pricing" onChange={ ( input ) => handleFiltering( { input, type: 'pricing' } ) }
					className="mr-s" isFilter
					items={ pricingList }
					defaultValue={ Object.keys( pricingList ) }>
					{ __( 'Pricing' ) }
				</MultiSelectMenu>
			</div>

			<div className="urlslab-modules flex-tablet-landscape flex-wrap">
				{ modules.map( ( module ) => {
					const { id, apikey, active, title, description, labels } = module;
					return (
						module.id !== 'general' && filter( module )
							? <DashboardModule
								key={ id }
								moduleId={ id }
								hasApi={ settingsLoaded && apiKeySet === false && apikey }
								isActive={ active }
								title={ title }
								tags={ { labels, labelsList } }
							>
								{ description }
							</DashboardModule>
						// )
							: null
					);
				} )
				}
			</div>
		</>
	);
}
