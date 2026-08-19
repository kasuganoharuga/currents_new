// Bundled top-population Australian cities for the join form's location
// picker — gives instant, client-side-filtered city search for AU (where
// almost all applicants are) instead of a live GeoNames round-trip (~1s).
// Any other country still falls back to the live /api/geo/cities lookup
// (see location-picker.tsx).
//
// Regenerate against the GeoNames search API (featureClass=P, orderby=
// population) if this needs a refresh or more countries.

export interface MajorCity {
  id: string;
  name: string;
  stateCode: string;
}

export const MAJOR_CITIES: Readonly<Record<string, readonly MajorCity[]>> = {
  AU: [
    {
      id: "2147714",
      name: "Sydney",
      stateCode: "NSW",
    },
    {
      id: "2158177",
      name: "Melbourne",
      stateCode: "VIC",
    },
    {
      id: "2174003",
      name: "Brisbane",
      stateCode: "QLD",
    },
    {
      id: "2063523",
      name: "Perth",
      stateCode: "WA",
    },
    {
      id: "2078025",
      name: "Adelaide",
      stateCode: "SA",
    },
    {
      id: "2165087",
      name: "Gold Coast",
      stateCode: "QLD",
    },
    {
      id: "2155472",
      name: "Newcastle",
      stateCode: "NSW",
    },
    {
      id: "2172517",
      name: "Canberra",
      stateCode: "ACT",
    },
    {
      id: "8310663",
      name: "Central Coast",
      stateCode: "NSW",
    },
    {
      id: "10630449",
      name: "Sunshine Coast",
      stateCode: "QLD",
    },
    {
      id: "7281838",
      name: "Logan City",
      stateCode: "QLD",
    },
    {
      id: "2165798",
      name: "Geelong",
      stateCode: "VIC",
    },
    {
      id: "2171507",
      name: "Wollongong",
      stateCode: "NSW",
    },
    {
      id: "2163355",
      name: "Hobart",
      stateCode: "TAS",
    },
    {
      id: "2146142",
      name: "Townsville",
      stateCode: "QLD",
    },
    {
      id: "2172797",
      name: "Cairns",
      stateCode: "QLD",
    },
    {
      id: "2146268",
      name: "Toowoomba",
      stateCode: "QLD",
    },
    {
      id: "2073124",
      name: "Darwin",
      stateCode: "NT",
    },
    {
      id: "2159220",
      name: "Mackay",
      stateCode: "QLD",
    },
    {
      id: "10300648",
      name: "City of Port Phillip",
      stateCode: "VIC",
    },
    {
      id: "2177091",
      name: "Ballarat",
      stateCode: "VIC",
    },
    {
      id: "2176187",
      name: "Bendigo",
      stateCode: "VIC",
    },
    {
      id: "2172710",
      name: "Caloundra",
      stateCode: "QLD",
    },
    {
      id: "2160517",
      name: "Launceston",
      stateCode: "TAS",
    },
    {
      id: "2067119",
      name: "Mandurah",
      stateCode: "WA",
    },
    {
      id: "2159045",
      name: "Maitland",
      stateCode: "NSW",
    },
    {
      id: "2145936",
      name: "Tuggeranong Administrative District",
      stateCode: "ACT",
    },
    {
      id: "2151437",
      name: "Rockhampton",
      stateCode: "QLD",
    },
    {
      id: "2171085",
      name: "Coffs Harbour",
      stateCode: "NSW",
    },
    {
      id: "2075432",
      name: "Bunbury",
      stateCode: "WA",
    },
    {
      id: "2173323",
      name: "Bundaberg",
      stateCode: "QLD",
    },
    {
      id: "7302628",
      name: "Adelaide Hills",
      stateCode: "SA",
    },
    {
      id: "2152819",
      name: "Point Cook",
      stateCode: "VIC",
    },
    {
      id: "2170089",
      name: "Craigieburn",
      stateCode: "VIC",
    },
    {
      id: "11523810",
      name: "Melbourne City Centre",
      stateCode: "VIC",
    },
    {
      id: "2147357",
      name: "Tarneit",
      stateCode: "VIC",
    },
    {
      id: "2153953",
      name: "Pakenham",
      stateCode: "VIC",
    },
    {
      id: "6354957",
      name: "Hervey Bay",
      stateCode: "QLD",
    },
    {
      id: "2152659",
      name: "Port Macquarie",
      stateCode: "NSW",
    },
    {
      id: "2151716",
      name: "Reservoir",
      stateCode: "VIC",
    },
    {
      id: "2176031",
      name: "Berwick",
      stateCode: "VIC",
    },
    {
      id: "2144095",
      name: "Werribee",
      stateCode: "VIC",
    },
    {
      id: "2175411",
      name: "Blacktown",
      stateCode: "NSW",
    },
    {
      id: "2165478",
      name: "Gladstone",
      stateCode: "QLD",
    },
    {
      id: "2147497",
      name: "Tamworth",
      stateCode: "NSW",
    },
    {
      id: "2168305",
      name: "Dubbo",
      stateCode: "NSW",
    },
    {
      id: "2165171",
      name: "Glen Waverley",
      stateCode: "VIC",
    },
    {
      id: "2154219",
      name: "Orange",
      stateCode: "NSW",
    },
    {
      id: "2172111",
      name: "Castle Hill",
      stateCode: "NSW",
    },
    {
      id: "2143285",
      name: "Wodonga",
      stateCode: "VIC",
    },
    {
      id: "2147914",
      name: "Sunbury",
      stateCode: "VIC",
    },
    {
      id: "2070998",
      name: "Geraldton",
      stateCode: "WA",
    },
    {
      id: "8349017",
      name: "Baldivis",
      stateCode: "WA",
    },
    {
      id: "8015209",
      name: "St Albans",
      stateCode: "VIC",
    },
    {
      id: "2166144",
      name: "Frankston",
      stateCode: "VIC",
    },
    {
      id: "2177513",
      name: "Auburn",
      stateCode: "NSW",
    },
    {
      id: "7281807",
      name: "Hoppers Crossing",
      stateCode: "VIC",
    },
    {
      id: "2176592",
      name: "Baulkham Hills",
      stateCode: "NSW",
    },
    {
      id: "2145990",
      name: "Truganina",
      stateCode: "VIC",
    },
    {
      id: "2176632",
      name: "Bathurst",
      stateCode: "NSW",
    },
    {
      id: "2156492",
      name: "Mount Waverley",
      stateCode: "VIC",
    },
    {
      id: "2150717",
      name: "Saint Albans",
      stateCode: "VIC",
    },
    {
      id: "2077963",
      name: "Albany",
      stateCode: "WA",
    },
    {
      id: "2176947",
      name: "Bankstown",
      stateCode: "NSW",
    },
    {
      id: "2157698",
      name: "Mildura",
      stateCode: "VIC",
    },
    {
      id: "7302631",
      name: "Canning Vale",
      stateCode: "WA",
    },
    {
      id: "2166143",
      name: "Frankston East",
      stateCode: "VIC",
    },
    {
      id: "2152558",
      name: "Preston",
      stateCode: "VIC",
    },
    {
      id: "6301965",
      name: "Palmerston",
      stateCode: "NT",
    },
    {
      id: "2150894",
      name: "Rowville",
      stateCode: "VIC",
    },
    {
      id: "2167279",
      name: "Epping",
      stateCode: "VIC",
    },
    {
      id: "2148928",
      name: "Southport",
      stateCode: "QLD",
    },
    {
      id: "2144528",
      name: "Warrnambool",
      stateCode: "VIC",
    },
    {
      id: "2149645",
      name: "Shepparton",
      stateCode: "VIC",
    },
    {
      id: "2147849",
      name: "Surfers Paradise",
      stateCode: "QLD",
    },
    {
      id: "2168605",
      name: "Doncaster East",
      stateCode: "VIC",
    },
    {
      id: "2155204",
      name: "Noble Park",
      stateCode: "VIC",
    },
    {
      id: "9972518",
      name: "Narre Warren South",
      stateCode: "VIC",
    },
    {
      id: "2068079",
      name: "Kwinana",
      stateCode: "WA",
    },
    {
      id: "2158651",
      name: "Maroubra",
      stateCode: "NSW",
    },
    {
      id: "2176122",
      name: "Bentleigh East",
      stateCode: "VIC",
    },
    {
      id: "2169460",
      name: "Dandenong",
      stateCode: "VIC",
    },
    {
      id: "2161532",
      name: "Keysborough",
      stateCode: "VIC",
    },
    {
      id: "2144764",
      name: "Wangaratta",
      stateCode: "VIC",
    },
    {
      id: "9972762",
      name: "Hurstville",
      stateCode: "NSW",
    },
    {
      id: "2157995",
      name: "Merrylands",
      stateCode: "NSW",
    },
    {
      id: "2068823",
      name: "Kalgoorlie",
      stateCode: "WA",
    },
    {
      id: "2208285",
      name: "Randwick",
      stateCode: "NSW",
    },
    {
      id: "2173605",
      name: "Buderim",
      stateCode: "QLD",
    },
    {
      id: "2157635",
      name: "Mill Park",
      stateCode: "VIC",
    },
    {
      id: "2151649",
      name: "Richmond",
      stateCode: "VIC",
    },
    {
      id: "8349381",
      name: "Bundoora",
      stateCode: "VIC",
    },
    {
      id: "2156813",
      name: "Mosman",
      stateCode: "NSW",
    },
    {
      id: "2155718",
      name: "Narre Warren",
      stateCode: "VIC",
    },
    {
      id: "8347736",
      name: "Kellyville",
      stateCode: "NSW",
    },
    {
      id: "2159851",
      name: "Liverpool",
      stateCode: "NSW",
    },
    {
      id: "2158562",
      name: "Maryborough",
      stateCode: "QLD",
    },
    {
      id: "7281850",
      name: "Ferntree Gully",
      stateCode: "VIC",
    },
    {
      id: "2168537",
      name: "Doreen",
      stateCode: "VIC",
    },
    {
      id: "2146108",
      name: "Traralgon",
      stateCode: "VIC",
    },
    {
      id: "2152329",
      name: "Quakers Hill",
      stateCode: "NSW",
    },
    {
      id: "7281840",
      name: "Parramatta",
      stateCode: "NSW",
    },
    {
      id: "2171168",
      name: "Coburg",
      stateCode: "VIC",
    },
    {
      id: "2169867",
      name: "Croydon",
      stateCode: "VIC",
    },
    {
      id: "2150767",
      name: "Ryde",
      stateCode: "NSW",
    },
    {
      id: "2172832",
      name: "Caboolture",
      stateCode: "QLD",
    },
    {
      id: "2168943",
      name: "Devonport",
      stateCode: "TAS",
    },
    {
      id: "2158626",
      name: "Marrickville",
      stateCode: "NSW",
    },
    {
      id: "2165290",
      name: "Glen Iris",
      stateCode: "VIC",
    },
    {
      id: "2163990",
      name: "Hampton Park",
      stateCode: "VIC",
    },
    {
      id: "2148088",
      name: "Strathfield",
      stateCode: "NSW",
    },
    {
      id: "2156878",
      name: "Mornington",
      stateCode: "VIC",
    },
    {
      id: "6619280",
      name: "Sydney Central Business District",
      stateCode: "NSW",
    },
    {
      id: "2156643",
      name: "Mount Gambier",
      stateCode: "SA",
    },
    {
      id: "2155001",
      name: "Northcote",
      stateCode: "VIC",
    },
    {
      id: "2148876",
      name: "South Yarra",
      stateCode: "VIC",
    },
    {
      id: "2077895",
      name: "Alice Springs",
      stateCode: "NT",
    },
    {
      id: "2171707",
      name: "Chatswood",
      stateCode: "NSW",
    },
    {
      id: "2168607",
      name: "Doncaster",
      stateCode: "VIC",
    },
    {
      id: "2156942",
      name: "South Morang",
      stateCode: "VIC",
    },
    {
      id: "2145461",
      name: "Upper Coomera",
      stateCode: "QLD",
    },
    {
      id: "2173741",
      name: "Brunswick",
      stateCode: "VIC",
    },
    {
      id: "2177394",
      name: "Bacchus Marsh",
      stateCode: "VIC",
    },
    {
      id: "9972516",
      name: "Cranbourne North",
      stateCode: "VIC",
    },
    {
      id: "9972515",
      name: "Cranbourne East",
      stateCode: "VIC",
    },
    {
      id: "8348596",
      name: "Ellenbrook",
      stateCode: "WA",
    },
    {
      id: "2164837",
      name: "Goulburn",
      stateCode: "NSW",
    },
    {
      id: "2161540",
      name: "Kew",
      stateCode: "VIC",
    },
    {
      id: "7281805",
      name: "Caroline Springs",
      stateCode: "VIC",
    },
    {
      id: "8348466",
      name: "Campsie",
      stateCode: "NSW",
    },
    {
      id: "8347325",
      name: "Endeavour Hills",
      stateCode: "VIC",
    },
    {
      id: "2143255",
      name: "Wollert",
      stateCode: "VIC",
    },
    {
      id: "8348574",
      name: "Greenacre",
      stateCode: "NSW",
    },
    {
      id: "8349051",
      name: "Dianella",
      stateCode: "WA",
    },
    {
      id: "2172303",
      name: "Carlingford",
      stateCode: "NSW",
    },
    {
      id: "8347896",
      name: "Roxburgh Park",
      stateCode: "VIC",
    },
    {
      id: "2065740",
      name: "Morphett Vale",
      stateCode: "SA",
    },
    {
      id: "2207618",
      name: "Cheltenham",
      stateCode: "VIC",
    },
    {
      id: "2165200",
      name: "Glenroy",
      stateCode: "VIC",
    },
    {
      id: "2177565",
      name: "Ashfield",
      stateCode: "NSW",
    },
    {
      id: "8349108",
      name: "Thornlie",
      stateCode: "WA",
    },
    {
      id: "2174580",
      name: "Boronia",
      stateCode: "VIC",
    },
    {
      id: "8348582",
      name: "Greystanes",
      stateCode: "NSW",
    },
    {
      id: "2167280",
      name: "Epping",
      stateCode: "NSW",
    },
    {
      id: "2158051",
      name: "Mernda",
      stateCode: "VIC",
    },
    {
      id: "2174039",
      name: "Brighton",
      stateCode: "VIC",
    },
    {
      id: "2160706",
      name: "Lalor",
      stateCode: "VIC",
    },
    {
      id: "2171845",
      name: "Cessnock",
      stateCode: "NSW",
    },
    {
      id: "8348930",
      name: "Robina",
      stateCode: "QLD",
    },
    {
      id: "2156977",
      name: "Mooroolbark",
      stateCode: "VIC",
    },
    {
      id: "7302642",
      name: "Glenmore Park",
      stateCode: "NSW",
    },
    {
      id: "7302683",
      name: "Southbank",
      stateCode: "VIC",
    },
    {
      id: "9957340",
      name: "Forest Lake",
      stateCode: "QLD",
    },
    {
      id: "9972522",
      name: "Dandenong North",
      stateCode: "VIC",
    },
    {
      id: "8349083",
      name: "Morley",
      stateCode: "WA",
    },
    {
      id: "2163137",
      name: "Hornsby",
      stateCode: "NSW",
    },
    {
      id: "2164129",
      name: "Gympie",
      stateCode: "QLD",
    },
    {
      id: "2163782",
      name: "Hawthorn",
      stateCode: "VIC",
    },
    {
      id: "7932638",
      name: "Malvern East",
      stateCode: "VIC",
    },
    {
      id: "2148591",
      name: "Springvale",
      stateCode: "VIC",
    },
    {
      id: "2160582",
      name: "Langwarrin",
      stateCode: "VIC",
    },
    {
      id: "2172191",
      name: "Carrum Downs",
      stateCode: "VIC",
    },
    {
      id: "2172686",
      name: "Camberwell",
      stateCode: "VIC",
    },
    {
      id: "2075265",
      name: "Busselton",
      stateCode: "WA",
    },
    {
      id: "8348460",
      name: "Cabramatta",
      stateCode: "NSW",
    },
    {
      id: "2065665",
      name: "Mount Barker",
      stateCode: "SA",
    },
    {
      id: "2177671",
      name: "Armidale",
      stateCode: "NSW",
    },
    {
      id: "7932629",
      name: "Balwyn North",
      stateCode: "VIC",
    },
    {
      id: "2170079",
      name: "Cranbourne",
      stateCode: "VIC",
    },
    {
      id: "2164495",
      name: "Greenvale",
      stateCode: "VIC",
    },
    {
      id: "6943562",
      name: "North Lakes",
      stateCode: "QLD",
    },
    {
      id: "2167208",
      name: "Essendon",
      stateCode: "VIC",
    },
    {
      id: "2156934",
      name: "Morayfield",
      stateCode: "QLD",
    },
    {
      id: "2163776",
      name: "Hawthorn South",
      stateCode: "VIC",
    },
    {
      id: "2165329",
      name: "Glenferrie",
      stateCode: "VIC",
    },
    {
      id: "2070571",
      name: "Gosnells",
      stateCode: "WA",
    },
    {
      id: "2208305",
      name: "Dee Why",
      stateCode: "NSW",
    },
    {
      id: "2164515",
      name: "Greensborough",
      stateCode: "VIC",
    },
    {
      id: "8349354",
      name: "Kirwan",
      stateCode: "QLD",
    },
    {
      id: "2155787",
      name: "Narangba",
      stateCode: "QLD",
    },
    {
      id: "2144728",
      name: "Wantirna South",
      stateCode: "VIC",
    },
    {
      id: "2143887",
      name: "Wheelers Hill",
      stateCode: "VIC",
    },
    {
      id: "2164422",
      name: "Griffith",
      stateCode: "NSW",
    },
    {
      id: "8348078",
      name: "Wyndham Vale",
      stateCode: "VIC",
    },
    {
      id: "2146827",
      name: "Thomastown",
      stateCode: "VIC",
    },
    {
      id: "6943560",
      name: "Kallangur",
      stateCode: "QLD",
    },
    {
      id: "8349222",
      name: "Punchbowl",
      stateCode: "NSW",
    },
    {
      id: "2071059",
      name: "Gawler",
      stateCode: "SA",
    },
    {
      id: "2173125",
      name: "Burnie",
      stateCode: "TAS",
    },
    {
      id: "9972517",
      name: "Cranbourne West",
      stateCode: "VIC",
    },
    {
      id: "2156340",
      name: "Mulgrave",
      stateCode: "VIC",
    },
    {
      id: "2144604",
      name: "Warragul",
      stateCode: "VIC",
    },
    {
      id: "8349321",
      name: "St Clair",
      stateCode: "NSW",
    },
    {
      id: "2156578",
      name: "Mount Martha",
      stateCode: "VIC",
    },
    {
      id: "11523825",
      name: "Adelaide city centre",
      stateCode: "SA",
    },
    {
      id: "2160258",
      name: "Lidcombe",
      stateCode: "NSW",
    },
    {
      id: "2175974",
      name: "Bexley",
      stateCode: "NSW",
    },
    {
      id: "2169220",
      name: "Deception Bay",
      stateCode: "QLD",
    },
    {
      id: "2150660",
      name: "Saint Kilda",
      stateCode: "VIC",
    },
    {
      id: "8348101",
      name: "Willetton",
      stateCode: "WA",
    },
  ],
};
