BeeReady Website - WEDE5020 Portfolio of Evidence
Student: Jaden Nell
Module: WEDE5020 - Web Development
Organisation: BeeReady, South Africa
Current phase: Part 3 - Enhancing Functionality and SEO
Part 3 documentation updated: 2 November 2026
Repository: https://github.com/Jaden-Nell/BeeReady-WEDE5020-Part1
Live project URL: Pending Netlify deployment
This repository documents the development of the BeeReady website through Parts 1, 2 and 3. The project is a student website, not a claim that the official BeeReady business site has been replaced.

1. Project Overview
BeeReady is a South African wellness brand offering convenient honey snap packs. The website introduces the brand, explains the product and its ingredients, answers frequent questions and gives visitors ways to enquire or send a general message.

The project uses HTML5 for structure, CSS3 for styling and responsive layouts, and vanilla JavaScript for interaction and dynamic content. It is designed for desktop, tablet and mobile devices.
Project objectives
- Provide a structured six-page website and consistent navigation.
- Explain the BeeReady brand, product and ingredients clearly.
- Provide separate product-enquiry and general-contact forms.
- Improve accessibility, mobile usability and search-engine readability.
- Demonstrate DOM manipulation, Fetch API, form validation and asynchronous submissions.
- Prepare the site for GitHub version control and public deployment.
2. Website Pages
Page	File	Purpose
Home	index.html	Introduce BeeReady and guide visitors to product information.
About	about.html	Present the brand and its South African identity.
Shop	products.html	Present the product, image gallery and searchable ingredients.
FAQ	faq.html	Answer common questions using an interactive accordion.
Enquiry	enquiry.html	Collect product, price, availability and wholesale enquiries.
Contact	contact.html	Collect general messages and website feedback.


Sitemap
Home (index.html)
|-- About (about.html)
|-- Shop (products.html)
|-- FAQ (faq.html)
|-- Enquiry (enquiry.html)
`-- Contact (contact.html)
3. Project Folder Structure
BeeReady/
|-- css/
|   `-- style.css
|-- data/
|   `-- ingredients.json
|-- images/
|   |-- general/
|   |-- logo/
|   `-- products/
|       `-- ingredients/
|-- js/
|   `-- script.js
|-- screenshots/
|   |-- desktop-home.png
|   |-- tablet-home.png
|   `-- mobile-home.png
|-- index.html
|-- about.html
|-- products.html
|-- faq.html
|-- enquiry.html
|-- contact.html
|-- robots.txt
|-- sitemap.xml
`-- README.md
The screenshots are evidence from Part 2; they should not be presented as final Part 3 deployment screenshots.
4. Technologies and Development Tools
- HTML5: semantic layout, headings, links, image descriptions and form fields.
- CSS3: BeeReady branding, Flexbox, Grid, responsive breakpoints and focus styling.
- JavaScript (ES6+): event listeners, DOM manipulation, filtering, sorting and validation.
- JSON + Fetch API: ingredient information loaded from data/ingredients.json.
- Netlify Forms (planned production backend): handles submitted form data after deployment and configuration.
- Visual Studio Code + Live Server: editing and local HTTP testing.
- Git and GitHub: source control and submission history.
- Browser developer tools: responsive and console-error checks.
No JavaScript framework is required for this version.
5. Part 1 - Foundation and Planning
Part 1 established the selected organisation, project proposal, sitemap, low-fidelity planning, six HTML pages, navigation, product and contact content, image assets, form structure and GitHub repository.

Part 1 result: 80%. The Part 2 README recorded that no written Part 1 lecturer feedback had been supplied before Part 2 development. The initial website therefore proceeded to styling based on the existing project requirements.
6. Part 2 - Styling and Responsive Design
Part 2 retained the six-page site and expanded the visual design:
- Black and bright-yellow BeeReady brand styling, with white, cream and supporting red accents.
- Consistent header, navigation, announcement bar, mascot and footer.
- Homepage hero, brand introduction and product call-to-action.
- About page with a Proudly South African section.
- Shop product artwork and four ingredient cards.
- FAQ cards, product enquiry form and contact-information page.
- Flexbox, CSS Grid, media queries, responsive images, hover and focus styling.
- Responsive screenshots at 1440 x 900, 768 x 1024 and 390 x 844.
These were the features of the submitted Part 2 version; Part 3 builds on them instead of starting a new design.
Part 2 feedback and corrections
Lecturer's Part 2 mark / written feedback: Not yet provided for this Part 3 documentation. Do not invent a feedback mark or correction. If feedback is received, add each actual comment below with the corresponding change and commit.
Part 2 feedback	Correction made	Evidence / commit
Pending lecturer feedback	Pending	Pending


The Part 3 development also addressed a layout issue noticed during local testing: the mobile-menu label and skip-link appeared unexpectedly in the desktop header. The CSS was revised to preserve the original desktop navigation and use an icon-only hamburger on smaller screens. This was a development correction, not a claimed lecturer comment.
7. Part 3 - Enhancing Functionality and SEO
7.1 Interactive JavaScript features
Mobile navigation (js/script.js)
- Uses the Menu button at screen widths of 768px and below.
- Opens and closes the navigation with aria-expanded state updates.
- Supports closing the menu with Escape or by selecting a link.
- Preserves the original full navigation on desktop.
FAQ accordion (faq.html and js/script.js)
- Converts existing question cards into interactive buttons and answer panels.
- Expands/collapses answers and updates accessible attributes.
- Keeps the original FAQ text readable when JavaScript is unavailable.
Product image gallery and lightbox (products.html and js/script.js)
- Allows users to select product-image thumbnails.
- Opens the selected image in a larger modal viewer.
- Provides previous/next controls, keyboard arrows and Escape-to-close support.
7.2 Dynamic content and search
Shop ingredient data: data/ingredients.json
- Stores the four ingredient names, descriptions, images, colours and information points.
- Uses fetch() to load JSON and JavaScript to create ingredient cards dynamically.
- Offers live text filtering and A-Z / Z-A sorting.
- Shows the matching-result count and a message when no items match.
- Retains built-in HTML cards as a fallback when JSON cannot be fetched.
The four ingredients are Raw Fynbos Honey, Reishi Mushroom, Vitamin C and Quercetin. Product copy should avoid unsupported disease-treatment or disease-prevention claims.
7.3 Forms and validation
Product enquiry form: enquiry.html, form name product-enquiry.
- Collects name, email, phone, enquiry type, optional quantity and message.
- Intended for product information, pricing, availability and stockist questions.
General contact form: contact.html, form name general-contact.
- Collects name, email, subject and general message.
- Intended for general questions and feedback, not product orders.
Shared form features:
- HTML5 required, type, minlength, maxlength, pattern and numeric limits.
- JavaScript validation with field-specific messages and invalid-field focus.
- Honeypot field to reduce automated spam.
- AJAX-style fetch() POST using URL-encoded form data.
- In-page sending, error and server-acceptance feedback without a page reload.
- Form markup designed for Netlify Forms detection when the site is deployed.
Important limitations: A form passing validation does not prove that the business has received the message. Both forms must be detected and tested on Netlify, and the notification recipient must be verified. The optional email-client draft button remains disabled until a real authorised recipient address has been supplied and configured. Never insert a guessed business email address.
7.4 On-page SEO
- Distinct page titles and meta descriptions across all six pages.
- Canonical link placeholders and Open Graph metadata for social sharing.
- Relevant headings (including page-level H1 headings), readable URLs and internal navigation.
- Descriptive image alt text and responsive layout considerations.
- Keyword targeting in headings and page copy, without keyword stuffing.
Keyword mapping:
Page	Intended keyword theme
Home	BeeReady, South African honey snap packs
About	About BeeReady, South African wellness brand
Shop	BeeReady ingredients, Fynbos honey, reishi mushroom
FAQ	BeeReady FAQ, honey snap pack questions
Enquiry	BeeReady pricing and availability enquiries
Contact	Contact BeeReady, BeeReady general questions


Meta keywords alone are not a substitute for useful page content. Actual search rankings are not claimed.
7.5 Technical and off-page SEO
- robots.txt permits crawling and points to the sitemap.
- sitemap.xml lists the six public pages.
- Canonical and sitemap URL placeholders must be replaced with the real deployment URL.
- Image descriptions, local assets and responsive layouts support usability and performance.
- HTTPS, security headers and actual page-speed results must be checked on the deployed website.
- Backlinks, social promotion and local business listing activity require genuine external action and permission. Not yet claimed as completed.
8. Part 3 Changelog (2 November 2026)
File / area	Change	Status
Six HTML pages	Added SEO tags, accessible navigation markup and JS references	Added locally
index.html	Updated homepage metadata and navigation markup	Added locally
about.html	Added page-specific metadata and accessible header markup	Added locally
products.html	Added thumbnail gallery, lightbox hooks, search and sorting controls	Added locally
faq.html	Prepared FAQ questions for dynamic accordion behaviour	Added locally
enquiry.html	Added HTML5 constraints and a Netlify-compatible product form	Added locally
contact.html	Added a separate general-contact form and validation markup	Added locally
css/style.css	Added interaction, gallery, form and responsive styles; fixed header layout	Added locally
js/script.js	Implemented interactive elements, dynamic JSON, validation and AJAX	Added locally
data/ingredients.json	Added four ingredient records for dynamic rendering	Added locally
robots.txt	Added crawler rules and sitemap declaration	Added locally
sitemap.xml	Added six page URLs (temporary hostname)	Added locally
README.md	Documented features, changes, references, testing and pending work	Updated locally
GitHub	Commit and push Part 3 changes	Pending
Netlify	Publish and confirm public URL	Pending
Forms	Verify real submissions and email notification	Pending


'Added locally' records the intended code changes made during this development session; it does not mean they have already been pushed to GitHub or tested in production.
9. How to Run the Website Locally
1. Open the BeeReady folder in Visual Studio Code.
2. Check that index.html, css/style.css, js/script.js and data/ingredients.json exist.
3. Open index.html using the Live Server extension, not just file://.
4. Visit all six pages using the navigation.
5. Open products.html, search for vitamin, sort A-Z and test the gallery.
6. Open faq.html and test expanding and collapsing questions.
7. On mobile width (390px), test the icon-only navigation.
8. Check empty and invalid inputs on both forms; do not treat a local form attempt as a delivered submission.
9. Open the browser developer console and check for errors.
10. Testing Checklist and Evidence
Test	Expected result	Evidence status
Desktop layout	Header and page content display without overflow	Retest final local files
Tablet and mobile layouts	Navigation and content remain usable	Retest final local files
FAQ	Answers expand and collapse	Retest final local files
Image gallery	Thumbnails, modal, controls and Escape work	Retest final local files
Dynamic JSON	Ingredient data loads over HTTP	Retest with Live Server
Search/sort	Correct filtering and ordering	Retest final local files
Invalid enquiry	Required fields and error messages work	Retest final local files
Invalid contact message	Required fields and error messages work	Retest final local files
Netlify product enquiry	Submission appears in Forms dashboard	Pending deployment
Netlify general contact	Submission appears in Forms dashboard	Pending deployment
Email notification	Verified recipient receives message	Pending configuration
Live SEO files	Sitemap and robots return successfully	Pending deployment
PageSpeed/Lighthouse	Record real measured performance	Pending live test


The Part 2 screenshots in screenshots/ are historical evidence. New Part 3 screenshots and production test records still need to be captured.
11. GitHub, Deployment and Submission
Existing repository: https://github.com/Jaden-Nell/BeeReady-WEDE5020-Part1

After reviewing local changes in the correct Git checkout:
git status
git add .
git commit -m "Part 3: add interactive features, forms and SEO"
git push origin HEAD
These commands are instructions, not evidence that a push has already happened. Do not upload passwords, tokens or private contact data.

Deployment plan:
1. Deploy the static site to Netlify from GitHub or by uploading the website folder.
2. Confirm the six pages and required assets load on the public URL.
3. Enable Forms detection, redeploy if necessary and confirm both forms appear.
4. Configure email notifications using the verified intended recipient address.
5. Submit one test to each form and verify it in the Netlify dashboard.
6. Replace https://YOUR-SITE.netlify.app in all six HTML files, robots.txt and sitemap.xml with the actual HTTPS hostname; redeploy.
7. Test canonical URLs, sitemap URLs, links, console output and performance.
8. Record any real off-page SEO work (such as approved social promotion or backlinks), with URLs/screenshots.
9. Push final commits and submit the GitHub repository and deployed URL to the Learning Management System.
Production URL: [Insert actual deployed Netlify URL]
Date of final deployment: [Add after deployment]
Date of live form tests: [Add after successful tests]
12. References
The following sources informed the project. Accessed 2 November 2026 unless otherwise stated.
1. BeeReady. n.d. BeeReady website. Available at: https://beeready.co.za/ (Part 1 research accessed 21 August 2026).
2. WowBuy. n.d. Bee Ready Immune Booster product listing. Available at: https://wowbuy.co.za/product/bee-ready-immune-booster/ (Part 1 research accessed 21 August 2026).
3. Mozilla Developer Network (MDN). n.d. Fetch API. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
4. Mozilla Developer Network (MDN). n.d. Client-side form validation. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
5. Google Search Central. n.d. Learn about sitemaps. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
6. Google Search Central. n.d. Introduction to robots.txt. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro
7. Netlify Docs. n.d. Forms setup. Available at: https://docs.netlify.com/manage/forms/setup/
8. Netlify Docs. n.d. Form notifications. Available at: https://docs.netlify.com/manage/forms/notifications/
9. GitHub Docs. n.d. Adding a file to a repository. Available at: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
10. xneelo. n.d. Web Hosting. Available at: https://xneelo.co.za/web-hosting/ (Part 1 research accessed 21 August 2026).