import { lazy, Suspense } from 'react';
import { renameModule } from '../constants/helpers';
import ErrorBoundary from './ErrorBoundary';
import Loader from './Loader';
import '../assets/styles/layouts/_DynamicModule.scss';

export default function DynamicModule( { modules, moduleId, settingId } ) {
	const importPath = import( `../modules/${ renameModule( moduleId ) }.jsx` );
	const Module = lazy( () => importPath );

	return (
		<div className="urlslab-DynamicModule">
			<ErrorBoundary>
				<Suspense fallback={ <Loader /> }>
					<Module modules={ modules } settingId={ settingId } moduleId={ moduleId } />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}