import { cn } from "@/utils";

const MonoCard = ({ ...props }) => {
  const className = props["className"];
  return (
    <div className={cn("mono-card flex-col", className)}>{props.children}</div>
  );
};

// TODO: CONTINUAR ACÁ U

export default MonoCard;

// import { cn } from "@/utils";
// import "@styles/temp.css";

// const MonoButton = ({ variant = "primary", ...props }) => {
//   const className = props["className"];
//   return (
//     <div
//       className={cn(
//         ${variant == "secondary" ? mono-button-secondary : mono-button},
//         className
//       )}
//     >
//       {props.children}
//     </div>
//   );
// };

// export default MonoButton;
