import { useState, Suspense, lazy } from 'react';
import { useI18n } from '@wordpress/react-i18n';

import ScreenShotOverview from '../overview/Screenshot';
import ModuleViewHeader from '../components/ModuleViewHeader';

export default function Screenshot( { moduleId } ) {
	const { __ } = useI18n();
	const [ activeSection, setActiveSection ] = useState( 'overview' );

	const tableMenu = new Map( [
		[ 'screenshot', __( 'Screenshots' ) ],
	] );

	const SettingsModule = lazy( () => import( `../modules/Settings.jsx` ) );
	const ScreenshotTable = lazy( () => import( `../tables/ScreenshotTable.jsx` ) );

	return (
		<div className="urlslab-tableView">
			<ModuleViewHeader moduleId={ moduleId }
				moduleMenu={ tableMenu } activeMenu={ ( activemenu ) => setActiveSection( activemenu ) } />
			{
				activeSection === 'overview' &&
					<ScreenShotOverview moduleId={ moduleId } />
			}
			{
				activeSection === 'screenshot' &&
					<Suspense>
						<ScreenshotTable slug="screenshot" />
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
