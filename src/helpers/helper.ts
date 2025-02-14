import axios from "axios";
import { generate } from "random-words";

export const translateFunction = async (to: cod): Promise<responseType[]> => {
  const words = generate(10) as string[];
  const options = {
    method: "POST",
    url: "https://microsoft-translator-text-api3.p.rapidapi.com/largetranslate",
    params: {
      to,
      from: "en",
    },
    headers: {
      "x-rapidapi-key": "93c51d6b91mshe7c2f75bf28882cp10d52ejsn2f345435311e",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      sep: "|",
      text: words.join("|"),
    },
  };

  try {
    const response = await axios.request(options);
    const translatedWords: Array<string> = response.data.text.split("|");

    const data: responseType[] = words.map((ele, idx) => {
      const filteredArray = translatedWords.filter((elements, index) => {
        return index != idx;
      });
      const options = getRandomItems(
        [...getRandomItems(filteredArray, 3), translatedWords[idx]],
        4
      );
      return {
        word: ele,
        meaning: translatedWords[idx],
        options,
      };
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("some error");
  }
};

export const audioFatch = async (
  src: string,
  language: cod
): Promise<string> => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("key", "023ad3f886af43ed88c3b437b680c55d");
  encodedParams.set("src", src);
  encodedParams.set("r", "0");
  encodedParams.set("c", "mp3");
  encodedParams.set("f", "8khz_8bit_mono");
  // encodedParams.set('ssml', 'true');
  encodedParams.set("b64", "true");

  if (language === "hi") encodedParams.set("hl", "hi-in");
  else if (language === "zh-Hant") encodedParams.set("hl", "zh-hk");
  else if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");

  const options = {
    method: "POST",
    url: "https://voicerss-text-to-speech.p.rapidapi.com/",
    headers: {
      "x-rapidapi-key": "93c51d6b91mshe7c2f75bf28882cp10d52ejsn2f345435311e",
      "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("some error!");
  }
};

function getRandomItems(arr: Array<string>, numItems: number) {
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  // Return the first `numItems` from the shuffled array
  return arr.slice(0, numItems);
}
