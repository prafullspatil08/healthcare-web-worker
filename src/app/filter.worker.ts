/// <reference lib="webworker" />

import { matchesCriteria } from "./core/utility/utility";

addEventListener('message', ({ data }) => {
  const { array, text } = data;

  const filtered = array?.filter((item: any) => matchesCriteria(item, text));

  postMessage(filtered);
});
