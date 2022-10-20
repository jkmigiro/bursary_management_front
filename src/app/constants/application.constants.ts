import {Country} from '../models/country.model';
import {County} from '../models/county.model';

export class ApplicationConstants {

  static COUNTIES: County[] = [
    {
      id: 1,
      name: 'Mombasa',
    },
    {
      id: 2,
      name: 'Kwale',
    },
    {
      id: 3,
      name: 'Kilifi',
    },
    {
      id: 4,
      name: 'Tana River',
    },
    {
      id: 5,
      name: 'Lamu',
    },
    {
      id: 6,
      name: 'Taita-Taveta',
    },
    {
      id: 7,
      name: 'Garissa',
    },
    {
      id: 8,
      name: 'Wajir',
    },
    {
      id: 9,
      name: 'Mandera',
    },
    {
      id: 10,
      name: 'Marsabit',
    },
    {
      id: 11,
      name: 'Isiolo',
    },
    {
      id: 12,
      name: 'Meru',
    },
    {
      id: 13,
      name: 'Tharaka-Nithi',
    },
    {
      id: 14,
      name: 'Embu',
    },
    {
      id: 15,
      name: 'Kitui',
    },
    {
      id: 16,
      name: 'Machakos',
    },
    {
      id: 17,
      name: 'Makueni',
    },
    {
      id: 18,
      name: 'Nyandarua',
    },
    {
      id: 19,
      name: 'Nyeri',
    },
    {
      id: 20,
      name: 'Kirinyaga',
    },
    {
      id: 21,
      name: 'Murang\'a',
    },
    {
      id: 22,
      name: 'Kiambu',
    },
    {
      id: 23,
      name: 'Turkana',
    },
    {
      id: 24,
      name: 'West Pokot',
    },
    {
      id: 25,
      name: 'Samburu',
    },
    {
      id: 26,
      name: 'Trans-Nzoia',
    },
    {
      id: 27,
      name: 'Uasin Gishu',
    },
    {
      id: 28,
      name: 'Elgeyo-Marakwet',
    },
    {
      id: 29,
      name: 'Nandi',
    },
    {
      id: 30,
      name: 'Baringo',
    },
    {
      id: 31,
      name: 'Laikipia',
    },
    {
      id: 32,
      name: 'Nakuru',
    },
    {
      id: 33,
      name: 'Narok',
    },
    {
      id: 34,
      name: 'Kajiado',
    },
    {
      id: 35,
      name: 'Kericho',
    },
    {
      id: 36,
      name: 'Bomet',
    },
    {
      id: 37,
      name: 'Kakamega',
    },
    {
      id: 38,
      name: 'Vihiga',
    },
    {
      id: 39,
      name: 'Bungoma',
    },
    {
      id: 40,
      name: 'Busia',
    },
    {
      id: 41,
      name: 'Siaya',
    },
    {
      id: 42,
      name: 'Kisumu',
    },
    {
      id: 43,
      name: 'Homa Bay',
    },
    {
      id: 44,
      name: 'Migori',
    },
    {
      id: 45,
      name: 'Kisii',
    },
    {
      id: 46,
      name: 'Nyamira',
    },
    {
      id: 47,
      name: 'Nairobi',
    },
  ];
  static JOINING_OR_CONTINUING = [
    {
      key: 'JOINING',
      value: 'Joining Secondary',
    }, {
      key: 'CONTINUING',
      value: 'Continuing',
    },
  ];
  static URL = 'http://localhost:8080';
  static SCHOOL_GRADE = [
    {
      key: 'A',
      value: 'A',
    },
    {
      key: 'A_MINUS',
      value: 'A-',
    },
    {
      key: 'B_PLUS',
      value: 'B+',
    },
    {
      key: 'B_PLAIN',
      value: 'B+',
    },
    {
      key: 'B_MINUS',
      value: 'B-',
    },
    {
      key: 'C_PLUS',
      value: 'C+',
    },
    {
      key: 'C_PLAIN',
      value: 'C',
    },
    {
      key: 'C_MINUS',
      value: 'C-',
    },
    {
      key: 'D_PLUS',
      value: 'D+',
    }
    , {
      key: 'D_PLAIN',
      value: 'D',
    },
    {
      key: 'D_MINUS',
      value: 'D-',
    },
    {
      key: 'E',
      value: 'E',
    },
    {
      key: 'F',
      value: 'F',
    },
  ];
  static DAY_OR_BOARDER = [
    {
      key: 'DAY_SCHOLAR',
      value: 'Day Scholar',
    },
    {
      key: 'BOARDER',
      value: 'Boarder',
    },
  ];
  static FAMILY_STATUS = [
    {
      key: 'NEEDY',
      value: 'Needy',
    },
    {
      key: 'TOTAL_ORPHAN',
      value: 'Total Orphan',
    },
    {
      key: 'PARTIAL_ORPHAN',
      value: 'Partial Orphan',
    },
    {
      key: 'DISABILITY',
      value: 'Disability',
    },
    {
      key: 'STREET_CHILD',
      value: 'Street Child',
    },
    {
      key: 'SINGLE_PARENT',
      value: 'Single Parent',
    },
  ];
  static GENDER = [
    {
      key: 'M',
      value: 'Male',
    },
    {
      key: 'F',
      value: 'Female',
    },
  ];
  static JOINING_SECONDARY_OR_CONTINUING = [
    {
      key: 'JOINING',
      value: 'Joining Secondary',
    },
    {
      key: 'CONTINUING',
      value: 'Continuing',
    },
  ];
  static ROLE = [
    {
      key: 'ADMIN',
      value: 'Admin',
    },
    {
      key: 'USER',
      value: 'Normal User',
    },
    {
      key: 'MANAGER',
      value: 'Manager',
    },
  ];
  static SCHOOL_STATUS = [
    {
      key: 'NATIONAL',
      value: 'National',
    },
    {
      key: 'EXTRA_COUNTY',
      value: 'Extra County',
    },
    {
      key: 'COUNTY',
      value: 'County',
    },
    {
      key: 'DISTRICT',
      value: 'District',
    },
    {
      key: 'DAY_SCHOOL',
      value: 'Day School',
    },
  ];
  static STUDENT_RELATION = [
    {
      key: 'PARENT',
      value: 'Parent',
    },
    {
      key: 'GUARDIAN',
      value: 'Guardian',
    },
  ];
  static USER_STATUS = [
    {
      key: 'A',
      value: 'Active',
    },
    {
      key: 'I',
      value: 'Inactive',
    },
  ];
  static USERS = [
    {
      key: 'STUDENT',
      value: 'Student',
    },
    {
      key: 'PARENT',
      value: 'Parent',
    },
    {
      key: 'GUARDIAN',
      value: 'Guardian',
    },
    {
      key: 'ADMIN',
      value: 'Admin',
    },
    {
      key: 'WARD_ADMINISTRATOR',
      value: 'Ward Administrator',
    },
    {
      key: 'USER',
      value: 'User',
    },
    {
      key: 'SCHOOL',
      value: 'School',
    },
    {
      key: 'EDUCATION_OFFICIAL',
      value: 'Education Official',
    },
  ];

  static COUNTRIES: Country[] = [
    {
      'id': 1,
      'name': 'Afghanistan',
    },
    {
      'id': 2,
      'name': 'Albania',
    },
    {
      'id': 3,
      'name': 'Algeria',
    },
    {
      'id': 4,
      'name': 'American Samoa',
    },
    {
      'id': 5,
      'name': 'Andorra',
    },
    {
      'id': 6,
      'name': 'Angola',
    },
    {
      'id': 7,
      'name': 'Anguilla',
    },
    {
      'id': 8,
      'name': 'Antarctica',
    },
    {
      'id': 9,
      'name': 'Antigua and Barbuda',
    },
    {
      'id': 10,
      'name': 'Argentina',
    },
    {
      'id': 11,
      'name': 'Armenia',
    },
    {
      'id': 12,
      'name': 'Aruba',
    },
    {
      'id': 13,
      'name': 'Australia',
    },
    {
      'id': 14,
      'name': 'Austria',
    },
    {
      'id': 15,
      'name': 'Azerbaijan',
    },
    {
      'id': 16,
      'name': 'Bahamas',
    },
    {
      'id': 17,
      'name': 'Bahrain',
    },
    {
      'id': 18,
      'name': 'Bangladesh',
    },
    {
      'id': 19,
      'name': 'Barbados',
    },
    {
      'id': 20,
      'name': 'Belarus',
    },
    {
      'id': 21,
      'name': 'Belgium',
    },
    {
      'id': 22,
      'name': 'Belize',
    },
    {
      'id': 23,
      'name': 'Benin',
    },
    {
      'id': 24,
      'name': 'Bermuda',
    },
    {
      'id': 25,
      'name': 'Bhutan',
    },
    {
      'id': 26,
      'name': 'Bolivia',
    },
    {
      'id': 27,
      'name': 'Bosnia and Herzegovina',
    },
    {
      'id': 28,
      'name': 'Botswana',
    },
    {
      'id': 29,
      'name': 'Bouvet Island',
    },
    {
      'id': 30,
      'name': 'Brazil',
    },
    {
      'id': 31,
      'name': 'British Indian Ocean Territory',
    },
    {
      'id': 32,
      'name': 'Brunei Darussalam',
    },
    {
      'id': 33,
      'name': 'Bulgaria',
    },
    {
      'id': 34,
      'name': 'Burkina Faso',
    },
    {
      'id': 35,
      'name': 'Burundi',
    },
    {
      'id': 36,
      'name': 'Cambodia',
    },
    {
      'id': 37,
      'name': 'Cameroon',
    },
    {
      'id': 38,
      'name': 'Canada',
    },
    {
      'id': 39,
      'name': 'Cape Verde',
    },
    {
      'id': 40,
      'name': 'Cayman Islands',
    },
    {
      'id': 41,
      'name': 'Central African Republic',
    },
    {
      'id': 42,
      'name': 'Chad',
    },
    {
      'id': 43,
      'name': 'Chile',
    },
    {
      'id': 44,
      'name': 'China',
    },
    {
      'id': 45,
      'name': 'Christmas Island',
    },
    {
      'id': 46,
      'name': 'Cocos (Keeling) Islands',
    },
    {
      'id': 47,
      'name': 'Colombia',
    },
    {
      'id': 48,
      'name': 'Comoros',
    },
    {
      'id': 49,
      'name': 'Congo',
    },
    {
      'id': 50,
      'name': 'Congo, the Democratic Republic of the Congo',
    },
    {
      'id': 51,
      'name': 'Cook Islands',
    },
    {
      'id': 52,
      'name': 'Costa Rica',
    },
    {
      'id': 53,
      'name': 'Cote D\'Ivoire',
    },
    {
      'id': 54,
      'name': 'Croatia',
    },
    {
      'id': 55,
      'name': 'Cuba',
    },
    {
      'id': 56,
      'name': 'Cyprus',
    },
    {
      'id': 57,
      'name': 'Czech Republic',
    },
    {
      'id': 58,
      'name': 'Denmark',
    },
    {
      'id': 59,
      'name': 'Djibouti',
    },
    {
      'id': 60,
      'name': 'Dominica',
    },
    {
      'id': 61,
      'name': 'Dominican Republic',
    },
    {
      'id': 62,
      'name': 'Ecuador',
    },
    {
      'id': 63,
      'name': 'Egypt',
    },
    {
      'id': 64,
      'name': 'El Salvador',
    },
    {
      'id': 65,
      'name': 'Equatorial Guinea',
    },
    {
      'id': 66,
      'name': 'Eritrea',
    },
    {
      'id': 67,
      'name': 'Estonia',
    },
    {
      'id': 68,
      'name': 'Ethiopia',
    },
    {
      'id': 69,
      'name': 'Falkland Islands (Malvinas)',
    },
    {
      'id': 70,
      'name': 'Faroe Islands',
    },
    {
      'id': 71,
      'name': 'Fiji',
    },
    {
      'id': 72,
      'name': 'Finland',
    },
    {
      'id': 73,
      'name': 'France',
    },
    {
      'id': 74,
      'name': 'French Guiana',
    },
    {
      'id': 75,
      'name': 'French Polynesia',
    },
    {
      'id': 76,
      'name': 'French Southern Territories',
    },
    {
      'id': 77,
      'name': 'Gabon',
    },
    {
      'id': 78,
      'name': 'Gambia',
    },
    {
      'id': 79,
      'name': 'Georgia',
    },
    {
      'id': 80,
      'name': 'Germany',
    },
    {
      'id': 81,
      'name': 'Ghana',
    },
    {
      'id': 82,
      'name': 'Gibraltar',
    },
    {
      'id': 83,
      'name': 'Greece',
    },
    {
      'id': 84,
      'name': 'Greenland',
    },
    {
      'id': 85,
      'name': 'Grenada',
    },
    {
      'id': 86,
      'name': 'Guadeloupe',
    },
    {
      'id': 87,
      'name': 'Guam',
    },
    {
      'id': 88,
      'name': 'Guatemala',
    },
    {
      'id': 89,
      'name': 'Guinea',
    },
    {
      'id': 90,
      'name': 'Guinea-Bissau',
    },
    {
      'id': 91,
      'name': 'Guyana',
    },
    {
      'id': 92,
      'name': 'Haiti',
    },
    {
      'id': 93,
      'name': 'Heard Island and Mcdonald Islands',
    },
    {
      'id': 94,
      'name': 'Holy See (Vatican City State)',
    },
    {
      'id': 95,
      'name': 'Honduras',
    },
    {
      'id': 96,
      'name': 'Hong Kong',
    },
    {
      'id': 97,
      'name': 'Hungary',
    },
    {
      'id': 98,
      'name': 'Iceland',
    },
    {
      'id': 99,
      'name': 'India',
    },
    {
      'id': 100,
      'name': 'Indonesia',
    },
    {
      'id': 101,
      'name': 'Iran',
    },
    {
      'id': 102,
      'name': 'Iraq',
    },
    {
      'id': 103,
      'name': 'Ireland',
    },
    {
      'id': 104,
      'name': 'Israel',
    },
    {
      'id': 105,
      'name': 'Italy',
    },
    {
      'id': 106,
      'name': 'Jamaica',
    },
    {
      'id': 107,
      'name': 'Japan',
    },
    {
      'id': 108,
      'name': 'Jordan',
    },
    {
      'id': 109,
      'name': 'Kazakhstan',
    },
    {
      'id': 110,
      'name': 'Kenya',
    },
    {
      'id': 111,
      'name': 'Kiribati',
    },
    {
      'id': 112,
      'name': 'South Korea',
    },
    {
      'id': 113,
      'name': 'North Korea',
    },
    {
      'id': 114,
      'name': 'Kuwait',
    },
    {
      'id': 115,
      'name': 'Kyrgyzstan',
    },
    {
      'id': 116,
      'name': 'Lao People\'s Democratic Republic',
    },
    {
      'id': 117,
      'name': 'Latvia',
    },
    {
      'id': 118,
      'name': 'Lebanon',
    },
    {
      'id': 119,
      'name': 'Lesotho',
    },
    {
      'id': 120,
      'name': 'Liberia',
    },
    {
      'id': 121,
      'name': 'Libyan Arab Jamahiriya',
    },
    {
      'id': 122,
      'name': 'Liechtenstein',
    },
    {
      'id': 123,
      'name': 'Lithuania',
    },
    {
      'id': 124,
      'name': 'Luxembourg',
    },
    {
      'id': 125,
      'name': 'Macao',
    },
    {
      'id': 126,
      'name': 'Macedonia',
    },
    {
      'id': 127,
      'name': 'Madagascar',
    },
    {
      'id': 128,
      'name': 'Malawi',
    },
    {
      'id': 129,
      'name': 'Malaysia',
    },
    {
      'id': 130,
      'name': 'Maldives',
    },
    {
      'id': 131,
      'name': 'Mali',
    },
    {
      'id': 132,
      'name': 'Malta',
    },
    {
      'id': 133,
      'name': 'Marshall Islands',
    },
    {
      'id': 134,
      'name': 'Martinique',
    },
    {
      'id': 135,
      'name': 'Mauritania',
    },
    {
      'id': 136,
      'name': 'Mauritius',
    },
    {
      'id': 137,
      'name': 'Mayotte',
    },
    {
      'id': 138,
      'name': 'Mexico',
    },
    {
      'id': 139,
      'name': 'Micronesia',
    },
    {
      'id': 140,
      'name': 'Moldova',
    },
    {
      'id': 141,
      'name': 'Monaco',
    },
    {
      'id': 142,
      'name': 'Mongolia',
    },
    {
      'id': 143,
      'name': 'Montserrat',
    },
    {
      'id': 144,
      'name': 'Morocco',
    },
    {
      'id': 145,
      'name': 'Mozambique',
    },
    {
      'id': 146,
      'name': 'Myanmar',
    },
    {
      'id': 147,
      'name': 'Namibia',
    },
    {
      'id': 148,
      'name': 'Nauru',
    },
    {
      'id': 149,
      'name': 'Nepal',
    },
    {
      'id': 150,
      'name': 'Netherlands',
    },
    {
      'id': 151,
      'name': 'Netherlands Antilles',
    },
    {
      'id': 152,
      'name': 'New Caledonia',
    },
    {
      'id': 153,
      'name': 'New Zealand',
    },
    {
      'id': 154,
      'name': 'Nicaragua',
    },
    {
      'id': 155,
      'name': 'Niger',
    },
    {
      'id': 156,
      'name': 'Nigeria',
    },
    {
      'id': 157,
      'name': 'Niue',
    },
    {
      'id': 158,
      'name': 'Norfolk Island',
    },
    {
      'id': 159,
      'name': 'Northern Mariana Islands',
    },
    {
      'id': 160,
      'name': 'Norway',
    },
    {
      'id': 161,
      'name': 'Oman',
    },
    {
      'id': 162,
      'name': 'Pakistan',
    },
    {
      'id': 163,
      'name': 'Palau',
    },
    {
      'id': 164,
      'name': 'Palestinian Territory, Occupied',
    },
    {
      'id': 165,
      'name': 'Panama',
    },
    {
      'id': 166,
      'name': 'Papua New Guinea',
    },
    {
      'id': 167,
      'name': 'Paraguay',
    },
    {
      'id': 168,
      'name': 'Peru',
    },
    {
      'id': 169,
      'name': 'Philippines',
    },
    {
      'id': 170,
      'name': 'Pitcairn',
    },
    {
      'id': 171,
      'name': 'Poland',
    },
    {
      'id': 172,
      'name': 'Portugal',
    },
    {
      'id': 173,
      'name': 'Puerto Rico',
    },
    {
      'id': 174,
      'name': 'Qatar',
    },
    {
      'id': 175,
      'name': 'Reunion',
    },
    {
      'id': 176,
      'name': 'Romania',
    },
    {
      'id': 177,
      'name': 'Russian Federation',
    },
    {
      'id': 178,
      'name': 'Rwanda',
    },
    {
      'id': 179,
      'name': 'Saint Helena',
    },
    {
      'id': 180,
      'name': 'Saint Kitts and Nevis',
    },
    {
      'id': 181,
      'name': 'Saint Lucia',
    },
    {
      'id': 182,
      'name': 'Saint Pierre and Miquelon',
    },
    {
      'id': 183,
      'name': 'Saint Vincent and the Grenadines',
    },
    {
      'id': 184,
      'name': 'Samoa',
    },
    {
      'id': 185,
      'name': 'San Marino',
    },
    {
      'id': 186,
      'name': 'Sao Tome and Principe',
    },
    {
      'id': 187,
      'name': 'Saudi Arabia',
    },
    {
      'id': 188,
      'name': 'Senegal',
    },
    {
      'id': 189,
      'name': 'Serbia and Montenegro',
    },
    {
      'id': 190,
      'name': 'Seychelles',
    },
    {
      'id': 191,
      'name': 'Sierra Leone',
    },
    {
      'id': 192,
      'name': 'Singapore',
    },
    {
      'id': 193,
      'name': 'Slovakia',
    },
    {
      'id': 194,
      'name': 'Slovenia',
    },
    {
      'id': 195,
      'name': 'Solomon Islands',
    },
    {
      'id': 196,
      'name': 'Somalia',
    },
    {
      'id': 197,
      'name': 'South Africa',
    },
    {
      'id': 198,
      'name': 'South Georgia and the South Sandwich Islands',
    },
    {
      'id': 199,
      'name': 'Spain',
    },
    {
      'id': 200,
      'name': 'Sri Lanka',
    },
    {
      'id': 201,
      'name': 'Sudan',
    },
    {
      'id': 202,
      'name': 'Suriname',
    },
    {
      'id': 203,
      'name': 'Svalbard and Jan Mayen',
    },
    {
      'id': 204,
      'name': 'Swaziland',
    },
    {
      'id': 205,
      'name': 'Sweden',
    },
    {
      'id': 206,
      'name': 'Switzerland',
    },
    {
      'id': 207,
      'name': 'Syrian Arab Republic',
    },
    {
      'id': 208,
      'name': 'Taiwan, Province of China',
    },
    {
      'id': 209,
      'name': 'Tajikistan',
    },
    {
      'id': 210,
      'name': 'Tanzania',
    },
    {
      'id': 211,
      'name': 'Thailand',
    },
    {
      'id': 212,
      'name': 'Timor-Leste',
    },
    {
      'id': 213,
      'name': 'Togo',
    },
    {
      'id': 214,
      'name': 'Tokelau',
    },
    {
      'id': 215,
      'name': 'Tonga',
    },
    {
      'id': 216,
      'name': 'Trinidad and Tobago',
    },
    {
      'id': 217,
      'name': 'Tunisia',
    },
    {
      'id': 218,
      'name': 'Turkey',
    },
    {
      'id': 219,
      'name': 'Turkmenistan',
    },
    {
      'id': 220,
      'name': 'Turks and Caicos Islands',
    },
    {
      'id': 221,
      'name': 'Tuvalu',
    },
    {
      'id': 222,
      'name': 'Uganda',
    },
    {
      'id': 223,
      'name': 'Ukraine',
    },
    {
      'id': 224,
      'name': 'United Arab Emirates',
    },
    {
      'id': 225,
      'name': 'United Kingdom',
    },
    {
      'id': 226,
      'name': 'United States',
    },
    {
      'id': 227,
      'name': 'United States Minor Outlying Islands',
    },
    {
      'id': 228,
      'name': 'Uruguay',
    },
    {
      'id': 229,
      'name': 'Uzbekistan',
    },
    {
      'id': 230,
      'name': 'Vanuatu',
    },
    {
      'id': 231,
      'name': 'Venezuela',
    },
    {
      'id': 232,
      'name': 'Vietnam',
    },
    {
      'id': 233,
      'name': 'Virgin Islands, British',
    },
    {
      'id': 234,
      'name': 'Virgin Islands, U.s.',
    },
    {
      'id': 235,
      'name': 'Wallis and Futuna',
    },
    {
      'id': 236,
      'name': 'Western Sahara',
    },
    {
      'id': 237,
      'name': 'Yemen',
    },
    {
      'id': 238,
      'name': 'Zambia',
    },
    {
      'id': 239,
      'name': 'Zimbabwe',
    },
  ];
}
