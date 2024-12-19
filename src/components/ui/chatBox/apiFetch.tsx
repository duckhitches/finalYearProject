import axios from "axios";

const fetchRapidAPIResponse = async (message: string) => {
    try{
        const response = await axios.post(
            "https://chatgpt-42.p.rapidapi.com/",
            {
              prompt: message,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "fb03b0f40emsh51328c773ce922ap17bf43jsna4e29d8e92f3",
                "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
              },
            }
          );
          return response.data.reply;

    }catch(error){
        console.error("Error fetching data:", error);

    }
  



  
  ;
};
export default fetchRapidAPIResponse;
