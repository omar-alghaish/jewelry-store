export const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.random() * 1000000000;
    const randomBase36 = Math.floor(randomNumber).toString(36);
    const uniqueId = `${timestamp}${randomBase36}`;
    return uniqueId;
  };