import { useState, useRef, useCallback } from 'react';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model';

/* Default icons are required for TinyMCE 5.3 or above */
import 'tinymce/icons/default';

/* A theme is also required */
import 'tinymce/themes/silver';

/* Import the skin */
import 'tinymce/skins/ui/oxide/skin.min.css';

/* Import plugins */
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
// import 'tinymce/plugins/autoresize';
// import 'tinymce/plugins/autosave';
// import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
// import 'tinymce/plugins/codesample';
// import 'tinymce/plugins/directionality';
// import 'tinymce/plugins/emoticons';
// import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
// import 'tinymce/plugins/importcss';
// import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/nonbreaking';
// import 'tinymce/plugins/pagebreak';
// import 'tinymce/plugins/preview';
// import 'tinymce/plugins/quickbars';
// import 'tinymce/plugins/save';
// import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
// import 'tinymce/plugins/template';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/visualchars';
// import 'tinymce/plugins/wordcount';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

import { delay } from '../lib/helpers';
import '../assets/styles/elements/_Inputs.scss';

export default function Editor( { defaultValue, className, style, label, description, onChange } ) {
	const editorRef = useRef( null );
	const [ val, setVal ] = useState( defaultValue || '' );

	const handleVal = useCallback( ( value ) => {
		if ( onChange && ( defaultValue !== val || ! val ) ) {
			onChange( value );
		}
	}, [ onChange, defaultValue, val ] );

	const handleValLive = ( value ) => {
		delay( () => handleVal( value ), 800 )();
	};

	return (
		<div className={ `urlslab-inputField-wrap ${ className || '' }` } style={ style }>
			{
				label
					? <span className="urlslab-inputField-label">{ label }</span>
					: null
			}

			<TinyMCE
				onInit={ ( evt, editor ) => editorRef.current = editor }
				initialValue={ defaultValue }
				onEditorChange={ ( input ) => {
					setVal( input ); handleValLive( input );
				} }
				init={ {
					skin: false,
					content_css: false,
					height: 400,
					menubar: false,
					plugins: [
						'advlist', 'autolink', 'lists', 'link', 'image', 'anchor', 'media', 'table', 'code',
					],
					toolbar: [ 'blocks | bold italic forecolor | alignleft aligncenter',
						'alignright alignjustify | bullist numlist outdent indent | code help' ],
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				} }
			/>
			{ description && <p className="urlslab-inputField-description">{ description }</p> }
		</div>
	);
}