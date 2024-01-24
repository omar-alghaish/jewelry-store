export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.random() * 1000000000;
  const randomBase36 = Math.floor(randomNumber).toString(36);
  const uniqueId = `${timestamp}${randomBase36}`;
  return uniqueId;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const search = (data, searchQuery) => {
  const filteredData = data?.filter((item) => {
    return Object.values(item)?.some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return filteredData;
};



export const base46Img =  () =>{
  
}