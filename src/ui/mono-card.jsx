import { cn } from "@/utils"

const MonoCard =  ({ variant = "", ...props }) => {
  const _default = `mono-card${variant && `-${variant}`}`;
  const _cn = props["className"];
  return (
    props.children && <button {...props} className={cn(_default, _cn)}></button>
  )
}

// TODO: CONTINUAR ACÁ U

export default MonoCard

// import { cn } from "@/utils";

// const MonoButton = ({ variant = "", ...props }) => {
//   const _default = `mono-button${variant && `-${variant}`}`;
//   const _cn = props["className"];
//   //en esta estructura props tiene que ir primero SIEMPRE. Sino, le pones classname y pisa el classname que le puso cn(_def, _cn)
//   return (
//     props.children && <button {...props} className={cn(_default, _cn)}></button>
//   );
// };

// export default MonoButton;
