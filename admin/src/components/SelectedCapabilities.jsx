export default function SelectedCapabilities( props ) {
	const { selectedItems, toggleSelectItem } = props;
	return (
		<div className="urlslab-selected-capabilities">
			<h5 className="urlslab-selected-capabilities-title">selected</h5>
			{ selectedItems.map( ( item ) => (
				<div className="urlslab-capability-item">
					<label role="Controlled Checkbox" className="urlslab-checkbox">
						<input
							className="urlslab-checkbox-input"
							type="checkbox"
							checked={ item.isSelected }
							onChange={ () => toggleSelectItem( item ) }
						/>
						<div className="urlslab-checkbox-box"></div>
						<span className="urlslab-checkbox-text" >{ item.capabilityName }</span>
					</label>
				</div>
			) ) }
		</div>
	);
}
