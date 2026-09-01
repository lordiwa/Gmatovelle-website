import { profile } from '@/data/profile.js';
import { contact } from '@/data/contact.js';

export default {
  htmlLang: 'en',

  meta: {
    home: {
      title: 'Dr. Gonzalo Matovelle · Neuropsychiatrist in Quito, Ecuador',
      description:
        'Dr. Gonzalo Matovelle is a neuropsychiatrist, with 40 years of private practice in Quito, Ecuador focused on medication management and control for anxiety, depression, bipolar disorder, obsessive-compulsive disorder (OCD) and autism. Past President of the Ecuadorian Psychiatric Association. Appointments by phone at ' +
        contact.phone + '.',
    },
    contact: {
      title: 'Contact · Dr. Gonzalo Matovelle, Neuropsychiatrist in Quito',
      description:
        'Contact Dr. Gonzalo Matovelle, neuropsychiatrist in Quito, Ecuador. Appointments are arranged by phone at ' +
        contact.phone + '.',
    },
    blog: {
      title: 'Articles · Dr. Gonzalo Matovelle, Neuropsychiatrist in Quito',
      description:
        'Articles on psychiatry, neuropsychiatry and medication management by Dr. Gonzalo Matovelle, neuropsychiatrist in Quito, Ecuador. Coming soon.',
    },
    notFound: {
      title: 'Page not found · Dr. Gonzalo Matovelle',
      description: 'The requested page does not exist on Dr. Gonzalo Matovelle’s website.',
    },
  },

  nav: {
    brand: 'Dr. Gonzalo Matovelle',
    brandRole: 'Neuropsychiatrist',
    home: 'Home',
    contact: 'Contact',
    blog: 'Articles',
    skipToContent: 'Skip to main content',
    languageGroupLabel: 'Site language',
    switchLanguage: 'View this site in Spanish',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  /**
   * Home hero, "Navy of trust" (1c) redesign.
   *
   * The h1 is no longer the Dr.'s name but an editorial headline (client design
   * decision). The entity signal is not lost: the name and qualifications live
   * in `credentialLine`, rendered immediately below the h1 inside the hero.
   */
  hero: {
    eyebrow: 'Quito, Ecuador · 40 years of practice',
    headline: 'Four decades of mental health care with medical rigour',
    credentialLine:
      'Dr. Gonzalo Matovelle · Doctor of Medicine and Surgery · Specialist in Psychiatry',
    summary:
      'Dr. Gonzalo Patricio Matovelle Mediavilla is a neuropsychiatrist, with 40 years of private practice in Quito, Ecuador. His practice centres on expert medication management and control, with particular experience in anxiety, depression, bipolar disorder, obsessive-compulsive disorder (OCD) and autism.',
    primaryCta: 'Call the practice',
    portraitAlt:
      'Portrait of Dr. Gonzalo Matovelle, neuropsychiatrist in Quito, Ecuador',
    portraitCaption: 'Dr. Gonzalo Patricio Matovelle Mediavilla · Quito, Ecuador',
    /**
     * Credential band replacing the old hero "facts" row. The client fixed
     * these three items and their order ("40 años / Quito / WPA·WFSBP"); a
     * literal lock verifies it. It is not a free showcase: all three are
     * backed by the CV (the forty years of practice and the city in the
     * profile, the two societies in the `credentials` memberships).
     */
    credentialBand: ['40 years of experience', 'Quito', 'WPA · WFSBP'],
  },

  about: {
    heading: 'Professional profile',
    lead: 'Four decades of continuous clinical practice in psychiatry, with a verifiable professional and academic record.',
    paragraphs: [
      'Dr. Gonzalo Patricio Matovelle Mediavilla holds a Doctorate in Medicine and Surgery and is a Specialist in Psychiatry. He is a neuropsychiatrist and runs a private practice in Quito, Ecuador, focused on expert management and control of neuropsychiatric medication, with particular experience in anxiety, depression, bipolar disorder, obsessive-compulsive disorder (OCD) and autism.',
      'Across forty years of private practice as a psychiatrist and psychopharmacologist he has served as a liaison psychiatrist at the leading clinics of Quito, has held the leading professional offices of the speciality in Ecuador and in the region, and has been a visiting lecturer in Psychopharmacology at the Postgraduate School of Psychiatry of the Universidad Central del Ecuador.',
      'He has also lectured nationally and internationally and been invited to international advisory boards.',
    ],
  },

  practice: {
    heading: 'Focus of the practice',
    lead: 'Medication management and control is the central pillar of Dr. Matovelle’s practice, which also rests on psychoeducation.',
    items: [
      {
        title: 'Medication management and control',
        body: 'Central pillar of the practice: expert control of psychotropic medication, backed by four decades of clinical experience as a neuropsychiatric psychopharmacologist.',
      },
      {
        title: 'Psychoeducation',
        body: 'Explanatory work with the patient and their family so that they understand the diagnosis, the treatment and its course.',
      },
    ],
  },

  /**
   * Clinical areas of expertise confirmed by the client (see
   * profile.declaredConditions). These are the only five conditions the site
   * may name as highlighted expertise: do not add more without new
   * confirmation. The client widened the list from three to five on
   * 2026-09-01, adding obsessive-compulsive disorder and autism.
   */
  expertise: {
    heading: 'Areas of expertise',
    headline: 'Five conditions, one standard of care',
    lead: 'The conditions where Dr. Matovelle concentrates his clinical experience and medication management.',
    items: [
      {
        title: 'Anxiety',
        body: 'Expert medication management and control for anxiety.',
      },
      {
        title: 'Depression',
        body: 'Expert medication management and control for depressive illness.',
      },
      {
        title: 'Bipolar disorder',
        body: 'Expert medication management and control for bipolar disorder.',
      },
      {
        title: 'Obsessive-compulsive disorder (OCD)',
        body: 'Expert medication management and control for obsessive-compulsive disorder.',
      },
      {
        title: 'Autism',
        body: 'Expert medication management and control in autism, focused on the symptoms that respond to pharmacological treatment.',
      },
    ],
  },

  credentials: {
    heading: 'Credentials and background',
    lead: 'Every item in this section comes from Dr. Matovelle’s curriculum vitae.',
    groups: [
      {
        title: 'Education and qualifications',
        items: ['Doctor of Medicine and Surgery', 'Specialist in Psychiatry'],
      },
      {
        title: 'Professional practice',
        items: [
          'Forty years of private practice as a Psychiatrist and Psychopharmacologist',
          'Liaison psychiatrist at the leading clinics of Quito',
          'Psychiatrist with expertise in neuropsychiatric medication management and psychoeducation',
        ],
      },
      {
        title: 'Offices held',
        items: [
          'Past President of the Ecuadorian Psychiatric Association',
          'Past President of the Ecuadorian Society of Biological Psychiatry',
          'Past Secretary Treasurer of the Latin American Federation of Biological Psychiatry',
          'Scientific Officer of the Ecuadorian Society of Biological Psychiatry',
        ],
      },
      {
        title: 'Teaching',
        items: [
          'Visiting lecturer in Psychopharmacology at the Postgraduate School of Psychiatry of the Universidad Central del Ecuador',
        ],
      },
      {
        title: 'Scientific memberships',
        items: [
          'World Psychiatric Association (WPA)',
          'World Federation of Societies of Biological Psychiatry (WFSBP)',
          'American Academy of Sleep Disorders',
          'Ecuadorian Psychiatric Association (member and Past President)',
          'Ecuadorian Society of Biological Psychiatry (member and Past President)',
          'Argentine Society of Biological Psychiatry (foreign corresponding member)',
          'Peruvian Society of Biological Psychiatry (corresponding member)',
          'Uruguayan Society of Biological Psychiatry (corresponding member)',
          'Peruvian Society of Obstetrics and Gynaecology (corresponding member)',
          'Ecuadorian Society of Medical Writers',
        ],
      },
      {
        title: 'Lecturing and scientific advisory work',
        items: [
          'National and international lecturer',
          'Invited to international advisory boards',
          'International Scientific Advisor to the Hellenic Psychiatric Congress (2004-2006)',
        ],
      },
    ],
  },

  publications: {
    heading: 'Publications',
    lead: 'Books and scientific articles authored or co-authored by Dr. Matovelle.',
    items: [
      { title: 'Manual Latinoamericano para la Enfermedad Depresiva', note: null },
      { title: 'Enfermedad de Alzheimer', note: 'Cangrejal Editores L.A.' },
    ],
    articlesNote: 'Author of numerous scientific articles and publications in psychiatry.',
  },

  faq: {
    heading: 'Frequently asked questions',
    lead: 'Short, verifiable answers about Dr. Matovelle and his practice.',
    items: [
      {
        question: 'Who is Dr. Gonzalo Matovelle?',
        answer:
          'Dr. Gonzalo Patricio Matovelle Mediavilla holds a Doctorate in Medicine and Surgery and is a Specialist in Psychiatry, with a private practice in Quito, Ecuador. He is Past President of the Ecuadorian Psychiatric Association and Past President of the Ecuadorian Society of Biological Psychiatry.',
      },
      {
        question: 'Where does Dr. Matovelle practise?',
        answer:
          'He practises privately at ' + contact.address + ', ' + profile.city + ', ' +
          profile.country + '.',
      },
      {
        question: 'How do I book an appointment with Dr. Matovelle?',
        answer:
          'Appointments are booked by phone at ' + contact.phone +
          '. The practice does not use web forms or online booking systems: everything is arranged over the phone.',
      },
      {
        question: 'How many years of experience does Dr. Matovelle have?',
        answer:
          'Forty years of private practice as a psychiatrist and psychopharmacologist in Quito, Ecuador.',
      },
      {
        question: 'What conditions does Dr. Matovelle treat?',
        answer:
          'His practice focuses on medication management and control for anxiety, depression, bipolar disorder, obsessive-compulsive disorder (OCD) and autism.',
      },
      {
        question: 'Has Dr. Matovelle published books or articles?',
        answer:
          'Yes. He is an author of the Manual Latinoamericano para la Enfermedad Depresiva and of the book Enfermedad de Alzheimer, published by Cangrejal Editores L.A., as well as numerous scientific articles and publications in psychiatry.',
      },
      {
        question: 'What is the difference between a psychiatrist and a psychologist?',
        answer:
          'A psychiatrist is a medical doctor who specialised in psychiatry and, being a physician, can diagnose medical conditions and prescribe medication. A psychologist is not a physician and does not prescribe medication: their work is assessment and psychotherapy. The two roles are often complementary.',
      },
    ],
  },

  contact: {
    heading: 'Contact',
    lead: 'Appointments with Dr. Matovelle are arranged by phone.',
    phoneLabel: 'Practice phone number',
    emailLabel: 'Practice email',
    callCta: 'Call ' + contact.phone,
    callNowCta: 'Call now',
    whatsappCta: 'Message on WhatsApp',
    // Strings for the home page's compact contact strip (ContactPanel variant
    // "compact"): short label plus a note carrying the short location.
    enquiriesLabel: 'Enquiries',
    compactNote:
      'Appointments are arranged by phone, speaking directly with the practice. Private practice in Quito, Ecuador.',
    noBookingNote:
      'There is no form and no online booking: appointments are arranged by speaking directly with the practice.',
    locationLabel: 'Location',
    locationValue:
      'Private practice at ' + contact.address + ', ' + profile.city + ', ' + profile.country + '.',
    mapTitle: "Map of Dr. Matovelle's practice location",
    emergencyTitle: 'In an emergency',
    emergencyBody:
      'If you or someone close to you is at immediate risk, go to the nearest emergency department or call 911. This site does not handle emergencies.',
  },

  // Copy for the articles section. The section is DISABLED (see the
  // reactivation steps in src/router/routes.js); the strings stay untouched so
  // bringing it back does not mean rewriting the copy or its metadata.
  blog: {
    heading: 'Articles',
    lead: 'A space for writing on psychiatry and psychopharmacology by Dr. Matovelle.',
    comingSoonTitle: 'Coming soon',
    comingSoonBody:
      'The first articles will be published here. In the meantime you can read Dr. Matovelle’s professional profile or contact the practice.',
    backHome: 'Back to home',
  },

  notFound: {
    heading: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    backHome: 'Back to home',
  },

  footer: {
    role: 'Neuropsychiatrist · ' + profile.city + ', ' + profile.country,
    disclaimer:
      'This website is for information purposes only; it does not replace an in-person medical consultation and does not constitute a diagnosis.',
    rights: 'All rights reserved.',
  },
};
