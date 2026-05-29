export const getSecureRandom = (max) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

export const generatePassword = (options) => {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false,
    avoidAmbiguous = false,
    mode = 'random',
  } = options;

  if (mode === 'pin') {
    let pin = '';
    for (let i = 0; i < length; i++) {
      pin += getSecureRandom(10).toString();
    }
    return pin;
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
    syms = syms.replace(/[|]/g, '');
  }

  if (avoidAmbiguous) {
    syms = '!@#$%^&*_=+-';
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

export const calculateStrength = (password) => {
  let poolSize = 0;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) return { score: 0, label: 'Weak', color: 'bg-red-500', percentage: 0 };

  const entropy = password.length * Math.log2(poolSize);

  if (entropy < 40) return { score: 1, label: 'Weak', color: 'bg-red-500', percentage: 25 };
  if (entropy < 60) return { score: 2, label: 'Moderate', color: 'bg-yellow-500', percentage: 50 };
  if (entropy < 80) return { score: 3, label: 'Strong', color: 'bg-green-500', percentage: 75 };
  return { score: 4, label: 'Very Strong', color: 'bg-brand-100', percentage: 100 };
};