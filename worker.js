// Constants
const SUPPORTED_COUNTRIES = {
  "US": { name: "United States 美国", dzPath: "/usa-address" },
  "US.OR": { name: "United States Oregon 美国俄勒冈州", dzPath: "/usa-address/oregon" },
  "UK": { name: "United Kingdom 英国", dzPath: "/uk-address" },
  "FR": { name: "France 法国", dzPath: "/fr-address" },
  "DE": { name: "Germany 德国", dzPath: "/de-address" },
  "CN": { name: "China 中国", dzPath: "/cn-address" },
  "TW": { name: "Taiwan 中国台湾", dzPath: "/tw-address" },
  "HK": { name: "Hong Kong 中国香港", dzPath: "/hk-address" },
  "JP": { name: "Japan 日本", dzPath: "/jp-address" },
  "SG": { name: "Singapore 新加坡", dzPath: "/sg-address" },
  "IN": { name: "India 印度" },
  "AU": { name: "Australia 澳大利亚", dzPath: "/au-address" },
  "BR": { name: "Brazil 巴西" },
  "CA": { name: "Canada 加拿大", dzPath: "/ca-address" },
  "RU": { name: "Russia 俄罗斯", dzPath: "/ru-address" },
  "ZA": { name: "South Africa 南非" },
  "MX": { name: "Mexico 墨西哥" },
  "KR": { name: "South Korea 韩国", dzPath: "/kr-address" },
  "IT": { name: "Italy 意大利", dzPath: "/it-address" },
  "ES": { name: "Spain 西班牙", dzPath: "/es-address" },
  "TR": { name: "Turkey 土耳其", dzPath: "/tr-address" },
  "SA": { name: "Saudi Arabia 沙特阿拉伯" },
  "AR": { name: "Argentina 阿根廷", dzPath: "/ar-address" },
  "EG": { name: "Egypt 埃及" },
  "NG": { name: "Nigeria 尼日利亚" },
  "ID": { name: "Indonesia 印度尼西亚" }
};

const COUNTRY_COORDINATES = {
  "US": [{ lat: 37.7749, lng: -122.4194 }, { lat: 34.0522, lng: -118.2437 }],
  "US.OR": [
    // { lat: 46.48326, lng: -127.55127 },
    { lat: 45.5231, lng: -122.6765 },  // Portland
    { lat: 44.0521, lng: -123.0868 },  // Eugene
    { lat: 44.9429, lng: -123.0351 },  // Salem
    { lat: 42.2268, lng: -121.7816 },  // Klamath Falls
    { lat: 46.1878, lng: -123.8313 },  // Astoria
    { lat: 44.6366, lng: -121.1291 },  // Bend
    { lat: 45.3247, lng: -121.6747 },  // Mount Hood area
    // { lat: 41.78770, lng: -113.62061 },
  ],
  "UK": [{ lat: 51.5074, lng: -0.1278 }, { lat: 53.4808, lng: -2.2426 }],
  "FR": [{ lat: 48.8566, lng: 2.3522 }, { lat: 45.7640, lng: 4.8357 }],
  "DE": [{ lat: 52.5200, lng: 13.4050 }, { lat: 48.1351, lng: 11.5820 }],
  "CN": [{ lat: 39.9042, lng: 116.4074 }, { lat: 31.2304, lng: 121.4737 }],
  "TW": [{ lat: 25.0330, lng: 121.5654 }, { lat: 22.6273, lng: 120.3014 }],
  "HK": [{ lat: 22.3193, lng: 114.1694 },{ lat: 22.3964, lng: 114.1095 }],
  "JP": [{ lat: 35.6895, lng: 139.6917 }, { lat: 34.6937, lng: 135.5023 }],
  "SG": [{ lat: 1.3365, lng: 103.7002 }, { lat: 1.3500, lng: 103.8738 }],
  "IN": [{ lat: 28.6139, lng: 77.2090 }, { lat: 19.0760, lng: 72.8777 }],
  "AU": [{ lat: -33.8688, lng: 151.2093 }, { lat: -37.8136, lng: 144.9631 }],
  "BR": [{ lat: -23.5505, lng: -46.6333 }, { lat: -22.9068, lng: -43.1729 }],
  "CA": [{ lat: 43.651070, lng: -79.347015 }, { lat: 45.501690, lng: -73.567253 }],
  "RU": [{ lat: 55.7558, lng: 37.6173 }, { lat: 59.9343, lng: 30.3351 }],
  "ZA": [{ lat: -33.9249, lng: 18.4241 }, { lat: -26.2041, lng: 28.0473 }],
  "MX": [{ lat: 19.4326, lng: -99.1332 }, { lat: 20.6597, lng: -103.3496 }],
  "KR": [{ lat: 37.5665, lng: 126.9780 }, { lat: 35.1796, lng: 129.0756 }],
  "IT": [{ lat: 41.9028, lng: 12.4964 }, { lat: 45.4642, lng: 9.1900 }],
  "ES": [{ lat: 40.4168, lng: -3.7038 }, { lat: 41.3851, lng: 2.1734 }],
  "TR": [{ lat: 41.0082, lng: 28.9784 }, { lat: 39.9334, lng: 32.8597 }],
  "SA": [{ lat: 24.7136, lng: 46.6753 }, { lat: 21.3891, lng: 39.8579 }],
  "AR": [{ lat: -34.6037, lng: -58.3816 }, { lat: -31.4201, lng: -64.1888 }],
  "EG": [{ lat: 30.0444, lng: 31.2357 }, { lat: 31.2156, lng: 29.9553 }],
  "NG": [{ lat: 6.5244, lng: 3.3792 }, { lat: 9.0579, lng: 7.4951 }],
  "ID": [{ lat: -6.2088, lng: 106.8456 }, { lat: -7.7956, lng: 110.3695 }]
};

const DEFAULT_FALLBACKS = {
  country: "United States",
  state: "Oregon", 
  city: "Klamath Falls",
  road: "3787 Foothills Boulevard",
  postCode: "97601",
  firstName: "Zhi",
  lastName: "Yang",
  gender: "Male"
};

// Utility functions
const createErrorResponse = (detail, status = 400) => 
  new Response(JSON.stringify({ error: true, detail }), { status });

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateRandomDigits = (length) => 
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

// Authentication
function authorizeAdmin(request, authType, authToken) {
  const authHeader = request.headers.get('Authentication');
  if (!authHeader) {
    return { error: true, code: 403, detail: 'No Token' };
  }

  const [fetchAuthType, fetchAuthToken] = authHeader.split(' ');
  if (!fetchAuthType || !fetchAuthToken) {
    return { error: true, code: 403, detail: 'Invalid Token' };
  }

  if (fetchAuthType !== authType || fetchAuthToken !== authToken) {
    return { error: true, code: 403, detail: 'Auth Failed' };
  }

  return { error: false, authType, authToken };
}

// Country utilities
function getRandomCountry() {
  const countryList = Object.keys(SUPPORTED_COUNTRIES);
  return getRandomElement(countryList);
}

function getCountryCodes() {
  return Object.entries(SUPPORTED_COUNTRIES).map(([code, info]) => ({
    name: info.name,
    code
  }));
}

function isSupportedCountry(country) {
  return {
    status: !!SUPPORTED_COUNTRIES[country],
    allCountries: Object.keys(SUPPORTED_COUNTRIES)
  };
}

// Location utilities
function getRandomLocationInCountry(country) {
  const coords = COUNTRY_COORDINATES[country];
  if (!coords) return null;
  
  const randomCity = getRandomElement(coords);
  return {
    lat: randomCity.lat + (Math.random() - 0.5) * 0.1,
    lng: randomCity.lng + (Math.random() - 0.5) * 0.1
  };
}

// Phone number generation
function generatePhoneNumber(country) {
  const rootCountry = country.split(".")[0];
  
  const generators = {
    US: () => {
      const area = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const exchange = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const line = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0');
      return `+1 (${area}) ${exchange}-${line}`;
    },
    UK: () => {
      const area = Math.floor(1000 + Math.random() * 9000).toString();
      const line = Math.floor(100000 + Math.random() * 900000).toString();
      return `+44 ${area} ${line}`;
    },
    FR: () => {
      const digit = Math.floor(1 + Math.random() * 8);
      const number = generateRandomDigits(8);
      return `+33 ${digit} ${number}`;
    },
    DE: () => {
      const area = Math.floor(100 + Math.random() * 900).toString();
      const number = generateRandomDigits(7);
      return `+49 ${area} ${number}`;
    },
    CN: () => {
      const prefix = Math.floor(130 + Math.random() * 60).toString();
      const number = generateRandomDigits(8);
      return `+86 ${prefix} ${number}`;
    },
    TW: () => {
      const number = generateRandomDigits(8);
      return `+886 9${number}`;
    },
    HK: () => `+852 ${generateRandomDigits(8)}`,
    JP: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+81 ${area} ${number}`;
    },
    SG: () => {
      const prefix = getRandomElement([6, 8, 9]);
      const number = generateRandomDigits(7);
      return `+65 ${prefix} ${number}`;
    },
    IN: () => {
      const prefix = Math.floor(700 + Math.random() * 100).toString();
      const number = generateRandomDigits(7);
      return `+91 ${prefix} ${number}`;
    },
    AU: () => {
      const area = Math.floor(2 + Math.random() * 8).toString();
      const number = generateRandomDigits(8);
      return `+61 ${area} ${number}`;
    },
    BR: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+55 ${area} ${number}`;
    },
    CA: () => {
      const area = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const exchange = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const line = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0');
      return `+1 (${area}) ${exchange}-${line}`;
    },
    RU: () => {
      const area = Math.floor(100 + Math.random() * 900).toString();
      const number = generateRandomDigits(7);
      return `+7 ${area} ${number}`;
    },
    ZA: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(7);
      return `+27 ${area} ${number}`;
    },
    MX: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+52 ${area} ${number}`;
    },
    KR: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+82 ${area} ${number}`;
    },
    IT: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+39 ${area} ${number}`;
    },
    ES: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+34 ${area} ${number}`;
    },
    TR: () => {
      const area = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const number = generateRandomDigits(7);
      return `+90 ${area} ${number}`;
    },
    SA: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(7);
      return `+966 ${area} ${number}`;
    },
    AR: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+54 ${area} ${number}`;
    },
    EG: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+20 ${area} ${number}`;
    },
    NG: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+234 ${area} ${number}`;
    },
    ID: () => {
      const area = Math.floor(10 + Math.random() * 90).toString();
      const number = generateRandomDigits(8);
      return `+62 ${area} ${number}`;
    }
  };

  return generators[rootCountry]?.() || generators.US();
}

// Address fetching
async function fetchAddressFromNominatim(location) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1`;
  
  try {
    const response = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Cloudflare Worker' }
    });
    const data = await response.json();
    
    if (data?.address?.house_number && data?.address?.road && 
        (data?.address?.city || data?.address?.town)) {
      return data.address;
    }
  } catch (error) {
    console.error('Nominatim API error:', error);
  }
  
  return null;
}

async function fetchPersonFromDZ(country) {
  const dzPath = SUPPORTED_COUNTRIES[country]?.dzPath;
  if (!dzPath) return null;

  try {
    const response = await fetch("https://www.meiguodizhi.com/api/v1/dz", {
      headers: {
        "User-Agent": "Cloudflare Worker",
        "accept": "*/*",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        path: dzPath,
        method: "address",
      }),
      method: "POST",
    });

    const data = await response.json();
    
    if (data?.address?.Full_Name) {
      const nameParts = data.address.Full_Name.split(" ");
      return {
        firstName: nameParts[0] || DEFAULT_FALLBACKS.firstName,
        lastName: nameParts[nameParts.length - 1] || DEFAULT_FALLBACKS.lastName,
        gender: data.address.Gender || DEFAULT_FALLBACKS.gender,
        telephone: data.address.Telephone || generatePhoneNumber(country),
        ssn: data.address.Social_Security_Number || "",
        cardType: data.address.Credit_Card_Type || "",
        cardNum: data.address.Credit_Card_Number || "",
        cardCVV: data.address.CVV2 || "",
      };
    }
  } catch (error) {
    console.error('DZ API error:', error);
  }
  
  return null;
}

// Main request handler
async function handleRequest(request, env) {
  if (request.method !== 'POST') {
    return createErrorResponse('Method not allowed', 405);
  }

  const url = new URL(request.url);
  
  if (url.pathname !== "/") {
    return createErrorResponse('Path not allowed', 405);
  }

  if (!env.AUTH_TYPE || !env.AUTH_TOKEN) {
    return createErrorResponse("Environment variables are not set!", 500);
  }

  const adminAuth = authorizeAdmin(request, env.AUTH_TYPE, env.AUTH_TOKEN);
  if (adminAuth.error) {
    return createErrorResponse(adminAuth.detail, adminAuth.code);
  }

  let reqData;
  try {
    reqData = await request.json();
  } catch {
    reqData = { country: "US" };
  }

  const country = reqData.country || getRandomCountry();
  const countrySupported = isSupportedCountry(country);
  
  if (!countrySupported.status) {
    return createErrorResponse({msg: "Country not supported", allowCountries: getCountryCodes()}, 400);
  }

  // Try to get address from OpenStreetMap (max 100 attempts)
  let address = null;
  for (let i = 0; i < 100; i++) {
    const location = getRandomLocationInCountry(country);
    if (!location) break;
    
    address = await fetchAddressFromNominatim(location);
    if (address) break;
  }

  if (!address) {
    return createErrorResponse("Failed to retrieve address, please try again", 500);
  }

  // Try to get person data
  const person = await fetchPersonFromDZ(country) || {
    firstName: DEFAULT_FALLBACKS.firstName,
    lastName: DEFAULT_FALLBACKS.lastName,
    gender: DEFAULT_FALLBACKS.gender,
    telephone: generatePhoneNumber(country),
    ssn: "",
    cardType: "",
    cardNum: "",
    cardCVV: "",
  };

  return new Response(JSON.stringify({
    country: address.country || DEFAULT_FALLBACKS.country,
    state: address.state || DEFAULT_FALLBACKS.state,
    city: address.city || address.town || address.village || DEFAULT_FALLBACKS.city,
    road: address.house_number && address.road 
      ? `${address.house_number} ${address.road}` 
      : DEFAULT_FALLBACKS.road,
    postCode: address.postcode || DEFAULT_FALLBACKS.postCode,
    firstName: person.firstName,
    lastName: person.lastName,
    gender: person.gender,
    telephone: person.telephone.replace(/[()\s-]/g, ''),
    // ssn: person.ssn.replace(/[()\s-]/g, ''),
    ssn: person.ssn,
    cardType: person.cardType,
    cardNum: person.cardNum,
    cardCVV: person.cardCVV,
  }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  },
};
