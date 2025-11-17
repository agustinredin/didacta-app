import { DotIcon, Sparkle, Star, Terminal, XIcon } from "lucide-react";
import * as Mono from "@ui";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEventHandler } from "./core/hooks/useEventHandler";
import { useUI } from "./core/context/UIContext";

const MonoTheme = () => {
  const codeRef = useRef(null);
  const { ui } = useUI();

  //extracción de listener global a hook con su respectivo callback
  //nos va a servir para ejemplo chequear si un user está logged o no cuando se mete al index
  useEventHandler(
    document,
    "click",
    () => document.body.classList.add("dark"),
    5000,
    () => document.body.classList.remove("dark")
  );

  const botonCustomToast = () => <Mono.Button>ejemplo</Mono.Button>;

  const [test, setTest] = useState(0);
  const toastMagic = useCallback(() => {
    ui.showToast(
      "Título mayus",
      "info",
      "desc minus",
      5000
      //   5000,
      //   () => {
      //     console.log("handler custom de onclose");
      //   },
      //   botonCustomToast
    );
  }, []);

  return (
    <div className="p-12 flex flex-col gap-8">
      <span
        className="bg-red mr-4"
        onClick={() => {
          setTest(test + 1);
        }}
      >
        Clickeame
      </span>
      <h1 className="mono-text-title">Convertí tus clases en conocimiento</h1>
      <h2 className="mono-text-subtitle">
        Convertí tus clases en conocimiento
      </h2>
      <h3 className="mono-text-secondary">
        Convertí tus clases en conocimiento
      </h3>
      <h4 className="geist">Convertí tus clases en conocimiento</h4>
      <h5 className="mono-text">Convertí tus clases en conocimiento</h5>
      <h6 className="mono-text-help-bold">
        Convertí tus clases en conocimiento
      </h6>
      <Mono.Button onClick={toastMagic}>
        <Star />
        Primario
      </Mono.Button>
      {/*INFO: hay 2 formas de hacer lo mismo parece: className="mono-button-secondary" o variant="secondary". Siempre es mono-button[-variant]. cualquiera sirve */}
      {/* <Mono.Button variant="secondary">
        <Sparkle />
        Secundario
      </Mono.Button>
      <Mono.Button className="mono-button-tertiary">
        Terciario <Terminal />{" "}
      </Mono.Button> */}
      <Mono.InputText placeholder="input solo" />
      <Mono.InputText type="textarea" placeholder="Input con type='textarea'" />
      <Mono.InputText
        topLabel="NOMBRE COMPLETO"
        placeholder="input con topLabel"
      />
      <Mono.InputText
        placeholder="input con bottomLabel"
        bottomLabel="Acá sugerimos que pongas tu nombre."
      />
      <Mono.InputText
        topLabel="NOMBRE COMPLETO"
        placeholder="input con topLabel y bottomLabel + error"
        errorText="EL NOMBRE NO PUEDE ESTAR VACÍO"
      />
      <span className="mono-text">Input de tipo código de 3 dígitos</span>
      <Mono.InputCode ref={codeRef} digits={3}></Mono.InputCode>
      {/* <Mono.Button
        variant="tertiary"
        onClick={() => {
          console.log(codeRef.current.value);
        }}
      >
        Obtengo value{" "}
      </Mono.Button> */}
      <hr />
      <span>Toast</span>
      {/* <Mono.Button onClick={toastMagic}>Show toast</Mono.Button> */}
      <div className="flex justify-center items-center flex-col gap-20">
        <span>Card</span>

        <Mono.Card className="p-4">
          <h1>PRIMARY CARD</h1>
        </Mono.Card>

        <Mono.Card variant="secondary" className={"p-4"}>
          <p className="text-darkgray">//COMENTARIO</p>
          <h1>SECONDARY CARD</h1>
        </Mono.Card>

        <Mono.Card variant="tertiary" className={"p-4"}>
          <h1>TERTIARY CARD</h1>
        </Mono.Card>
      </div>
    </div>
  );
};

export default MonoTheme;
