import { Sparkle, Star } from "lucide-react";
import MonoButton from "./ui/mono-button";

const MonoTheme = () => {
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
      <MonoButton>
        <Star />
        Primario
      </MonoButton>
      {/*INFO: hay 2 formas de hacer lo mismo parece: className="mono-button-secondary" o variant="secondary". Siempre es mono-button[-variant] */}
      <MonoButton variant="secondary">
        <Sparkle />
        Secundario
      </MonoButton>
      <MonoButton variant="tertiary">Terciario</MonoButton>
    </div>
  );
};

export default MonoTheme;
