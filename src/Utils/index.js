//index.js in /Utils
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  return password.length >= 6 ? true : false;
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isCompanyBalanceValid = (input) => {
  if (!parseFloat(input)) return false;

  var pattern = /^\d{1,8}(\.\d{1,2})?$/;
  return pattern.test(input);
};

export const isValidCompanySeats = (input) => {
  var pattern = /^\d(,\d)*$/;
  return pattern.test(input);
};

export const isJSONObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  try {
    JSON.stringify(obj);
    return true;
  } catch (e) {
    return false;
  }
};

export const isJSONString = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getInfoFromCreator = (creator) => {
  const creatorInfo = [
    {
      name: 'Tik Tok Profile',
      link: creator.tiktok_link || '',
      value: creator.tiktok_link ? 'View TikTok' : 'none'
    },
    {
      name: 'Instagram Profile',
      link: creator.instagram_link || '',
      value: creator.instagram_link ? 'View Instagram' : 'none'
    },
    {
      name: 'YouTube Channel',
      link: creator.youtube_link || '',
      value: creator.youtube_link ? 'View Youtube' : 'none'
    },
    {
      name: 'Presented By',
      link: '',
      value: creator.manager || ''
    },
    {
      name: 'TikTok Followers',
      link: '',
      value: creator.tiktok || 0
    },
    {
      name: 'Instagram Followers',
      link: '',
      value: creator.instagram || 0
    },
    {
      name: 'YouTube Subscribers',
      link: '',
      value: creator.youtube || 0
    },
  ]

  const followersData = [
    { name: "TikTok", value: Number(creator.tiktok?.replaceAll(',', '')) || 0 },
    { name: "Instagram", value: Number(creator.instagram?.replaceAll(',', '')) || 0 },
    { name: "YouTube", value: Number(creator.youtube?.replaceAll(',', '')) || 0 },
  ];

  const promotionData = [
    {
      name: "TikTok Sound",
      value: creator.tiktok_sound || '$0',
    },
    {
      name: "TikTok Brand",
      value: creator.tiktok_brand || '$0',
    },
    {
      name: "Instagram Sound",
      value: creator.instagram_sound || '$0',
    },
    {
      name: "Instagram Brand",
      value: creator.instagram_brand || '$0',
    },
  ];

  return { creatorInfo, followersData, promotionData }
}

export function findMaxValue(arr) {
  let maxValue = 0;

  for (let i = 0; i < arr.length; i++) {
    const value = parseFloat(arr[i].value.replace(/[^0-9.-]+/g, ""));
    maxValue = Math.max(value, maxValue);
  }

  return maxValue;
}