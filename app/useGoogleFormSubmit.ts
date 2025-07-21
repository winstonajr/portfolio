"use client"

import { useState } from "react";

export function useGoogleFormSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const submitForm = async (formData: FormData, formUrl: string) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setStatusMessage("Mensagem enviada com sucesso! 🚀");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatusMessage("Ops! Algo deu errado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, statusMessage, submitForm };
}
