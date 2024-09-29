import axios from "axios";

export const fetchWikiData = async (placeName: string) => {
    try {
      const response = await axios.get(`/api/wiki?placeName=${encodeURIComponent(placeName)}`);
      const data = response.data;
        console.log("Wiki data:", data);
        return data;
    } catch (error) {
      console.error("Error fetching Wiki data:", error);
    }
  };
  