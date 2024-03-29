import { useState, Suspense, lazy } from 'react';
import { useI18n } from '@wordpress/react-i18n';

import RelatedResourcesOverview from '../overview/RelatedResources';
import ModuleViewHeader from '../components/ModuleViewHeader';

export default function RelatedResources( { moduleId } ) {
	const { __ } = useI18n();
	const slug = 'url-relation';
	const [ activeSection, setActiveSection ] = useState( 'overview' );

	const tableMenu = new Map( [
		[ 'url-relation', __( 'Related Articles' ) ],
	] );

	const SettingsModule = lazy( () => import( `../modules/Settings.jsx` ) );
	const URLRelationTable = lazy( () => import( `../tables/URLRelationTable.jsx` ) );

	return (
		<div className="urlslab-tableView">
			<ModuleViewHeader moduleId={ moduleId }
				moduleMenu={ tableMenu } activeMenu={ ( activemenu ) => setActiveSection( activemenu ) } />
			{ activeSection === 'overview' &&
			<RelatedResourcesOverview moduleId={ moduleId } />
			}
			{
				activeSection === 'url-relation' &&
				<Suspense>
					<URLRelationTable slug={ slug } />
				</Suspense>
			}
			{
				activeSection === 'settings' &&
				<Suspense>
					<SettingsModule className="fadeInto" settingId={ moduleId } />
				</Suspense>
			}
		</div>
	);
}
