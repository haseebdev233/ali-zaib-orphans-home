import { donationDetails } from '../data/donationDetails';
import {
  aboutDefaults, campusAmbassadorDefaults, contactDefaults, galleryDefaults, homeDefaults,
  privacyDefaults, programsDefaults, sponsorDefaults, supportDefaults, termsDefaults, volunteerDefaults,
} from '../data/siteContent';

const text = (key, label, max = 300) => ({ key, label, max, required: true });
const body = (key, label, max = 4000, rows = 4) => ({ ...text(key, label, max), rows, type: 'textarea' });
const photo = (key, label) => ({ key, label, type: 'image', required: true });
const list = (key, label, itemLabel, fields, initial, min) => ({ key, label, itemLabel, fields, initial, min, type: 'list' });
const intro = [text('title', 'Page title'), body('intro', 'Introduction')];
const hero = [...intro, photo('heroImage', 'Banner image')];
const photoFields = [text('alt', 'Image description'), photo('src', 'Image')];
const policy = [
  ...hero,
  text('bodyTitle', 'Policy heading'),
  body('body', 'Policy text (## headings, - bullets, **bold**)', 45000, 22),
];
const statement = (prefix, label) => [
  text(`${prefix}Title`, `${label} heading`),
  body(`${prefix}Message`, `${label} message`, 12000, 8),
  text(`${prefix}Name`, `${label} name`),
  text(`${prefix}Role`, `${label} role`),
  photo(`${prefix}Photo`, `${label} portrait`),
];

export const pages = {
  home: {
    label: 'Homepage',
    defaults: homeDefaults,
    fields: [
      text('heroTitle', 'Homepage title'),
      text('heroIntro', 'Homepage subtitle'),
      list('heroSlides', 'Homepage banner photos', 'photo', [
        photo('src', 'Banner photo'),
        { key: 'fit', label: 'Fit', type: 'select', options: [['cover', 'Fill banner'], ['contain', 'Show entire image']] },
      ], { fit: 'cover', position: 'center center' }, 1),
      text('aboutTitle', 'Who We Are heading'),
      body('aboutText', 'Who We Are text'),
      photo('aboutPhoto', 'Who We Are photo'),
      text('joinTitle', 'Join Us heading'), body('joinIntro', 'Join Us text'), photo('joinPhoto', 'Join Us photo'),
      text('servicesTitle', 'Donation appeal heading'), body('servicesIntro', 'Donation appeal text'), text('servicesImpact', 'Donation impact heading'),
      ...statement('chairman', 'Chairman'),
      ...statement('manager', 'Program Manager'),
    ],
  },
  about: {
    label: 'About',
    defaults: aboutDefaults,
    fields: [
      ...hero, body('about', 'About Us'), body('vision', 'Our vision'), body('mission', 'Our mission'),
      text('facilitiesTitle', 'Facilities heading'), body('facilitiesIntro', 'Facilities introduction'),
      list('facilities', 'Facilities', 'facility', [text('title', 'Facility title'), body('description', 'Description')], {}),
      text('recognitionTitle', 'Recognition heading'), body('recognitionIntro', 'Recognition introduction'),
      list('certificates', 'Recognition certificates', 'certificate', photoFields, { alt: 'Certificate' }),
    ],
  },
  programs: {
    label: 'Programs',
    defaults: programsDefaults,
    fields: [
      ...intro, text('communityTitle', 'Community invitation heading'), body('communityIntro', 'Community invitation'),
      text('ambassadorTitle', 'Campus Ambassador heading'), body('ambassadorIntro', 'Campus Ambassador introduction'), photo('ambassadorImage', 'Campus Ambassador image'),
      text('volunteerTitle', 'Volunteer heading'), body('volunteerIntro', 'Volunteer introduction'), photo('volunteerImage', 'Volunteer image'),
    ],
  },
  gallery: {
    label: 'Gallery',
    defaults: galleryDefaults,
    fields: [
      text('title', 'Page title'),
      list('sections', 'Gallery albums', 'album', [
        text('title', 'Album name'),
        list('media', 'Photos and videos', 'photo', [
          text('alt', 'Description'), { ...photo('src', 'Photo'), show: (item) => item.type === 'image' },
        ], { type: 'image' }),
      ], { media: [] }),
    ],
  },
  donate: {
    label: 'Donation',
    defaults: donationDetails,
    fields: [
      ...intro,
      list('accounts', 'Bank accounts', 'account', [
        text('bank', 'Bank name', 120), text('title', 'Account title'), text('branchLabel', 'Branch field label'),
        text('branch', 'Branch details'), text('accountNumber', 'Account number'), text('iban', 'IBAN'),
      ], { branchLabel: 'Branch' }, 1),
      text('walletTitle', 'JazzCash account title'), text('walletNumber', 'JazzCash number'),
      text('tillId', 'JazzCash Till ID'), photo('qrImage', 'JazzCash QR code'),
    ],
  },
  volunteer: { label: 'Volunteer', defaults: volunteerDefaults, fields: intro },
  'campus-ambassador': { label: 'Campus Ambassador', defaults: campusAmbassadorDefaults, fields: intro },
  contact: {
    label: 'Contact',
    defaults: contactDefaults,
    fields: [
      ...intro, { ...text('email', 'Email'), type: 'email' },
      list('phones', 'Phone numbers', 'number', [text('label', 'Label'), text('number', 'Phone number', 40)], {}),
      list('locations', 'Locations', 'location', [text('name', 'Name'), text('address', 'Address'), { ...text('mapLink', 'Google Maps link', 1200), type: 'url' }], {}),
    ],
  },
  'sponsor-an-orphan': {
    label: 'Sponsor an Orphan',
    defaults: sponsorDefaults,
    fields: [
      ...hero, photo('hadithImage', 'Hadith image'), photo('closingImage', 'Closing banner image'),
      list('profiles', 'Sponsorship profiles', 'profile', [
        text('name', 'Name'),
        { ...text('age', 'Age'), type: 'number', min: 0, numberMax: 25 },
        body('story', 'Profile story'), text('photoDescription', 'Photo description'), photo('photo', 'Profile photo'),
      ], {}),
      list('photos', 'Sponsorship gallery', 'photo', photoFields, {}),
    ],
  },
  'support-us': {
    label: 'Support Us',
    defaults: supportDefaults,
    fields: [...hero, photo('hadithImage', 'Hadith image'), text('inKindTitle', 'In-kind donations heading'), body('inKindIntro', 'In-kind donations introduction'),
      list('inKindItems', 'In-kind donation categories', 'category', [text('title', 'Category title'), body('description', 'Description')], {})],
  },
  privacy: { label: 'Privacy Policy', defaults: privacyDefaults, fields: policy },
  terms: { label: 'Terms of Service', defaults: termsDefaults, fields: policy },
};


export const inboxOptions = {
  donations: { label: 'Donations', statuses: ['pending', 'verified', 'rejected'] },
  'newsletter-subscribers': { label: 'Newsletter signups', statuses: ['subscribed', 'unsubscribed'] },
  volunteers: { label: 'Volunteers', statuses: ['pending', 'approved', 'declined'] },
  'campus-ambassadors': { label: 'Campus Ambassadors', statuses: ['pending', 'approved', 'declined'] },
};
