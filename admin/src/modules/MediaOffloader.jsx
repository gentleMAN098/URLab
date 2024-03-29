import { useState, Suspense, lazy } from 'react';
import { useI18n } from '@wordpress/react-i18n';

import MediaOffloaderOverview from '../overview/MediaOffloader';
import ModuleViewHeader from '../components/ModuleViewHeader';

export default function MediaOffloader( { moduleId } ) {
	const { __ } = useI18n();
	const [ activeSection, setActiveSection ] = useState( 'overview' );
	const slug = 'file';

	const tableMenu = new Map( [
		[ slug, __( 'Media Files' ) ],
	] );

	const SettingsModule = lazy( () => import( `../modules/Settings.jsx` ) );
	const MediaFilesTable = lazy( () => import( `../tables/MediaFilesTable.jsx` ) );

	return (
		<div className="urlslab-tableView">
			<ModuleViewHeader moduleId={ moduleId }
				moduleMenu={ tableMenu } activeMenu={ ( activemenu ) => setActiveSection( activemenu ) } />
			{ activeSection === 'overview' &&
			<MediaOffloaderOverview moduleId={ moduleId } />
			}
			{
				activeSection === slug &&
				<Suspense>
					<MediaFilesTable slug={ slug } />
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
