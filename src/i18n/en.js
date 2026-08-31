import { profile } from '@/data/profile.js';
import { contact } from '@/data/contact.js';

export default {
  htmlLang: 'en',

  meta: {
    home: {
      title: 'Dr. Gonzalo Matovelle · Psychiatrist in Quito, Ecuador',
      description:
        'Dr. Gonzalo Matovelle is a psychiatrist and psychopharmacologist with 40 years of private practice in Quito, Ecuador. Past President of the Ecuadorian Psychiatric Association. Appointments by phone at ' +
        contact.phone + '.',
    },
    contact: {
      title: 'Contact · Dr. Gonzalo Matovelle, Psychiatrist in Quito',
      description:
        'Contact Dr. Gonzalo Matovelle, psychiatrist in Quito, Ecuador. Appointments are arranged by phone at ' +
        contact.phone + '.',
    },
    blog: {
      title: 'Articles · Dr. Gonzalo Matovelle, Psychiatrist in Quito',
      description:
        'Articles on psychiatry and psychopharmacology by Dr. Gonzalo Matovelle, psychiatrist in Quito, Ecuador. Coming soon.',
    },
    notFound: {
      title: 'Page not found · Dr. Gonzalo Matovelle',
      description: 'The requested page does not exist on Dr. Gonzalo Matovelle’s website.',
    },
  },

  nav: {
    brand: 'Dr. Gonzalo Matovelle',
    brandRole: 'Psychiatrist',
    home: 'Home',
    contact: 'Contact',
    blog: 'Articles',
    skipToContent: 'Skip to main content',
    languageGroupLabel: 'Site language',
    switchLanguage: 'View this site in Spanish',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  hero: {
    eyebrow: 'Psychiatrist · Quito, Ecuador',
    name: 'Dr. Gonzalo Matovelle',
    credentialLine: 'Doctor of Medicine and Surgery · Specialist in Psychiatry',
    summary:
      'Dr. Gonzalo Patricio Matovelle Mediavilla is a psychiatrist and psychopharmacologist with 40 years of private practice in Quito, Ecuador. His practice centres on the management of neuropsychiatric medication and on psychoeducation for the patient and their family.',
    primaryCta: 'Call the practice',
    secondaryCta: 'See his background',
    portraitAlt: 'Portrait of Dr. Gonzalo Matovelle (photograph pending)',
    portraitCaption: 'Professional photograph in preparation',
    facts: [
      { value: '40 years', label: 'of private practice in psychiatry and psychopharmacology' },
      { value: 'Quito', label: 'private practice in Ecuador' },
      { value: 'WPA · WFSBP', label: 'member of international scientific societies' },
    ],
  },

  about: {
    heading: 'Professional profile',
    lead: 'Four decades of continuous clinical practice in psychiatry, with a verifiable professional, academic and forensic record.',
    paragraphs: [
      'Dr. Gonzalo Patricio Matovelle Mediavilla holds a Doctorate in Medicine and Surgery and is a Specialist in Psychiatry. He runs a private practice in Quito, Ecuador, as a psychiatrist specialised in the management of neuropsychiatric medication and in psychoeducation.',
      'Across forty years of private practice as a psychiatrist and psychopharmacologist he has held the leading professional offices of the speciality in Ecuador and in the region, has been a visiting postgraduate lecturer, and is a certified forensic psychiatrist of the Judiciary of Pichincha.',
      'He is also the Psychiatrist for Ecuador of the Veterans Evaluation System (VES) of the United States, where he carries out psychiatric evaluations of veterans, and he has lectured nationally and internationally and been invited to international advisory boards.',
    ],
  },

  practice: {
    heading: 'Focus of the practice',
    lead: 'Dr. Matovelle’s practice rests on the two pillars described in his professional record, and extends into forensic and evaluative work.',
    items: [
      {
        title: 'Neuropsychiatric medication',
        body: 'Expert management of psychotropic medication, backed by four decades of clinical experience as a psychopharmacologist.',
      },
      {
        title: 'Psychoeducation',
        body: 'Explanatory work with the patient and their family so that they understand the diagnosis, the treatment and its course.',
      },
      {
        title: 'Forensic psychiatry',
        body: 'Certified Forensic Psychiatrist of the Judiciary of Pichincha.',
      },
      {
        title: 'Veterans evaluation (VES)',
        body: 'Psychiatrist for Ecuador of the Veterans Evaluation System (VES) of the United States.',
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
        title: 'Offices held',
        items: [
          'Past President of the Ecuadorian Psychiatric Association',
          'Past President of the Ecuadorian Society of Biological Psychiatry',
          'Past Secretary Treasurer of the Latin American Federation of Biological Psychiatry',
          'Psychiatrist for Ecuador of the Veterans Evaluation System (VES), United States',
        ],
      },
      {
        title: 'Teaching and forensic work',
        items: [
          'Visiting lecturer in Psychopharmacology at the Postgraduate School of Psychiatry of the Universidad Central del Ecuador',
          'Certified Forensic Psychiatrist of the Judiciary of Pichincha',
        ],
      },
      {
        title: 'Scientific memberships',
        items: [
          'World Psychiatric Association (WPA)',
          'World Federation of Societies of Biological Psychiatry (WFSBP)',
          'American Academy of Sleep Disorders',
          'Argentine Society of Biological Psychiatry',
          'Peruvian Society of Biological Psychiatry',
          'Uruguayan Society of Biological Psychiatry',
        ],
      },
      {
        title: 'Lecturing',
        items: [
          'National and international lecturer',
          'Invited to international advisory boards',
        ],
      },
    ],
  },

  publications: {
    heading: 'Publications',
    lead: 'Books and scientific articles authored or co-authored by Dr. Matovelle.',
    items: [
      { title: 'Manual Latinoamericano para la Enfermedad Depresiva', note: null },
      { title: 'Enfermedad de Alzheimer', note: 'Cangrejal Editores' },
    ],
    articlesNote: 'Author of numerous scientific articles.',
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
          'He practises privately in Quito, province of Pichincha, Ecuador. The exact address of the practice is arranged when the appointment is booked by phone.',
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
        question: 'Does Dr. Matovelle carry out forensic psychiatric evaluations?',
        answer:
          'Yes. He is a Certified Forensic Psychiatrist of the Judiciary of Pichincha and is also the Psychiatrist for Ecuador of the Veterans Evaluation System (VES) of the United States, where he evaluates veterans.',
      },
      {
        question: 'Has Dr. Matovelle published books or articles?',
        answer:
          'Yes. He is an author of the Manual Latinoamericano para la Enfermedad Depresiva and of the book Enfermedad de Alzheimer, published by Cangrejal Editores, as well as numerous scientific articles.',
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
    callCta: 'Call ' + contact.phone,
    whatsappCta: 'Message on WhatsApp',
    noBookingNote:
      'There is no form and no online booking: appointments are arranged by speaking directly with the practice.',
    locationLabel: 'Location',
    locationValue: 'Private practice in ' + profile.city + ', ' + profile.country + '.',
    emergencyTitle: 'In an emergency',
    emergencyBody:
      'If you or someone close to you is at immediate risk, go to the nearest emergency department or call 911. This site does not handle emergencies.',
  },

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
    role: 'Psychiatrist · ' + profile.city + ', ' + profile.country,
    disclaimer:
      'This website is for information purposes only; it does not replace an in-person medical consultation and does not constitute a diagnosis.',
    rights: 'All rights reserved.',
  },
};
