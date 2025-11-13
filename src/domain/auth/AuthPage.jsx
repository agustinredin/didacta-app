import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function AuthPage() {
  //INFO: ejemplo de una estructura más limpia
  const formStates = {
    LOGIN: "login",
    REGISTER: "register",
  };

  //Código anterior:
  //   const [isLogin, setIsLogin] = useState(true);

  //   return (
  //     <div className="h-screen flex items-center justify-center bg-gray-100">
  //       {isLogin ? (
  //         <LoginForm onSwitch={() => setIsLogin(false)} />
  //       ) : (
  //         <RegisterForm onSwitch={() => setIsLogin(true)} />
  //       )}
  //     </div>
  //   );

  const [formState, setFormState] = useState(formStates.LOGIN);

  return (
    <>
      {formState == formStates.LOGIN ? (
        <LoginForm onSwitch={() => setFormState(formStates.REGISTER)} />
      ) : (
        <RegisterForm onSwitch={() => setFormState(formStates.LOGIN)} />
      )}
    </>
  );

  //En este caso parece no tener sentido, porque tenemos 2.
  //Pero imaginate tener 5:
  //   const [isLogin, setIsLogin] = useState(true);
  //   const [isForgotPassword, setIsForgotPassword] = useState(false);
  //   const [isRegister, ] = useState(false)
  // ...se entiende. Te volvés loco
  // ENTENDIDO
  //
  // return (
  //   <div className="h-screen flex items-center justify-center bg-gray-100">
  //     {isLogin ? (
  //       <LoginForm onSwitch={() => setIsLogin(false)} />
  //     ) isRegister : (
  //       <RegisterForm onSwitch={() => setIsLogin(true)} />
  //     ) : isForgotPassword ? (
  //        <ForgotPasswordForm onSwitch=(() => setIsLogin(true))}
  //    ...etc.
  //   </div>
  // );
  //
  //
  //Unificar el useState (ejemplo aplicado del principio) es solo el paso 1.
  //Más pasos podrían incluir:
  //2: Devolver segun un obj
  //const formComponents = {
  //     LOGIN: LoginForm,
  //     REGISTER: RegisterForm,
  //     FORGOT_PASSWORD: ForgotPasswordForm
  //   };
  //const [activeForm, setActiveForm] = useState("LOGIN");
  //
  //const [formState, setFormState] = useState({ loading: false, error: "" });
  //
  //const ActiveForm = formComponents[activeForm];

  //return (
  //   <div>
  //     {ActiveForm && <ActiveForm formState={formState} setFormState={setFormState} />}
  //   </div>
  // );
  //
  //
  //Esta estructura tiene varias ventajas.
  //PRIMERO,
  //condicionas a unificar la estructura entre componentes del form,
  //porque les estás pasando un unico FormState como component.
  //SEGUNDO,
  //Este componente "higher order" no es un choclo de ifs anidados
  //TERCERO,
  //Arrancás escribiendo el objeto formStates que te organiza
  //cómo vas a escribir el código (primero esto, desp. esto, y así.)
  //ya pactando el alcance de lo que vas a escribir.
  //El obj formStates puede hasta ir en el context
}
