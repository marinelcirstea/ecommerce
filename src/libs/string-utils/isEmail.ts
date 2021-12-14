// REGEX DETAILS
//
// min email length 6
// max email length 250
//
// [1] BEFORE @
//
// --> has to start with letter or number
// --> can contain . _ - but not consecutive
// --> can end with . _ -
// --> min 1 char
// --> max 62 chars
//
// [2] AFTER @
//
// [2.1] SUBDOMAINS
//
//
// --> min subdomain length 1
// --> max subdomain length 61
//
// --> has to start with letter or number
// --> can contain -
// --> can NOT end with -
//
// --> min subdomains 1
// --> max subdomains 8
//
// [2.2] TLD
//
// --> min 2 chars
// --> max 18 chars because longest usable TLD is TRAVELERSINSURANCE
// --> can only contain letters

export function isEmail(str: string) {
  if (!str) return false;
  if (typeof str !== "string") {
    throw new Error(`Expected string, received ${typeof str}`);
  }
  const regex =
    /^[A-Z0-9][A-Z0-9._-]{0,61}@(?:(?=[A-Z0-9-]{1,61}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,18}$/i;

  return str.length > 5 && str.length < 251 && regex.test(str);
}
