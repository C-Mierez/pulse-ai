# Pulse.AI

This is a mock landing website for a fictional company called Pulse.AI. 
The website is a single page application that showcases the company's services, features, and contact information.

The key aspects of this website are:
- [x] Use of a Prismic CMS to handle all content and allow for easy update and creation of components.
- [x] Localization 
- [ ] Use of GSAP for modern animations and transitions.
- [x] Provide semantic HTML and follow accessibility requirements, as well as respect user animation preferences.
- [ ] (Potentially) Use of Tailwind v4 unstable version to try out the new features. 

## Experience using Prismic
The use of Prismic CMS allows for easy content management and creation of new slices, variations or entire pages. We programmatically create the pages and components based on the content fetched from Prismic, which allows content managers who are not necessarily developers to create and update the website without needing to touch the codebase.

Using Prismic with Next.js Server Components reduces the performance implications of a CMS, as all data fetching and rendering is done on the server side. This means that the website has a decently fast initial load time.

One thing to note, however, is that once deployed on Vercel, all the content is fetched from Prismic and cached indefinitely. This is good for the sake of avoiding having to fetch the content every time the website is visited, but it also means that any changes made to the content on Prismic will not be reflected on the website until the cache is invalidated. In order to do this, we have a revalidate route triggers the cache invalidation.

Given that all content is managed by Prismic, the website preserves consistency pretty well. Content that belongs to a different page but can be previewed on another page is easily accessible and thus changes on one page can be reflected on another page without needing to update the codebase.

### Internationalization / Localization
In the attempt of adding localization to the website, I stumbled upon a few hurdles, which prompted me to figure out my own workaround while trying to maintain efficiency and a clean codebase, especially when it comes to avoiding sacrificing Server Component benefits.

Prismic provides a fantastic way to manage the language of all pages / documents from its dashboard, which makes the translation and management of it very easy. Some modifications to the codebase have to be made in order to use this localized content:
- Locales are determined through the use of i18n routes. `prismicio.ts` Routes need to be modified to incorporate a `lang` slug in the URL. In this case, I chose to prefix all routes with the language slug.
- All routes had to be moved inside a new `[lang]` directory, to comply with Next.js app router.
- All "SliceZone" pages had to be modified so they checked what locale was selected. This was done by making sure the new  `lang` 
url parameter was passed when fetching the Prismic document.
- Static site generation had to be updated so it was aware of the existence of multiple locales. It now fetches every single document in every locale and generates the pages accordingly. (Of course, this is only done once and is cached server-side)
  
At this point, and after filling in all the new alternate pages on the Prismic dashboard, the content is fully available in multiple languages. 

Now the only thing that is missing is the ability to switch languages on the website itself, as at this point it can only be done by manually changing the URL. The implementation of such a switch on every particular page is pretty straight-forward, however I wanted to have a global switch on the Header / Footer instead. Unfortunately this was nowhere near as trivial as I  would have thought, since locales are tied to the documents themselves, and the Header / Footer are completely independent to them and to the routes. So I tried a few ideas:
- Given that routes for Prismic pages follow the shape of `/:lang/.../[uid]` I figured I could use the `uid` to fetch the document get its available locales. However, I then found out fetching documents requires specifying a document `type` as well as its `uid`, and there was no way for me to obtain this data from the URL. Given that fetching from Prismic is recommended to be done server-side, I did not have the option to use client-side state management to store the Slice data either, so identifying the current document from the Header / Footer was not possible, at least this way.  
 
- I created a switch that would only fetch available locales from the Homepage document, and thus would always link to the Homepage with its corresponding target locale. Given the precondition that all routes include the i18n slug, I used the middleware to identify changes in the lang from the incoming url vs the next url. When a change was detected, the user would be redirected to the same page they were at but with the new lang slug. So, instead of going to the Homepage with a new language, the would stay on the same page they were at but with the new language. Ex: `referer:/en/features incoming: /es/ redirectTo:/es/features` Hacky? Yes. Ugly? Quite a bit. But it worked. And I would have kept it if it wasn't for the fact that my current Prismic schema allows for translated route paths, so pages in different languages can have differently named routes which breaks this solution.  

In the end, I decided to use Next.js `cache` to create and memoize a server-only Map which the Layout component could store the `lang` value in fetched from the URL slug, and allow for other server components such as Header / Footer to access it later on. (And this also makes things cleaner as it avoids prop drilling to access the value). Now having access to this data, the Header / Footer will correctly show an indicator of the current language and provide a way to switch it. I took the decision to sacrifice same-page language-switching and instead opted to redirect to the Homepage of the target language.

## TODO
- [x] Add responsive layout
- [x] Fix lack of global padding on small screens
- [x] Add localization
- [ ] Add more data to mobile nav menu, like a footer
- [x] Fill the Features page with something
- [x] Add Lenis scroll ♥
- [ ] Add a Back to Top prompt at the bottom of the page
- [x] Add socials to CMS and place them on footer
- [x] Style scrollbar
- [x] Fix menu overflow on mobile
- [ ] Add loader underneath nav

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
- [ ] Bento box 3d mouse follow effect
- [ ] Bento box brighten up glass on enter
- [ ] Showcase section header enter with background light-up inspired by Linear's