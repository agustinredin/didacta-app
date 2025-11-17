import { cn } from "@/utils";
import { memo } from "react";

export const MonoInputText = memo(
  ({
    topLabel = "",
    bottomLabel = "",
    errorText = "",
    type = "",
    ...props
  }) => {
    const base = "mono-input";
    const _cn = props["className"];
    return (
      <div>
        {topLabel && <div className="mono-text-title mb-1">{topLabel}</div>}
        {type === "textarea" ? (
          <textarea
            {...props}
            rows={props["rows"] ?? 5}
            className={cn(
              base + " resize-none overflow-auto",
              errorText !== "" && "mono-input-error",
              _cn
            )}
          />
        ) : (
          <input
            {...props}
            type={type || "text"}
            className={cn(base, errorText !== "" && "mono-input-error", _cn)}
          />
        )}
        {errorText || bottomLabel ? (
          <div
            className={cn(
              "mt-1",
              errorText !== "" ? "error uppercase" : "mono-text-secondary"
            )}
          >
            {errorText || bottomLabel}
          </div>
        ) : null}
      </div>
    );
  }
);
