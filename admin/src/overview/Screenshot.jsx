import { useState } from 'react';
import Overview from '../components/OverviewTemplate';

import image1 from '../assets/images/overview/liveagent_screenshot.jpeg';
import editIcon from '../assets/images/icons/icon-edit.svg';

export default function ScreenShotOverview( { moduleId } ) {
	const [ section, setSection ] = useState( 'about' );

	// Custom sections here – will be before FAQ in the menu. Add into customSections prop (not required)

	const sections = [
		{ id: 'section1', title: 'My Section', icon: editIcon },
	];

	return (
		// has also property title for custom title like <Overview moduleId=xxx title="my title"
		// noCheckbox property hides "disable overview" checkbox on modules without tables (just overview and setttings in menu)
		// customSections={ sections }
		<Overview moduleId={ moduleId } section={ ( val ) => setSection( val ) }>
			{
				section === 'about' &&
				<section>
					<h4>About the module</h4>
					<p>Screenshots are a great way to grab an audience's attention and make your content more appealing. With this module, you can easily add automatically generated screenshots via a shortcode into the content. It will not only save you time but will also give your content a professional look.</p>
					<p>Using the Screenshots module can be especially useful for websites with many pages, where manually taking screenshots for each one can be time-consuming. With the module, you can quickly generate screenshots for each page.</p>
					<p>Overall, the module makes screenshots easy to use with zero effort. It is a great way to save time and make your content stand out.</p>
				</section>
			}

			{
				section === 'integrate' &&
				<section>
					<h4>How to use the feature?</h4>
					<p>It's almost effortless and will only take a maximum of five minutes. All you have to do is add a shortcode to your theme template, and the module will take care of the rest for you.</p>

					<h4>Shortcode</h4>
					<code>
						[urlslab-screenshot screenshot-type="carousel" url="https://www.liveagent.com" alt="Home" width="100%" height="100%" default-image="https://www.yourdomain.com/default_image.jpg"]
					</code>

					<p><strong>Shortcode Attributes</strong></p>

					<table border="1">
						<tbody>
							<tr>
								<th>Attribute</th>
								<th>Required</th>
								<th>Description</th>
								<th>Default Value</th>
								<th>Possible Values</th>
							</tr>
							<tr>
								<td>screenshot-type</td>
								<td>optional</td>
								<td> </td>
								<td>carousel</td>
								<td>carousel, full-page, carousel-thumbnail, full-page-thumbnail</td>
							</tr>
							<tr>
								<td>url</td>
								<td>mandatory</td>
								<td>Link to the page from which a screenshot should be taken.</td>
								<td> </td>
								<td> </td>
							</tr>
							<tr>
								<td>alt</td>
								<td>optional</td>
								<td>Value of the image alt text.</td>
								<td>A summary of the destination URL</td>
								<td> </td>
							</tr>
							<tr>
								<td>width</td>
								<td>optional</td>
								<td>The width of the image.</td>
								<td>100%</td>
								<td> </td>
							</tr>
							<tr>
								<td>height</td>
								<td>optional</td>
								<td>The height of the image.</td>
								<td>100%</td>
								<td> </td>
							</tr>
							<tr>
								<td>default-image</td>
								<td>optional</td>
								<td>The URL of the default image in case we don't yet have the screenshot.</td>
								<td>-</td>
								<td> </td>
							</tr>
						</tbody>
					</table>

					<h4>Example</h4>
					<p>Example of shortcode to include a screenshot of www.liveagent.com to your website content: <code>[urlslab-screenshot url="https://www.liveagent.com"]</code></p>
				</section>
			}
			{
				section === 'faq' &&
					<section>
						<h4>FAQ</h4>
						<p>Available soon.</p>
					</section>
			}
		</Overview>
	);
}
