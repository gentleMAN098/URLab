import { useI18n } from '@wordpress/react-i18n';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Switch from '../elements/Switch';

import { setModule } from '../api/fetching';
import { ReactComponent as ArrowIcon } from '../assets/images/icon-arrow.svg';
import { ReactComponent as ApiIcon } from '../assets/images/api-exclamation.svg';
import '../assets/styles/components/_DashboardModule.scss';
import '../assets/styles/elements/_Button.scss';

export default function DashboardModule( { moduleId, title, children, isActive, hasApi, activePage } ) {
	const { __ } = useI18n();
	const queryClient = useQueryClient();
	const handleSwitch = useMutation( {
		mutationFn: () => {
			return setModule( moduleId, { active: ! isActive } );
		},
		onSuccess: ( ) => {
			queryClient.setQueryData( [ 'modules', moduleId.active ], ! isActive );
			queryClient.invalidateQueries( [ 'modules' ] );
		},
	} );

	const handleActive = ( module ) => {
		if ( activePage ) {
			activePage( module );
		}
	};

	const imagePath = new URL( `../assets/images/modules/${ moduleId }.png`, import.meta.url ).pathname;

	return (
		<div className={ `urlslab-dashboardmodule ${ handleSwitch.isLoading ? 'activating' : '' } ${ isActive ? 'active' : '' }` }>
			{ hasApi
				? <div className="urlslab-dashboardmodule-api">
					<ApiIcon />
					{ __( 'URLsLab API Key Required' ) }
				</div>
				: ''
			}
			{ handleSwitch.isLoading
				? <div className="urlslab-dashboardmodule-activating">{ isActive ? __( 'Deactivating…' ) : __( 'Activating…' ) }</div>
				: ''
			}
			<Switch
				secondary
				onChange={ () => handleSwitch.mutate( ) }
				className="urlslab-dashboardmodule-switch"
				label={ __( 'Activate module' ) }
				labelOff={ __( 'Deactivate module' ) }
				checked={ isActive }
			/>
			<div className="urlslab-dashboardmodule-main flex-tablet flex-align-center">
				{ imagePath
					? <img className="urlslab-dashboardmodule-image fadeInto" src={ imagePath } alt={ title } />
					: null
				}

				<h3 className="urlslab-dashboardmodule-title">{ title }</h3>
				<div className="urlslab-dashboardmodule-content">
					<p>{ children }</p>
					{ isActive
						? <button className="urlslab-learnMore" onClick={ () => handleActive( moduleId ) }>
							{ __( 'Manage module' ) } <ArrowIcon />
						</button>
						: null
					}
				</div>
			</div>
		</div>
	);
}
