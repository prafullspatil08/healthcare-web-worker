/// <reference lib="webworker" />

import { matchesCriteria } from "./core/utility/utility";

addEventListener('message', ({ data }) => {
  let { array, text } = data;

  let filtered = array?.filter((item: any) => matchesCriteria(item, text));

  postMessage(filtered);
});
