import { DotIcon, Sparkle, Star, Terminal, XIcon } from "lucide-react";
import * as Mono from "@ui";
import { useEffect, useRef } from "react";
import { useEventHandler } from "./core/hooks/useEventHandler";
import { useUI } from "./core/context/UIContext";
import UsePersistedState from "./core/hooks/usePersistedState";

const MonoTheme = () => {
  const codeRef = useRef(null);
  const { ui } = useUI();

  //extracción de listener global a hook con su respectivo callback
  //nos va a servir para ejemplo chequear si un user está logged o no cuando se mete al index
  useEventHandler(
    document,
    "click",
    () => document.body.classList.toggle("dark"),
    5000,
    () => document.body.classList.toggle("dark")
  );

  const botonCustomToast = () => <Mono.Button>ejemplo</Mono.Button>;

  const toastMagic = () => {
    ui.showToast(
      "success",
      "Título mayus",
      "desc minus",
      500000
      //   5000,
      //   () => {
      //     console.log("handler custom de onclose");
      //   },
      //   botonCustomToast
    );
  };

  return (
    <div className="p-12 flex flex-col gap-8">
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
      <Mono.Button>
        <Star />
        Primario
      </Mono.Button>
      {/*INFO: hay 2 formas de hacer lo mismo parece: className="mono-button-secondary" o variant="secondary". Siempre es mono-button[-variant]. cualquiera sirve */}
      <Mono.Button variant="secondary">
        <Sparkle />
        Secundario
      </Mono.Button>
      <Mono.Button className="mono-button-tertiary">
        Terciario <Terminal />{" "}
      </Mono.Button>
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
      <Mono.Button
        variant="tertiary"
        onClick={() => {
          console.log(codeRef.current.value);
        }}
      >
        Obtengo value{" "}
      </Mono.Button>
      <hr />
      <span>Toast</span>
      <Mono.Button onClick={toastMagic}>Show toast</Mono.Button>
    </div>
  );
};

export default MonoTheme;
