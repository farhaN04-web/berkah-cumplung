export const generateUsername = (
  firstName: string,
  lastName: string
): string => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${firstName.toLowerCase()}.${lastName?.toLowerCase()}${randomNumber}`;
};

export const normalizeGmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  if (domain === "gmail.com" || domain === "googlemail.com") {
    const cleanedLocal = localPart.split("+")[0].replace(/\./g, "");
    return `${cleanedLocal}@gmail.com`;
  }

  return email.toLowerCase();
};
