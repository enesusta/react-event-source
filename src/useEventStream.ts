import { useEffect, useState } from "react";

const useEventStream = (url: string): any[] => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const obj = JSON.parse(event.data);
      //@ts-ignore
      setValue((oldArr) => [...oldArr, obj]);
    };

    eventSource.onerror = (err) => {
      console.error(`Event source has failed for reason: ${JSON.stringify(err)}`);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return value;
};

export default useEventStream;
