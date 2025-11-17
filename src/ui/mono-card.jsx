import { cn } from "@/utils";
import { memo } from "react";

export const MonoCard = memo(({ variant = "", ...props }) => {
  const _default = `mono-card${variant && `-${variant}`}`;
  const _cn = props["className"];
  return props.children && <div {...props} className={cn(_default, _cn)}></div>;
});
