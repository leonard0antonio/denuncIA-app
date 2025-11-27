import React, { useState, useEffect } from "react";
import { Wrapper, Input, Area, Preview } from "../styles/ImageUpload.styles";

export default function ImageUpload({
  onChange,
  initial,
}: {
  onChange: (b64: string | null) => void;
  initial?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(initial || null);

  useEffect(() => {
    // sync initial -> preview if parent changes initial
    setPreview(initial || null);
  }, [initial]);

  function toBase64(file: File) {
    return new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(String(reader.result));
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  }

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) {
      setPreview(null);
      onChange(null);
      return;
    }
    if (f.size > 5_000_000) {
      alert("Arquivo muito grande. Máximo 5MB.");
      e.currentTarget.value = ""; // limpar input
      return;
    }
    try {
      const b = await toBase64(f);
      setPreview(b);
      onChange(b);
    } catch (err) {
      console.error("Erro ao ler arquivo:", err);
      alert("Erro ao processar a imagem.");
      setPreview(null);
      onChange(null);
    } finally {
      e.currentTarget.value = ""; // limpar input para permitir reenvio do mesmo arquivo
    }
  }

  return (
    <Wrapper>
      <Area htmlFor="image-upload-input">Arraste ou clique para selecionar uma foto</Area>
      <Input id="image-upload-input" type="file" accept="image/*" onChange={handle} />
      {preview && <Preview src={preview} alt="preview" />}
    </Wrapper>
  );
}
