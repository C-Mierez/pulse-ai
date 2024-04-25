# Pulse.AI

This is a mock landing website for a fictional company called Pulse.AI. 
The website is a single page application that showcases the company's services, features, and contact information.

The key aspects of this website are:
- Use of a Prismic CMS to handle all content and allow for easy update and creation of components.
- Localization 
- Use of GSAP for modern animations and transitions.
- (Potentially) Use of Tailwind v4 unstable version to try out the new features. 

### Experience using Prismic
The use of Prismic CMS allows for easy content management and creation of new slices, variations or entire pages. We programmatically create the pages and components based on the content fetched from Prismic, which allows content managers who are not necessarily developers to create and update the website without needing to touch the codebase.

Using Prismic with Next.js Server Components reduces the performance implications of a CMS, as all data fetching and rendering is done on the server side. This means that the website has a decently fast initial load time.

Given that all content is managed by Prismic, the website preserves consistency pretty well. Content that belongs to a different page but can be previewed on another page is easily accessible and thus changes on one page can be reflected on another page without needing to update the codebase.



### TODO Animations
- [ ] Website loader
- [ ] Page transition
- [ ] Hero section heading animation
- [ ] Bento boxes enter animation from different sides
- [ ] Shine effect on gradient text
- [ ] Showcase cards image enter animation
- [ ] Showcase cards hover effect on image (zoom in and color)
- [ ] Showcase icon spin animation
- [ ] Showcase heading enter animation from behind first card
- [ ] Case Study image hover zoom in
- [ ] Case Study image enter animation
- [ ] Add magnetic buttons to socials
- [ ] Add border illumination on bento boxes based on mouse position