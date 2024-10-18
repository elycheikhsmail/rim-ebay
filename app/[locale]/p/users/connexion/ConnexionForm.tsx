// app/p/users/connexion/ConnexionForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client"; 

export default function ConnexionForm({ lang = "ar" }) { 
  const router = useRouter(); 
    
  const t = useI18n();
 

  const defaultEmail = 'user1@example.com';
  const defaultPassword = 'password123';

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = t("connexion.emailRequired");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("connexion.emailInvalid");
      isValid = false;
    }

    if (!password) {
      newErrors.password = t("connexion.passwordRequired");
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = t("connexion.passwordShort");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus(t("connexion.validationInProgress"));

    if (!validateForm()) {
      setSubmitStatus(t("connexion.validationFailed"));
      return;
    }

    setSubmitStatus(t("connexion.sendingData"));

    try {
      const response = await fetch(`/${lang}/api/p/users/connexion`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-store'
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus(t("connexion.success"));
        router.push(`/${lang}//my/list`);
        //router.push("/my/list");
        router.refresh();
      } else {
        setSubmitStatus(t("connexion.error", { error: result.error }));
      }
    } catch (error) {
      setSubmitStatus(t("connexion.unexpectedError", { error: String(error) }));
      console.error("Erreur lors de la soumission:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {t("connexion.title")}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("connexion.emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("connexion.passwordLabel")}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              {t("connexion.submitButton")}
            </button>
            {submitStatus && <p className="mt-4 text-center text-sm">{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}