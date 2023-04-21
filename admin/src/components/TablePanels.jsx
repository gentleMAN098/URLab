import { useI18n } from '@wordpress/react-i18n';

import InsertRowPanel from './InsertRowPanel';
import ExportPanel from './ExportPanel';
import ImportPanel from './ImportPanel';
import DangerPanel from './DangerPanel';
import DetailsPanel from './DetailsPanel';
import { ReactComponent as Trash } from '../assets/images/icon-trash.svg';

export default function TablePanels( { props } ) {
	const { header, slug, currentFilters, initialRow, detailsOptions, insertOptions, exportOptions, activePanel, handlePanel } = props;
	const { __ } = useI18n();
	return (
		<>
			{
				activePanel === 'deleteall' &&
				<DangerPanel title={ __( 'Delete All?' ) }
					text={ __( 'Are you sure you want to delete all rows? Deleting rows will remove them from all modules where this table occurs.' ) }
					button={ <><Trash />{ __( 'Delete All' ) }</> }
					handlePanel={ handlePanel }
					action="delete-all"
				/>
			}

			{
				activePanel === 'deleteSelected' &&
				<DangerPanel title={ __( 'Delete Selected?' ) }
					text={ __( 'Are you sure you want to delete selected rows? Deleting rows will remove them from all modules where this table occurs.' ) }
					button={ <><Trash />{ __( 'Delete selected' ) }</> }
					handlePanel={ handlePanel }
					action="delete-selected"
				/>
			}
			{
				activePanel === 'addrow' &&
				<InsertRowPanel insertOptions={ insertOptions } handlePanel={ handlePanel } />
			}

			{
				activePanel === 'export' &&
				<ExportPanel options={ exportOptions }
					currentFilters={ currentFilters }
					header={ header }
					handlePanel={ handlePanel }
				/>
			}
			{
				activePanel === 'import' &&
				<ImportPanel props={ { slug, header, initialRow } } handlePanel={ handlePanel } />
			}
			{
				activePanel === 'details' &&
				<DetailsPanel options={ detailsOptions } handlePanel={ handlePanel } />
			}
		</>
	);
}