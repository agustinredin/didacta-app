import { writeFileSync, readFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

async function readableToString(readable) {
  const chunks = [];
  for await (const chunk of readable) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function downloadWithSDK(bucket, key, dest) {
  const client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  const data = await readableToString(res.Body);
  writeFileSync(dest, data);
  console.log(`→ ${dest} sincronizado vía SDK.`);
}

function downloadWithCLI(bucket, key, dest) {
  console.log(`Descargando ${key} con AWS CLI...`);
  execSync(`aws s3 cp s3://${bucket}/${key} ${dest}`, { stdio: "inherit" });
}

function generateViteEnv(baseFile) {
  if (!existsSync(baseFile)) {
    console.warn(`⚠️  No existe ${baseFile}, no se puede generar .env.local`);
    return;
  }

  const raw = readFileSync(baseFile, "utf8").split("\n");
  const viteLines = [];

  for (const line of raw) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const [key, value] = line.split("=");
    if (!key || !value) continue;
    if (!key.startsWith("VITE_")) viteLines.push(`VITE_${key}=${value}`);
  }

  if (viteLines.length > 0) {
    writeFileSync(".env.local", viteLines.join("\n") + "\n");
    console.log("→ .env.local generado con variables VITE_ duplicadas.");
  } else {
    console.log("No se generaron variables VITE_ (ya existen o .env vacío).");
  }
}

async function main() {
  const envChoice = process.env.DIDACTA_ENV === "production" ? "production" : "development";
  const bucket = "didacta";
  const isVercel = !!process.env.VERCEL;

  const files =
    envChoice === "production"
      ? [{ key: "self/.env", dest: ".env" }]
      : [
          { key: "self/.env", dest: ".env" },
          { key: "self/.env.development", dest: ".env.development" },
        ];

  const useSDK =
    isVercel || (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);

  for (const f of files) {
    try {
      if (useSDK) {
        await downloadWithSDK(bucket, f.key, f.dest);
      } else {
        downloadWithCLI(bucket, f.key, f.dest);
      }
    } catch (err) {
      console.warn(`⚠️  No se pudo sincronizar ${f.dest}: ${err.message}`);
    }
  }

  if (!existsSync(".env")) {
    writeFileSync(".env", "# Archivo .env generado automáticamente\n");
    console.warn("⚠️  No se encontraron credenciales AWS ni CLI; se creó .env vacío.");
  }

  generateViteEnv(".env");

  console.log(`Sincronización completada (${envChoice}).`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error general en sync-env:", err);
    process.exit(1);
  });
