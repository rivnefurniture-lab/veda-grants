"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Помилка при відправці форми");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Щось пішло не так. Спробуйте пізніше."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text mb-2">Дякуємо!</h3>
        <p className="text-text-light max-w-md mx-auto mb-6">
          Ми зв&#39;яжемося з вами найближчим часом.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-gold-dark font-medium hover:text-gold transition-colors"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error alert */}
      {status === "error" && (
        <div className="flex items-start gap-3 bg-danger/10 text-danger rounded-xl p-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Name & Email row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Ім&#39;я <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше ім'я"
            className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-gray-200 text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-gray-200 text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>
      </div>

      {/* Phone & Company row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+38 (0__) ___-__-__"
            className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-gray-200 text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Компанія
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Назва компанії"
            className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-gray-200 text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-text mb-1.5"
        >
          Повідомлення <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Розкажіть про ваш проєкт або запитання..."
          className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-gray-200 text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-xl hover:-translate-y-0.5",
          status === "loading" && "opacity-70 cursor-not-allowed hover:translate-y-0"
        )}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Надсилаємо...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Надіслати заявку
          </>
        )}
      </button>
    </form>
  );
}
