import { useEffect, useState } from "react";
//@ts-ignore
import SSE from "./sse.js";

interface StreamOptions {
  method: string;
  headers: any;
  payload: any;
}

const useEventStream = (url: string, options: StreamOptions): any[] => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const source = new SSE(url, options);
    source.onstatus = (e: any) => {
      const { data } = e;
      //@ts-ignore
      setValue((oldArr) => [...oldArr, JSON.parse(data)]);
    };

    source.onerror = (e: any) => {
      console.error(`Event source has failed for reason: ${JSON.stringify(e)}`);
    };
  }, []);

  return value;
};

export default useEventStream;
