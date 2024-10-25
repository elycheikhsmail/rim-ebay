"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";

export default function RegisterForm({ lang = "ar" }) {
  const router = useRouter();
  const t = useI18n();
  const defaultEmail = ""
  // 'user11@example.com';
  const defaultPassword = ""
  // 'password123';

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [confirmPassword, setConfirmPassword] = useState(defaultPassword);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!email) {
      newErrors.email = t("register.emailRequired");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("register.emailInvalid");
      isValid = false;
    }

    if (!password) {
      newErrors.password = t("register.passwordRequired");
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = t("register.passwordMinLength");
      isValid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("register.passwordsNotMatch");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("register.formSubmitted");
    setSubmitStatus("register.validationInProgress");

    if (!validateForm()) {
      setSubmitStatus("register.validationFailed");
      return;
    }

    setSubmitStatus("register.sendingData");

    try {
      const response = await fetch(`/${lang}/api/p/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "register.error");
      }

      console.log("Résultat de l'action:", result);
      setSubmitStatus(t("register.success"));

      router.push(`/${lang}//my/list`);
      router.refresh();
    } catch (error) {
      setSubmitStatus(String(error))
      console.error("Erreur lors de la soumission:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {t("register.title")}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("register.emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("register.passwordLabel")}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("register.confirmPasswordLabel")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              {t("register.submitButton")}
            </button>
            {submitStatus && <p>{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}