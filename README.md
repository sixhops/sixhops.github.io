## Project Setup

```bash
npm install --save-dev webpack webpack-cli ts-loader typescript sass sass-loader css-loader style-loader html-webpack-plugin
```

## Development Journal

The initial steps to create the interactice resume were all done manually by me:

- Sketched out the wireframe in pencil and annotated it with class names.
- Wrote out the markup for the resume by hand.
- Added Sass mixins, utility classes, colors, and fonts.
- Went through and added basic mobile and non-mobile layouts using flex.
- Added initial basic event handlers for elements.
- Used Google's search AI was used to sort out type issues with use of DOM functions.

At this point I heard about the Cursor IDE and installed it to try it out. I used cursor to add a public folder for images and update the webpack.config.js to include it.

After a little more manual work I decided to see what the chat interface could handle. For the first 4 tasks I didn't save my prompts but had the AI write out a summary of its work to this file. After those 4, I had it start adding my prompts to the journal entries.

**AI:** Changed color of cards to indicate current and not-current skills. Added click handler to show a modal when the skill card is clicked. Got cursor to help with the visibility transition.

**AI:** Fixed modal opacity transition by switching from `display: none` to `visibility: hidden`. Created `constants.ts` file with `skillElaborations` object to store skill details. Updated modal to display elaboration text when a skill card is clicked. Added event handler to close modal when clicking anywhere on the page (inside or outside the modal).

**AI:** Updated modal to prevent body scrolling when open while allowing scrolling within `modal-content-body`. Changed modal position from absolute to fixed for better positioning. Added `body.modal-open` class management in JavaScript to toggle `overflow: hidden` on the body element.

**AI:** Enhanced modal header to dynamically display card color classes (green/yellow) and `friendlyName` from `skillElaborations`. Updated `handleModalOpen` to transfer color classes from clicked cards to `modal-content-header` and populate the header's `h3` element with the skill's `friendlyName`.

**Prompt:**

```
Update the handleJobClick handler to select the 'accordionList-accordion-arrow' child and rotate it 180 degrees when the job is opened. Animate the rotation.
```

**AI:** Updated the handler to rotate the arrow 180 degrees when accordions open. Added CSS transition for smooth animation. The arrow now rotates smoothly when accordions open and close.

**Prompt:**

```
Update handleModalOpen to read the data-titleColor attribute on the clicked card instead of the 'green' or 'yellow' classes. Add a condition to handle the 'blue' value in that attribute.
```

**AI:** Refactored `handleModalOpen` to read the `data-titleColor` attribute instead of checking for class names. Added support for "blue" value in addition to green and yellow. The modal header now uses the data attribute value to apply the appropriate color class.

At this point I had most of the basic content and styles in place. I knew I wanted to have user-switchable styles so I created the `_themes.scss` file and moved the existing color styles into it. The AI was employed to solve small issues.

**Prompt:**

```
Add an click handler for the header-themeSwitcher-menuButton element which will add or remove the 'open' class to the header-themeSwitcher-menu element when clicked and rotate the arrow child element 180 degrees with a smooth transition.
```

**AI:** Created `handleThemeSwitcherClick` function to toggle the "open" class on the theme switcher menu. Added CSS transition and rotation styles for the arrow element. The arrow now rotates 180 degrees smoothly when the menu opens/closes, matching the accordion arrow behavior.

**Prompt:**

```
Why is the header-themeSwitcher-menu element still visible when it is not open and the max-height is 0?
```

**AI:** Fixed the menu visibility issue by removing padding when the menu is closed. Changed default padding from `1rem` to `0`, and only apply padding when the menu has the "open" class. Added transitions for both max-height and padding to ensure smooth animations. The menu is now completely hidden when closed.

> **NOTE:** For these changes I (the human) adjusted the padding and widths to make it more visually appealing.

**Prompt:**

```
Add an event handler for the header-themeSwitcher-menu-button elements that will clear all classes on the body element and apply the 'themes-lightMode' or 'themes-darkMode' class to the body depending on which button was clicked.
```

**AI:** Created `handleThemeButtonClick` function that clears all body classes and applies the appropriate theme class based on the button ID. Added event listeners for all theme switcher menu buttons. Clicking "Light Mode" applies `themes-lightMode` and clicking "Dark Mode" applies `themes-darkMode` to the body element.

**Prompt:**

```
Update the handleThemeButtonClick handler to remove the 'open' class from the menu when a theme button is clicked.
```

**AI:** Updated `handleThemeButtonClick` to close the menu after theme selection by removing the "open" class from the menu element. Also resets the arrow rotation by removing the "open" class from the arrow element. This provides better UX by automatically closing the menu after a theme is selected.

**Prompt:**

```
Update/add handlers to remove the 'open' class of the theme menu if a click happens anywhere outside of the menu.
```

**AI:** Created `handleThemeMenuClose` function that closes the theme menu when clicking outside the theme switcher area. Added `event.stopPropagation()` to `handleThemeSwitcherClick` and `handleThemeButtonClick` to prevent clicks on menu elements from closing the menu. Added `handleThemeMenuClose` to the document click listener to detect outside clicks and close the menu with arrow rotation reset.

At this point I noticed that the AI was performing the same element selections multiple times throughout the click handlers. I decided to ask it to clean up a bit.

**Prompt:**

```
Refactor the index.ts file to eliminate multiple selections of the same element, where possible. Element variables should be declared at the top of the file if they can be moved out of their local scopes and selected only once, then the variables should be used in the handlers.
```

**AI:** Refactored `index.ts` to eliminate duplicate element selections. Added module-level variables for modal elements (`modal`, `modalContentHeader`, `modalContentBody`) and theme switcher elements (`themeSwitcherMenu`, `themeSwitcherMenuButton`, `themeSwitcher`). All elements are now selected once in the `DOMContentLoaded` handler and reused throughout all event handlers, improving performance and code maintainability.

With the resume page mostly complete, I wanted to see how it would do making a page including making all of the decisions about style and content. I gave it this prompt:

```
Rewrite the index.html page. It must contain a section talking about me with a link to my resume page, and a section for my portfolio that is similar to what is on the resume page. The purpose of this site is to find a job. The syling and content is up to you. Please make it look tasteful and modern. The existing link paths are correct. The script link to the bundle.js will include all scripts and styles that you need on the page. Any new scripts should go in the scripts directory. Any new styles should go in the style directory.
```

**Summary:**

Created a new `index.html` page with:

1. Header — Navigation to the resume page and theme switcher (light/dark mode)
2. About Me section — Hero-style section with:
   - Photo
   - Name and role
   - Professional description
   - "View My Resume" button linking to the resume page
3. Portfolio section — Same structure as the resume page, showing:
   - Lost Ark
   - New World
   - Throne & Liberty
   - Clickable cards that open modals with project details
4. Modal — For displaying portfolio item details when clicked
5. Styling — Added homepage-specific styles in `_homePage.scss` for the CTA button with hover effects

The page uses the existing styling system and works with the existing `bundle.js` script for modals and theme switching. The design is consistent with the resume page and suitable for a job search portfolio site.

You can see the results here: <a href="https://sixhops.github.io/homepage_1.html" target="_blank">homepage_1.html</a>

It ended up almost completely duplicating the content and styles from the resume page, which I did not want. I had it save this attempt as homepage_1 for comparison and then asked it to revise the page with this prompt:

```
Rename the index.html to homepage_1.html. Rename the _homePage.scss to homePage1.scss. Create a new file "homepage_2.html". In this iteration, do not use existing styles or layout from the resume. Do not include any event handlers or scripts from the resume page. Use new, unique styles for this page only.
```

**Summary:**

1. Renamed `index.html` → `homepage_1.html`
2. Renamed `_homePage.scss` → `homePage1.scss`
3. Updated `main.scss` to import `homePage1` instead of `homePage`
4. Created `homepage_2.html` with a new design:
   - Gradient background (purple/blue)
   - Card-based layout
   - Circular profile image with border
   - Grid-based portfolio section
   - No scripts or event handlers from the resume page
5. Created `homePage2.scss` with unique styles:
   - No dependencies on resume styles
   - Modern gradient design
   - Responsive grid layout
   - Hover effects and transitions
6. Created `homepage2.ts` entry point that only imports `homePage2.scss` (no scripts)
7. Updated `webpack.config.js` to handle multiple entry points and set `inject: false` to prevent duplicate script tags

The `homepage_2.html` page is independent with its own styling and no scripts or event handlers from the resume page. The design uses a gradient background, card-based sections, and a responsive grid for the portfolio items.

You can see the results here: <a href="https://sixhops.github.io/homepage_2.html" target="_blank">homepage_2.html</a>

This seemed like a decent stab so I had it save a copy as `index.html` so that I could revise it by hand.

**Prompt:**

```
Make a copy of homepage_2 saved as index.html. Make a copy of homePage2.scss saved as homePage_final.scss. Update the class names in these new files to use a prefix of "hpf" instead of "hp2" so that the classes are independent from the ones in homepage_2 and homePage2.
```

**Summary:**

1. Created `index.html` — copy of `homepage_2.html` with all class names changed from `hp2` to `hpf`
2. Created `homePage_final.scss` — copy of `homePage2.scss` with all class names changed from `hp2` to `hpf`
3. Created `homepage_final.ts` — script entry point that imports `homePage_final.scss`
4. Updated `webpack.config.js` — added the new entry point and HTML template

All classes now use the `hpf` prefix (e.g., `hpf-container`, `hpf-nav`, `hpf-about`, etc.), making them independent from the `hp2` classes in `homepage_2.html` and `homePage2.scss`. The files are ready to use.
