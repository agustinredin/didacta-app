import { cn } from "@/utils";
import { memo, useMemo } from "react";

export const MonoButton = memo(({ variant = "", ...props }) => {
  variant = variant ?? "";
  const _default = `mono-button${variant && `-${variant}`}`;
  const _cn = props["className"];
  //en esta estructura props tiene que ir primero SIEMPRE. Sino, le pones classname y pisa el classname que le puso cn(_def, _cn)
  return (
    props.children && <button {...props} className={cn(_default, _cn)}></button>
  );
});
