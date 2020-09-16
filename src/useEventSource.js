import {useEffect, useState} from 'react';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Subject} from "rxjs";

export default function useEventSource(url, delay = 500) {
  const [value, setValue] = useState([]);
  const [onSSR$] = useState(() => new Subject());

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = event => {
      const obj = JSON.parse(event.data);
      onSSR$.next(oldArray => [...oldArray, obj]);
    };

    eventSource.onerror = err => {
      console.error(`Event source failed: ${err}`)
      eventSource.close();
    }

    const subscription = onSSR$
      .pipe(debounceTime(delay), distinctUntilChanged())
      .subscribe(setValue);

    return () => {
      eventSource.close();
      subscription.unsubscribe();
    }

  }, []);

  return value;
}
