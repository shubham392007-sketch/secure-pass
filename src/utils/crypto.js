export const getSecureRandom = (max) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

const wordlist = [
  "apple", "banana", "orange", "grape", "kiwi", "melon", "berry", "peach",
  "river", "mountain", "ocean", "forest", "valley", "desert", "island",
  "lion", "tiger", "bear", "wolf", "fox", "eagle", "hawk", "owl",
  "sun", "moon", "star", "planet", "comet", "galaxy", "nebula",
  "car", "train", "plane", "boat", "bike", "truck", "ship",
  "house", "castle", "tower", "bridge", "road", "path", "wall",
  "book", "pen", "paper", "desk", "chair", "table", "lamp",
  "happy", "brave", "calm", "smart", "swift", "strong", "wild",
  "blue", "red", "green", "yellow", "purple", "black", "white",
  "water", "fire", "earth", "wind", "storm", "rain", "snow"
];

const syllables = ["ba", "ce", "di", "fo", "gu", "ha", "ji", "ko", "lu", "ma", "ne", "pi", "ro", "su", "ta", "ve", "wi", "za", "sh", "ch", "th", "ph", "qu"];

export const generatePassword = (options) => {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false,
    mode = 'random', // random, pin, passphrase, pronounceable
  } = options;

  if (mode === 'pin') {
    let pin = '';
    for (let i = 0; i < length; i++) {
      pin += getSecureRandom(10).toString();
    }
    return pin;
  }

  if (mode === 'passphrase') {
    let phrase = [];
    const wordCount = Math.max(3, Math.floor(length / 5)); // Roughly 5 chars per word
    for (let i = 0; i < wordCount; i++) {
      phrase.push(wordlist[getSecureRandom(wordlist.length)]);
    }
    return phrase.join('-');
  }

  if (mode === 'pronounceable') {
    let pass = '';
    while (pass.length < length) {
      pass += syllables[getSecureRandom(syllables.length)];
    }
    pass = pass.slice(0, length);
    if (uppercase) pass = pass.charAt(0).toUpperCase() + pass.slice(1);
    if (numbers) pass += getSecureRandom(10).toString();
    if (symbols) {
      const syms = '!@#$%^&*';
      pass += syms[getSecureRandom(syms.length)];
    }
    return pass;
  }

  let charset = '';
  let uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lowers = 'abcdefghijklmnopqrstuvwxyz';
  let nums = '0123456789';
  let syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  if (excludeSimilar) {
    uppers = uppers.replace(/[ILOU]/g, '');
    lowers = lowers.replace(/[ilou]/g, '');
    nums = nums.replace(/[10]/g, '');
    syms = syms.replace(/[|Il1O0]/g, '');
  }

  if (uppercase) charset += uppers;
  if (lowercase) charset += lowers;
  if (numbers) charset += nums;
  if (symbols) charset += syms;

  if (!charset) return '';

  let password = '';
  const required = [];
  if (uppercase && uppers) required.push(uppers[getSecureRandom(uppers.length)]);
  if (lowercase && lowers) required.push(lowers[getSecureRandom(lowers.length)]);
  if (numbers && nums) required.push(nums[getSecureRandom(nums.length)]);
  if (symbols && syms) required.push(syms[getSecureRandom(syms.length)]);

  for (let i = required.length; i < length; i++) {
    password += charset[getSecureRandom(charset.length)];
  }

  password += required.join('');
  
  let pwdArray = password.split('');
  for (let i = pwdArray.length - 1; i > 0; i--) {
    const j = getSecureRandom(i + 1);
    [pwdArray[i], pwdArray[j]] = [pwdArray[j], pwdArray[i]];
  }

  return pwdArray.join('').slice(0, length);
};

export const calculateEntropy = (password) => {
  let poolSize = 0;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) return 0;
  return password.length * Math.log2(poolSize);
};

export const estimateCrackTime = (entropy) => {
  // Assuming 100 billion guesses per second
  const guessesPerSecond = 100000000000;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / guessesPerSecond;

  if (seconds < 1) return 'Instantly';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  return 'Centuries';
};

export const calculateStrength = (password) => {
  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  if (entropy === 0) return { score: 0, label: 'Weak', color: 'bg-red-500', percentage: 0, entropy, crackTime };
  if (entropy < 40) return { score: 1, label: 'Weak', color: 'bg-red-500', percentage: 25, entropy, crackTime };
  if (entropy < 60) return { score: 2, label: 'Moderate', color: 'bg-yellow-500', percentage: 50, entropy, crackTime };
  if (entropy < 80) return { score: 3, label: 'Strong', color: 'bg-green-500', percentage: 75, entropy, crackTime };
  return { score: 4, label: 'Very Strong', color: 'bg-[#FF6B00]', percentage: 100, entropy, crackTime };
};
