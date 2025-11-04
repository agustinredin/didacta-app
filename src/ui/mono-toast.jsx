import { cn } from "@/utils";
import { DotIcon, InfoIcon, XIcon } from "lucide-react";
import { memo, useState, useEffect } from "react";

export const MonoToast = ({
  state,
  title,
  message,
  duration,
  onClose,
  actionJSX,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const animationDuration = 500;

  const possibleStates = ["success", "error", "info"];

  state = possibleStates.find((i) => i == state) ?? "default";

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, animationDuration);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="mono-toast-wrapper">
      <div
        className={cn(
          "mono-toast-container",
          isVisible && !isExiting
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        )}
      >
        <div
          className={cn(
            "mono-toast",
            `bg-${state} text-${state} border-${state}`,
            `border-darken-50 ${
              state != "default" ? `bg-lighten-90` : `bg-white`
            }`,
            isExiting ? "opacity-0" : "opacity-100"
          )}
        >
          <InfoIcon
            className={`stroke-${state} stroke-darken-50 mt-1 w-4 h-4`}
          />
          <div className={`flex-1 mr-3 min-w-0 text-${state}`}>
            <div
              className={`mono-text-${
                state === "info" ? "secondary" : "subtitle"
              } text-darken-50`}
            >
              {title}
            </div>
            <div className="mono-text text-darken-70">{message}</div>
            {actionJSX && { actionJSX }}
          </div>
          <XIcon
            className={`w-4 h-4 stroke-${state} stroke-darken-50 hover:stroke-error cursor-pointer mt-1`}
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsVisible(false);
                onClose();
              }, animationDuration);
            }}
          />
        </div>
      </div>
    </div>
  );
};
