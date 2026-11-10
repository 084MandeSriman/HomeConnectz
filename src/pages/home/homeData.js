import { SERVICE as granite } from '../services/Granite.jsx';
import { SERVICE as residential } from '../services/Residential.jsx';
import { SERVICE as solar } from '../services/Solar.jsx';

export const SITE = { phone: '+91 98663 84827', tel: '+919866384827' };

export const E = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
export const H = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=75`;
export const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export const slides = [
  { img: H('photo-1613490493576-7fde63acd811'), fallback: '/images/srivari-gate.jpg', eyebrow: 'HomeConnectz · Hyderabad', label: 'Zero brokerage', icon: 'key',
    title: 'Find your dream home in Hyderabad, without paying brokerage', accent: 'without paying brokerage',
    text: 'Verified ready-to-move homes from trusted builders, with expert guidance and home loan support.' },
  { img: '/images/srivari-aerial.jpg', fallback: '/images/srivari-card.jpg', eyebrow: 'Featured · Mokila', label: 'Srivari Meadows', icon: 'home',
    title: 'Srivari Meadows: 117 villas on 14 acres', accent: '117 villas',
    text: 'Luxury 4 BHK villas at Mokila by Vara Prasad Constructions. Ready to move in.' },
  { img: H('photo-1545324418-cc1a3fa10c00'), fallback: '/images/srivari-masterplan.jpg', eyebrow: 'Apartments & plots', label: 'Gated communities', icon: 'building',
    title: 'Apartments, villas and plots from verified developers', accent: 'verified developers',
    text: 'Guided site visits, clear paperwork and registration help, from first visit to final handover.' },
  { img: H('photo-1556911220-bff31c812dba'), fallback: '/images/services/granite.svg', eyebrow: 'Our services · Granite', label: 'Granite finishing', icon: 'layers',
    title: 'Premium granite for kitchens, floors and staircases', accent: 'Premium granite',
    text: 'Cut, polished and fitted to your plan by the same team you buy your home with.' },
  { img: H('photo-1509391366360-2e959784a276'), fallback: '/images/services/solar.svg', eyebrow: 'Our services · Solar', label: 'Rooftop solar', icon: 'sun',
    title: 'Power your home with rooftop solar and cut your bill', accent: 'rooftop solar',
    text: 'Free rooftop assessment, net-metering support, installation and servicing.' },
];

export const statuses = [
  { key: 'upcoming', label: 'Upcoming', long: 'Upcoming projects', blurb: 'Pre-launch projects open for early registration.', empty: 'No upcoming projects to show yet.' },
  { key: 'ongoing', label: 'Ongoing', long: 'Ongoing projects', blurb: 'Under construction or now selling. Ask for the latest site update.', empty: 'No ongoing projects right now.' },
  { key: 'completed', label: 'Completed', long: 'Completed projects', blurb: 'Ready to move in and handed-over communities.', empty: 'No completed projects to show yet.' },
];

// Only Sapphire Residences and Srivari Meadows are currently shown in the project listings.
export const projects = [
  {
    "slug": "sapphire-residences",
    "city": "Hyderabad",
    "type": "apartments",
    "bhk": "Apartment homes",
    "possession": "Upcoming",
    "status": "upcoming",
    "tag": "Upcoming",
    "name": "Sapphire Residences",
    "meta": [
      "Near ORR Exit 2, Hyderabad",
      "Luxury G+11 floor apartments",
      "1,900–2,750 sq ft"
    ],
    "summary": "Upcoming apartments with a clubhouse, high-speed lifts, landscaped gardens and easy access to ORR Exit 2.",
    "price": "Price on request",
    "priceNote": "Ask for launch details",
    "img": "/images/sapphire-residences.png"
  },
  {
    "slug": "ortus",
    "city": "Hyderabad",
    "type": "apartments",
    "bhk": "3 BHK",
    "possession": "Possession: Dec 2028",
    "status": "upcoming",
    "tag": "Coming soon",
    "name": "Ortus",
    "meta": [
      "Narsingi, West Hyderabad",
      "3 BHK boutique residences",
      "1,720–2,150 sq ft"
    ],
    "summary": "Low-rise boutique residences with large balconies and private sky gardens. Details are under verification; register for first access.",
    "price": "Price at launch",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&h=1100&q=75",
    "fallback": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "aurelia-skyline",
    "city": "Hyderabad",
    "type": "apartments",
    "bhk": "3 & 4 BHK",
    "possession": "Possession: Mar 2029",
    "status": "upcoming",
    "tag": "Pre-launch",
    "name": "Aurelia Skyline",
    "meta": [
      "Kokapet, West Hyderabad",
      "3 & 4 BHK apartments",
      "1,650–2,400 sq ft"
    ],
    "summary": "High-rise residences with a sky deck, clubhouse and generous balconies. Register now for early access to launch details.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&h=1100&q=75",
    "fallback": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "verdant-courtyard-villas",
    "city": "Hyderabad",
    "type": "villas",
    "bhk": "4 BHK",
    "possession": "Possession: Jun 2028",
    "status": "upcoming",
    "tag": "Pre-launch",
    "name": "Verdant Courtyard Villas",
    "meta": [
      "Kompally, North Hyderabad",
      "4 BHK courtyard villas",
      "3,200–3,900 sq ft"
    ],
    "summary": "Gated villas built around private courtyards, with a clubhouse, wide internal roads and plenty of greenery.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "lakeside-residences",
    "city": "Hyderabad",
    "type": "apartments",
    "bhk": "2 & 3 BHK",
    "possession": "Possession: Sep 2027",
    "status": "ongoing",
    "tag": "Under construction",
    "name": "Lakeside Residences",
    "meta": [
      "Himayat Sagar Road, South Hyderabad",
      "2 & 3 BHK apartments",
      "1,150–1,750 sq ft"
    ],
    "summary": "Lake-facing apartments with a landscaped podium, co-working lounge and kids’ zone. Ask us for the latest site update.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&h=1100&q=75",
    "fallback": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "palm-grove-plots",
    "city": "Hyderabad",
    "type": "plots",
    "bhk": "Open plots",
    "possession": "Registration: Ready",
    "status": "ongoing",
    "tag": "Now selling",
    "name": "Palm Grove Plots",
    "meta": [
      "Ghatkesar, East Hyderabad",
      "Gated open plots",
      "200–400 sq yds"
    ],
    "summary": "Gated plotted layout with wide roads, avenue plantation and underground utilities. Ask us for approvals and title documents.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "orchid-enclave",
    "city": "Hyderabad",
    "type": "villas",
    "bhk": "3 & 4 BHK",
    "possession": "Possession: Mar 2027",
    "status": "ongoing",
    "tag": "Under construction",
    "name": "Orchid Enclave",
    "meta": [
      "Shamshabad, South Hyderabad",
      "3 & 4 BHK villas",
      "1,950–2,600 sq ft"
    ],
    "summary": "A gated villa community near the airport corridor, with a clubhouse, tree-lined streets and private gardens.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "srivari-meadows",
    "city": "Hyderabad",
    "type": "villas",
    "bhk": "4 BHK",
    "possession": "Possession: Ready",
    "status": "completed",
    "tag": "Ready to move",
    "name": "Srivari Meadows",
    "meta": [
      "Mokila, Hyderabad",
      "4 BHK villas, G+2",
      "4,254–5,000 sq ft"
    ],
    "summary": "117 villas on 14 acres by Vara Prasad Constructions. Lift, home theatre and terrace garden in every villa. 100% Vaastu. TG-RERA P02400004825.",
    "price": "₹5 Cr onwards",
    "priceNote": "Builder price, zero brokerage",
    "img": "/images/srivari-home-project.png"
  },
  {
    "slug": "maple-court",
    "city": "Hyderabad",
    "type": "apartments",
    "bhk": "3 BHK",
    "possession": "Possession: 2021",
    "status": "completed",
    "tag": "Handed over",
    "name": "Maple Court",
    "meta": [
      "Begumpet, Central Hyderabad",
      "3 BHK apartments",
      "1,400–1,650 sq ft"
    ],
    "summary": "A gated apartment community now home to settled families. Ask us about resale and rental options.",
    "price": "Resale on request",
    "priceNote": "Ask us for current availability",
    "img": "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&h=1100&q=75",
    "fallback": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "sunrise-greens",
    "city": "Hyderabad",
    "type": "villas",
    "bhk": "Duplex",
    "possession": "Possession: Ready",
    "status": "completed",
    "tag": "Ready to move",
    "name": "Sunrise Greens",
    "meta": [
      "Tellapur, West Hyderabad",
      "Duplex villas",
      "2,600–3,200 sq ft"
    ],
    "summary": "Ready-to-occupy duplex villas in a green gated community with a clubhouse, jogging track and play areas.",
    "price": "Price on request",
    "priceNote": "Ask us for current availability",
    "img": "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "aster-park-villas",
    "city": "Bengaluru",
    "type": "villas",
    "bhk": "4 BHK",
    "possession": "Possession: Dec 2028",
    "page": false,
    "status": "upcoming",
    "tag": "Pre-launch",
    "name": "Aster Park Villas",
    "meta": [
      "Sarjapur Road, East Bengaluru",
      "4 BHK garden villas",
      "3,000–3,600 sq ft"
    ],
    "summary": "Gated villas with private gardens, a clubhouse and wide tree-lined streets. Register now for early access.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&h=1100&q=75"
  },
  {
    "slug": "serene-heights",
    "city": "Bengaluru",
    "type": "apartments",
    "bhk": "2 & 3 BHK",
    "possession": "Possession: Jun 2028",
    "page": false,
    "status": "ongoing",
    "tag": "Under construction",
    "name": "Serene Heights",
    "meta": [
      "Whitefield, East Bengaluru",
      "2 & 3 BHK apartments",
      "1,200–1,850 sq ft"
    ],
    "summary": "Modern apartments close to the IT corridor, with a podium garden, gym and co-working lounge.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&h=1100&q=75"
  },
  {
    "slug": "greenfield-plots",
    "city": "Bengaluru",
    "type": "plots",
    "bhk": "Open plots",
    "possession": "Registration: Ready",
    "page": false,
    "status": "ongoing",
    "tag": "Now selling",
    "name": "Greenfield Plots",
    "meta": [
      "Devanahalli, North Bengaluru",
      "Gated open plots",
      "1,200–2,400 sq ft"
    ],
    "summary": "Approved gated plots near the airport corridor, with wide roads, avenue plantation and a park.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&h=1100&q=75"
  },
  {
    "slug": "hebbal-lakeview",
    "city": "Bengaluru",
    "type": "apartments",
    "bhk": "3 BHK",
    "possession": "Possession: Ready",
    "page": false,
    "status": "completed",
    "tag": "Ready to move",
    "name": "Hebbal Lakeview",
    "meta": [
      "Hebbal, North Bengaluru",
      "3 BHK apartments",
      "1,450–1,900 sq ft"
    ],
    "summary": "Ready-to-move lake-view apartments with a clubhouse, swimming pool and kids’ play area.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&h=1100&q=75"
  }
].filter((project) => ['sapphire-residences', 'srivari-meadows'].includes(project.slug));

export const services = [residential, granite, solar].map((service) => ({
  ...service,
  img: service.image,
}));


export const CITIES = ['Hyderabad'];
export const TYPES = [['all', 'All Projects'], ['apartments', 'Apartments'], ['villas', 'Villas'], ['plots', 'Plots'], ['commercial', 'Commercial']];
