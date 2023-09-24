import { ref, isRef, unref, watchEffect } from "vue";
import type { ComputedRef } from "vue";

export function useQuoteApi(url: ComputedRef<string>) {
  const data = ref<any>(null);
  const error = ref<any>(null);

  async function loadQuotes() {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    // resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    const urlValue = unref(url);

    try {
      // artificial delay and random error
      await timeout();
      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e: any) {
      error.value = e;
      console.error("There was an artificial error in QuoteApi. Please try again.");
    }
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(loadQuotes);
  } else {
    // otherwise, just fetch once
    loadQuotes();
  }

  return { data, error, retry: loadQuotes };
}

// artificial delay
function timeout() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve();
      } else {
        reject(new Error("Oops! Error encountered. Cannot load quotes."));
      }
    }, 300);
  });
}
