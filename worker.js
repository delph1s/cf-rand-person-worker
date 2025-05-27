export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  },
};

function authorizeAdmin(request, authType, authToken) {
  const authenticationHeader = request.headers.get('Authentication');

  if (!authenticationHeader) {
    return {
      error: true,
      code: 403,
      detail: 'No Token',
    };
  }

  const authData = authenticationHeader.split(' ');
  if (authData.length === 2) {
    const fetchAuthType = authData[0];
    const fetchAuthToken = authData[1];

    if (fetchAuthType !== authType) {
      return {
        error: true,
        code: 403,
        detail: 'Auth Failed',
      }
    }

    if (fetchAuthToken !== authToken) {
      return {
        error: true,
        code: 403,
        detail: 'Auth Failed',
      };
    }

    return {
      error: false,
      authType,
      authToken,
    };
  }

  return {
    error: true,
    code: 403,
    detail: 'Invalid Token',
  };
}

function getRandomCountry() {
  const countries = ["US", "UK", "FR", "DE", "CN", "TW", "HK", "JP", "IN", "AU", "BR", "CA", "RU", "ZA", "MX", "KR", "IT", "ES", "TR", "SA", "AR", "EG", "NG", "ID"];
  return countries[Math.floor(Math.random() * countries.length)];
}

function isSupportCountry(country) {
  const countries = {
    "US": true,
    "US.OR": true,
    "UK": true,
    "FR": true,
    "DE": true,
    "CN": true,
    "TW": true,
    "HK": true,
    "JP": true,
    "IN": true,
    "AU": true, 
    "BR": true, 
    "CA": true, 
    "RU": true, 
    "ZA": true, 
    "MX": true, 
    "KR": true, 
    "IT": true, 
    "ES": true, 
    "TR": true, 
    "SA": true, 
    "AR": true, 
    "EG": true, 
    "NG": true, 
    "ID": true, 
  };

  return {
    status: countries[country] || false,
    allCountries: Object.keys(countries),
  };
}

function getRandomLocationInCountry(country) {
  const countryCoordinates = {
    "US": [{ lat: 37.7749, lng: -122.4194 }, { lat: 34.0522, lng: -118.2437 }],
    "US.OR": [
      // { lat: 46.48326, lng: -127.55127 },
      { lat: 45.5231, lng: -122.6765 }, // Portland
      { lat: 44.0521, lng: -123.0868 }, // Eugene
      { lat: 44.9429, lng: -123.0351 }, // Salem
      { lat: 42.2268, lng: -121.7816 }, // Klamath Falls
      { lat: 46.1878, lng: -123.8313 }, // Astoria
      { lat: 44.6366, lng: -121.1291 }, // Bend
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
  const coordsArray = countryCoordinates[country];
  const randomCity = coordsArray[Math.floor(Math.random() * coordsArray.length)];
  const lat = randomCity.lat + (Math.random() - 0.5) * 0.1;
  const lng = randomCity.lng + (Math.random() - 0.5) * 0.1;
  return { lat, lng };
}

function getDZPath(country) {
  const countries = {
    "US": "/usa-address",
    "US.OR": "/usa-address/oregon",
    "UK": "/uk-address",
    "FR": "/fr-address",
    "DE": "/de-address",
    "CN": "/cn-address",
    "TW": "/tw-address",
    "HK": "/hk-address",
    "JP": "/jp-address",
    // "IN": "/in-address",
    "AU": "/au-address", 
    // "BR": "/br-address", 
    "CA": "/ca-address", 
    "RU": "/ru-address", 
    // "ZA": "/za-address", 
    // "MX": "/mx-address", 
    "KR": "/kr-address", 
    "IT": "/it-address", 
    "ES": "/es-address", 
    "TR": "/tr-address", 
    // "SA": "/sa-address", 
    "AR": "/ar-address", 
    // "EG": "/eg-address", 
    // "NG": "/ng-address", 
    // "ID": "/id-address", 
  };
  
  return countries[country] || null;
}

function getRandomPhoneNumber(country) {
  const rootCountry = country.split(".")[0];
  const phoneFormats = {
    "US": () => {
      const areaCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const exchangeCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const lineNumber = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0');
      return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    },
    "UK": () => {
      const areaCode = Math.floor(1000 + Math.random() * 9000).toString();
      const lineNumber = Math.floor(100000 + Math.random() * 900000).toString();
      return `+44 ${areaCode} ${lineNumber}`;
    },
    "FR": () => {
      const digit = Math.floor(1 + Math.random() * 8);
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+33 ${digit} ${number}`;
    },
    "DE": () => {
      const areaCode = Math.floor(100 + Math.random() * 900).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+49 ${areaCode} ${number}`;
    },
    "CN": () => {
      const prefix = Math.floor(130 + Math.random() * 60).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+86 ${prefix} ${number}`;
    },
    "TW": () => {
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+886 9${number}`;
    },
    "HK": () => {
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+852 ${number}`;
    },
    "JP": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+81 ${areaCode} ${number}`;
    },
    "IN": () => {
      const prefix = Math.floor(700 + Math.random() * 100).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+91 ${prefix} ${number}`;
    },
    "AU": () => {
      const areaCode = Math.floor(2 + Math.random() * 8).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+61 ${areaCode} ${number}`;
    },
    "BR": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+55 ${areaCode} ${number}`;
    },
    "CA": () => {
      const areaCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const exchangeCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const lineNumber = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0');
      return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    },
    "RU": () => {
      const areaCode = Math.floor(100 + Math.random() * 900).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+7 ${areaCode} ${number}`;
    },
    "ZA": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+27 ${areaCode} ${number}`;
    },
    "MX": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+52 ${areaCode} ${number}`;
    },
    "KR": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+82 ${areaCode} ${number}`;
    },
    "IT": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+39 ${areaCode} ${number}`;
    },
    "ES": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+34 ${areaCode} ${number}`;
    },
    "TR": () => {
      const areaCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+90 ${areaCode} ${number}`;
    },
    "SA": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+966 ${areaCode} ${number}`;
    },
    "AR": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+54 ${areaCode} ${number}`;
    },
    "EG": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+20 ${areaCode} ${number}`;
    },
    "NG": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+234 ${areaCode} ${number}`;
    },
    "ID": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+62 ${areaCode} ${number}`;
    }
  }
  return phoneFormats[rootCountry]();
}

async function handleRequest(request, env) {
  const url = new URL(request.url);

  if (url.pathname !== "/") {
    return new Response(JSON.stringify({ error: true, detail: 'Method not allowed' }), { status: 405 });
  }

  if (env.AUTH_TYPE === undefined || env.AUTH_TOKEN === undefined) {
    return new Response(JSON.stringify({ error: true, detail: "Environment variables are not set!" }), { status: 500 });
  }  

  const adminAuth = authorizeAdmin(request, env.AUTH_TYPE, env.AUTH_TOKEN);
  if (adminAuth.error) {
    return new Response(JSON.stringify({ error: true, detail: adminAuth.detail }), { status: adminAuth.code });
  }

  const reqData = await request.json().catch(err => {return {country: "US"};});
  const country = reqData.country || getRandomCountry();

  const countrySupported = isSupportCountry(country);
  if (!countrySupported.status) {
    return new Response(JSON.stringify({ error: true, detail: "Country not support", allCountries: countrySupported.allCountries }), { status: 400 });
  } 

  let address, person;

  for (let i = 0; i < 100; i++) {
    const location = getRandomLocationInCountry(country);
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1`;

    const response = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Cloudflare Worker' }
    });
    const data = await response.json();

    if (data && data.address && data.address.house_number && data.address.road && (data.address.city || data.address.town)) {
      address = data.address;
      break;
    }
  }

  if (!address) {
    return new Response(JSON.stringify({ error: true, detail: "Failed to retrieve detailed address, please make new request" }), { status: 500 });
  }

  console.log(address);

  const dzPath = getDZPath(country);

  if (dzPath) {
    const response = await fetch("https://www.meiguodizhi.com/api/v1/dz", {
        headers: {
          "User-Agent": "Cloudflare Worker",
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "priority": "u=1, i",
        },
        body: JSON.stringify({
          path: dzPath,
          method: "address",
        }),
        method: "POST",
    });
    const data = await response.json();
    console.log(data);
    
    if (data && data.address && data.address.Full_Name) {
      person = {};
      const personName = data.address.Full_Name.split(" ");
      if (personName.length === 1) {
        person["firstName"] = personName[0];
        person["lastName"] = personName[0];
      } else if (personName.length > 1) {
        person["firstName"] = personName[0];
        person["lastName"] = personName[personName.length - 1];
      } else {
        person["firstName"] = "Calley";
        person["lastName"] = "Valley";
      }
      person["gender"] = data.address.Gender || "Male";
      person["telephone"] = data.address.Telephone || getRandomPhoneNumber(country);
      // person["telephone"] = getRandomPhoneNumber(country);
      person["ssn"] = data.address.Social_Security_Number || "";
    } else {
      person = {
        firstName: "Zhi",
        lastName: "Yang",
        gender: "Male",
        telephone: getRandomPhoneNumber(country),
        ssn: "",
      };
    }
  } else {
    person = {
      firstName: "Zhi",
      lastName: "Yang",
      gender: "Male",
      telephone: getRandomPhoneNumber(country),
      ssn: "",
    };
  }

  if (!person) {
    return new Response(JSON.stringify({ error: true, detail: "Failed to retrieve detailed person infomation, please make new request" }), { status: 500 });
  }

  console.log(person);

  return new Response(JSON.stringify({
    country: address.country || "United States",
    state: address.state || "Oregon",
    city: address.city || address.town || address.village || "Klamath Falls",
    road: address.house_number && address.road ? `${address.house_number} ${address.road}` : "3787 Foothills Boulevard",
    postCode: address.postcode || 97601,
    firstName: person.firstName,
    lastName: person.lastName,
    gender: person.gender,
    telephone: person.telephone.replace(/[()\s-]/g, ''),
    // ssn: person.ssn.replace(/[()\s-]/g, ''),
    ssn: person.ssn,
  }), { status: 200 });
}

function getCountryOptions(selectedCountry) {
  const countries = [
    { name: "United States 美国", code: "US" },
    { name: "United Kingdom 英国", code: "UK" },
    { name: "France 法国", code: "FR" },
    { name: "Germany 德国", code: "DE" },
    { name: "China 中国", code: "CN" },
    { name: "Taiwan 中国台湾", code: "TW" },
    { name: "Hong Kong 中国香港", code: "HK" }, 
    { name: "Japan 日本", code: "JP" },
    { name: "India 印度", code: "IN" },
    { name: "Australia 澳大利亚", code: "AU" },
    { name: "Brazil 巴西", code: "BR" },
    { name: "Canada 加拿大", code: "CA" },
    { name: "Russia 俄罗斯", code: "RU" },
    { name: "South Africa 南非", code: "ZA" },
    { name: "Mexico 墨西哥", code: "MX" },
    { name: "South Korea 韩国", code: "KR" },
    { name: "Italy 意大利", code: "IT" },
    { name: "Spain 西班牙", code: "ES" },
    { name: "Turkey 土耳其", code: "TR" },
    { name: "Saudi Arabia 沙特阿拉伯", code: "SA" },
    { name: "Argentina 阿根廷", code: "AR" },
    { name: "Egypt 埃及", code: "EG" },
    { name: "Nigeria 尼日利亚", code: "NG" },
    { name: "Indonesia 印度尼西亚", code: "ID" }
  ]
  return countries.map(({ name, code }) => `<option value="${code}" ${code === selectedCountry ? 'selected' : ''}>${name}</option>`).join('')
}
