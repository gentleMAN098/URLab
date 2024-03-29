import { useState } from 'react';
import Overview from '../components/OverviewTemplate';

export default function GeneratorOverview( { moduleId } ) {
	const [ section, setSection ] = useState( 'about' );

	return (
		<Overview moduleId={ moduleId } section={ ( val ) => setSection( val ) }>
			{
				section === 'about' &&
				<section>
					<h4>About the module</h4>
					<p>Discover the ultimate solution to elevating your website's content with our state-of-the-art AI-powered module. Designed to simplify and streamline content creation, our module generates unique and engaging text tailored to your specific needs. With the intuitive shortcode or Gutenberg block integration, crafting captivating content has never been easier.</p>
					<p>Harnessing the power of the advanced GPT model version 4 or older 3.5, our plugin ensures top-notch quality and seamless adaptability for your site. Say goodbye to time-consuming content generation and writer's block, as our AI module takes care of all your content needs with ease.</p>
					<p>Upgrade your website today with our AI-driven module and experience the unparalleled benefits of dynamic, high-quality content that not only captivates your audience but also enhances your site's SEO performance. Don't settle for subpar content – step into the future of web copywriting with our groundbreaking module.</p>
				</section>
			}
			{
				section === 'integrate' &&
				<section>
					<h4>Shortcode</h4>
					<code>[urlslab-generator id="1"]</code>
					Supported variables:
					<ul>
						<li>id - The ID of the generator to use. Required in shortcode.</li>
						<li>template - Name of HTML tamplate to use to visualize generated value. Leave empty of the value should be returned as simple text</li>
						<li>value - Value variable is used in the template as: { '\u007B\u007B' }value{ '\u007D\u007D' }</li>
						<li>page_url - { '\u007B\u007B' }page_url{ '\u007D\u007D' } variable can be used in prompt, url filter or template</li>
						<li>page_title - { '\u007B\u007B' }page_title{ '\u007D\u007D' } variable can be used in prompt, url filter or template</li>
						<li>domain - { '\u007B\u007B' }domain{ '\u007D\u007D' } variable can be used in prompt, url filter or template</li>
						<li>language_code - { '\u007B\u007B' }language_code{ '\u007D\u007D' } variable can be used in prompt, url filter or template</li>
						<li>language - { '\u007B\u007B' }language{ '\u007D\u007D' } variable can be used in prompt, url filter or template</li>
						<li>video_captions - { '\u007B\u007B' }video_captions{ '\u007D\u007D' } Video captions with time stamps, variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_captions_text - { '\u007B\u007B' }video_captions{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_title - { '\u007B\u007B' }video_title{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_description - { '\u007B\u007B' }video_description{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_published_at - { '\u007B\u007B' }video_published_at{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_duration - { '\u007B\u007B' }video_duration{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_channel_title - { '\u007B\u007B' }video_channel_title{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						<li>video_tags - { '\u007B\u007B' }video_tags{ '\u007D\u007D' } variable can be used if variable videoid is set in attributes of shortcode</li>
						if you want to use any other variable in the HTML template or prompt, you can use it as { '\u007B\u007B' }variable_name{ '\u007D\u007D' } and add this as attribute to shortcode
					</ul>
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
