# Pulse.AI

This is a mock landing website for a fictional company called Pulse.AI. 
The website is a single page application that showcases the company's services, features, and contact information.

The key aspects of this website are:
- Use of a Prismic CMS to handle all content and allow for easy update and creation of components.
- Localization 
- Use of GSAP for modern animations and transitions.
- Provide semantic HTML and follow accessibility requirements, as well as respect user preferences.
- (Potentially) Use of Tailwind v4 unstable version to try out the new features. 

## Experience using Prismic
The use of Prismic CMS allows for easy content management and creation of new slices, variations or entire pages. We programmatically create the pages and components based on the content fetched from Prismic, which allows content managers who are not necessarily developers to create and update the website without needing to touch the codebase.

Using Prismic with Next.js Server Components reduces the performance implications of a CMS, as all data fetching and rendering is done on the server side. This means that the website has a decently fast initial load time.

One thing to note, however, is that once deployed on Vercel, all the content is fetched from Prismic and cached indefinitely. This is good for the sake of avoiding having to fetch the content every time the website is visited, but it also means that any changes made to the content on Prismic will not be reflected on the website until the cache is invalidated. In order to do this, we have a revalidate route triggers the cache invalidation.

Given that all content is managed by Prismic, the website preserves consistency pretty well. Content that belongs to a different page but can be previewed on another page is easily accessible and thus changes on one page can be reflected on another page without needing to update the codebase.

### Internationalization / Localization
In the attempt of adding localization to the website, I stumbled upon a few hurdles, which prompted me to figure out my own workaround while trying to maintain efficiency and standards in the codebase, especially when it comes to avoiding sacrificing Server Component benefits.

Prismic provides a fantastic way to manage the language of all pages / documents from its dashboard, which makes the translation and management of it very easy. Modifications to the codebase had to be made in order to use this content:
- Locales is determined through the use of i18n routes. Routes need to be modified to incorporate a `lang` slug in the URL. In this case, I chose to prefix all routes with the language slug.
- All "SliceZone" pages had to be modified so they checked what locale was selected. This was done by making sure a new  `lang` 
parameter was passed when fetching the Prismic document.
- Static site generation had to be updated so it was aware of the existence of multiple locales. It now fetches every single document in every locale and generates the pages accordingly. (Of course, this is only done once and is cached server-side)
- All routes had to be moved inside a new `[lang]` directory, to comply with Next.js app router.
  
At this point, the website is fully functional in multiple languages. The only thing that is missing is the ability to switch languages on the website itself, as currently it can only be done by manually changing the URL. The implementation of such a switch was quite straight-forward, though to ensure consistency, I made sure fetch alternative content

In order to implement global language switching on components such as the Footer or Header (which are not tied to any specific document), and to preserve them as Server Components, I decided to use Next.js `cache` to create and memoize a server-only storage which the Layout component could store the lang value in, and allow for others to access it later on, as a clear way to avoid prop drilling. With this data, these components have more information about what language is currently being used and thus can make requests to Prismic with the correct locale.

## TODO
- [x] Add responsive layout
- [x] Fix lack of global padding on small screens
- [x] Add localization
- [ ] Add more data to mobile nav menu, like a footer
- [ ] Fill the Features page with something
- [x] Add Lenis scroll ♥
- [ ] Add a Back to Top prompt at the bottom of the page
- [x] Add socials to CMS and place them on footer

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
- [x] Add magnetic buttons to socials
- [ ] Add border illumination on bento boxes based on mouse position
- [ ] Animate nav menu
- [ ] Add parallax to floating assets like images