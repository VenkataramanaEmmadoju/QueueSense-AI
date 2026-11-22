export interface GovernmentHospital {
  id: string;
  name: string;
  district: string;
  mandal: string;
  villageOrTown: string;
  address: string;
  category: 'Government Teaching Hospital' | 'District Hospital' | 'Area Hospital' | 'Community Health Centre (CHC)' | 'Primary Health Centre (PHC)';
  isOperationalDemo: boolean; // Only the benchmark demo hospital supports live operational simulation
  rating: number;
  totalBeds: number;
  availableBedsEstimate: number;
  departments: string[];
  helpline: string;
  emergencyCasualty: string;
  isAyushmanBharat: boolean;
  isAarogyasri: boolean;
  latitude?: number;
  longitude?: number;
}

export const VERIFIED_GOVERNMENT_HOSPITALS: GovernmentHospital[] = [
  {
    id: 'hosp-tims-gachibowli',
    name: 'Telangana Institute of Medical Sciences (TIMS) - Gachibowli Hub',
    district: 'Rangareddy',
    mandal: 'Serilingampally',
    villageOrTown: 'Gachibowli',
    address: 'Main Health Corridor, Gachibowli Stadium Road, Serilingampally, Rangareddy 500032',
    category: 'Government Teaching Hospital',
    isOperationalDemo: true, // PRIMARY OPERATIONAL DEMO BENCHMARK
    rating: 4.7,
    totalBeds: 850,
    availableBedsEstimate: 124,
    departments: ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics', 'OBGYN', 'Dermatology', 'ENT', 'Ophthalmology', 'Emergency Trauma'],
    helpline: '040-2300-8801',
    emergencyCasualty: '112 / 108 Emergency Wing',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.4401,
    longitude: 78.3489
  },
  {
    id: 'hosp-osmania',
    name: 'Osmania General Hospital (OGH)',
    district: 'Hyderabad',
    mandal: 'Charminar',
    villageOrTown: 'Afzal Gunj',
    address: 'Afzal Gunj, Hyderabad, Telangana 500012',
    category: 'Government Teaching Hospital',
    isOperationalDemo: false,
    rating: 4.3,
    totalBeds: 1168,
    availableBedsEstimate: 78,
    departments: ['General Medicine', 'General Surgery', 'Cardiology', 'Neurology', 'Orthopedics', 'Trauma Casualty'],
    helpline: '040-2460-0121',
    emergencyCasualty: '040-2460-0122',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.3753,
    longitude: 78.4744
  },
  {
    id: 'hosp-gandhi',
    name: 'Gandhi Hospital & Medical College',
    district: 'Hyderabad',
    mandal: 'Musheerabad',
    villageOrTown: 'Bholakpur',
    address: 'Musheerabad, Padmarao Nagar, Secunderabad, Telangana 500003',
    category: 'Government Teaching Hospital',
    isOperationalDemo: false,
    rating: 4.4,
    totalBeds: 1200,
    availableBedsEstimate: 95,
    departments: ['General Medicine', 'Pediatrics', 'Pulmonology', 'OBGYN', 'Nephrology', 'Emergency'],
    helpline: '040-2750-5566',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.4244,
    longitude: 78.5033
  },
  {
    id: 'hosp-mgm-warangal',
    name: 'Mahatma Gandhi Memorial (MGM) Hospital / KMC',
    district: 'Hanamkonda',
    mandal: 'Hanamkonda',
    villageOrTown: 'Naimnagar',
    address: 'MGM Road, Mattewada, Warangal / Hanamkonda 506007',
    category: 'Government Teaching Hospital',
    isOperationalDemo: false,
    rating: 4.2,
    totalBeds: 1000,
    availableBedsEstimate: 64,
    departments: ['General Medicine', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynaecology', 'Emergency'],
    helpline: '0870-242-4444',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.9784,
    longitude: 79.5941
  },
  {
    id: 'hosp-rims-adilabad',
    name: 'Rajiv Institute of Medical Sciences (RIMS) Adilabad',
    district: 'Adilabad',
    mandal: 'Adilabad Urban',
    villageOrTown: 'Adilabad Town',
    address: 'RIMS Road, Mavala, Adilabad, Telangana 504001',
    category: 'Government Teaching Hospital',
    isOperationalDemo: false,
    rating: 4.1,
    totalBeds: 500,
    availableBedsEstimate: 52,
    departments: ['General Medicine', 'Pediatrics', 'General Surgery', 'OBGYN', 'Ophthalmology'],
    helpline: '08732-220-555',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 19.6641,
    longitude: 78.5320
  },
  {
    id: 'hosp-krmn-dist',
    name: 'Karimnagar District Headquarter Hospital',
    district: 'Karimnagar',
    mandal: 'Karimnagar Urban',
    villageOrTown: 'Collectorate Camp',
    address: 'Court Road, Collectorate Complex, Karimnagar 505001',
    category: 'District Hospital',
    isOperationalDemo: false,
    rating: 4.3,
    totalBeds: 450,
    availableBedsEstimate: 45,
    departments: ['General Medicine', 'Pediatrics', 'Orthopedics', 'OBGYN', 'Dental', 'Casualty'],
    helpline: '0878-2244-108',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 18.4386,
    longitude: 79.1288
  },
  {
    id: 'hosp-khammam-dist',
    name: 'Khammam District Headquarter Hospital',
    district: 'Khammam',
    mandal: 'Khammam Urban',
    villageOrTown: 'Khammam Town',
    address: 'Wyra Road, Khammam, Telangana 507001',
    category: 'District Hospital',
    isOperationalDemo: false,
    rating: 4.2,
    totalBeds: 350,
    availableBedsEstimate: 38,
    departments: ['General Medicine', 'Pediatrics', 'Orthopedics', 'ENT', 'Casualty'],
    helpline: '08742-223-108',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.2473,
    longitude: 80.1514
  },
  {
    id: 'hosp-nlg-ggh',
    name: 'Government General Hospital (GGH) Nalgonda',
    district: 'Nalgonda',
    mandal: 'Nalgonda',
    villageOrTown: 'Clock Tower Area',
    address: 'Clock Tower Road, Nalgonda, Telangana 508001',
    category: 'District Hospital',
    isOperationalDemo: false,
    rating: 4.1,
    totalBeds: 400,
    availableBedsEstimate: 42,
    departments: ['General Medicine', 'Pediatrics', 'Obstetrics', 'Orthopedics', 'Casualty'],
    helpline: '08682-224-108',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.0577,
    longitude: 79.2684
  },
  {
    id: 'hosp-siddipet-ah',
    name: 'Area Hospital Siddipet',
    district: 'Siddipet',
    mandal: 'Siddipet Urban',
    villageOrTown: 'Siddipet Town',
    address: 'Near Old Bus Stand, Siddipet, Telangana 502103',
    category: 'Area Hospital',
    isOperationalDemo: false,
    rating: 4.4,
    totalBeds: 250,
    availableBedsEstimate: 29,
    departments: ['General Medicine', 'Pediatrics', 'Maternity', 'Casualty'],
    helpline: '08457-222-108',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 18.1018,
    longitude: 78.8520
  },
  {
    id: 'hosp-shadnagar-chc',
    name: 'Community Health Centre (CHC) Farooqnagar / Shadnagar',
    district: 'Rangareddy',
    mandal: 'Shadnagar (Farooqnagar)',
    villageOrTown: 'Farooqnagar Town',
    address: 'Railway Station Road, Shadnagar, Rangareddy 509216',
    category: 'Community Health Centre (CHC)',
    isOperationalDemo: false,
    rating: 4.0,
    totalBeds: 60,
    availableBedsEstimate: 16,
    departments: ['General Medicine', 'Maternity Care', 'Pediatrics', 'First Aid Trauma'],
    helpline: '08548-252-108',
    emergencyCasualty: '112 / 108',
    isAyushmanBharat: true,
    isAarogyasri: true,
    latitude: 17.0722,
    longitude: 78.2091
  }
];

export const PRIMARY_OPERATIONAL_HOSPITAL = VERIFIED_GOVERNMENT_HOSPITALS[0];
