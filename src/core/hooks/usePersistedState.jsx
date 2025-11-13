import { getLocal, setLocal } from "@/utils";
import React, { useEffect, useState } from "react";

const UsePersistedState = (key, initial) => {
  const [value, setValue] = useState(() => {
    let stored = getLocal(key);

    return stored || initial;
  });

  useEffect(() => {
    setLocal(key, value);
  }, [value]);

  return [value, setValue];
};

export default UsePersistedState;
