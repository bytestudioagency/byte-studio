# Hendzen launch checklist

Last updated 17 November 2026.

What still has to be done by hand before and after the site goes live. Tick items off as you go.

## Fill in before launch

Nine things in the code are still placeholders. All but the last sit in `src/lib/site.ts`, each marked with a `TODO` comment.

- [ ] **Contact email.** `site.email` is `hello@hendzen.com`. Set it to an inbox that exists and that you read. It also appears in the structured data that search engines read.
- [ ] **Cal.com link.** Paste it into `site.bookingUrl`. The "Book a 20-min call" button appears in the contact section once it is set.
- [ ] **Domain.** `site.url` is assumed to be `https://hendzen.com`. It feeds the sitemap, robots file, canonical links, structured data and share previews.
- [ ] **Social profiles.** `site.socials` is empty, so the footer shows none. Add LinkedIn, GitHub or X links. They also go into the structured data (`sameAs`), which helps Google link the profiles to the brand, so add at least LinkedIn.
- [ ] **City (optional).** `site.city` is empty. Set the city you work from, for example "Bengaluru", and it is added to the structured data as your address. This helps with "near me" and city searches. Leave it empty to show only "serves India".
- [ ] **Client logos.** `clients` holds six invented company names (Northpeak, Orbitly and so on). Replace them with real clients or remove the logo strip.
- [ ] **Projects and case studies.** `projects` holds three invented products: Ledgerly, Pulse and Crate. Their `challenge`, `solution` and `results` text on the case study pages is also invented. Replace all of it with real work, and set `href` where a product is live.
- [ ] **Prices.** `pricing` and `estimator` hold placeholder rupee figures. The FAQ answer "How much will my project cost?" quotes a range of 2.5 to 6 lakh, so keep it in step with whatever you set.
- [ ] **Product mockups.** The dashboard, phone and storefront drawings in `src/components/Mocks.tsx` belong to the invented projects. Swap in real screenshots when you swap the projects.

## Legal pages

The privacy policy and terms are a starting template, not legal advice. The text is in `src/lib/legal.ts`.

- [ ] **Registered business name.** `legal.entity` is "Hendzen". Set your registered name, for example "Hendzen Technologies LLP".
- [ ] **Court city.** `legal.courts` is "India". Set the city whose courts handle disputes.
- [ ] **Review.** Have someone qualified read both pages before you rely on them.
- [ ] **Confirm the default terms.** The five terms below were chosen as defaults. Change any that do not match how you work.

| Term | Default |
| --- | --- |
| Invoice due date | 7 days from invoice |
| Ownership | Passes to the client per milestone, when that milestone is paid |
| Retainer cancellation | Takes effect at the end of the month already paid for |
| Liability | Capped at the fees paid for the project |
| Portfolio | You may show the finished work unless the client asks you not to |

The privacy policy also promises to delete enquiries that do not become projects within 12 months, and to answer data requests within 30 days.

## Outside the code

- [ ] **Look at the new pages.** Run `npm run dev` and open `/work/ledgerly`, `/privacy`, `/terms` and a made-up address for the 404. They were checked to build and serve, not for how they look in a browser.
- [ ] **Commit the work.** The repository still has only the initial Create Next App commit.
- [ ] **Domain.** Register the domain if you have not, and point its DNS at your host.
- [ ] **Hosting.** Deploy the site to a host that runs Next.js and connect the domain.
- [ ] **Mailbox.** Create the inbox behind the contact address on your domain, and send it a test email.
- [ ] **Cal.com event.** Create a 20-minute event, since the button says "Book a 20-min call". Add intake questions for what they want to build, budget and timeline. This replaces a contact form.

## After launch

- [ ] **Submit the sitemap.** Add the site to Google Search Console and submit `/sitemap.xml`.
- [ ] **Test the structured data.** Paste the home page and one case study URL into Google's [Rich Results Test](https://search.google.com/test/rich-results) and confirm it reads the studio details, the FAQ and the breadcrumb with no errors.
- [ ] **Keep the sitemap dates current.** When you change the page copy or a case study, update `site.updated` in `src/lib/site.ts`. Legal pages use `legal.updated`.
- [ ] **Check the share preview.** Paste the live link into WhatsApp, LinkedIn or Slack and confirm the preview card shows.
- [ ] **Keep the privacy policy true.** It says the site has no analytics, no cookies and no forms. If you add any of these, update the policy and the date in `legal.updated` first.

## Known gap

An unknown case study address such as `/work/nope` shows the 404 page and is marked noindex, but returns HTTP 200 rather than 404. The setting that would fix it (`dynamicParams`) is not available while `cacheComponents` is enabled in `next.config.ts`. Other unknown URLs return a proper 404.
