const VALID_URL_REGEX = /^$|(http(s?)\:\/\/)?(w{3}\.)?([\w]+)\.\w{2,6}/;
const VALID_EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isEmail = (value) => {
  return VALID_EMAIL_REGEX.test(value);
};

export const isUrl = (value) => {
  return VALID_URL_REGEX.test(value);
};

export const isFieldEmpty = (field) => {
  return !(field || '').trim();
};
