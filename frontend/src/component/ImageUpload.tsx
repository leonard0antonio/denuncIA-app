import React, { useState } from 'react';
import styled from 'styled-components';

const Preview = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 8px;
`;

export default function ImageUpload({ onChange, initial }: { onChange: (base64: string | null) => void, initial?: string | null }) {
  const [preview, setPreview] = useState<string | null>(initial || null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) {
      setPreview(null);
      onChange(null);
      return;
    }
    // limit size ~5MB
    if (f.size > 5_000_000) {
      alert('Arquivo muito grande. Máximo 5MB.');
      return;
    }
    const b64 = await toBase64(f);
    setPreview(b64);
    onChange(b64);
  }

  function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div>
      {/* SOLUÇÃO: Adicionado aria-label */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFile}
        aria-label="Carregar imagem do curso" 
      />
      
      {preview && <Preview src={preview} alt="Prévia da imagem" />}
    </div>
  );
}