import { TelanganaDistrict } from '../types';

export const TELANGANA_DISTRICTS: TelanganaDistrict[] = [
  {
    id: 'hyd',
    name: 'Hyderabad',
    code: 'HYD',
    mandals: [
      { id: 'hyd-shaikpet', name: 'Shaikpet', villages: ['Tolichowki', 'Film Nagar', 'Shaikpet Village', 'Whisper Valley'] },
      { id: 'hyd-khairatabad', name: 'Khairatabad', villages: ['Somajiguda', 'Panjagutta', 'Banjara Hills', 'Anand Nagar'] },
      { id: 'hyd-musheerabad', name: 'Musheerabad', villages: ['Ramnagar', 'Bholakpur', 'Bakaram', 'Gandhinagar'] },
      { id: 'hyd-charminar', name: 'Charminar', villages: ['Moghulpura', 'Ghansi Bazar', 'Shalibanda', 'Shah Ali Banda'] },
      { id: 'hyd-secunderabad', name: 'Secunderabad', villages: ['Marredpally', 'Chilkalguda', 'Padmarao Nagar', 'Karkhana'] }
    ]
  },
  {
    id: 'rr',
    name: 'Rangareddy',
    code: 'RR',
    mandals: [
      { id: 'rr-serilingampally', name: 'Serilingampally', villages: ['Gachibowli', 'Madhapur', 'Kondapur', 'Hafeezpet', 'Nallagandla'] },
      { id: 'rr-rajendranagar', name: 'Rajendranagar', villages: ['Attapur', 'Hyderguda', 'Bandlaguda', 'Budvel'] },
      { id: 'rr-chevella', name: 'Chevella', villages: ['Chevella Town', 'Damaragidda', 'Aloor', 'Mirjaguda'] },
      { id: 'rr-shadnagar', name: 'Shadnagar (Farooqnagar)', villages: ['Farooqnagar', 'Kishannagar', 'Solipur', 'Chowlapally'] }
    ]
  },
  {
    id: 'medchal',
    name: 'Medchal-Malkajgiri',
    code: 'MED',
    mandals: [
      { id: 'med-kukatpally', name: 'Kukatpally', villages: ['KPHB Colony', 'Moosapet', 'Bhagyanagar', 'Allwyn Colony'] },
      { id: 'med-medchal', name: 'Medchal', villages: ['Medchal Town', 'Gundlapochampally', 'Kandlakoya', 'Athvelly'] },
      { id: 'med-alwal', name: 'Alwal', villages: ['Old Alwal', 'Macha Bolarum', 'Venkatapuram', 'Temple Alwal'] },
      { id: 'med-uppal', name: 'Uppal', villages: ['Uppal Kalan', 'Ramanthapur', 'Habsiguda', 'Nacharam'] }
    ]
  },
  {
    id: 'krmn',
    name: 'Karimnagar',
    code: 'KRM',
    mandals: [
      { id: 'krmn-urban', name: 'Karimnagar Urban', villages: ['Kothirampur', 'Mukarrampura', 'Collectorate Camp', 'Venkateshwara Colony'] },
      { id: 'krmn-manakondur', name: 'Manakondur', villages: ['Manakondur', 'Muttaram', 'Laxmipur', 'Gatla Narsingapur'] },
      { id: 'krmn-huzurabad', name: 'Huzurabad', villages: ['Huzurabad Town', 'Bornapally', 'Kanaparthi', 'Vangara'] }
    ]
  },
  {
    id: 'wgl',
    name: 'Warangal (Hanamkonda)',
    code: 'WGL',
    mandals: [
      { id: 'wgl-hanamkonda', name: 'Hanamkonda', villages: ['Subedari', 'Naimnagar', 'Kazipet', 'Balanagar'] },
      { id: 'wgl-warangal-urban', name: 'Warangal Fort', villages: ['Ursu', 'Shambunipet', 'Mamidnoor', 'Rangampet'] }
    ]
  },
  {
    id: 'nlg',
    name: 'Nalgonda',
    code: 'NLG',
    mandals: [
      { id: 'nlg-nalgonda', name: 'Nalgonda Town', villages: ['Clock Tower Area', 'Prakasham Bazar', 'Arjalabavi', 'Bottuguda'] },
      { id: 'nlg-miryalaguda', name: 'Miryalaguda', villages: ['Miryalaguda Town', 'Alagadapa', 'Chinthapally'] }
    ]
  }
];
