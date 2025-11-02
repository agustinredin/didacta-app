import { Sparkle, Star, Terminal } from "lucide-react";
import Button from "./ui/mono-button";
import Text from "./ui/mono-input-text";

const MonoTheme = () => {
  document.addEventListener("click", (e) => {
    //testeo del theme
    if (e.target) document.body.className = "dark";
    setTimeout(() => {
      document.body.className = "";
    }, 5000);
  });
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
      <Button>
        <Star />
        Primario
      </Button>
      {/*INFO: hay 2 formas de hacer lo mismo parece: className="mono-button-secondary" o variant="secondary". Siempre es mono-button[-variant]. cualquiera sirve */}
      <Button variant="secondary">
        <Sparkle />
        Secundario
      </Button>
      <Button className="mono-button-tertiary">
        Terciario <Terminal />{" "}
      </Button>
      <Text placeholder="input solo" />
      <Text type="textarea" placeholder="Input con type='textarea'" />
      <Text topLabel="NOMBRE COMPLETO" placeholder="input con topLabel" />
      <Text
        placeholder="input con bottomLabel"
        bottomLabel="Acá sugerimos que pongas tu nombre."
      />
      <Text
        topLabel="NOMBRE COMPLETO"
        placeholder="input con topLabel y bottomLabel + error"
        errorText="EL NOMBRE NO PUEDE ESTAR VACÍO"
      />
    </div>
  );
};

export default MonoTheme;
