import {
  IFAQComponent,
  IHowToSteps,
  IInfoCardData,
  IPointofinterest,
} from './globals.interfaces';

export const colorArray: string[] = [
  '#C21515',
  '#EB7601',
  '#CBF30E',
  '#478966',
  '#00DAFC',
  '#5D00FF',
  '#9C09F0',
  '#F613F6',
  '#48f542',
];

export const otherColor: string = '#478966';
export const greenColor: string = 'rgb(71, 137, 102)';
export const otherGray2: string = '#141414';

export const geolocationUrl: string =
  'https://maps.googleapis.com/maps/api/geocode/';

export const poiArray: IPointofinterest[] = [
  {
    name: 'Tontokrom',
    banner: '',
    countryCode: 'Ghana',
    description:
      'Tontokrom is a small town located in the Amansie South District in the Ashanti Region of Ghana.[1][2][3] It is mostly known for its gold and has recently been noted for the menace of illegal mining popularly called galamsey.[4]',
    location: { lat: 6.248575770247937, lng: -1.99680855 },
    thumbnail: 'tontokrom.jpg',
  },
  {
    name: 'Puerto Maldonado',
    banner: '',
    countryCode: 'Peru',
    description:
      ' Puerto Maldonado (Spanish pronunciation: [ˈpweɾto maldoˈnaðo] (listen)) is a city in southeastern Peru in the Amazon rainforest 55 kilometres (34 mi) west of the Bolivian border, located at the confluence of the Tambopata and Madre de Dios rivers. The latter river joins the Madeira River as a tributary of the Amazon. This city is the capital of the Madre de Dios Region.Nearby are the Manú National Park, Tambopata National Reserve, and Bahuaja-Sonene National Park, which have been established to protect natural resources. These are some of the most pristine primary rain forests in the world. They include several oxbow lakes and clay licks, where hundreds of birds, including macaws, feed on clay. Among the indigenous peoples in this area are the Machiguenga',
    location: { lat: -12.594912683452742, lng: -69.28079885187098 },
    thumbnail: 'amazon.jpg',
  },

  /**
   * {
  "lat": 6.248575770247937,
  "lng": -1.99680855
}
   */
];

export const FAQItems: IFAQComponent[] = [
  {
    title: 'What is ARGUS?',
    description:
      'ARGUS is a proof of concept application designed to demonstrate, test, and improve the capabilities of a convolutional neural network in detecting environmental phenomena (in this case, small scale mining activity/deforestation), from satellite photography.',
    thumbnail: '',
  },
  {
    title: 'How does ARGUS work?',
    description:
      'Whenever an image is captured on the map, it is fed to the ARGUS AI, which predicts whether or not the image contains signs of small scale mining deforestation. The results of that prediction will modify the map, if the activity is detected',
    thumbnail: '',
  },
  {
    title: "What are ARGUS's limitations?",
    description:
      'Data is necessary to train a model, and being a sole developer presents a unique challenge in this aspect. ARGUS needs to be trained on as many examples of mining as possible, to improve its accuracy and to reduce the likelihood of incorrect predictions.',
    thumbnail: '',
    descriptionImage: 'zuck.gif',
  },
  {
    title: 'Can I help make ARGUS better?',
    description:
      'Short answer? Yes! ARGUS makes a lot of mistakes, some of which are quite egregious. AI models are not omniscient...yet (whew). Whenever ARGUS makes a mistake, you can report that location to us as either a false negative or false positive. Incorrect predictions can be used to retrain the model so future versions are more accurate.',
    thumbnail: '',
    descriptionImage: 'ai.gif',
  },
];

export const HowToSteps: IHowToSteps[] = [
  {
    label: 'Find a Location',
    description:
      'Click the search icon in the sidebar menu, type in a location and hit the enter button to trigger the search.',
    img: 'argus_demo2.gif',
    notes: [
      {
        description:
          ' Use the "Places of Interest" feature to visit locations earmarked with mining activity from all over the world.',
      },
    ],
  },
  {
    label: 'Capture an Image',
    description:
      'Click the box in the middle of the screen to capture the region within it for prediction.',
    img: 'argus_demo3.gif',
    notes: [
      {
        description:
          'For Optimal results, please make sure the image is centered to properly display the given feature. Also, please use a zoom length of 17 or higher if possible',
      },
    ],
  },
  {
    label: 'View Results',
    description:
      "Based on the model's prediction, the map is going to do one of two things. A positive prediction (meaning the model detected mining activity), will result in the captured area being covered with a colored rectangle. If the activity is not detected, the map will be unchanged.",
    img: 'argus_demo.gif',
  },
];

export const InfoCardData: IInfoCardData[] = [
  {
    title: 'Brazil',
    description:
      'Mining pushes through and devastates the Munduruku Indigenous Land, impacting people, rivers and the forest itself.',
    img: 'munduruku.jpg',
  },
  {
    title: 'Venezuela',
    description:
      'A gold mine in Bolivar state in the south of Venezuela. The destruction of the Amazon rainforest is accelerating faster in Venezuela than in any other country, spurred by a state-sanctioned boom in gold mining.',
    img: 'mining4.webp',
  },
  {
    title: 'Brazil',
    description:
      'An overflight conducted by Greenpeace and ISA (Instituto Socioambiental) on December 5th, 2022, spotted four excavators near an illegal road recently discovered inside the Yanomami Indigenous Land, one of the most endangered indigenous lands in the country.',
    img: 'yanomami.jpg',
  },

  {
    title: 'Ghana',
    description:
      'Aside the environmental devastation it wreaks, small-scale mining in Ghana also poses significant dangers to those involved. The precarious nature of this type of mining exposes miners to numerous risks that can have severe consequences for their health and well-being.',
    img: 'galamsey5.jpg',
  },
];
