# Byte Studio launch checklist

Last updated 21 November 2026.

What still has to be done by hand before and after the site goes live. Tick items off as you go.

## Filled in from the old Byte Studio site

Brand, domain (`https://www.bytestudio.website`), booking link, X and LinkedIn profiles, client logos, the six case studies with screenshots, services, process, pricing and FAQ now come from the old Byte Studio site. The price estimator was removed. Case studies keep the old addresses, `/portfolio/<slug>`, so existing links still work.

## Fill in before launch

- [x] **Contact email.** `site.email` is `bytestudioagency@gmail.com`. It appears in the contact section, menu, footer, legal pages and structured data. Set it to an empty string to hide it everywhere.
- [ ] **City (optional).** `site.city` is empty. Set the city you work from and it is added to the structured data as your address.
- [ ] **Live links.** Set `href` on any project in `projects` that is live, and a "Live product" link appears on its card.
- [ ] **Case study numbers.** Each project's `results` row uses facts taken from the old case study text (for example "5 min" hold expiry). Swap in real outcome numbers if you have them.
- [x] **Share image.** `src/app/opengraph-image.jpg` is a 1200x630 screenshot of the new hero. Retake it if the hero changes.

## Legal pages

The privacy policy and terms are a starting template, not legal advice. The text is in `src/lib/legal.ts`.

- [ ] **Registered business name.** `legal.entity` is "Byte Studio". Set your registered name if it differs.
- [ ] **Court city.** `legal.courts` is "India". Set the city whose courts handle disputes.
- [ ] **Review.** Have someone qualified read both pages before you rely on them.
- [ ] **Confirm the default terms.** The terms below were chosen as defaults. Change any that do not match how you work.

| Term | Default |
| --- | --- |
| Invoice due date | 7 days from invoice (UPI or bank transfer) |
| Post-launch support | 15 days of bug fixes and small tweaks |
| Ownership | Passes to the client as the agreed payments are made |
| Liability | Capped at the fees paid for the project |
| Portfolio | You may show the finished work unless the client asks you not to |

The privacy policy also promises to delete enquiries that do not become projects within 12 months, and to answer data requests within 30 days.

## Outside the code

- [ ] **Look at the new pages.** Run `npm run dev` and open `/portfolio/apna-store`, `/privacy`, `/terms` and a made-up address for the 404. They were checked to build and serve, not for how they look in a browser.
- [ ] **Domain.** Register the domain if you have not, and point its DNS at your host.
- [ ] **Hosting.** Deploy the site to a host that runs Next.js and connect the domain.
- [ ] **Booking page.** Check that the meeting link asks for what they want to build, budget and timeline. It replaces a contact form.

## After launch

- [ ] **Submit the sitemap.** Add the site to Google Search Console and submit `/sitemap.xml`.
- [ ] **Test the structured data.** Paste the home page and one case study URL into Google's [Rich Results Test](https://search.google.com/test/rich-results) and confirm it reads the studio details, the FAQ and the breadcrumb with no errors.
- [ ] **Keep the sitemap dates current.** When you change the page copy or a case study, update `site.updated` in `src/lib/site.ts`. Legal pages use `legal.updated`.
- [ ] **Check the share preview.** Paste the live link into WhatsApp, LinkedIn or Slack and confirm the preview card shows.
- [ ] **Keep the privacy policy true.** It says the site has no analytics, no cookies and no forms. If you add any of these, update the policy and the date in `legal.updated` first.

## Known gap

An unknown case study address such as `/portfolio/nope` shows the 404 page and is marked noindex, but returns HTTP 200 rather than 404. The setting that would fix it (`dynamicParams`) is not available while `cacheComponents` is enabled in `next.config.ts`. Other unknown URLs return a proper 404.
