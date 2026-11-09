import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// ==========================================================================
//  1. DATA
//  All projects with FULL details. Edit a project here. Cards on Home / Projects pages use a short copy of the basics.
// ==========================================================================

const SITE = { phone: '+91 98663 84827', tel: '+919866384827' };

const statuses = [
  { key: 'upcoming', label: 'Upcoming', long: 'Upcoming projects', blurb: 'Pre-launch projects open for early registration.', empty: 'No upcoming projects to show yet.' },
  { key: 'ongoing', label: 'Ongoing', long: 'Ongoing projects', blurb: 'Under construction or now selling. Ask for the latest site update.', empty: 'No ongoing projects right now.' },
  { key: 'completed', label: 'Completed', long: 'Completed projects', blurb: 'Ready to move in and handed-over communities.', empty: 'No completed projects to show yet.' },
];

// ---------------------------------------------------------------------------
//  PROJECTS: 3 per tab (upcoming / ongoing / completed). Edit freely.
//
//  Projects marked sample:true contain illustrative content; replace names,
//  numbers, specs, distances, RERA numbers and photos before going live.
//
//  To move a project between tabs change its `status`.
//  Photos: use '/images/your-file.jpg' (put the file in public/images) or an Unsplash URL.
// ---------------------------------------------------------------------------

const E = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

// Unsplash photo ids used for the sample projects
const P = {
  villa1: 'photo-1613490493576-7fde63acd811', villa2: 'photo-1512917774080-9991f1c4c750',
  house1: 'photo-1600596542815-ffad4c1539a9', house2: 'photo-1600585154340-be6161a56a0c',
  house3: 'photo-1560518883-ce09059eeffa', house4: 'photo-1568605114967-8130f3a36994',
  house5: 'photo-1523217582562-09d0def993a6', house6: 'photo-1564013799919-ab600027ffc6',
  apt1: 'photo-1460317442991-0ec209397118', apt2: 'photo-1545324418-cc1a3fa10c00',
  towers: 'photo-1486406146926-c627a92ad1ab', lake: 'photo-1480074568708-e7b720bb3f09',
  field: 'photo-1500382017468-9049fed747ef', kitchen1: 'photo-1556911220-bff31c812dba',
  kitchen2: 'photo-1556909114-f6e7ad7d3136', interior: 'photo-1600607687939-ce8a6c25118c',
  living: 'photo-1502672260266-1c1ef2d93688', bedroom: 'photo-1522708323590-d24dbb6b0267',
  pool: 'photo-1571508601891-ca5e7a713859',
};
const gal = (...ids) => ids.map((id) => E(P[id]));

// ----- shared: how HomeConnectz works with every buyer -----
const howWeWork = [
  { icon: 'search', title: 'Tell us what you need', text: 'Share your budget, preferred area and timeline in a short call. No forms, no pressure.' },
  { icon: 'sparkle', title: 'We shortlist for you', text: 'We match you with verified projects and share honest pros and cons, not just brochures.' },
  { icon: 'pin', title: 'Guided site visit', text: 'We arrange the visit on a day that suits you and walk the project with you.' },
  { icon: 'bank', title: 'Loan support', text: 'We help you compare banks and prepare paperwork so the purchase fits your budget.' },
  { icon: 'file', title: 'Book and register', text: 'We coordinate the booking, agreement and registration with the developer, step by step.' },
  { icon: 'key', title: 'Handover and beyond', text: 'We stay in touch through possession, so you are never chasing anyone alone.' },
];

// ----- floor-plan helpers (schematic room lists: [name, relative area]) -----
const aptRooms = (beds, study) => {
  const r = [['Living', 3], ['Dining', 2], ['Kitchen', 1.7], ['Utility', 0.6], ['Master bedroom', 3], ['Bedroom 2', 2.4]];
  if (beds >= 3) r.push(['Bedroom 3', 2.4]);
  if (beds >= 4) r.push(['Bedroom 4', 2.2]);
  if (study) r.push(['Study', 1.3]);
  r.push(['Toilet', 0.8], ['Toilet', 0.8], ['Balcony', 1.2]);
  return r;
};
const villaFloors = (storeys, theatre) => {
  const f = [{ name: 'Ground floor', rooms: [['Drawing room', 3], ['Living', 3], ['Dining', 2.4], ['Kitchen', 2], ["Maid's room", 1.4], ['Toilet', 0.8], ['Lift', 0.6], ['Parking', 3]] },
    { name: 'First floor', rooms: [['Master bedroom', 3.4], ['Bedroom 2', 2.8], ['Family lounge', 3], ['Toilet', 0.9], ['Toilet', 0.9], ['Lift', 0.6], ['Balcony', 1.4]] }];
  if (storeys >= 3) f.push({ name: 'Second floor', rooms: [['Bedroom 3', 3], ['Bedroom 4', 3], [theatre ? 'Home theatre' : 'Media room', 3], ['Toilet', 0.9], ['Lift', 0.6], ['Terrace garden', 3.4], ['Outdoor bar', 1.4]] });
  else f.push({ name: 'Terrace', rooms: [['Terrace garden', 5], ['Open deck', 2.5], ['Lift lobby', 0.8]] });
  return f;
};

// ----- shared spec sets (customise per project with spec()) -----
const spec = (base, over = {}) => base.map((g) => (over[g.title] ? { ...g, items: over[g.title] } : g));
const APT_SPECS = [
  { title: 'Structure', items: ['RCC framed, earthquake-resistant structure', 'Solid concrete block masonry walls', 'Podium and basement parking with ramp access'] },
  { title: 'Flooring', items: ['Large-format vitrified tiles in living and bedrooms', 'Anti-skid ceramic tiles in bathrooms and balconies', 'Granite on common staircases'] },
  { title: 'Doors and windows', items: ['Engineered-wood main door with premium hardware', 'Flush internal doors with laminate finish', 'UPVC sliding windows with mosquito mesh'] },
  { title: 'Kitchen', items: ['Granite platform with stainless steel sink', 'Glazed tile dado up to 2 ft above the platform', 'Provision for chimney, hob and water purifier'] },
  { title: 'Bathrooms', items: ['Designer wall tiles up to door height', 'Branded CP fittings and sanitaryware', 'Concealed plumbing with hot and cold provision'] },
  { title: 'Electrical and services', items: ['Concealed copper wiring with modular switches', 'AC provision in bedrooms and living room', 'Intercom, CCTV and 24/7 security', 'Power backup for lifts and common areas'] },
];
const VILLA_SPECS = [
  { title: 'Structure', items: ['RCC framed structure designed for the full height of the villa', 'Solid block masonry with weather-proof external finish', 'Lift provision within the villa'] },
  { title: 'Flooring', items: ['Marble-finish vitrified tiles in living areas', 'Wood-finish tiles in bedrooms', 'Anti-skid tiles in bathrooms, terrace and outdoor spaces'] },
  { title: 'Doors and windows', items: ['Engineered teak main door with digital-lock provision', 'Flush internal doors with premium laminate', 'UPVC windows with toughened glass'] },
  { title: 'Kitchen', items: ['Granite counters with stainless steel sink', 'Provision for modular kitchen, chimney and hob', 'Separate utility and wash area'] },
  { title: 'Bathrooms', items: ['Premium sanitaryware and CP fittings', 'Wall tiles up to ceiling in master bath', 'Provision for geyser and rain shower'] },
  { title: 'Electrical and smart living', items: ['Concealed copper wiring with modular switches', 'Smart-home and EV-charging provision', 'Solar water-heater provision on terrace'] },
  { title: 'Outdoors', items: ['Landscaped front garden', 'Private terrace with outdoor seating provision', 'Compound wall with decorative gate'] },
];
const PLOT_SPECS = [
  { title: 'Layout and roads', items: ['Black-top internal roads with kerbs and drains', 'Wide roads with avenue plantation', 'Plots laid out for East, West, North and South facings'] },
  { title: 'Water and drainage', items: ['Underground drainage network', 'Water supply lines to every plot', 'Rainwater harvesting in common areas'] },
  { title: 'Power and lighting', items: ['Underground power cabling', 'Street lights on all internal roads', 'Solar lighting in park and entrance'] },
  { title: 'Green and open spaces', items: ['Landscaped park and play lawn', 'Avenue trees along internal roads', 'Open seating and walking areas'] },
  { title: 'Entrance and security', items: ['Gated entrance with security room', 'Compound fencing around the layout', 'CCTV at the entrance'] },
  { title: 'Approvals and title', items: ['Layout approval details available on request', 'Clear title documents shared before booking', 'Please verify on the TG-RERA portal before payment'] },
];

const APT_AMENITIES = [
  { title: 'Clubhouse', items: ['Swimming pool', 'Gymnasium', 'Co-working lounge', 'Indoor games', 'Party hall', 'Cafeteria'] },
  { title: 'Sports and outdoors', items: ['Jogging track', 'Kids’ play area', 'Badminton court', 'Landscaped podium garden', 'Yoga deck', 'Pet park'] },
  { title: 'Safety and sustainability', items: ['24/7 security and CCTV', 'Power backup for common areas', 'Rainwater harvesting', 'Covered parking with EV charging', 'Sewage treatment plant', 'High-speed lifts'] },
];
const VILLA_AMENITIES = [
  { title: 'Clubhouse', items: ['Swimming pool', 'Gymnasium', 'Multipurpose hall', 'Indoor games', 'Guest rooms', 'Cafeteria'] },
  { title: 'Sports and outdoors', items: ['Jogging and walking track', 'Kids’ play area', 'Badminton court', 'Cricket nets', 'Landscaped gardens', 'Amphitheatre'] },
  { title: 'Safety and sustainability', items: ['Gated entrance with security room', '24/7 security and CCTV', 'Sewage treatment plant', 'Rainwater harvesting', 'Solar street lighting', 'EV charging in common areas'] },
];

const faqsFor = (name, extra = []) => [
  ...extra,
  ['Is brokerage really zero?', 'Yes. You pay HomeConnectz nothing and buy at the developer’s price. We are compensated by the developer.'],
  [`Can I visit ${name} before deciding?`, 'Of course. Book a site visit and we will arrange it on a day that suits you and walk the project with you.'],
  ['Do you help with home loans?', 'Yes. We help you compare banks and prepare your documents so the purchase fits your budget.'],
  ['How do I verify approvals?', 'Ask us for the TG-RERA number and approval documents, then check them yourself on the TG-RERA portal before making any payment.'],
];

const LOCALITY_NOTE = 'Distances and travel times are approximate and indicative. Please confirm at your site visit.';

const projects = [
  // =====================================================================
  //  UPCOMING
  // =====================================================================
  { slug: 'ortus', sample: true, status: 'upcoming', tag: 'Coming soon', name: 'Ortus',
    meta: ['Narsingi, West Hyderabad', '3 BHK boutique residences', '1,720–2,150 sq ft'],
    summary: 'Low-rise boutique residences with large balconies and private sky gardens. Details are under verification; register for first access.',
    price: 'Price at launch', priceNote: 'Builder price, zero brokerage', img: E(P.apt2, 1000),
    note: 'Details under verification. The RERA number will be published before launch.',
    detail: {
      tagline: 'Boutique low-rise residences · Narsingi, West Hyderabad',
      hero: E(P.apt2, 2000), rera: 'To be published before launch', kind: 'apartments',
      location: { area: 'Narsingi', city: 'West Hyderabad, Telangana', address: 'Narsingi, Hyderabad, Telangana', mapQuery: 'Narsingi, Hyderabad', note: 'Exact address shared at launch.' },
      essentials: [['Status', 'Coming soon — registrations open'], ['Type', '3 BHK boutique residences'], ['Location', 'Narsingi, West Hyderabad'], ['Size range', '1,720 – 2,150 sq ft'], ['Configuration', 'Stilt + 5 floors, low-rise'], ['Possession', 'Timeline shared at launch'], ['Price', 'Shared at launch'], ['TG-RERA', 'To be published before launch'], ['Developer', 'Verified developer partner']],
      highlights: ['Only a handful of homes per floor', 'Private sky garden on select homes', 'Large balconies with open views', 'Vaastu-friendly layouts', 'Close to the Financial District', 'Home loan support available'],
      masterPlan: { caption: 'Schematic master plan, not to scale. The final plan is released by the developer at launch.' },
      gallery: gal('apt2', 'apt1', 'living', 'kitchen1', 'bedroom', 'pool'),
      units: [
        { id: 'a', name: 'Type A', facing: 'East', beds: '3 BHK', area: '1,720 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3) }] },
        { id: 'b', name: 'Type B', facing: 'West', beds: '3 BHK + Study', area: '1,950 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3, true) }] },
        { id: 'c', name: 'Type C', facing: 'North', beds: '3 BHK Premium', area: '2,150 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3, true) }] },
      ],
      specs: spec(APT_SPECS, { Structure: ['RCC framed structure, stilt plus 5 floors', 'Solid block masonry walls', 'Stilt parking with visitor spaces'] }),
      amenities: APT_AMENITIES,
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Financial District', '10 min'], ['Gachibowli', '15 min'], ['HITEC City', '25 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['International and CBSE schools nearby', '10–15 min'], ['Colleges in Gachibowli belt', '15–20 min'], ['Libraries and learning centres', '15 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Multi-speciality hospitals in Gachibowli', '15–20 min'], ['Pharmacies and clinics', '5 min'], ['Emergency care', '15 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Outer Ring Road (ORR)', '8 min'], ['Rajiv Gandhi International Airport', '30 min'], ['Malls and restaurants in Kokapet', '12 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Ortus', [['When will Ortus launch?', 'The launch date and RERA number will be published once the developer confirms them. Register now and we will tell you first.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  { slug: 'aurelia-skyline', sample: true, status: 'upcoming', tag: 'Pre-launch', name: 'Aurelia Skyline',
    meta: ['Kokapet, West Hyderabad', '3 & 4 BHK apartments', '1,650–2,400 sq ft'],
    summary: 'High-rise residences with a sky deck, clubhouse and generous balconies. Register now for early access to launch details.',
    price: 'Price on request', priceNote: 'Builder price, zero brokerage', img: E(P.apt1, 1000),
    detail: {
      tagline: 'Premium high-rise apartments · Kokapet, West Hyderabad',
      hero: E(P.towers, 2000), rera: 'To be published before launch', kind: 'apartments',
      location: { area: 'Kokapet', city: 'West Hyderabad, Telangana', address: 'Kokapet, Hyderabad, Telangana', mapQuery: 'Kokapet, Hyderabad', note: 'Exact address shared at launch.' },
      essentials: [['Status', 'Pre-launch — registrations open'], ['Type', '3 & 4 BHK apartments'], ['Location', 'Kokapet, West Hyderabad'], ['Size range', '1,650 – 2,400 sq ft'], ['Configuration', '2 towers, high-rise'], ['Possession', 'Timeline shared by the developer'], ['Price', 'On request — shared at launch'], ['TG-RERA', 'To be published before launch'], ['Developer', 'Verified developer partner']],
      highlights: ['Sky deck and rooftop lounge', 'Large balconies with open views', 'Vaastu-friendly layouts', 'Podium-level clubhouse and pool', 'Covered parking with EV charging', 'Landscaped podium gardens'],
      masterPlan: { caption: 'Schematic master plan, not to scale. The final plan is released by the developer.' },
      gallery: gal('apt1', 'towers', 'living', 'kitchen2', 'bedroom', 'pool'),
      units: [
        { id: 'a', name: 'Type A', facing: 'East', beds: '3 BHK', area: '1,650 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3) }] },
        { id: 'b', name: 'Type B', facing: 'West', beds: '3 BHK + Study', area: '2,050 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3, true) }] },
        { id: 'c', name: 'Type C', facing: 'North', beds: '4 BHK', area: '2,400 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(4, true) }] },
      ],
      specs: spec(APT_SPECS, { Structure: ['RCC shear-wall structure for high-rise safety', 'Solid concrete block masonry walls', 'Two basement levels of parking'] }),
      amenities: [{ title: 'Clubhouse and sky', items: ['Sky deck and rooftop lounge', 'Swimming pool', 'Gymnasium', 'Co-working lounge', 'Indoor games', 'Party hall'] }, ...APT_AMENITIES.slice(1)],
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Financial District', '8 min'], ['Gachibowli', '15 min'], ['HITEC City', '20 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['International schools nearby', '10 min'], ['Colleges in Gachibowli belt', '15 min'], ['Coaching and learning centres', '15 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Multi-speciality hospitals in Gachibowli', '15 min'], ['Clinics and pharmacies', '5 min'], ['Emergency care', '15 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Outer Ring Road (ORR)', '5 min'], ['Rajiv Gandhi International Airport', '30 min'], ['Malls, cafes and restaurants', '10 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Aurelia Skyline', [['When will launch details be shared?', 'Register your interest and we will share pricing, floor plans and the RERA number the moment the developer releases them.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  { slug: 'verdant-courtyard-villas', sample: true, status: 'upcoming', tag: 'Pre-launch', name: 'Verdant Courtyard Villas',
    meta: ['Kompally, North Hyderabad', '4 BHK courtyard villas', '3,200–3,900 sq ft'],
    summary: 'Gated villas built around private courtyards, with a clubhouse, wide internal roads and plenty of greenery.',
    price: 'Price on request', priceNote: 'Builder price, zero brokerage', img: E(P.house2, 1000),
    detail: {
      tagline: 'Courtyard villas in a green gated community · Kompally, North Hyderabad',
      hero: E(P.villa2, 2000), rera: 'To be published before launch', kind: 'villas',
      location: { area: 'Kompally', city: 'North Hyderabad, Telangana', address: 'Kompally, Hyderabad, Telangana', mapQuery: 'Kompally, Hyderabad', note: 'Exact address shared at launch.' },
      essentials: [['Status', 'Pre-launch — registrations open'], ['Type', '4 BHK courtyard villas'], ['Location', 'Kompally, North Hyderabad'], ['Built-up area', '3,200 – 3,900 sq ft'], ['Configuration', 'G+2 with private courtyard'], ['Facing', 'East and West'], ['Possession', 'Timeline shared by the developer'], ['Price', 'On request — shared at launch'], ['TG-RERA', 'To be published before launch']],
      highlights: ['Private courtyard in every villa', 'Home theatre and terrace garden options', 'Wide internal roads and avenue trees', 'Clubhouse with pool and gym', 'East and West facing choices', 'Gated entrance with security room'],
      masterPlan: { caption: 'Schematic master plan, not to scale. The final plan is released by the developer.' },
      gallery: gal('villa2', 'house2', 'interior', 'kitchen1', 'bedroom', 'pool'),
      units: [
        { id: 'e', name: 'Courtyard I', facing: 'East', beds: '4 BHK', area: '3,200 sq ft', floors: villaFloors(3, false) },
        { id: 'w', name: 'Courtyard II', facing: 'West', beds: '4 BHK', area: '3,500 sq ft', floors: villaFloors(3, true) },
        { id: 'p', name: 'Courtyard Premium', facing: 'East', beds: '4 BHK + Theatre', area: '3,900 sq ft', floors: villaFloors(3, true) },
      ],
      specs: VILLA_SPECS,
      amenities: VILLA_AMENITIES,
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Secunderabad business district', '25 min'], ['Industrial and IT parks in the north corridor', '20 min'], ['Hitech City', '50 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['CBSE and international schools nearby', '8 min'], ['Engineering and management colleges', '15 min'], ['Coaching centres', '12 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Multi-speciality hospitals in Kompally', '10 min'], ['Clinics and pharmacies', '5 min'], ['Emergency care', '12 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Outer Ring Road (ORR)', '10 min'], ['Rajiv Gandhi International Airport', '45 min'], ['Malls and restaurants', '12 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Verdant Courtyard Villas', [['What is special about the courtyard?', 'Every villa is planned around a private open courtyard that brings light, air and greenery into the heart of the home.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  // =====================================================================
  //  ONGOING
  // =====================================================================
  { slug: 'lakeside-residences', sample: true, status: 'ongoing', tag: 'Under construction', name: 'Lakeside Residences',
    meta: ['Himayat Sagar Road, South Hyderabad', '2 & 3 BHK apartments', '1,150–1,750 sq ft'],
    summary: 'Lake-facing apartments with a landscaped podium, co-working lounge and kids’ zone. Ask us for the latest site update.',
    price: 'Price on request', priceNote: 'Builder price, zero brokerage', img: E(P.lake, 1000),
    detail: {
      tagline: 'Lake-facing apartments · Himayat Sagar Road, South Hyderabad',
      hero: E(P.lake, 2000), rera: 'Available on request', kind: 'apartments',
      location: { area: 'Himayat Sagar Road', city: 'South Hyderabad, Telangana', address: 'Himayat Sagar Road, Hyderabad, Telangana', mapQuery: 'Himayat Sagar, Hyderabad', note: 'Site address shared when you book a visit.' },
      essentials: [['Status', 'Under construction'], ['Type', '2 & 3 BHK apartments'], ['Location', 'Himayat Sagar Road, South Hyderabad'], ['Size range', '1,150 – 1,750 sq ft'], ['Configuration', 'Stilt + 12 floors'], ['Possession', 'Latest timeline on request'], ['Price', 'On request'], ['TG-RERA', 'Available on request — verify on the TG-RERA portal'], ['Developer', 'Verified developer partner']],
      highlights: ['Lake-facing homes and balconies', 'Landscaped podium with seating decks', 'Co-working lounge for remote workers', 'Kids’ zone and indoor games', 'Efficient layouts with little wasted space', 'Home loan support available'],
      masterPlan: { caption: 'Schematic master plan, not to scale. Refer to the developer’s approved plan.' },
      gallery: gal('lake', 'apt1', 'living', 'kitchen2', 'bedroom', 'pool'),
      units: [
        { id: 'a', name: '2 BHK', facing: 'East', beds: '2 BHK', area: '1,150 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(2) }] },
        { id: 'b', name: '3 BHK', facing: 'West', beds: '3 BHK', area: '1,450 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3) }] },
        { id: 'c', name: '3 BHK Large', facing: 'Lake view', beds: '3 BHK + Study', area: '1,750 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3, true) }] },
      ],
      specs: spec(APT_SPECS, { Structure: ['RCC framed structure, stilt plus 12 floors', 'Solid concrete block masonry walls', 'Stilt and podium parking'] }),
      amenities: APT_AMENITIES,
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Financial District', '25 min'], ['Gachibowli', '30 min'], ['Rajendranagar', '10 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['Schools in Rajendranagar', '10 min'], ['Agricultural and veterinary universities', '15 min'], ['Coaching centres', '15 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Hospitals in Rajendranagar', '12 min'], ['Clinics and pharmacies', '5 min'], ['Multi-speciality care in Gachibowli', '30 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Outer Ring Road (ORR)', '8 min'], ['Himayat Sagar lake front', '3 min'], ['Rajiv Gandhi International Airport', '25 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Lakeside Residences', [['What is the construction status?', 'Ask us for the latest site update and photographs. We share progress as supplied by the developer.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  { slug: 'palm-grove-plots', sample: true, status: 'ongoing', tag: 'Now selling', name: 'Palm Grove Plots',
    meta: ['Ghatkesar, East Hyderabad', 'Gated open plots', '200–400 sq yds'],
    summary: 'Gated plotted layout with wide roads, avenue plantation and underground utilities. Ask us for approvals and title documents.',
    price: 'Price on request', priceNote: 'Builder price, zero brokerage', img: E(P.field, 1000),
    detail: {
      tagline: 'Gated open plots · Ghatkesar, East Hyderabad',
      hero: E(P.field, 2000), rera: 'Available on request', kind: 'plots',
      location: { area: 'Ghatkesar', city: 'East Hyderabad, Telangana', address: 'Ghatkesar, Hyderabad, Telangana', mapQuery: 'Ghatkesar, Hyderabad', note: 'Site address shared when you book a visit.' },
      essentials: [['Status', 'Now selling'], ['Type', 'Gated open plots'], ['Location', 'Ghatkesar, East Hyderabad'], ['Plot sizes', '200 – 400 sq yds'], ['Facings', 'East, West, North, South'], ['Layout approval', 'Available on request'], ['Price', 'On request'], ['TG-RERA', 'Available on request — verify on the TG-RERA portal'], ['Developer', 'Verified developer partner']],
      highlights: ['Wide internal roads with avenue plantation', 'Underground drainage and utilities', 'Gated entrance with security', 'Park and open spaces', 'Build your own home your way', 'Site visits arranged on any day'],
      masterPlan: { caption: 'Schematic layout, not to scale. Refer to the approved layout plan from the developer.' },
      gallery: gal('field', 'house6', 'house1', 'villa1', 'house4', 'living'),
      units: [
        { id: 'p200', name: '200 sq yds', facing: 'Multiple', beds: 'Plot', area: '1,800 sq ft', plot: { w: 40, d: 45 } },
        { id: 'p267', name: '267 sq yds', facing: 'Multiple', beds: 'Plot', area: '2,403 sq ft', plot: { w: 45, d: 53 } },
        { id: 'p300', name: '300 sq yds', facing: 'Multiple', beds: 'Plot', area: '2,700 sq ft', plot: { w: 45, d: 60 } },
        { id: 'p400', name: '400 sq yds', facing: 'Corner plots', beds: 'Plot', area: '3,600 sq ft', plot: { w: 60, d: 60 } },
      ],
      specs: PLOT_SPECS,
      amenities: [
        { title: 'Community', items: ['Landscaped park', 'Children’s play area', 'Open seating areas', 'Multipurpose community hall', 'Jogging and walking track', 'Temple space'] },
        { title: 'Infrastructure', items: ['Gated entrance', 'Black-top internal roads', 'Underground drainage', 'Water supply lines', 'Underground power cabling', 'Street lighting'] },
        { title: 'Safety and sustainability', items: ['Compound security', 'CCTV at the entrance', 'Avenue plantation', 'Rainwater harvesting', 'Solar lighting in common areas', 'Wide internal roads'] },
      ],
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Uppal and Secunderabad', '30 min'], ['Industrial parks in the east corridor', '20 min'], ['Hitech City', '60 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['Schools in Ghatkesar', '8 min'], ['Colleges nearby', '15 min'], ['Coaching centres', '15 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Hospitals in Ghatkesar', '10 min'], ['Clinics and pharmacies', '5 min'], ['Multi-speciality care in Uppal', '30 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Outer Ring Road (ORR)', '5 min'], ['Ghatkesar railway station', '10 min'], ['Rajiv Gandhi International Airport', '50 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Palm Grove Plots', [['Are the plots approved?', 'Ask us for the layout approval and title documents. Please verify on the TG-RERA portal before any payment.'], ['Can I choose my facing?', 'Plots are available in several facings subject to availability. Tell us your preference and we will check.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  { slug: 'orchid-enclave', sample: true, status: 'ongoing', tag: 'Under construction', name: 'Orchid Enclave',
    meta: ['Shamshabad, South Hyderabad', '3 & 4 BHK villas', '1,950–2,600 sq ft'],
    summary: 'A gated villa community near the airport corridor, with a clubhouse, tree-lined streets and private gardens.',
    price: 'Price on request', priceNote: 'Builder price, zero brokerage', img: E(P.villa1, 1000),
    detail: {
      tagline: 'Gated villas near the airport corridor · Shamshabad, South Hyderabad',
      hero: E(P.villa1, 2000), rera: 'Available on request', kind: 'villas',
      location: { area: 'Shamshabad', city: 'South Hyderabad, Telangana', address: 'Shamshabad, Hyderabad, Telangana', mapQuery: 'Shamshabad, Hyderabad', note: 'Site address shared when you book a visit.' },
      essentials: [['Status', 'Under construction'], ['Type', '3 & 4 BHK villas'], ['Location', 'Shamshabad, South Hyderabad'], ['Built-up area', '1,950 – 2,600 sq ft'], ['Configuration', 'G+1 duplex villas'], ['Facing', 'East and West'], ['Possession', 'Latest timeline on request'], ['Price', 'On request'], ['TG-RERA', 'Available on request — verify on the TG-RERA portal']],
      highlights: ['Private garden and car parking for every villa', 'Close to the airport and ORR', 'Tree-lined streets with wide roads', 'Clubhouse with pool and gym', 'Vaastu-friendly layouts', 'Home loan support available'],
      masterPlan: { caption: 'Schematic master plan, not to scale. Refer to the developer’s approved layout.' },
      gallery: gal('villa1', 'house1', 'interior', 'kitchen1', 'bedroom', 'pool'),
      units: [
        { id: 'a', name: 'Villa A', facing: 'East', beds: '3 BHK', area: '1,950 sq ft', floors: villaFloors(2) },
        { id: 'b', name: 'Villa B', facing: 'West', beds: '3 BHK + Study', area: '2,250 sq ft', floors: villaFloors(2) },
        { id: 'c', name: 'Villa C', facing: 'East', beds: '4 BHK', area: '2,600 sq ft', floors: villaFloors(2) },
      ],
      specs: spec(VILLA_SPECS, { Structure: ['RCC framed structure, ground plus one floor', 'Solid block masonry with weather-proof external finish', 'Private parking within each plot'] }),
      amenities: VILLA_AMENITIES,
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Aviation and logistics hubs', '10 min'], ['Financial District', '35 min'], ['Gachibowli', '35 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['Schools in Shamshabad', '8 min'], ['Colleges nearby', '15 min'], ['Coaching centres', '15 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Hospitals in Shamshabad', '10 min'], ['Clinics and pharmacies', '5 min'], ['Multi-speciality care in Gachibowli', '35 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Rajiv Gandhi International Airport', '10 min'], ['Outer Ring Road (ORR)', '5 min'], ['Malls and restaurants', '15 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Orchid Enclave', [['What is the construction status?', 'Ask us for the latest site update and photographs. We share progress as supplied by the developer.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  // =====================================================================
  //  COMPLETED
  // =====================================================================
  { slug: 'maple-court', sample: true, status: 'completed', tag: 'Handed over', name: 'Maple Court',
    meta: ['Begumpet, Central Hyderabad', '3 BHK apartments', '1,400–1,650 sq ft'],
    summary: 'A gated apartment community now home to settled families. Ask us about resale and rental options.',
    price: 'Resale on request', priceNote: 'Ask us for current availability', img: E(P.house4, 1000),
    detail: {
      tagline: 'Completed gated apartment community · Begumpet, Central Hyderabad',
      hero: E(P.house4, 2000), rera: 'Not applicable (completed)', kind: 'apartments',
      location: { area: 'Begumpet', city: 'Central Hyderabad, Telangana', address: 'Begumpet, Hyderabad, Telangana', mapQuery: 'Begumpet, Hyderabad', note: 'We share the exact address when you book a visit.' },
      essentials: [['Status', 'Completed and occupied'], ['Type', '3 BHK apartments'], ['Location', 'Begumpet, Central Hyderabad'], ['Size range', '1,400 – 1,650 sq ft'], ['Configuration', 'Stilt + 8 floors'], ['Availability', 'Resale and rental options on request'], ['Price', 'On request'], ['Developer', 'Verified developer partner']],
      highlights: ['Established community with active residents', 'Gated entrance with security', 'Covered parking', 'Clubhouse and play area', 'Ready to move in', 'We help with paperwork and loans'],
      masterPlan: { caption: 'Schematic site plan, not to scale.' },
      gallery: gal('house4', 'apt2', 'living', 'kitchen2', 'bedroom', 'house5'),
      units: [
        { id: 'a', name: 'Type A', facing: 'East', beds: '3 BHK', area: '1,400 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3) }] },
        { id: 'b', name: 'Type B', facing: 'West', beds: '3 BHK', area: '1,520 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3) }] },
        { id: 'c', name: 'Type C', facing: 'North', beds: '3 BHK + Study', area: '1,650 sq ft', floors: [{ name: 'Typical floor', rooms: aptRooms(3, true) }] },
      ],
      specs: spec(APT_SPECS, { Structure: ['RCC framed structure, stilt plus 8 floors', 'Solid block masonry walls', 'Covered and open parking'] }),
      amenities: [
        { title: 'Community', items: ['Clubhouse', 'Play area', 'Landscaped garden', 'Indoor games', 'Party hall', 'Jogging track'] },
        { title: 'Convenience', items: ['Covered parking', 'Visitor parking', 'Lifts', 'Power backup', 'Intercom', 'Water supply backup'] },
        { title: 'Safety', items: ['Gated entrance with security', 'CCTV security', '24/7 guards', 'Fire safety systems', 'Rainwater harvesting', 'Sewage treatment plant'] },
      ],
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Secunderabad', '10 min'], ['Begumpet business district', '5 min'], ['HITEC City', '30 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['Schools in Begumpet', '5 min'], ['Colleges in Secunderabad', '12 min'], ['Coaching centres', '10 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Multi-speciality hospitals nearby', '8 min'], ['Clinics and pharmacies', '3 min'], ['Emergency care', '10 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Begumpet metro station', '5 min'], ['Begumpet railway station', '8 min'], ['Malls and restaurants', '10 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Maple Court', [['Are homes available to buy or rent?', 'Availability changes often. Ask us for current resale and rental options and we will check with owners.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },

  { slug: 'sunrise-greens', sample: true, status: 'completed', tag: 'Ready to move', name: 'Sunrise Greens',
    meta: ['Tellapur, West Hyderabad', 'Duplex villas', '2,600–3,200 sq ft'],
    summary: 'Ready-to-occupy duplex villas in a green gated community with a clubhouse, jogging track and play areas.',
    price: 'Price on request', priceNote: 'Ask us for current availability', img: E(P.house5, 1000),
    detail: {
      tagline: 'Duplex villas in a green gated community · Tellapur, West Hyderabad',
      hero: E(P.house5, 2000), rera: 'Available on request', kind: 'villas',
      location: { area: 'Tellapur', city: 'West Hyderabad, Telangana', address: 'Tellapur, Hyderabad, Telangana', mapQuery: 'Tellapur, Hyderabad', note: 'We share the exact address when you book a visit.' },
      essentials: [['Status', 'Ready to move in'], ['Type', 'Duplex villas'], ['Location', 'Tellapur, West Hyderabad'], ['Built-up area', '2,600 – 3,200 sq ft'], ['Configuration', 'G+1 duplex'], ['Facing', 'East and West'], ['Availability', 'Ask us for current availability'], ['Price', 'On request'], ['Developer', 'Verified developer partner']],
      highlights: ['Spacious duplex layouts', 'Private terrace and garden space', 'Green gated community', 'Clubhouse and jogging track', 'Ready to move in', 'Site visits on any day'],
      masterPlan: { caption: 'Schematic site plan, not to scale.' },
      gallery: gal('house5', 'house3', 'interior', 'kitchen1', 'bedroom', 'pool'),
      units: [
        { id: 'a', name: 'Duplex A', facing: 'East', beds: '3 BHK', area: '2,600 sq ft', floors: villaFloors(2) },
        { id: 'b', name: 'Duplex B', facing: 'West', beds: '4 BHK', area: '2,900 sq ft', floors: villaFloors(2) },
        { id: 'c', name: 'Duplex C', facing: 'East', beds: '4 BHK', area: '3,200 sq ft', floors: villaFloors(2) },
      ],
      specs: spec(VILLA_SPECS, { Structure: ['RCC framed structure, ground plus one floor', 'Solid block masonry with weather-proof external finish', 'Private parking within each villa'] }),
      amenities: VILLA_AMENITIES,
      locality: [
        { title: 'Work and business', icon: 'briefcase', items: [['Financial District', '15 min'], ['Gachibowli', '20 min'], ['HITEC City', '30 min']] },
        { title: 'Schools and learning', icon: 'book', items: [['International schools in Tellapur', '8 min'], ['Colleges in Gachibowli belt', '20 min'], ['Coaching centres', '15 min']] },
        { title: 'Healthcare', icon: 'hospital', items: [['Hospitals in Tellapur and Nallagandla', '10 min'], ['Clinics and pharmacies', '5 min'], ['Multi-speciality care in Gachibowli', '20 min']] },
        { title: 'Connectivity and lifestyle', icon: 'train', items: [['Outer Ring Road (ORR)', '5 min'], ['Rajiv Gandhi International Airport', '35 min'], ['Malls, cafes and restaurants', '15 min']] },
      ],
      localityNote: LOCALITY_NOTE,
      faqs: faqsFor('Sunrise Greens', [['Are villas available right now?', 'Availability changes often. Ask us and we will check current resale and fresh options.']]),
      developer: { name: 'Verified developer partner', address: 'Details shared on request' },
    } },
];

// ==========================================================================
//  2. ICONS
// ==========================================================================

const ICONS = {
  phone: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
  close: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M7 17L17 7M8 7h9v9',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  building: 'M5 21V4l8-1.5V21M13 8l6 1.5V21M3 21h18M8 8h2M8 12h2M8 16h2M16 13h1M16 16h1',
  ruler: 'M3 17L17 3l4 4L7 21zM8 12l2 2M11 9l2 2M14 6l2 2',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  shield: 'M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6zM9 12l2 2 4-4',
  tree: 'M12 21v-6M12 15c-4 0-6-2.5-6-5.5S8.5 4 12 3c3.5 1 6 3.5 6 6.5S16 15 12 15z',
  pool: 'M3 17c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M3 13c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M8 11V5.5a2 2 0 0 1 4 0M14 11V5.5a2 2 0 0 1 4 0M8 8h4M14 8h4',
  gym: 'M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12',
  star: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  car: 'M4 16v-4l2-5h12l2 5v4M3 16h18M7 19v-3M17 19v-3M7 12.5h.01M17 12.5h.01',
  bolt: 'M13 2L5 14h6l-1 8 8-12h-6z',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  run: 'M4 18c0-6 4-11 10-11h6M4 18h16M9 14l2 2',
  sports: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.5 9c4 1 8 1 17 0M3.5 15c4-1 8-1 17 0M12 3c2.5 3 2.5 15 0 18',
  film: 'M4 5h16v14H4zM4 9h16M4 15h16M8 5v4M12 5v4M16 5v4M8 15v4M12 15v4M16 15v4',
  cafe: 'M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 9h2a2 2 0 0 1 0 4h-2M7 3v2M10 3v2M13 3v2',
  book: 'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v13',
  hospital: 'M5 4h14v16H5zM12 8v8M8 12h8',
  train: 'M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zM5 11h14M8 21l2-3M16 21l-2-3M8.5 14.5h.01M15.5 14.5h.01',
  briefcase: 'M3 8h18v11H3zM9 8V5h6v3M3 13h18',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  file: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6',
  bank: 'M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18M3 9h18',
  key: 'M8 15a4 4 0 1 1 3.9-5H21v3h-2v2h-3v-2h-4.1A4 4 0 0 1 8 15zM7 11.5h.01',
  download: 'M12 4v11M7 11l5 5 5-5M5 20h14',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  navigate: 'M4 11l16-7-7 16-2-7z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  game: 'M7 8h10a4 4 0 0 1 4 4v1a3 3 0 0 1-5.5 1.6L15 14H9l-.5.6A3 3 0 0 1 3 13v-1a4 4 0 0 1 4-4zM8 10v3M6.5 11.5h3M16 11h.01M18 12.5h.01',
  lift: 'M5 3h14v18H5zM9 10l3-3 3 3M9 14l3 3 3-3',
  wifi: 'M3 9a14 14 0 0 1 18 0M6 12.5a9.5 9.5 0 0 1 12 0M9 16a5 5 0 0 1 6 0M12 19.5h.01',
  camera: 'M4 8h4l1.5-2h5L16 8h4v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4',
};

function Icon({ name, size = 20, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] || ICONS.check} />
    </svg>
  );
}

// Pick an icon for an amenity name
const RULES = [
  [/pool|swim/i, 'pool'], [/gym|fitness/i, 'gym'], [/spa\b|yoga|aerobic/i, 'sparkle'],
  [/theatre|film|amphi/i, 'film'], [/cafe|cafeteria|restaurant/i, 'cafe'],
  [/co-?working|business|office/i, 'briefcase'], [/game|indoor/i, 'game'],
  [/badminton|cricket|court\b|sport|tennis|nets/i, 'sports'], [/jog|walking|track/i, 'run'],
  [/cctv|camera/i, 'camera'], [/security|gated|guard|fenc|fire|safety/i, 'shield'],
  [/\bev\b|charging/i, 'plug'], [/parking/i, 'car'],
  [/kids|play|child/i, 'star'], [/park\b|garden|landscap|avenue|tree|plantation|green|open|seating|pet/i, 'tree'],
  [/solar|lighting|smart/i, 'sun'], [/rain|water|sewage|drain|treatment/i, 'drop'],
  [/power|backup|electric|cabling/i, 'bolt'], [/lift/i, 'lift'], [/entrance/i, 'shield'],
  [/hall|clubhouse|community|temple|guest|party|lounge/i, 'building'],
  [/road/i, 'navigate'], [/intercom|wifi/i, 'wifi'],
];
const amenityIcon = (name) => (RULES.find(([r]) => r.test(name)) || [0, 'check'])[1];

// ==========================================================================
//  3. SCHEMATIC ART
//  Drawings used when a project has no real master plan / floor plan image yet.
// ==========================================================================

const C = {
  paper: '#f6f1e7', line: '#c9bca4', gold: '#b8a088', navy: '#21456f', deep: '#14233b',
  road: '#ffffff', plot: '#fbf8f1', green: '#b5cfa9', green2: '#8fb58a', water: '#a9cde3', park: '#d9d0bd',
};

/* ------------------------------ MASTER PLAN ------------------------------ */
const MASTER_LEGEND = {
  villas: [['Entrance', C.gold], ['Clubhouse and pool', C.navy], ['Park and green', C.green2], ['Villa plots', C.plot], ['Internal roads', C.road]],
  apartments: [['Entrance', C.gold], ['Towers', C.navy], ['Clubhouse', C.gold], ['Pool', C.water], ['Podium garden', C.green2], ['Parking', C.park]],
  plots: [['Entrance', C.gold], ['Plots', C.plot], ['Park and green', C.green2], ['Community hall', C.navy], ['Roads', C.road]],
};

const Compass = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="20" fill="#fff" stroke={C.line} />
    <path d="M0 -14 L5 4 L0 0 L-5 4Z" fill={C.navy} />
    <text y="-24" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.navy}>N</text>
  </g>
);
const Gate = ({ x, y }) => (
  <g>
    <rect x={x - 38} y={y - 12} width="76" height="24" rx="12" fill={C.gold} />
    <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" letterSpacing=".06em">ENTRANCE</text>
  </g>
);
const Tree = ({ x, y, r = 7 }) => <circle cx={x} cy={y} r={r} fill={C.green2} opacity=".85" />;

function Villas() {
  const plots = [];
  const rows = [[30, 100], [172, 100], [310, 100]]; // y, h
  rows.forEach(([y, h], r) => {
    [[34, 366], [424, 342]].forEach(([x0, w], side) => {
      if (r === 1 && side === 0) return; // clubhouse
      if (r === 2 && side === 0) return; // park
      const n = Math.floor(w / 41);
      for (let k = 0; k < n; k++) plots.push(<rect key={`${r}${side}${k}`} x={x0 + k * 41} y={y} width="37" height={h} rx="3" fill={C.plot} stroke={C.line} />);
    });
  });
  return (
    <>
      <rect x="14" y="14" width="772" height="412" rx="16" fill={C.paper} stroke={C.gold} strokeDasharray="6 5" />
      <rect x="14" y="136" width="772" height="30" fill={C.road} /><rect x="14" y="276" width="772" height="30" fill={C.road} />
      <rect x="400" y="14" width="24" height="412" fill={C.road} />
      {plots}
      {/* clubhouse */}
      <rect x="34" y="172" width="356" height="100" rx="8" fill={C.park} />
      <rect x="50" y="186" width="120" height="72" rx="8" fill={C.navy} />
      <text x="110" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">CLUBHOUSE</text>
      <rect x="190" y="190" width="90" height="48" rx="10" fill={C.water} stroke="#fff" strokeWidth="3" />
      <text x="235" y="219" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.navy}>POOL</text>
      <rect x="296" y="190" width="78" height="30" rx="6" fill={C.green} /><rect x="296" y="226" width="78" height="30" rx="6" fill={C.green} />
      {/* park */}
      <rect x="34" y="310" width="356" height="100" rx="8" fill={C.green} />
      {[[70, 340], [110, 380], [160, 345], [215, 385], [260, 340], [310, 378], [350, 345], [120, 335], [290, 395]].map(([x, y], n) => <Tree key={n} x={x} y={y} r={8 + (n % 3)} />)}
      <text x="212" y="364" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.deep}>CENTRAL PARK</text>
      <Gate x={412} y={426} />
      <Compass x={752} y={50} />
    </>
  );
}

function Apartments() {
  const towers = [[110, 70, 'A'], [320, 70, 'B'], [530, 70, 'C'], [215, 250, 'D'], [425, 250, 'E']];
  return (
    <>
      <rect x="14" y="14" width="772" height="412" rx="16" fill={C.paper} stroke={C.gold} strokeDasharray="6 5" />
      <rect x="34" y="34" width="732" height="372" rx="14" fill={C.road} opacity=".9" />
      <rect x="64" y="60" width="672" height="320" rx="14" fill={C.green} />
      {towers.map(([x, y, t]) => (
        <g key={t}>
          <rect x={x} y={y} width="150" height="100" rx="6" fill={C.navy} />
          <rect x={x + 8} y={y + 8} width="134" height="84" rx="4" fill="none" stroke="#fff" strokeOpacity=".35" />
          <text x={x + 75} y={y + 58} textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff" fontFamily="Georgia,serif">Tower {t}</text>
        </g>
      ))}
      <rect x="610" y="230" width="110" height="64" rx="8" fill={C.gold} />
      <text x="665" y="267" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">CLUBHOUSE</text>
      <rect x="610" y="305" width="110" height="56" rx="14" fill={C.water} stroke="#fff" strokeWidth="3" />
      <text x="665" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.navy}>POOL</text>
      <rect x="82" y="250" width="100" height="100" rx="10" fill={C.green2} opacity=".7" />
      <text x="132" y="305" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">PLAY AREA</text>
      <rect x="64" y="14" width="672" height="0" />
      <rect x="34" y="384" width="300" height="22" rx="6" fill={C.park} /><rect x="470" y="384" width="296" height="22" rx="6" fill={C.park} />
      <text x="184" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.deep}>PARKING</text>
      <text x="618" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.deep}>PARKING</text>
      <Gate x={402} y={426} />
      <Compass x={752} y={52} />
    </>
  );
}

function Plots() {
  const blocks = [];
  const mk = (x0, y0, cols, rows, key) => {
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) blocks.push(<rect key={`${key}${r}${c}`} x={x0 + c * 36} y={y0 + r * 38} width="32" height="34" rx="3" fill={C.plot} stroke={C.line} />);
  };
  mk(34, 34, 9, 3, 'a'); mk(34, 160, 9, 3, 'b'); mk(34, 286, 9, 3, 'c');
  mk(466, 34, 9, 3, 'd'); mk(466, 286, 9, 3, 'f');
  mk(466, 160, 4, 3, 'e');
  return (
    <>
      <rect x="14" y="14" width="772" height="412" rx="16" fill={C.paper} stroke={C.gold} strokeDasharray="6 5" />
      <rect x="14" y="146" width="772" height="8" fill={C.road} /><rect x="14" y="272" width="772" height="8" fill={C.road} />
      <rect x="352" y="14" width="106" height="412" fill={C.road} />
      <rect x="360" y="14" width="2" height="412" fill={C.line} opacity=".6" /><rect x="448" y="14" width="2" height="412" fill={C.line} opacity=".6" />
      {blocks}
      <rect x="620" y="160" width="140" height="106" rx="8" fill={C.green} />
      {[[646, 190], [690, 230], [735, 190], [660, 245], [722, 240]].map(([x, y], n) => <Tree key={n} x={x} y={y} r={9} />)}
      <text x="690" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.deep}>PARK</text>
      <rect x="370" y="160" width="80" height="110" rx="8" fill={C.navy} />
      <text x="410" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">COMMUNITY</text><text x="410" y="226" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">HALL</text>
      <Gate x={405} y={426} />
      <Compass x={752} y={50} />
    </>
  );
}

function MasterPlanArt({ kind = 'villas' }) {
  const Body = kind === 'apartments' ? Apartments : kind === 'plots' ? Plots : Villas;
  return (
    <svg viewBox="0 0 800 440" role="img" aria-label="Schematic master plan" className="art-svg">
      <Body />
    </svg>
  );
}

/* ------------------------------ FLOOR PLAN ------------------------------- */
function treemap(items, x, y, w, h, out) {
  if (items.length === 1) { out.push({ ...items[0], x, y, w, h }); return; }
  const total = items.reduce((a, b) => a + b.v, 0);
  let acc = 0, k = 0;
  while (k < items.length - 1 && acc + items[k].v / 2 <= total / 2) { acc += items[k].v; k++; }
  k = Math.max(1, k);
  const A = items.slice(0, k), B = items.slice(k);
  const ta = A.reduce((a, b) => a + b.v, 0);
  if (w >= h) { const wa = (w * ta) / total; treemap(A, x, y, wa, h, out); treemap(B, x + wa, y, w - wa, h, out); }
  else { const ha = (h * ta) / total; treemap(A, x, y, w, ha, out); treemap(B, x, y + ha, w, h - ha, out); }
}
const roomFill = (n) => {
  if (/toilet|utility/i.test(n)) return '#dbe9f3';
  if (/balcony|terrace|garden|deck|bar/i.test(n)) return '#d3e4c9';
  if (/lift/i.test(n)) return '#c9d3de';
  if (/parking/i.test(n)) return '#e8e3d8';
  if (/bed|study|maid/i.test(n)) return '#f7efe1';
  return '#ffffff';
};

function FloorPlanArt({ floor }) {
  const W = 640, H = 420, pad = 14;
  const out = [];
  treemap(floor.rooms.map(([name, v]) => ({ name, v })), pad, pad, W - pad * 2, H - pad * 2, out);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Schematic ${floor.name} layout`} className="art-svg plan-svg">
      <rect x="0" y="0" width={W} height={H} fill={C.paper} />
      {out.map((r, n) => {
        const fs = Math.max(9, Math.min(15, r.w / (r.name.length * 0.62), r.h / 2.4));
        return (
          <g key={n}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={roomFill(r.name)} stroke={C.deep} strokeWidth="2.4" />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + fs / 3} textAnchor="middle" fontSize={fs} fontWeight="600" fill={C.deep} fontFamily="DM Sans,sans-serif">{r.name}</text>
          </g>
        );
      })}
      <rect x={pad} y={pad} width={W - pad * 2} height={H - pad * 2} fill="none" stroke={C.deep} strokeWidth="5" />
    </svg>
  );
}

function PlotArt({ plot }) {
  const { w, d } = plot;
  const W = 640, H = 420, max = 270, sc = Math.min((W - 220) / w, max / d) * 1.0;
  const pw = w * sc, ph = d * sc, x = (W - pw) / 2, y = (H - ph) / 2 - 6, sb = 22;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Schematic plot ${w} by ${d} feet`} className="art-svg plan-svg">
      <rect width={W} height={H} fill={C.paper} />
      <rect x="0" y={y + ph + 26} width={W} height="38" fill={C.road} /><text x="24" y={y + ph + 50} fontSize="11" fontWeight="600" fill={C.line}>ROAD</text>
      <rect x={x} y={y} width={pw} height={ph} fill="#fff" stroke={C.deep} strokeWidth="3" />
      <rect x={x + sb} y={y + sb} width={pw - sb * 2} height={ph - sb * 2} fill="#f7efe1" stroke={C.gold} strokeDasharray="6 5" />
      <text x={W / 2} y={y + ph / 2} textAnchor="middle" fontSize="15" fontWeight="700" fill={C.deep}>Buildable area</text>
      <text x={W / 2} y={y + ph / 2 + 20} textAnchor="middle" fontSize="11" fill={C.deep} opacity=".7">after setbacks</text>
      <text x={W / 2} y={y - 10} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.navy}>{w} ft</text>
      <text x={x - 12} y={y + ph / 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.navy} transform={`rotate(-90 ${x - 12} ${y + ph / 2})`}>{d} ft</text>
      <Compass x={W - 44} y={52} />
    </svg>
  );
}

// ==========================================================================
//  4. SMALL COMPONENTS
//  Project card (for "You may also like") and the enquiry / brochure form.
// ==========================================================================

// Image over a soft gradient, so a missing photo never leaves a blank hole
function Img({ src, alt = '', className = '', fallback }) {
  const external = /^https?:/.test(src || '');
  return (
    <div className={`ph ${className}`}>
      {src && (
        <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" className={external ? 'vivid' : undefined}
          onError={(e) => {
            const el = e.currentTarget;
            if (fallback && !el.dataset.fb) { el.dataset.fb = '1'; el.classList.remove('vivid'); el.src = fallback; }
            else el.style.display = 'none';
          }} />
      )}
    </div>
  );
}

function ProjectCard({ p, index = 0 }) {
  const [place, type, size] = p.meta;
  const tone = p.status === 'completed' ? 'done' : p.status === 'ongoing' ? 'live' : 'soon';
  return (
    <Link to={`/projects/${p.slug}`} className={`pc pc-${tone}`} aria-label={`${p.name}, view project`}>
      <div className="pc-media">
        <Img src={p.img} alt="" />
        <span className="pc-shade" />
        <span className="pc-tag"><i />{p.tag}</span>
        <span className="pc-no">0{index + 1}</span>
        <span className="pc-place"><Icon name="pin" size={15} /> {place}</span>
      </div>
      <div className="pc-body">
        <h3>{p.name}</h3>
        <p className="pc-sum">{p.summary}</p>
        <dl className="pc-stats">
          <div><dt><Icon name="home" size={15} /> Type</dt><dd>{type}</dd></div>
          <div><dt><Icon name="ruler" size={15} /> Size</dt><dd>{size}</dd></div>
        </dl>
        <div className="pc-foot">
          <div><strong>{p.price}</strong><small>{p.priceNote}</small></div>
          <span className="pc-go" aria-hidden="true"><Icon name="up" size={20} /></span>
        </div>
      </div>
    </Link>
  );
}

// mode 'visit' = Name + Phone + Project; mode 'brochure' = Name + Phone + Email
function EnquiryForm({ mode = 'visit', title, button, project = 'Srivari Meadows' }) {
  const brochure = mode === 'brochure';
  const [f, setF] = useState({ name: '', phone: '', email: '', project });
  const [ok, setOk] = useState(false);
  const [agree, setAgree] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setOk(false); };
  const phoneOk = f.phone.replace(/\D/g, '').length >= 10;
  const ready = agree && f.name.trim() && phoneOk && (!brochure || /^\S+@\S+\.\S+$/.test(f.email));

  const submit = (e) => {
    e.preventDefault();
    if (!ready) return;
    // TODO: send `f` to your backend / EmailJS / Formspree here
    setOk(true); setAgree(false);
    setF({ name: '', phone: '', email: '', project });
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h2 className="form-title">{title}</h2>
      {ok && <p className="ok" role="status">Thank you. We will contact you shortly.</p>}
      <input placeholder="Name" aria-label="Name" value={f.name} onChange={set('name')} autoComplete="name" />
      <input placeholder="Phone" aria-label="Phone" value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
      {brochure ? (
        <input placeholder="Email" aria-label="Email" value={f.email} onChange={set('email')} inputMode="email" autoComplete="email" />
      ) : (
        <select aria-label="Project" value={f.project} onChange={set('project')}>
          {projects.map((p) => <option key={p.slug}>{p.name}</option>)}
          <option>Not sure yet</option>
        </select>
      )}
      <label className="consent">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          I agree to HomeConnectz contacting me by phone, WhatsApp, SMS and email to arrange my site visit and about this enquiry, and to my details being shared with the developer of the project I have enquired about. I understand this consent applies even if my number is registered on the DND / NCPR list. I have read the <Link to="/contact">Privacy Policy</Link>.
        </span>
      </label>
      <p className="fine">You can withdraw consent at any time by replying STOP on WhatsApp.</p>
      <button className="btn btn-dark btn-block" type="submit" disabled={!ready}>{button}</button>
    </form>
  );
}

// ==========================================================================
//  5. PAGE
// ==========================================================================

const SECTIONS = [
  ['essentials', 'Essentials'], ['master-plan', 'Master plan'], ['gallery', 'Gallery'], ['floor-plans', 'Floor plans'],
  ['specifications', 'Specifications'], ['amenities', 'Amenities'], ['locality', 'The locality'], ['location', 'Location'],
  ['how-we-work', 'How we work'], ['brochure', 'E-brochure'],
];

const ESS_ICON = {
  Status: 'clock', Type: 'home', Location: 'pin', 'Size range': 'ruler', 'Built-up area': 'ruler', 'Plot sizes': 'ruler',
  Configuration: 'layers', Possession: 'calendar', Availability: 'key', Price: 'bank', 'TG-RERA': 'shield',
  Developer: 'building', Facing: 'navigate', Villas: 'grid', Extent: 'expand', Vaastu: 'sparkle',
  'HMDA Layout Permit': 'file', 'Layout approval': 'file',
};

function SecHead({ n, label, title, sub, light }) {
  return (
    <header className={`sh ${light ? 'light' : ''}`}>
      <span className="sh-n">{n}</span>
      <div>
        <p className="sh-l">{label}</p>
        <h2>{title}</h2>
        {sub && <p className="sh-s">{sub}</p>}
      </div>
    </header>
  );
}

function Lightbox({ items, index, onClose, onIndex }) {
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [index, items.length, onClose, onIndex]);
  const cur = items[index];
  return (
    <div className="lb" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lb-x" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
      {items.length > 1 && (
        <>
          <button className="lb-n l" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }}><Icon name="left" size={24} /></button>
          <button className="lb-n r" aria-label="Next" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }}><Icon name="right" size={24} /></button>
        </>
      )}
      <img src={cur.src} alt={cur.alt || ''} onClick={(e) => e.stopPropagation()} />
      <p className="lb-c">{index + 1} / {items.length}</p>
    </div>
  );
}

// Image with a graceful gradient fallback
function Pic({ src, alt = '', className = '' }) {
  return (
    <div className={`pic ${className}`}>
      <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.style.display = 'none')} />
    </div>
  );
}

function SubNav({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    const box = ref.current; const el = box?.querySelector('a.on');
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [active]);
  return (
    <div className="pdnav-wrap">
      <nav className="pdnav" ref={ref} aria-label="Project sections">
        {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>)}
      </nav>
    </div>
  );
}

function FloorPlans({ d, onZoom }) {
  const [u, setU] = useState(0);
  const [f, setF] = useState(0);
  const [failed, setFailed] = useState({});
  const unit = d.units[u];
  const isPlot = !!unit.plot;
  const floor = unit.floors?.[Math.min(f, (unit.floors?.length || 1) - 1)];
  const real = unit.img && !failed[unit.id];
  const pick = (n) => { setU(n); setF(0); };
  return (
    <>
      <div className="seg seg-wide" role="tablist" aria-label="Unit types">
        {d.units.map((x, n) => (
          <button key={x.id} role="tab" aria-selected={u === n} className={u === n ? 'on' : ''} onClick={() => pick(n)}>
            {x.facing && x.facing !== 'Multiple' && !isPlot ? `${x.facing} · ` : ''}{x.name}
          </button>
        ))}
      </div>
      <div className="fp">
        <div className="fp-view">
          {unit.floors?.length > 1 && !real && (
            <div className="fp-floors" role="tablist" aria-label="Floors">
              {unit.floors.map((x, n) => <button key={x.name} role="tab" aria-selected={f === n} className={f === n ? 'on' : ''} onClick={() => setF(n)}>{x.name}</button>)}
            </div>
          )}
          {real ? (
            <button className="fp-img" onClick={() => onZoom([{ src: unit.img, alt: `${unit.name} floor plan` }])} aria-label="Zoom floor plan">
              <img src={unit.img} alt={`Floor plan, ${unit.facing} ${unit.name}`} onError={() => setFailed((x) => ({ ...x, [unit.id]: true }))} />
              <span className="chip-glass"><Icon name="expand" size={14} /> Tap to zoom</span>
            </button>
          ) : isPlot ? <PlotArt plot={unit.plot} /> : <FloorPlanArt floor={floor} />}
          <p className="fp-note">
            {real ? 'Floor-plan sheet supplied by the developer.' : isPlot ? 'Schematic plot diagram, not to scale. Setbacks as per approved layout.' : 'Schematic layout for illustration, not to scale. Exact plans are in the e-brochure.'}
          </p>
        </div>
        <aside className="fp-info">
          <p className="fp-k">{isPlot ? 'Plot option' : 'Unit type'}</p>
          <h3>{unit.facing && unit.facing !== 'Multiple' && !isPlot ? `${unit.facing} facing · ` : ''}{unit.name}</h3>
          <dl className="fp-facts">
            <div><dt>{isPlot ? 'Plot area' : 'Built-up area'}</dt><dd>{unit.area}</dd></div>
            {!isPlot && <div><dt>Configuration</dt><dd>{unit.beds}</dd></div>}
            {isPlot && <div><dt>Approx. size</dt><dd>{unit.plot.w} × {unit.plot.d} ft</dd></div>}
            <div><dt>Facing</dt><dd>{unit.facing}</dd></div>
            {unit.note && <div><dt>Plot</dt><dd>{unit.note}</dd></div>}
          </dl>
          {unit.floors && !real && (
            <ul className="fp-rooms">
              {[...new Set(floor.rooms.map((r) => r[0]))].map((r) => <li key={r}>{r}</li>)}
            </ul>
          )}
          <div className="fp-cta">
            <a href="#brochure" className="btn btn-dark"><Icon name="download" size={16} /> Get all plans</a>
            <Link to="/contact" className="btn btn-line">Book a visit</Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  const [lb, setLb] = useState(null); // { items, index }
  const [active, setActive] = useState('essentials');
  const closeLb = useCallback(() => setLb(null), []);
  const setLbIndex = useCallback((i) => setLb((x) => (x ? { ...x, index: i } : x)), []);
  const zoom = (items, index = 0) => setLb({ items, index });

  useEffect(() => {
    if (!p) return undefined;
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [p]);

  if (!p) return <section className="section container center page-top"><h1>Project not found</h1><Link to="/projects" className="btn btn-dark mt">All projects</Link></section>;

  const d = p.detail;
  const ess = Object.fromEntries(d.essentials);
  const size = ess['Size range'] || ess['Built-up area'] || ess['Plot sizes'];
  const status = statuses.find((s) => s.key === p.status);
  const more = projects.filter((x) => x.slug !== p.slug && x.status === p.status).concat(projects.filter((x) => x.slug !== p.slug && x.status !== p.status)).slice(0, 3);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(d.location.mapQuery)}&output=embed`;
  const dirHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.location.mapQuery)}`;
  const gal = d.gallery.map((src, n) => ({ src, alt: `${p.name} view ${n + 1}` }));
  const hasRealPlan = !!d.masterPlan.image;
  const legend = MASTER_LEGEND[d.kind] || MASTER_LEGEND.villas;

  return (
    <div className="pd">
      <style>{CSS}</style>
      {/* ---------------- HERO ---------------- */}
      <section className="pdh">
        <div className="pdh-bg" aria-hidden="true"><img src={d.hero} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} /></div>
        <div className="pdh-shade" aria-hidden="true" />
        <div className="container pdh-in">
          <p className="crumbs"><Link to="/projects">Projects</Link><Icon name="right" size={13} /><Link to={`/projects?status=${p.status}`}>{status.label}</Link><Icon name="right" size={13} /><span>{p.name}</span></p>
          <div className="pdh-chips">
            <span className={`pill-tag ${p.status}`}><i />{p.tag}</span>
            {d.rera && /^P\d/.test(d.rera) && <span className="pill-tag plain">TG-RERA {d.rera}</span>}
          </div>
          <h1>{p.name}</h1>
          <p className="pdh-tag">{d.tagline}</p>
          <div className="pdh-cta">
            <Link to="/contact" className="btn btn-gold">Book a site visit <Icon name="arrow" size={18} /></Link>
            <a href="#brochure" className="btn btn-outline-light"><Icon name="download" size={17} /> E-brochure</a>
          </div>
        </div>
        <div className="container pdh-facts-wrap">
          <dl className="pdh-facts">
            <div><dt>Type</dt><dd>{ess.Type}</dd></div>
            <div><dt>Size</dt><dd>{size}</dd></div>
            <div><dt>Location</dt><dd>{d.location.area}</dd></div>
            <div><dt>Price</dt><dd>{p.price}<small>{p.priceNote}</small></dd></div>
          </dl>
        </div>
      </section>

      <SubNav active={active} />

      {p.note && <div className="container"><p className="pd-note-bar"><Icon name="sparkle" size={18} /> {p.note}</p></div>}

      {/* ---------------- 01 ESSENTIALS ---------------- */}
      <section id="essentials" className="ps ps-light">
        <div className="container">
          <SecHead n="01" label="Essentials" title="Project at a glance" sub={d.villaIntro} />
          <dl className="ess">
            {d.essentials.map(([k, v]) => (
              <div key={k} className={k === 'Status' ? 'is-status' : ''}>
                <span className="ess-i"><Icon name={ESS_ICON[k] || 'check'} size={20} /></span>
                <dt>{k}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- 02 MASTER PLAN ---------------- */}
      <section id="master-plan" className="ps ps-dark">
        <div className="container">
          <SecHead n="02" label="Master plan" title="Layout of the community" light />
          <div className="mp">
            <div className="mp-frame">
              {hasRealPlan ? (
                <button className="mp-img" onClick={() => zoom([{ src: d.masterPlan.image, alt: `${p.name} master plan` }])} aria-label="Zoom master plan">
                  <img src={d.masterPlan.image} alt={`${p.name} master plan`} />
                  <span className="chip-glass"><Icon name="expand" size={14} /> Tap to zoom</span>
                </button>
              ) : <MasterPlanArt kind={d.kind} />}
              <p className="mp-cap">{d.masterPlan.caption}</p>
            </div>
            <aside className="mp-side">
              <h3>Why the layout works</h3>
              <ul className="ticks gold">
                {d.highlights.map((h) => <li key={h}><Icon name="check" size={18} /> {h}</li>)}
              </ul>
              {!hasRealPlan && (
                <ul className="legend" aria-label="Legend">
                  {legend.map(([t, c]) => <li key={t}><i style={{ background: c }} />{t}</li>)}
                </ul>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- 03 GALLERY ---------------- */}
      <section id="gallery" className="ps ps-light">
        <div className="container">
          <SecHead n="03" label="Photo gallery" title="See the community" sub="Tap any photo to view it full screen. Images are artistic impressions." />
          <div className={`mosaic n${Math.min(gal.length, 6)}`}>
            {gal.slice(0, 6).map((g, n) => (
              <button key={g.src} className={`m m${n + 1}`} onClick={() => zoom(gal, n)} aria-label={`Open photo ${n + 1}`}>
                <Pic src={g.src} alt={g.alt} />
                <span className="chip-glass"><Icon name="expand" size={14} /> View</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 04 FLOOR PLANS ---------------- */}
      <section id="floor-plans" className="ps ps-white">
        <div className="container">
          <SecHead n="04" label="Floor plans" title={d.units[0].plot ? 'Choose your plot size' : 'Choose your type'} sub="Pick a type to see its layout and key facts." />
          <FloorPlans d={d} onZoom={zoom} />
        </div>
      </section>

      {/* ---------------- 05 SPECIFICATIONS ---------------- */}
      <section id="specifications" className="ps ps-light">
        <div className="container">
          <SecHead n="05" label="Specifications" title="Built with care, in detail" sub="Specifications are indicative and confirmed by the developer. The full sheet is in the e-brochure." />
          <div className="specs">
            {d.specs.map((g, n) => (
              <article key={g.title} className="spec-card">
                <span className="spec-n">{String(n + 1).padStart(2, '0')}</span>
                <h3>{g.title}</h3>
                <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 06 AMENITIES ---------------- */}
      <section id="amenities" className="ps ps-dark">
        <div className="container">
          <SecHead n="06" label="Amenities" title="Life beyond your front door" light />
          {d.amenities.map((g) => (
            <div key={g.title} className="am-group">
              <h3>{g.title}<span /></h3>
              <ul className="am-grid">
                {g.items.map((a) => (
                  <li key={a}><span><Icon name={amenityIcon(a)} size={22} /></span>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 07 LOCALITY ---------------- */}
      <section id="locality" className="ps ps-light">
        <div className="container">
          <SecHead n="07" label="The locality" title={`Living in ${d.location.area}`} sub="Everything you need within a short drive." />
          <div className="loc-grid">
            {d.locality.map((g) => (
              <article key={g.title} className="loc-card">
                <span className="loc-ic"><Icon name={g.icon} size={24} /></span>
                <h3>{g.title}</h3>
                <ul>{g.items.map(([name, time]) => <li key={name}><span>{name}</span><b>{time}</b></li>)}</ul>
              </article>
            ))}
          </div>
          <p className="fine-note">{d.localityNote}</p>
        </div>
      </section>

      {/* ---------------- 08 LOCATION ---------------- */}
      <section id="location" className="ps ps-white">
        <div className="container">
          <SecHead n="08" label="Location" title="Find us on the map" />
          <div className="lc">
            <div className="lc-map">
              <iframe title={`${p.name} location map`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <aside className="lc-card">
              <span className="loc-ic"><Icon name="pin" size={24} /></span>
              <h3>{p.name}</h3>
              <address>{d.location.area}<br />{d.location.city}</address>
              <p className="muted small">{d.location.note}</p>
              <div className="lc-btns">
                <a className="btn btn-dark" href={dirHref} target="_blank" rel="noreferrer"><Icon name="navigate" size={16} /> Get directions</a>
                <a className="btn btn-line" href={`tel:${SITE.tel}`}><Icon name="phone" size={16} /> Call us</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- 09 HOW WE WORK ---------------- */}
      <section id="how-we-work" className="ps ps-cream">
        <div className="container">
          <SecHead n="09" label="How we work" title="From first call to your keys" sub="One team beside you at every step, and never a rupee of brokerage." />
          <ol className="steps">
            {howWeWork.map((s, n) => (
              <li key={s.title}>
                <span className="st-n">{String(n + 1).padStart(2, '0')}</span>
                <span className="st-i"><Icon name={s.icon} size={24} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- 10 E-BROCHURE ---------------- */}
      <section id="brochure" className="ps ps-dark brochure">
        <div className="container bro">
          <div className="bro-copy">
            <SecHead n="10" label="E-brochure" title="Get the e-brochure" light />
            <p className="bro-lead">Floor plans, the master plan, specifications and price sheet, all in one PDF sent straight to you.</p>
            <ul className="ticks gold">
              {['All floor plans', 'Master plan and layout', 'Full specifications', 'Price and payment plan'].map((t) => <li key={t}><Icon name="check" size={18} /> {t}</li>)}
            </ul>
            <div className="bro-cover" aria-hidden="true">
              <span>{status.label}</span>
              <strong>{p.name}</strong>
              <em>{d.location.area}</em>
              <i />
            </div>
          </div>
          <div className="bro-form"><EnquiryForm mode="brochure" title="Send me the brochure" button="Get e-brochure" project={p.name} /></div>
        </div>
      </section>

      {/* ---------------- FAQ + DEVELOPER ---------------- */}
      <section id="faq" className="ps ps-light">
        <div className="container pd-two">
          <div>
            <SecHead n="11" label="FAQ" title="Questions buyers ask" />
            <div className="faq">
              {d.faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="muted">{a}</p></details>)}
            </div>
          </div>
          <div>
            <SecHead n="12" label="Developer" title="Who builds it" />
            <div className="dev">
              <span className="loc-ic"><Icon name="building" size={24} /></span>
              <h3>{d.developer.name}</h3>
              <p className="muted">{d.developer.address}</p>
              {d.team && <ul>{d.team.map((x) => <li key={x}>{x}</li>)}</ul>}
              <p className="muted small">TG-RERA: {d.rera}</p>
              <div className="lc-btns">
                <Link to="/contact" className="btn btn-dark">Book a site visit</Link>
                <a href={`tel:${SITE.tel}`} className="btn btn-line">Call {SITE.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="ps ps-white">
          <div className="container">
            <SecHead n="+" label="More projects" title="You may also like" />
            <div className="pgrid">{more.map((o, n) => <ProjectCard key={o.slug} p={o} index={n} />)}</div>
          </div>
        </section>
      )}

      {lb && <Lightbox items={lb.items} index={lb.index} onClose={closeLb} onIndex={setLbIndex} />}
    </div>
  );
}

// ==========================================================================
//  DESIGN. PROJECT DETAIL PAGE DESIGN
//  All styling for this file lives here (injected with <style>).
// ==========================================================================
const CSS = `
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:24px}
.card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;transition:transform .25s}
.card:hover{transform:translateY(-4px)}
.ph{background:linear-gradient(135deg,#c9dbe8,#a9bfd1);aspect-ratio:4/3;overflow:hidden}
.ph img{width:100%;height:100%;object-fit:cover}
.ticks{list-style:none;margin:20px 0 28px;display:grid;gap:10px}
.ticks li{display:flex;align-items:center;gap:10px}
.ticks svg{color:var(--navy);flex:none}
.form{background:#fff;border-radius:24px;padding:28px;box-shadow:var(--shadow);display:grid;gap:16px}
.form label{display:grid;gap:6px;font-size:.9rem;font-weight:500}
.form input,.form select,.form textarea{border:1.5px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg);resize:vertical}
.form input:focus,.form select:focus,.form textarea:focus{outline:none;border-color:var(--navy)}
.form small{color:#b3261e}
.ok{background:#e3f4e8;color:#1d6b3a;padding:12px 16px;border-radius:12px}
.empty{background:#fff;border-radius:20px;padding:44px 24px;text-align:center;box-shadow:var(--shadow);display:grid;gap:10px;justify-items:center;color:var(--muted)}
.meta{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:.88rem;color:var(--muted)}
.meta span+span{border-left:1px solid var(--line);padding-left:14px}
.soon .ph{background:linear-gradient(135deg,var(--navy),#0f2238)}
.form-title{font-size:2rem;color:var(--navy)}
.consent{display:flex!important;grid-template-columns:none;gap:12px;align-items:flex-start;font-weight:400!important;font-size:.88rem!important;line-height:1.55;color:var(--ink)}
.consent input{width:20px;height:20px;flex:none;margin-top:3px;accent-color:var(--navy);padding:0}
.consent a{color:var(--navy);text-decoration:underline}
.fine{font-size:.82rem;color:var(--muted);margin-top:-6px}
.ph img.vivid{filter:saturate(1.2) contrast(1.04);transition:transform .8s cubic-bezier(.22,.8,.25,1)}
.card:hover .ph img.vivid{transform:scale(1.06)}
.eyebrow.gold{color:var(--gold)}
.nav{position:fixed;top:var(--nav-top);left:0;right:0;z-index:60;pointer-events:none}
.hero{position:relative;isolation:isolate;display:flex;flex-direction:column;min-height:max(680px,100svh);background:var(--deep2);color:#fff;overflow:hidden}
@keyframes fadeup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.hero h1{color:#fff;font-size:clamp(2.7rem,6.4vw,5.7rem);font-weight:500;line-height:1.02;letter-spacing:-.012em;margin-bottom:24px}
.hero h1 em{color:var(--gold);font-weight:500}
.seg{display:inline-flex;gap:4px;padding:6px;background:#fff;border:1px solid var(--line);border-radius:999px;box-shadow:var(--shadow);max-width:100%}
.seg button{display:inline-flex;align-items:center;gap:10px;border:0;background:none;padding:12px 28px;border-radius:999px;font-weight:600;font-size:.98rem;color:var(--muted);cursor:pointer;transition:background .25s,color .25s}
.seg button:hover{color:var(--navy)}
.seg button.on{background:var(--deep2);color:#fff}
.seg em{font-style:normal;font-size:.76rem;border-radius:99px;padding:1px 9px;background:rgba(33,69,111,.1)}
.seg .on em{background:var(--gold);color:var(--deep)}
.pgrid{width:100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;animation:fadeup .6s both}
.pc{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid rgba(33,69,111,.08);border-radius:24px;overflow:hidden;box-shadow:0 14px 40px rgba(20,35,59,.1);transition:transform .45s cubic-bezier(.2,.7,.2,1),box-shadow .45s}
.pc:hover{transform:translateY(-8px);box-shadow:0 30px 64px rgba(20,35,59,.2)}
.pc-media{position:relative;aspect-ratio:4/3.3;overflow:hidden;background:linear-gradient(135deg,#21456f,#0f2238)}
.pc-media .ph{position:absolute;inset:0;aspect-ratio:auto;background:transparent}
.pc-media img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}
.pc:hover .pc-media img{transform:scale(1.08)}
.pc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,34,56,.3) 0%,transparent 34%,rgba(15,34,56,.88) 100%)}
.pc-tag{position:absolute;top:16px;left:16px;display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.96);color:var(--navy);font-size:.78rem;font-weight:700}
.pc-tag i{width:8px;height:8px;border-radius:50%;background:var(--tan)}
.pc-done .pc-tag i{background:#1f9d55}
.pc-live .pc-tag i{background:#e08a1e}
.pc-soon .pc-tag i{background:#3b82c4}
.pc-no{position:absolute;top:10px;right:20px;font-family:var(--serif);font-style:italic;font-size:2.6rem;color:rgba(255,255,255,.6);line-height:1}
.pc-place{position:absolute;left:18px;right:18px;bottom:16px;display:flex;gap:7px;align-items:center;color:#fff;font-weight:500;font-size:.93rem}
.pc-place svg{color:var(--gold);flex:none}
.pc-body{display:flex;flex-direction:column;gap:14px;flex:1;padding:24px 24px 22px}
.pc-body h3{font-size:2.05rem;font-weight:600;line-height:1.05}
.pc-sum{color:var(--muted);font-size:.95rem;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.pc-stats{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);border-radius:14px;background:#f6f9fb}
.pc-stats>div{padding:12px 14px;min-width:0}
.pc-stats>div+div{border-left:1px solid var(--line)}
.pc-stats dt{display:flex;align-items:center;gap:6px;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tan)}
.pc-stats dd{font-weight:600;font-size:.92rem;margin-top:3px;line-height:1.35}
.pc-foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid var(--line)}
.pc-foot strong{display:block;font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--navy);line-height:1.1}
.pc-foot small{color:#1f9d55;font-weight:500;font-size:.82rem}
.pc-go{flex:none;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;transition:background .3s,color .3s,transform .3s}
.pc:hover .pc-go{background:var(--gold);color:var(--deep);transform:translate(3px,-3px)}
.chip-glass{position:absolute;left:14px;bottom:14px;display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:999px;background:rgba(15,34,56,.74);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:.76rem;font-weight:600}
.pill-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:.8rem;font-weight:600}
.pill-tag i{width:8px;height:8px;border-radius:50%;background:var(--gold)}
.pill-tag.completed i{background:#4ade80}
.pill-tag.ongoing i{background:#fbbf24}
.pill-tag.upcoming i{background:#7dd3fc}
.ticks.gold svg{color:var(--gold)}
.ps-dark .ticks li{color:rgba(255,255,255,.9)}
.ticks.gold li{align-items:flex-start}
.ticks.gold svg{margin-top:3px}
.pdh{position:relative;isolation:isolate;display:flex;flex-direction:column;justify-content:flex-end;min-height:min(92svh,860px);color:#fff;background:var(--deep2)}
.pdh-bg{position:absolute;inset:0;z-index:-2;overflow:hidden;background:radial-gradient(800px 480px at 75% 30%,rgba(70,110,160,.3),transparent 70%),linear-gradient(135deg,#1a3556,#0f2238 70%)}
.pdh-bg img{width:100%;height:100%;object-fit:cover}
.pdh-shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(0deg,rgba(10,22,38,.95) 0%,rgba(10,22,38,.55) 45%,rgba(10,22,38,.5) 100%),linear-gradient(90deg,rgba(10,22,38,.7),transparent 70%)}
.pdh-in{padding-top:calc(var(--nav-top) + var(--nav-h) + 50px);padding-bottom:clamp(90px,10vw,120px)}
.crumbs{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-size:.85rem;color:rgba(255,255,255,.7);margin-bottom:24px}
.crumbs a:hover{color:var(--gold)}
.crumbs span{color:#fff}
.pdh-chips{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
.pdh h1{color:#fff;font-size:clamp(3rem,8.5vw,6.8rem);font-weight:500;line-height:.98;letter-spacing:-.015em}
.pdh-tag{margin:18px 0 32px;font-size:clamp(1.02rem,1.6vw,1.3rem);color:rgba(255,255,255,.86);max-width:640px}
.pdh-cta{display:flex;gap:14px;flex-wrap:wrap}
.pdh-cta .btn{padding:15px 30px}
.pdh-facts-wrap{position:relative;z-index:3;margin-bottom:-48px}
.pdh-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));background:#fff;border-radius:24px;box-shadow:0 26px 64px rgba(10,22,40,.3);color:var(--ink)}
.pdh-facts>div{padding:24px 28px;min-width:0}
.pdh-facts>div+div{border-left:1px solid var(--line)}
.pdh-facts dt{font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--tan)}
.pdh-facts dd{font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--navy);line-height:1.2;margin-top:6px}
.pdh-facts small{display:block;font-family:var(--sans);font-size:.78rem;font-weight:500;color:#1f9d55;margin-top:3px}
.pdnav-wrap{position:sticky;top:calc(var(--nav-top) + var(--nav-h) + 10px);z-index:40;margin-top:76px;pointer-events:none}
.pdnav{pointer-events:auto;display:flex;gap:4px;overflow-x:auto;width:fit-content;max-width:min(1120px,100% - 32px);margin:0 auto;padding:6px;border-radius:999px;background:rgba(20,35,59,.95);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 14px 34px rgba(10,22,40,.3);scrollbar-width:none}
.pdnav::-webkit-scrollbar{display:none}
.pdnav a{flex:none;padding:9px 16px;border-radius:999px;color:rgba(255,255,255,.72);font-size:.88rem;font-weight:500;white-space:nowrap;transition:background .25s,color .25s}
.pdnav a:hover{color:#fff}
.pdnav a.on{background:var(--gold);color:var(--deep);font-weight:600}
.pd-note-bar{display:flex;align-items:center;gap:10px;margin-top:22px;padding:14px 20px;border-radius:14px;background:#fff7e6;border:1px solid #f1d9a3;color:#7a5a12;font-weight:500}
.ps{padding:clamp(64px,9vw,116px) 0;scroll-margin-top:130px}
.ps-light{background:transparent}
.ps-white{background:#fff}
.ps-cream{background:transparent}
.ps-dark{background:radial-gradient(900px 500px at 90% 0%,rgba(70,110,160,.22),transparent 70%),linear-gradient(160deg,#14233b,#0f2238);color:#fff}
.ps-dark h2,.ps-dark h3{color:#fff}
.sh{display:flex;align-items:flex-start;gap:clamp(16px,3vw,28px);margin-bottom:clamp(30px,5vw,50px)}
.sh-n{flex:none;font-family:var(--serif);font-style:italic;font-size:clamp(3.4rem,7vw,5.4rem);line-height:.8;color:transparent;-webkit-text-stroke:1px var(--tan)}
.sh-l{text-transform:uppercase;letter-spacing:.26em;font-size:.74rem;font-weight:700;color:var(--tan);margin-bottom:8px}
.sh h2{font-size:clamp(2rem,4.4vw,3.3rem)}
.sh-s{margin-top:10px;color:var(--muted);max-width:640px}
.sh.light .sh-n{-webkit-text-stroke-color:var(--gold)}
.sh.light .sh-l{color:var(--gold)}
.sh.light .sh-s{color:rgba(255,255,255,.75)}
.ess{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px}
.ess>div{display:grid;grid-template-columns:auto 1fr;column-gap:16px;align-items:center;padding:20px 22px;background:#fff;border:1px solid rgba(33,69,111,.08);border-radius:18px;box-shadow:0 8px 24px rgba(20,35,59,.06);transition:transform .3s,box-shadow .3s}
.ess>div:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(20,35,59,.12)}
.ess-i{grid-row:span 2;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--deep2);color:var(--gold)}
.ess dt{font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--tan)}
.ess dd{font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.ess .is-status dd{color:#1f9d55}
.mp{display:grid;grid-template-columns:1.7fr 1fr;gap:clamp(24px,4vw,44px);align-items:start}
.mp-frame{padding:14px;border-radius:26px;background:rgba(255,255,255,.06);border:1px solid rgba(210,184,143,.35)}
.art-svg{display:block;width:100%;height:auto;border-radius:16px}
.mp-img{display:block;position:relative;width:100%;padding:0;border:0;border-radius:16px;overflow:hidden;cursor:zoom-in;background:#14233b}
.mp-img img{width:100%;height:auto}
.mp-cap{margin-top:12px;padding:0 6px 4px;font-size:.84rem;color:rgba(255,255,255,.65)}
.mp-side h3{font-size:1.8rem;margin-bottom:16px}
.mp-side .ticks{margin:0 0 26px}
.legend{list-style:none;display:flex;flex-wrap:wrap;gap:8px}
.legend li{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:99px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-size:.8rem;color:rgba(255,255,255,.88)}
.legend i{width:12px;height:12px;border-radius:4px;border:1px solid rgba(255,255,255,.4)}
.mosaic{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:clamp(150px,19vw,236px);gap:14px}
.m{position:relative;padding:0;border:0;border-radius:20px;overflow:hidden;cursor:zoom-in;background:linear-gradient(135deg,#21456f,#0f2238)}
.pic{position:absolute;inset:0}
.pic img{width:100%;height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.2,.7,.2,1)}
.m:hover .pic img{transform:scale(1.07)}
.m .chip-glass{opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s}
.m:hover .chip-glass,.m:focus-visible .chip-glass{opacity:1;transform:none}
.m1{grid-column:1/3;grid-row:1/3}
.n6 .m2{grid-column:3/5}
.n6 .m5{grid-column:1/3;grid-row:3}
.n6 .m6{grid-column:3/5;grid-row:3}
.n3 .m2{grid-column:3/5;grid-row:1}
.n3 .m3{grid-column:3/5;grid-row:2}
.n4 .m2{grid-column:3/5}
.n5 .m2{grid-column:3/5}
.seg-wide{display:flex;flex-wrap:wrap;border-radius:26px;margin-bottom:28px}
.fp{display:grid;grid-template-columns:1.55fr 1fr;gap:26px;padding:22px;border-radius:28px;background:var(--paper);border:1px solid rgba(184,160,136,.35)}
.fp-view{min-width:0}
.fp-floors{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.fp-floors button{border:1px solid var(--line);background:#fff;color:var(--navy);padding:7px 16px;border-radius:99px;font-weight:600;font-size:.85rem;cursor:pointer}
.fp-floors .on{background:var(--navy);color:#fff;border-color:var(--navy)}
.plan-svg{border:1px solid rgba(184,160,136,.5)}
.fp-img{position:relative;display:block;width:100%;padding:0;border:0;border-radius:16px;overflow:hidden;background:#fff;cursor:zoom-in}
.fp-img img{width:100%;height:auto}
.fp-note{margin-top:10px;font-size:.84rem;color:var(--muted)}
.fp-info{background:#fff;border-radius:20px;padding:28px;box-shadow:0 10px 28px rgba(20,35,59,.08);align-self:start}
.fp-k{text-transform:uppercase;letter-spacing:.2em;font-size:.7rem;font-weight:700;color:var(--tan)}
.fp-info h3{font-size:2rem;margin:6px 0 18px}
.fp-facts>div{display:flex;justify-content:space-between;gap:16px;padding:11px 0;border-bottom:1px solid var(--line)}
.fp-facts dt{color:var(--muted);font-size:.92rem}
.fp-facts dd{font-weight:600;text-align:right}
.fp-rooms{list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:18px 0 0}
.fp-rooms li{font-size:.78rem;font-weight:500;color:var(--navy);background:rgba(33,69,111,.08);padding:4px 11px;border-radius:99px}
.fp-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
.specs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.spec-card{position:relative;background:#fff;border-radius:22px;padding:30px 28px;border:1px solid rgba(33,69,111,.08);border-top:3px solid var(--tan);box-shadow:0 10px 30px rgba(20,35,59,.07)}
.spec-n{position:absolute;top:14px;right:22px;font-family:var(--serif);font-style:italic;font-size:2.6rem;color:rgba(184,160,136,.4);line-height:1}
.spec-card h3{font-size:1.6rem;margin-bottom:14px;padding-right:46px}
.spec-card ul{list-style:none;display:grid;gap:10px}
.spec-card li{position:relative;padding-left:20px;font-size:.95rem;color:var(--muted);line-height:1.55}
.spec-card li::before{content:'';position:absolute;left:0;top:.62em;width:7px;height:7px;border-radius:50%;background:var(--tan)}
.am-group+.am-group{margin-top:44px}
.am-group h3{display:flex;align-items:center;gap:20px;font-size:1.8rem;margin-bottom:20px;font-style:italic;font-weight:500}
.am-group h3 span{flex:1;height:1px;background:rgba(210,184,143,.3)}
.am-grid{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.am-grid li{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);font-weight:500;line-height:1.3;transition:background .3s,transform .3s,border-color .3s}
.am-grid li:hover{background:rgba(255,255,255,.1);transform:translateY(-3px);border-color:rgba(210,184,143,.5)}
.am-grid li span{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:var(--gold);border:1px solid rgba(210,184,143,.45)}
.loc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.loc-card{background:#fff;border-radius:22px;padding:28px 24px;border:1px solid rgba(33,69,111,.08);box-shadow:0 10px 30px rgba(20,35,59,.07)}
.loc-ic{display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:var(--deep2);color:var(--gold);margin-bottom:16px}
.loc-card h3{font-size:1.45rem;margin-bottom:12px}
.loc-card ul{list-style:none}
.loc-card li{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:11px 0;border-top:1px solid var(--line);font-size:.92rem}
.loc-card li b{flex:none;font-size:.78rem;font-weight:700;color:var(--navy);background:rgba(33,69,111,.08);border-radius:99px;padding:3px 10px;white-space:nowrap}
.fine-note{margin-top:22px;font-size:.84rem;color:var(--muted)}
.lc{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}
.lc-map{min-height:440px;border-radius:26px;overflow:hidden;box-shadow:var(--shadow);background:linear-gradient(135deg,#c9dbe8,#a9bfd1);border:1px solid rgba(33,69,111,.1)}
.lc-map iframe{display:block;width:100%;height:100%;min-height:440px;border:0}
.lc-card,.dev{background:var(--paper);border-radius:26px;padding:clamp(26px,3vw,38px);border:1px solid rgba(184,160,136,.35);align-self:start}
.lc-card h3,.dev h3{font-size:1.9rem;margin-bottom:10px}
.lc-card address{font-style:normal;font-size:1.02rem;margin-bottom:10px}
.lc-btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.dev ul{list-style:none;margin-top:12px;display:grid;gap:4px;color:var(--muted)}
.dev .small{margin-top:12px}
.steps{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.steps li{position:relative;background:#fff;border-radius:24px;padding:32px 28px;border:1px solid rgba(33,69,111,.08);box-shadow:0 12px 32px rgba(20,35,59,.07);transition:transform .3s}
.steps li:hover{transform:translateY(-5px)}
.st-n{position:absolute;top:18px;right:24px;font-family:var(--serif);font-style:italic;font-size:3.4rem;line-height:1;color:rgba(184,160,136,.35)}
.st-i{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--deep2);color:var(--gold);margin-bottom:20px}
.steps h3{font-size:1.6rem;margin-bottom:8px}
.steps p{color:var(--muted);font-size:.96rem}
.bro{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,6vw,72px);align-items:center}
.bro-lead{color:rgba(255,255,255,.8);max-width:480px;margin:-20px 0 22px}
.bro-cover{position:relative;width:min(230px,60%);aspect-ratio:3/4;margin-top:36px;padding:22px 20px;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;border-radius:10px;background:linear-gradient(160deg,#21456f,#0f2238);border:1px solid rgba(210,184,143,.55);box-shadow:0 24px 50px rgba(0,0,0,.4);transform:rotate(-4deg)}
.bro-cover span{font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);font-weight:700}
.bro-cover strong{font-family:var(--serif);font-size:1.9rem;font-weight:500;line-height:1.02;color:#fff}
.bro-cover em{font-size:.8rem;color:rgba(255,255,255,.7)}
.bro-cover i{position:absolute;top:20px;left:20px;right:20px;height:1px;background:rgba(210,184,143,.5)}
.pd-two{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(30px,6vw,64px);align-items:start}
.pd .faq{max-width:none}
.pd .faq details{background:#fff;border:1px solid rgba(33,69,111,.08);border-radius:16px;padding:18px 22px;margin-bottom:10px}
.pd .faq summary{font-size:1.02rem}
.pd .faq details[open]{box-shadow:0 10px 26px rgba(20,35,59,.08)}
.pd .faq details p{margin-top:10px}
.lb{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:70px 76px 54px;background:rgba(8,18,32,.95)}
.lb img{max-width:100%;max-height:100%;object-fit:contain;border-radius:10px;background:#fff0}
.lb-x{position:fixed;top:18px;right:18px;width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.1);color:#fff;display:grid;place-items:center;cursor:pointer}
.lb-n{position:fixed;top:50%;transform:translateY(-50%);width:50px;height:50px;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.1);color:#fff;display:grid;place-items:center;cursor:pointer}
.lb-n.l{left:18px}
.lb-n.r{right:18px}
.lb-n:hover,.lb-x:hover{background:var(--gold);color:var(--deep);border-color:var(--gold)}
.lb-c{position:fixed;bottom:18px;left:0;right:0;text-align:center;color:rgba(255,255,255,.7);font-size:.88rem}
@media (max-width:1100px){
  .specs{grid-template-columns:repeat(2,minmax(0,1fr))}
  .loc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:1000px){
  .pgrid{grid-template-columns:1fr;gap:22px}
  .pc{flex-direction:row}
  .pc-media{width:44%;flex:none;aspect-ratio:auto;min-height:340px}
  .mp,.fp,.lc,.bro,.pd-two{grid-template-columns:1fr}
  .steps{grid-template-columns:repeat(2,minmax(0,1fr))}
  .pdh-facts{grid-template-columns:repeat(2,minmax(0,1fr))}
  .pdh-facts>div:nth-child(3){border-left:0}
  .pdh-facts>div:nth-child(n+3){border-top:1px solid var(--line)}
  .pdh-facts-wrap{margin-bottom:-90px}
  .pdnav-wrap{margin-top:120px}
}
@media (max-width:900px){
  .hero{min-height:max(640px,100svh)}
}
@media (max-width:640px){
  .hero h1{font-size:clamp(2.5rem,11.5vw,3.4rem)}
  .seg{display:flex;width:100%}
  .seg button{flex:1;justify-content:center;padding:12px 8px;font-size:.88rem;gap:6px}
  .pc{flex-direction:column}
  .pc-media{width:100%;aspect-ratio:4/3.1;min-height:0}
  .pc-body{padding:20px 20px 18px}
  .pc-body h3{font-size:1.85rem}
  .pdh{min-height:auto}
  .pdh-in{padding-bottom:70px}
  .pdh-cta .btn{flex:1;min-width:150px}
  .pdh-facts>div{padding:18px 18px}
  .pdh-facts dd{font-size:1.2rem}
  .pdnav-wrap{margin-top:112px}
  .sh{flex-direction:column;gap:6px}
  .sh-n{font-size:3rem}
  .mosaic{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:150px;gap:10px}
  .mosaic .m,.n6 .m2,.n6 .m5,.n6 .m6,.n3 .m2,.n3 .m3,.n4 .m2,.n5 .m2{grid-column:auto;grid-row:auto}
  .mosaic .m1{grid-column:1/-1;grid-row:span 2}
  .m .chip-glass{opacity:1;transform:none}
  .specs,.loc-grid,.steps{grid-template-columns:1fr}
  .fp{padding:14px;border-radius:22px}
  .fp-info{padding:22px}
  .seg-wide{border-radius:22px}
  .seg-wide button{flex:1 1 auto}
  .lc-map,.lc-map iframe{min-height:320px}
  .lb{padding:64px 12px 48px}
  .lb-n{top:auto;bottom:8px;transform:none;width:44px;height:44px}
  .lb-n.l{left:calc(50% - 90px)}
  .lb-n.r{right:calc(50% - 90px)}
  .lb-c{display:none}
  .am-grid{grid-template-columns:1fr 1fr;gap:10px}
  .am-grid li{padding:12px;gap:10px;font-size:.9rem}
  .am-grid li span{width:38px;height:38px}
}
.ps-dark .form h2,.ps-dark .form .form-title{color:var(--navy)}
@media (min-width:1200px){
  .ess>div:last-child:nth-child(4n+1){grid-column:span 2}
}
.pd .faq summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;font-weight:600;cursor:pointer}
.pd .faq summary::-webkit-details-marker{display:none}
.pd .faq summary::after{content:'+';font-size:1.5rem;line-height:1;color:var(--navy);flex:none}
.pd .faq details[open] summary::after{content:'−'}
@media (max-width:900px){
  .hero{min-height:calc(100svh - 56px)}
}
`;
