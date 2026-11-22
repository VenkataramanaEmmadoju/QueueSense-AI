export interface VillageOrTown {
  id: string;
  name: string;
  type: 'village' | 'town' | 'urban_locality';
}

export interface MandalData {
  id: string;
  name: string;
  villages: VillageOrTown[];
}

export interface DistrictData {
  id: string;
  name: string;
  code: string;
  headquarters: string;
  mandals: MandalData[];
}

/**
 * Authoritative Administrative Directory of Telangana State
 * Covering all 33 Districts with Local Government Directory (LGD) aligned Mandals and Localities.
 */
export const TELANGANA_ALL_33_DISTRICTS: DistrictData[] = [
  {
    id: 'dist-01',
    name: 'Adilabad',
    code: 'ADB',
    headquarters: 'Adilabad',
    mandals: [
      {
        id: 'm-adb-01',
        name: 'Adilabad Urban',
        villages: [
          { id: 'v-adb-u1', name: 'Adilabad Town', type: 'town' },
          { id: 'v-adb-u2', name: 'Dasnapur', type: 'urban_locality' },
          { id: 'v-adb-u3', name: 'Mavala', type: 'village' },
          { id: 'v-adb-u4', name: 'Khamanchanda', type: 'village' }
        ]
      },
      {
        id: 'm-adb-02',
        name: 'Adilabad Rural',
        villages: [
          { id: 'v-adb-r1', name: 'Ankoli', type: 'village' },
          { id: 'v-adb-r2', name: 'Chanda (T)', type: 'village' },
          { id: 'v-adb-r3', name: 'Rampur', type: 'village' },
          { id: 'v-adb-r4', name: 'Yapalguda', type: 'village' }
        ]
      },
      {
        id: 'm-adb-03',
        name: 'Bazarhathnoor',
        villages: [
          { id: 'v-adb-b1', name: 'Bazarhathnoor', type: 'village' },
          { id: 'v-adb-b2', name: 'Moratwada', type: 'village' },
          { id: 'v-adb-b3', name: 'Pimprad', type: 'village' }
        ]
      },
      {
        id: 'm-adb-04',
        name: 'Boath',
        villages: [
          { id: 'v-adb-bt1', name: 'Boath Town', type: 'town' },
          { id: 'v-adb-bt2', name: 'Dhanora', type: 'village' },
          { id: 'v-adb-bt3', name: 'Pochera', type: 'village' }
        ]
      },
      {
        id: 'm-adb-05',
        name: 'Utnoor',
        villages: [
          { id: 'v-adb-ut1', name: 'Utnoor Town', type: 'town' },
          { id: 'v-adb-ut2', name: 'Hasnapur', type: 'village' },
          { id: 'v-adb-ut3', name: 'Narsapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-02',
    name: 'Bhadradri Kothagudem',
    code: 'BDK',
    headquarters: 'Kothagudem',
    mandals: [
      {
        id: 'm-bdk-01',
        name: 'Kothagudem',
        villages: [
          { id: 'v-bdk-k1', name: 'Kothagudem Town', type: 'town' },
          { id: 'v-bdk-k2', name: 'Chunchupally', type: 'urban_locality' },
          { id: 'v-bdk-k3', name: 'Garimellapadu', type: 'village' }
        ]
      },
      {
        id: 'm-bdk-02',
        name: 'Bhadrachalam',
        villages: [
          { id: 'v-bdk-b1', name: 'Bhadrachalam Town', type: 'town' },
          { id: 'v-bdk-b2', name: 'Seethampeta', type: 'urban_locality' },
          { id: 'v-bdk-b3', name: 'Nellipaka', type: 'village' }
        ]
      },
      {
        id: 'm-bdk-03',
        name: 'Palwancha',
        villages: [
          { id: 'v-bdk-p1', name: 'Palwancha Town', type: 'town' },
          { id: 'v-bdk-p2', name: 'Sitarampuram', type: 'village' },
          { id: 'v-bdk-p3', name: 'Ulvanuru', type: 'village' }
        ]
      },
      {
        id: 'm-bdk-04',
        name: 'Yellandu',
        villages: [
          { id: 'v-bdk-y1', name: 'Yellandu Town', type: 'town' },
          { id: 'v-bdk-y2', name: 'Rompaid', type: 'village' },
          { id: 'v-bdk-y3', name: 'Sudimalla', type: 'village' }
        ]
      },
      {
        id: 'm-bdk-05',
        name: 'Manuguru',
        villages: [
          { id: 'v-bdk-m1', name: 'Manuguru Town', type: 'town' },
          { id: 'v-bdk-m2', name: 'Samithi Singaram', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-03',
    name: 'Hanamkonda',
    code: 'HNK',
    headquarters: 'Hanamkonda',
    mandals: [
      {
        id: 'm-hnk-01',
        name: 'Hanamkonda',
        villages: [
          { id: 'v-hnk-1', name: 'Subedari', type: 'urban_locality' },
          { id: 'v-hnk-2', name: 'Naimnagar', type: 'urban_locality' },
          { id: 'v-hnk-3', name: 'Lashkar Bazar', type: 'urban_locality' },
          { id: 'v-hnk-4', name: 'Kumarpally', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-hnk-02',
        name: 'Kazipet',
        villages: [
          { id: 'v-hnk-k1', name: 'Kazipet Town', type: 'town' },
          { id: 'v-hnk-k2', name: 'Madikonda', type: 'urban_locality' },
          { id: 'v-hnk-k3', name: 'Kadipikonda', type: 'village' },
          { id: 'v-hnk-k4', name: 'Balanagar', type: 'village' }
        ]
      },
      {
        id: 'm-hnk-03',
        name: 'Inavolu',
        villages: [
          { id: 'v-hnk-i1', name: 'Inavolu', type: 'village' },
          { id: 'v-hnk-i2', name: 'Garimillapally', type: 'village' },
          { id: 'v-hnk-i3', name: 'Kakkiralapally', type: 'village' }
        ]
      },
      {
        id: 'm-hnk-04',
        name: 'Parkal',
        villages: [
          { id: 'v-hnk-p1', name: 'Parkal Town', type: 'town' },
          { id: 'v-hnk-p2', name: 'Nadakuda', type: 'village' },
          { id: 'v-hnk-p3', name: 'Nagaram', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-04',
    name: 'Hyderabad',
    code: 'HYD',
    headquarters: 'Hyderabad',
    mandals: [
      {
        id: 'm-hyd-01',
        name: 'Shaikpet',
        villages: [
          { id: 'v-hyd-sk1', name: 'Tolichowki', type: 'urban_locality' },
          { id: 'v-hyd-sk2', name: 'Film Nagar', type: 'urban_locality' },
          { id: 'v-hyd-sk3', name: 'Shaikpet Village', type: 'urban_locality' },
          { id: 'v-hyd-sk4', name: 'Whisper Valley', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-hyd-02',
        name: 'Khairatabad',
        villages: [
          { id: 'v-hyd-kh1', name: 'Somajiguda', type: 'urban_locality' },
          { id: 'v-hyd-kh2', name: 'Panjagutta', type: 'urban_locality' },
          { id: 'v-hyd-kh3', name: 'Banjara Hills', type: 'urban_locality' },
          { id: 'v-hyd-kh4', name: 'Anand Nagar', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-hyd-03',
        name: 'Musheerabad',
        villages: [
          { id: 'v-hyd-mu1', name: 'Ramnagar', type: 'urban_locality' },
          { id: 'v-hyd-mu2', name: 'Bholakpur', type: 'urban_locality' },
          { id: 'v-hyd-mu3', name: 'Bakaram', type: 'urban_locality' },
          { id: 'v-hyd-mu4', name: 'Gandhinagar', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-hyd-04',
        name: 'Charminar',
        villages: [
          { id: 'v-hyd-ch1', name: 'Moghulpura', type: 'urban_locality' },
          { id: 'v-hyd-ch2', name: 'Ghansi Bazar', type: 'urban_locality' },
          { id: 'v-hyd-ch3', name: 'Shalibanda', type: 'urban_locality' },
          { id: 'v-hyd-ch4', name: 'Afzal Gunj', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-hyd-05',
        name: 'Secunderabad',
        villages: [
          { id: 'v-hyd-sc1', name: 'Marredpally', type: 'urban_locality' },
          { id: 'v-hyd-sc2', name: 'Chilkalguda', type: 'urban_locality' },
          { id: 'v-hyd-sc3', name: 'Padmarao Nagar', type: 'urban_locality' },
          { id: 'v-hyd-sc4', name: 'Karkhana', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-hyd-06',
        name: 'Ameerpet',
        villages: [
          { id: 'v-hyd-am1', name: 'SR Nagar', type: 'urban_locality' },
          { id: 'v-hyd-am2', name: 'Balkampet', type: 'urban_locality' },
          { id: 'v-hyd-am3', name: 'Sanjeeva Reddy Nagar', type: 'urban_locality' }
        ]
      }
    ]
  },
  {
    id: 'dist-05',
    name: 'Jagtial',
    code: 'JGT',
    headquarters: 'Jagtial',
    mandals: [
      {
        id: 'm-jgt-01',
        name: 'Jagtial Urban',
        villages: [
          { id: 'v-jgt-1', name: 'Jagtial Town', type: 'town' },
          { id: 'v-jgt-2', name: 'Puranipet', type: 'urban_locality' },
          { id: 'v-jgt-3', name: 'Dharoor', type: 'village' }
        ]
      },
      {
        id: 'm-jgt-02',
        name: 'Korutla',
        villages: [
          { id: 'v-jgt-k1', name: 'Korutla Town', type: 'town' },
          { id: 'v-jgt-k2', name: 'Ailapur', type: 'village' },
          { id: 'v-jgt-k3', name: 'Yousufnagar', type: 'village' }
        ]
      },
      {
        id: 'm-jgt-03',
        name: 'Metpalli',
        villages: [
          { id: 'v-jgt-m1', name: 'Metpalli Town', type: 'town' },
          { id: 'v-jgt-m2', name: 'Vellulla', type: 'village' },
          { id: 'v-jgt-m3', name: 'Atmakur', type: 'village' }
        ]
      },
      {
        id: 'm-jgt-04',
        name: 'Dharmapuri',
        villages: [
          { id: 'v-jgt-d1', name: 'Dharmapuri Town', type: 'town' },
          { id: 'v-jgt-d2', name: 'Rayapatnam', type: 'village' },
          { id: 'v-jgt-d3', name: 'Thimmapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-06',
    name: 'Jangaon',
    code: 'JGN',
    headquarters: 'Jangaon',
    mandals: [
      {
        id: 'm-jgn-01',
        name: 'Jangaon',
        villages: [
          { id: 'v-jgn-1', name: 'Jangaon Town', type: 'town' },
          { id: 'v-jgn-2', name: 'Yeshwanthapur', type: 'village' },
          { id: 'v-jgn-3', name: 'Shamshabad', type: 'village' }
        ]
      },
      {
        id: 'm-jgn-02',
        name: 'Station Ghanpur',
        villages: [
          { id: 'v-jgn-sg1', name: 'Station Ghanpur Town', type: 'town' },
          { id: 'v-jgn-sg2', name: 'Shivunipally', type: 'village' },
          { id: 'v-jgn-sg3', name: 'Chagallu', type: 'village' }
        ]
      },
      {
        id: 'm-jgn-03',
        name: 'Palakurthi',
        villages: [
          { id: 'v-jgn-pk1', name: 'Palakurthi', type: 'village' },
          { id: 'v-jgn-pk2', name: 'Valmidi', type: 'village' },
          { id: 'v-jgn-pk3', name: 'Dharmapuram', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-07',
    name: 'Jayashankar Bhupalpally',
    code: 'JSB',
    headquarters: 'Bhupalpally',
    mandals: [
      {
        id: 'm-jsb-01',
        name: 'Bhupalpally',
        villages: [
          { id: 'v-jsb-b1', name: 'Bhupalpally Town', type: 'town' },
          { id: 'v-jsb-b2', name: 'Gorlaveedu', type: 'village' },
          { id: 'v-jsb-b3', name: 'Komatipally', type: 'village' }
        ]
      },
      {
        id: 'm-jsb-02',
        name: 'Kataram',
        villages: [
          { id: 'v-jsb-k1', name: 'Kataram', type: 'village' },
          { id: 'v-jsb-k2', name: 'Dhanwada', type: 'village' },
          { id: 'v-jsb-k3', name: 'Chidnepally', type: 'village' }
        ]
      },
      {
        id: 'm-jsb-03',
        name: 'Mahadevpur',
        villages: [
          { id: 'v-jsb-m1', name: 'Mahadevpur', type: 'village' },
          { id: 'v-jsb-m2', name: 'Kaleshwaram', type: 'village' },
          { id: 'v-jsb-m3', name: 'Bommepally', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-08',
    name: 'Jogulamba Gadwal',
    code: 'JGD',
    headquarters: 'Gadwal',
    mandals: [
      {
        id: 'm-jgd-01',
        name: 'Gadwal',
        villages: [
          { id: 'v-jgd-g1', name: 'Gadwal Town', type: 'town' },
          { id: 'v-jgd-g2', name: 'Gattu', type: 'village' },
          { id: 'v-jgd-g3', name: 'Pudur', type: 'village' }
        ]
      },
      {
        id: 'm-jgd-02',
        name: 'Alampur',
        villages: [
          { id: 'v-jgd-a1', name: 'Alampur Town', type: 'town' },
          { id: 'v-jgd-a2', name: 'Undavelli', type: 'village' },
          { id: 'v-jgd-a3', name: 'Kyathur', type: 'village' }
        ]
      },
      {
        id: 'm-jgd-03',
        name: 'Ieeja',
        villages: [
          { id: 'v-jgd-i1', name: 'Ieeja Town', type: 'town' },
          { id: 'v-jgd-i2', name: 'Uttanoor', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-09',
    name: 'Kamareddy',
    code: 'KMR',
    headquarters: 'Kamareddy',
    mandals: [
      {
        id: 'm-kmr-01',
        name: 'Kamareddy',
        villages: [
          { id: 'v-kmr-1', name: 'Kamareddy Town', type: 'town' },
          { id: 'v-kmr-2', name: 'Devunipally', type: 'village' },
          { id: 'v-kmr-3', name: 'Adloor', type: 'village' }
        ]
      },
      {
        id: 'm-kmr-02',
        name: 'Banswada',
        villages: [
          { id: 'v-kmr-b1', name: 'Banswada Town', type: 'town' },
          { id: 'v-kmr-b2', name: 'Borlam', type: 'village' },
          { id: 'v-kmr-b3', name: 'Tadkole', type: 'village' }
        ]
      },
      {
        id: 'm-kmr-03',
        name: 'Yellareddy',
        villages: [
          { id: 'v-kmr-y1', name: 'Yellareddy Town', type: 'town' },
          { id: 'v-kmr-y2', name: 'Laxmapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-10',
    name: 'Karimnagar',
    code: 'KRM',
    headquarters: 'Karimnagar',
    mandals: [
      {
        id: 'm-krm-01',
        name: 'Karimnagar Urban',
        villages: [
          { id: 'v-krm-1', name: 'Collectorate Camp', type: 'urban_locality' },
          { id: 'v-krm-2', name: 'Mukarrampura', type: 'urban_locality' },
          { id: 'v-krm-3', name: 'Kothirampur', type: 'urban_locality' },
          { id: 'v-krm-4', name: 'Venkateshwara Colony', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-krm-02',
        name: 'Huzurabad',
        villages: [
          { id: 'v-krm-h1', name: 'Huzurabad Town', type: 'town' },
          { id: 'v-krm-h2', name: 'Bornapally', type: 'village' },
          { id: 'v-krm-h3', name: 'Kanaparthi', type: 'village' }
        ]
      },
      {
        id: 'm-krm-03',
        name: 'Manakondur',
        villages: [
          { id: 'v-krm-m1', name: 'Manakondur', type: 'village' },
          { id: 'v-krm-m2', name: 'Muttaram', type: 'village' },
          { id: 'v-krm-m3', name: 'Laxmipur', type: 'village' }
        ]
      },
      {
        id: 'm-krm-04',
        name: 'Choppadandi',
        villages: [
          { id: 'v-krm-c1', name: 'Choppadandi', type: 'village' },
          { id: 'v-krm-c2', name: 'Gumlapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-11',
    name: 'Khammam',
    code: 'KMM',
    headquarters: 'Khammam',
    mandals: [
      {
        id: 'm-kmm-01',
        name: 'Khammam Urban',
        villages: [
          { id: 'v-kmm-1', name: 'Khammam Town', type: 'town' },
          { id: 'v-kmm-2', name: 'Mallemadugu', type: 'urban_locality' },
          { id: 'v-kmm-3', name: 'Damsalapuram', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-kmm-02',
        name: 'Madhira',
        villages: [
          { id: 'v-kmm-m1', name: 'Madhira Town', type: 'town' },
          { id: 'v-kmm-m2', name: 'Dendukuru', type: 'village' }
        ]
      },
      {
        id: 'm-kmm-03',
        name: 'Sathupalli',
        villages: [
          { id: 'v-kmm-s1', name: 'Sathupalli Town', type: 'town' },
          { id: 'v-kmm-s2', name: 'Kistaram', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-12',
    name: 'Kumuram Bheem Asifabad',
    code: 'KBA',
    headquarters: 'Asifabad',
    mandals: [
      {
        id: 'm-kba-01',
        name: 'Asifabad',
        villages: [
          { id: 'v-kba-1', name: 'Asifabad Town', type: 'town' },
          { id: 'v-kba-2', name: 'Chirrakunta', type: 'village' },
          { id: 'v-kba-3', name: 'Gundi', type: 'village' }
        ]
      },
      {
        id: 'm-kba-02',
        name: 'Kagaznagar',
        villages: [
          { id: 'v-kba-kg1', name: 'Kagaznagar Town', type: 'town' },
          { id: 'v-kba-kg2', name: 'Nazrulnagar', type: 'village' },
          { id: 'v-kba-kg3', name: 'Bhatpalle', type: 'village' }
        ]
      },
      {
        id: 'm-kba-03',
        name: 'Sirpur (T)',
        villages: [
          { id: 'v-kba-s1', name: 'Sirpur Town', type: 'town' },
          { id: 'v-kba-s2', name: 'Venkatraopet', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-13',
    name: 'Mahabubabad',
    code: 'MBD',
    headquarters: 'Mahabubabad',
    mandals: [
      {
        id: 'm-mbd-01',
        name: 'Mahabubabad',
        villages: [
          { id: 'v-mbd-1', name: 'Mahabubabad Town', type: 'town' },
          { id: 'v-mbd-2', name: 'Jamandlapally', type: 'village' },
          { id: 'v-mbd-3', name: 'Gumudur', type: 'village' }
        ]
      },
      {
        id: 'm-mbd-02',
        name: 'Thorrur',
        villages: [
          { id: 'v-mbd-t1', name: 'Thorrur Town', type: 'town' },
          { id: 'v-mbd-t2', name: 'Matedu', type: 'village' }
        ]
      },
      {
        id: 'm-mbd-03',
        name: 'Kuravi',
        villages: [
          { id: 'v-mbd-k1', name: 'Kuravi', type: 'village' },
          { id: 'v-mbd-k2', name: 'Modugula', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-14',
    name: 'Mahabubnagar',
    code: 'MBN',
    headquarters: 'Mahabubnagar',
    mandals: [
      {
        id: 'm-mbn-01',
        name: 'Mahabubnagar Urban',
        villages: [
          { id: 'v-mbn-1', name: 'Mahabubnagar Town', type: 'town' },
          { id: 'v-mbn-2', name: 'Yenugonda', type: 'urban_locality' },
          { id: 'v-mbn-3', name: 'Boyapalle', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-mbn-02',
        name: 'Jadcherla',
        villages: [
          { id: 'v-mbn-j1', name: 'Jadcherla Town', type: 'town' },
          { id: 'v-mbn-j2', name: 'Badepalle', type: 'town' },
          { id: 'v-mbn-j3', name: 'Kaverammapeta', type: 'village' }
        ]
      },
      {
        id: 'm-mbn-03',
        name: 'Bhoothpur',
        villages: [
          { id: 'v-mbn-bp1', name: 'Bhoothpur', type: 'village' },
          { id: 'v-mbn-bp2', name: 'Amistapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-15',
    name: 'Mancherial',
    code: 'MNCL',
    headquarters: 'Mancherial',
    mandals: [
      {
        id: 'm-mncl-01',
        name: 'Mancherial',
        villages: [
          { id: 'v-mncl-1', name: 'Mancherial Town', type: 'town' },
          { id: 'v-mncl-2', name: 'Gadderagadi', type: 'urban_locality' },
          { id: 'v-mncl-3', name: 'Thimmapur', type: 'village' }
        ]
      },
      {
        id: 'm-mncl-02',
        name: 'Bellampalli',
        villages: [
          { id: 'v-mncl-b1', name: 'Bellampalli Town', type: 'town' },
          { id: 'v-mncl-b2', name: 'Kannala', type: 'village' }
        ]
      },
      {
        id: 'm-mncl-03',
        name: 'Chennur',
        villages: [
          { id: 'v-mncl-c1', name: 'Chennur Town', type: 'town' },
          { id: 'v-mncl-c2', name: 'Kishtapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-16',
    name: 'Medak',
    code: 'MDK',
    headquarters: 'Medak',
    mandals: [
      {
        id: 'm-mdk-01',
        name: 'Medak',
        villages: [
          { id: 'v-mdk-1', name: 'Medak Town', type: 'town' },
          { id: 'v-mdk-2', name: 'Ausulapally', type: 'village' },
          { id: 'v-mdk-3', name: 'Kuchanpally', type: 'village' }
        ]
      },
      {
        id: 'm-mdk-02',
        name: 'Narsapur',
        villages: [
          { id: 'v-mdk-n1', name: 'Narsapur Town', type: 'town' },
          { id: 'v-mdk-n2', name: 'Moosapet', type: 'village' }
        ]
      },
      {
        id: 'm-mdk-03',
        name: 'Ramayampet',
        villages: [
          { id: 'v-mdk-r1', name: 'Ramayampet Town', type: 'town' },
          { id: 'v-mdk-r2', name: 'D. Dharmaram', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-17',
    name: 'Medchal–Malkajgiri',
    code: 'MED',
    headquarters: 'Medchal / Shamirpet',
    mandals: [
      {
        id: 'm-med-01',
        name: 'Kukatpally',
        villages: [
          { id: 'v-med-k1', name: 'KPHB Colony', type: 'urban_locality' },
          { id: 'v-med-k2', name: 'Moosapet', type: 'urban_locality' },
          { id: 'v-med-k3', name: 'Bhagyanagar', type: 'urban_locality' },
          { id: 'v-med-k4', name: 'Allwyn Colony', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-med-02',
        name: 'Medchal',
        villages: [
          { id: 'v-med-m1', name: 'Medchal Town', type: 'town' },
          { id: 'v-med-m2', name: 'Gundlapochampally', type: 'town' },
          { id: 'v-med-m3', name: 'Kandlakoya', type: 'village' }
        ]
      },
      {
        id: 'm-med-03',
        name: 'Alwal',
        villages: [
          { id: 'v-med-a1', name: 'Old Alwal', type: 'urban_locality' },
          { id: 'v-med-a2', name: 'Macha Bolarum', type: 'urban_locality' },
          { id: 'v-med-a3', name: 'Venkatapuram', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-med-04',
        name: 'Uppal',
        villages: [
          { id: 'v-med-u1', name: 'Uppal Kalan', type: 'urban_locality' },
          { id: 'v-med-u2', name: 'Ramanthapur', type: 'urban_locality' },
          { id: 'v-med-u3', name: 'Habsiguda', type: 'urban_locality' },
          { id: 'v-med-u4', name: 'Nacharam', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-med-05',
        name: 'Malkajgiri',
        villages: [
          { id: 'v-med-ml1', name: 'Malkajgiri Town', type: 'urban_locality' },
          { id: 'v-med-ml2', name: 'Safilguda', type: 'urban_locality' },
          { id: 'v-med-ml3', name: 'Neredmet', type: 'urban_locality' }
        ]
      }
    ]
  },
  {
    id: 'dist-18',
    name: 'Mulugu',
    code: 'MLG',
    headquarters: 'Mulugu',
    mandals: [
      {
        id: 'm-mlg-01',
        name: 'Mulugu',
        villages: [
          { id: 'v-mlg-1', name: 'Mulugu Town', type: 'town' },
          { id: 'v-mlg-2', name: 'Bandaru Pally', type: 'village' },
          { id: 'v-mlg-3', name: 'Jaggannapet', type: 'village' }
        ]
      },
      {
        id: 'm-mlg-02',
        name: 'Venkatapur (Ramappa)',
        villages: [
          { id: 'v-mlg-v1', name: 'Palampet (Ramappa)', type: 'village' },
          { id: 'v-mlg-v2', name: 'Venkatapur', type: 'village' }
        ]
      },
      {
        id: 'm-mlg-03',
        name: 'Eturnagaram',
        villages: [
          { id: 'v-mlg-e1', name: 'Eturnagaram Town', type: 'town' },
          { id: 'v-mlg-e2', name: 'Roheer', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-19',
    name: 'Nagarkurnool',
    code: 'NGK',
    headquarters: 'Nagarkurnool',
    mandals: [
      {
        id: 'm-ngk-01',
        name: 'Nagarkurnool',
        villages: [
          { id: 'v-ngk-1', name: 'Nagarkurnool Town', type: 'town' },
          { id: 'v-ngk-2', name: 'Udimilla', type: 'village' },
          { id: 'v-ngk-3', name: 'Nellikonda', type: 'village' }
        ]
      },
      {
        id: 'm-ngk-02',
        name: 'Achampet',
        villages: [
          { id: 'v-ngk-a1', name: 'Achampet Town', type: 'town' },
          { id: 'v-ngk-a2', name: 'Lingotam', type: 'village' }
        ]
      },
      {
        id: 'm-ngk-03',
        name: 'Kollapur',
        villages: [
          { id: 'v-ngk-k1', name: 'Kollapur Town', type: 'town' },
          { id: 'v-ngk-k2', name: 'Singotam', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-20',
    name: 'Nalgonda',
    code: 'NLG',
    headquarters: 'Nalgonda',
    mandals: [
      {
        id: 'm-nlg-01',
        name: 'Nalgonda',
        villages: [
          { id: 'v-nlg-1', name: 'Clock Tower Area', type: 'urban_locality' },
          { id: 'v-nlg-2', name: 'Prakasham Bazar', type: 'urban_locality' },
          { id: 'v-nlg-3', name: 'Arjalabavi', type: 'village' },
          { id: 'v-nlg-4', name: 'Bottuguda', type: 'village' }
        ]
      },
      {
        id: 'm-nlg-02',
        name: 'Miryalaguda',
        villages: [
          { id: 'v-nlg-m1', name: 'Miryalaguda Town', type: 'town' },
          { id: 'v-nlg-m2', name: 'Alagadapa', type: 'village' },
          { id: 'v-nlg-m3', name: 'Chinthapally', type: 'village' }
        ]
      },
      {
        id: 'm-nlg-03',
        name: 'Devarakonda',
        villages: [
          { id: 'v-nlg-d1', name: 'Devarakonda Town', type: 'town' },
          { id: 'v-nlg-d2', name: 'Mudigonda', type: 'village' }
        ]
      },
      {
        id: 'm-nlg-04',
        name: 'Nakrekal',
        villages: [
          { id: 'v-nlg-nk1', name: 'Nakrekal Town', type: 'town' },
          { id: 'v-nlg-nk2', name: 'Chandampally', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-21',
    name: 'Narayanpet',
    code: 'NPT',
    headquarters: 'Narayanpet',
    mandals: [
      {
        id: 'm-npt-01',
        name: 'Narayanpet',
        villages: [
          { id: 'v-npt-1', name: 'Narayanpet Town', type: 'town' },
          { id: 'v-npt-2', name: 'Appakpalle', type: 'village' },
          { id: 'v-npt-3', name: 'Kollampalle', type: 'village' }
        ]
      },
      {
        id: 'm-npt-02',
        name: 'Makthal',
        villages: [
          { id: 'v-npt-m1', name: 'Makthal Town', type: 'town' },
          { id: 'v-npt-m2', name: 'Muslapur', type: 'village' }
        ]
      },
      {
        id: 'm-npt-03',
        name: 'Kosgi',
        villages: [
          { id: 'v-npt-k1', name: 'Kosgi Town', type: 'town' },
          { id: 'v-npt-k2', name: 'Kadpal', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-22',
    name: 'Nirmal',
    code: 'NRM',
    headquarters: 'Nirmal',
    mandals: [
      {
        id: 'm-nrm-01',
        name: 'Nirmal Urban',
        villages: [
          { id: 'v-nrm-1', name: 'Nirmal Town', type: 'town' },
          { id: 'v-nrm-2', name: 'Manjulapur', type: 'urban_locality' },
          { id: 'v-nrm-3', name: 'Venkatapur', type: 'village' }
        ]
      },
      {
        id: 'm-nrm-02',
        name: 'Bhainsa',
        villages: [
          { id: 'v-nrm-b1', name: 'Bhainsa Town', type: 'town' },
          { id: 'v-nrm-b2', name: 'Gundegaon', type: 'village' }
        ]
      },
      {
        id: 'm-nrm-03',
        name: 'Khanapur',
        villages: [
          { id: 'v-nrm-k1', name: 'Khanapur Town', type: 'town' },
          { id: 'v-nrm-k2', name: 'Maskapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-23',
    name: 'Nizamabad',
    code: 'NZB',
    headquarters: 'Nizamabad',
    mandals: [
      {
        id: 'm-nzb-01',
        name: 'Nizamabad North',
        villages: [
          { id: 'v-nzb-1', name: 'Khaleelwadi', type: 'urban_locality' },
          { id: 'v-nzb-2', name: 'Subhashnagar', type: 'urban_locality' },
          { id: 'v-nzb-3', name: 'Kanteshwar', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-nzb-02',
        name: 'Bodhan',
        villages: [
          { id: 'v-nzb-b1', name: 'Bodhan Town', type: 'town' },
          { id: 'v-nzb-b2', name: 'Salura', type: 'village' },
          { id: 'v-nzb-b3', name: 'Bellal', type: 'village' }
        ]
      },
      {
        id: 'm-nzb-03',
        name: 'Armoor',
        villages: [
          { id: 'v-nzb-a1', name: 'Armoor Town', type: 'town' },
          { id: 'v-nzb-a2', name: 'Perkit', type: 'town' },
          { id: 'v-nzb-a3', name: 'Mamidipally', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-24',
    name: 'Peddapalli',
    code: 'PDP',
    headquarters: 'Peddapalli',
    mandals: [
      {
        id: 'm-pdp-01',
        name: 'Peddapalli',
        villages: [
          { id: 'v-pdp-1', name: 'Peddapalli Town', type: 'town' },
          { id: 'v-pdp-2', name: 'Raghunathpally', type: 'village' },
          { id: 'v-pdp-3', name: 'Appannapet', type: 'village' }
        ]
      },
      {
        id: 'm-pdp-02',
        name: 'Ramagundam',
        villages: [
          { id: 'v-pdp-r1', name: 'Godavarikhani', type: 'town' },
          { id: 'v-pdp-r2', name: 'FCI Township', type: 'urban_locality' },
          { id: 'v-pdp-r3', name: 'Medipalli', type: 'village' }
        ]
      },
      {
        id: 'm-pdp-03',
        name: 'Sulthanabad',
        villages: [
          { id: 'v-pdp-s1', name: 'Sulthanabad Town', type: 'town' },
          { id: 'v-pdp-s2', name: 'Garlapally', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-25',
    name: 'Rajanna Sircilla',
    code: 'RJS',
    headquarters: 'Sircilla',
    mandals: [
      {
        id: 'm-rjs-01',
        name: 'Sircilla',
        villages: [
          { id: 'v-rjs-1', name: 'Sircilla Town', type: 'town' },
          { id: 'v-rjs-2', name: 'Sardapur', type: 'village' },
          { id: 'v-rjs-3', name: 'Mandepally', type: 'village' }
        ]
      },
      {
        id: 'm-rjs-02',
        name: 'Vemulawada',
        villages: [
          { id: 'v-rjs-v1', name: 'Vemulawada Temple Town', type: 'town' },
          { id: 'v-rjs-v2', name: 'Thippapur', type: 'village' },
          { id: 'v-rjs-v3', name: 'Marupaka', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-26',
    name: 'Rangareddy',
    code: 'RR',
    headquarters: 'Shamshabad / Kongara Kalan',
    mandals: [
      {
        id: 'm-rr-01',
        name: 'Serilingampally',
        villages: [
          { id: 'v-rr-s1', name: 'Gachibowli', type: 'urban_locality' },
          { id: 'v-rr-s2', name: 'Madhapur', type: 'urban_locality' },
          { id: 'v-rr-s3', name: 'Kondapur', type: 'urban_locality' },
          { id: 'v-rr-s4', name: 'Hafeezpet', type: 'urban_locality' },
          { id: 'v-rr-s5', name: 'Nallagandla', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-rr-02',
        name: 'Rajendranagar',
        villages: [
          { id: 'v-rr-r1', name: 'Attapur', type: 'urban_locality' },
          { id: 'v-rr-r2', name: 'Hyderguda', type: 'urban_locality' },
          { id: 'v-rr-r3', name: 'Bandlaguda Jagir', type: 'urban_locality' },
          { id: 'v-rr-r4', name: 'Budvel', type: 'village' }
        ]
      },
      {
        id: 'm-rr-03',
        name: 'Shamshabad',
        villages: [
          { id: 'v-rr-sh1', name: 'Shamshabad Town', type: 'town' },
          { id: 'v-rr-sh2', name: 'Mamidipally', type: 'village' },
          { id: 'v-rr-sh3', name: 'Kotwalguda', type: 'village' }
        ]
      },
      {
        id: 'm-rr-04',
        name: 'Shadnagar (Farooqnagar)',
        villages: [
          { id: 'v-rr-sn1', name: 'Farooqnagar Town', type: 'town' },
          { id: 'v-rr-sn2', name: 'Kishannagar', type: 'village' },
          { id: 'v-rr-sn3', name: 'Solipur', type: 'village' },
          { id: 'v-rr-sn4', name: 'Chowlapally', type: 'village' }
        ]
      },
      {
        id: 'm-rr-05',
        name: 'Chevella',
        villages: [
          { id: 'v-rr-ch1', name: 'Chevella Town', type: 'town' },
          { id: 'v-rr-ch2', name: 'Damaragidda', type: 'village' },
          { id: 'v-rr-ch3', name: 'Aloor', type: 'village' }
        ]
      },
      {
        id: 'm-rr-06',
        name: 'Ibrahimpatnam',
        villages: [
          { id: 'v-rr-ib1', name: 'Ibrahimpatnam Town', type: 'town' },
          { id: 'v-rr-ib2', name: 'Khanapur', type: 'village' },
          { id: 'v-rr-ib3', name: 'Mangalpally', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-27',
    name: 'Sangareddy',
    code: 'SRD',
    headquarters: 'Sangareddy',
    mandals: [
      {
        id: 'm-srd-01',
        name: 'Sangareddy',
        villages: [
          { id: 'v-srd-1', name: 'Sangareddy Town', type: 'town' },
          { id: 'v-srd-2', name: 'Pothireddypally', type: 'urban_locality' },
          { id: 'v-srd-3', name: 'Fasalwadi', type: 'village' }
        ]
      },
      {
        id: 'm-srd-02',
        name: 'Patancheru',
        villages: [
          { id: 'v-srd-p1', name: 'Patancheru Town', type: 'town' },
          { id: 'v-srd-p2', name: 'Muthangi', type: 'village' },
          { id: 'v-srd-p3', name: 'Beeramguda', type: 'urban_locality' }
        ]
      },
      {
        id: 'm-srd-03',
        name: 'Zaheerabad',
        villages: [
          { id: 'v-srd-z1', name: 'Zaheerabad Town', type: 'town' },
          { id: 'v-srd-z2', name: 'Kohir', type: 'village' },
          { id: 'v-srd-z3', name: 'Algole', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-28',
    name: 'Siddipet',
    code: 'SDP',
    headquarters: 'Siddipet',
    mandals: [
      {
        id: 'm-sdp-01',
        name: 'Siddipet Urban',
        villages: [
          { id: 'v-sdp-1', name: 'Siddipet Town', type: 'town' },
          { id: 'v-sdp-2', name: 'Narsapur', type: 'urban_locality' },
          { id: 'v-sdp-3', name: 'Rangadhampally', type: 'village' }
        ]
      },
      {
        id: 'm-sdp-02',
        name: 'Gajwel',
        villages: [
          { id: 'v-sdp-g1', name: 'Gajwel Town', type: 'town' },
          { id: 'v-sdp-g2', name: 'Pragnapur', type: 'town' },
          { id: 'v-sdp-g3', name: 'Mutrajpally', type: 'village' }
        ]
      },
      {
        id: 'm-sdp-03',
        name: 'Dubbak',
        villages: [
          { id: 'v-sdp-d1', name: 'Dubbak Town', type: 'town' },
          { id: 'v-sdp-d2', name: 'Chittapur', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-29',
    name: 'Suryapet',
    code: 'SRPT',
    headquarters: 'Suryapet',
    mandals: [
      {
        id: 'm-srpt-01',
        name: 'Suryapet',
        villages: [
          { id: 'v-srpt-1', name: 'Suryapet Town', type: 'town' },
          { id: 'v-srpt-2', name: 'Kudakuda', type: 'village' },
          { id: 'v-srpt-3', name: 'Pillalamarri', type: 'village' }
        ]
      },
      {
        id: 'm-srpt-02',
        name: 'Kodad',
        villages: [
          { id: 'v-srpt-k1', name: 'Kodad Town', type: 'town' },
          { id: 'v-srpt-k2', name: 'Thogarrai', type: 'village' }
        ]
      },
      {
        id: 'm-srpt-03',
        name: 'Huzurnagar',
        villages: [
          { id: 'v-srpt-h1', name: 'Huzurnagar Town', type: 'town' },
          { id: 'v-srpt-h2', name: 'Burugadda', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-30',
    name: 'Vikarabad',
    code: 'VKB',
    headquarters: 'Vikarabad',
    mandals: [
      {
        id: 'm-vkb-01',
        name: 'Vikarabad',
        villages: [
          { id: 'v-vkb-1', name: 'Vikarabad Town', type: 'town' },
          { id: 'v-vkb-2', name: 'Alampally', type: 'village' },
          { id: 'v-vkb-3', name: 'Godamguda', type: 'village' }
        ]
      },
      {
        id: 'm-vkb-02',
        name: 'Tandur',
        villages: [
          { id: 'v-vkb-t1', name: 'Tandur Town', type: 'town' },
          { id: 'v-vkb-t2', name: 'Gouthapur', type: 'village' },
          { id: 'v-vkb-t3', name: 'Karanote', type: 'village' }
        ]
      },
      {
        id: 'm-vkb-03',
        name: 'Pargi',
        villages: [
          { id: 'v-vkb-p1', name: 'Pargi Town', type: 'town' },
          { id: 'v-vkb-p2', name: 'Gundlapally', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-31',
    name: 'Wanaparthy',
    code: 'WNP',
    headquarters: 'Wanaparthy',
    mandals: [
      {
        id: 'm-wnp-01',
        name: 'Wanaparthy',
        villages: [
          { id: 'v-wnp-1', name: 'Wanaparthy Town', type: 'town' },
          { id: 'v-wnp-2', name: 'Nagavaram', type: 'village' },
          { id: 'v-wnp-3', name: 'Kothakota', type: 'town' }
        ]
      },
      {
        id: 'm-wnp-02',
        name: 'Pebbair',
        villages: [
          { id: 'v-wnp-p1', name: 'Pebbair Town', type: 'town' },
          { id: 'v-wnp-p2', name: 'Penchikalapadu', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-32',
    name: 'Warangal',
    code: 'WGL',
    headquarters: 'Warangal / Geesugonda',
    mandals: [
      {
        id: 'm-wgl-01',
        name: 'Warangal Fort',
        villages: [
          { id: 'v-wgl-1', name: 'Ursu', type: 'urban_locality' },
          { id: 'v-wgl-2', name: 'Shambunipet', type: 'urban_locality' },
          { id: 'v-wgl-3', name: 'Rangampet', type: 'urban_locality' },
          { id: 'v-wgl-4', name: 'Mamidnoor', type: 'village' }
        ]
      },
      {
        id: 'm-wgl-02',
        name: 'Wardhannapet',
        villages: [
          { id: 'v-wgl-w1', name: 'Wardhannapet Town', type: 'town' },
          { id: 'v-wgl-w2', name: 'Yellanda', type: 'village' },
          { id: 'v-wgl-w3', name: 'Inavolu Cross', type: 'village' }
        ]
      },
      {
        id: 'm-wgl-03',
        name: 'Narsampet',
        villages: [
          { id: 'v-wgl-n1', name: 'Narsampet Town', type: 'town' },
          { id: 'v-wgl-n2', name: 'Maheshwaram', type: 'village' }
        ]
      }
    ]
  },
  {
    id: 'dist-33',
    name: 'Yadadri Bhuvanagiri',
    code: 'YBG',
    headquarters: 'Bhuvanagiri',
    mandals: [
      {
        id: 'm-ybg-01',
        name: 'Bhuvanagiri',
        villages: [
          { id: 'v-ybg-1', name: 'Bhuvanagiri Town', type: 'town' },
          { id: 'v-ybg-2', name: 'Rayagiri', type: 'village' },
          { id: 'v-ybg-3', name: 'Anantharam', type: 'village' }
        ]
      },
      {
        id: 'm-ybg-02',
        name: 'Yadagirigutta',
        villages: [
          { id: 'v-ybg-y1', name: 'Yadagirigutta Temple Town', type: 'town' },
          { id: 'v-ybg-y2', name: 'Gundlapally', type: 'village' },
          { id: 'v-ybg-y3', name: 'Masaipet', type: 'village' }
        ]
      },
      {
        id: 'm-ybg-03',
        name: 'Choutuppal',
        villages: [
          { id: 'v-ybg-c1', name: 'Choutuppal Town', type: 'town' },
          { id: 'v-ybg-c2', name: 'Panthangi', type: 'village' },
          { id: 'v-ybg-c3', name: 'Thangadpally', type: 'village' }
        ]
      }
    ]
  }
];

export const TOTAL_TELANGANA_DISTRICTS_COUNT = TELANGANA_ALL_33_DISTRICTS.length; // 33
