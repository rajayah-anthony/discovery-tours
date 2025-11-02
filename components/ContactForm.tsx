"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";

type Props = {
    tours?: { label: string; value: string }[];
    defaultTour?: string;
    className?: string;
};

export default function ContactForm({ tours = [], defaultTour, className }: Props) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const startedAtRef = useRef<number>(Date.now());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            // phone is optional; you can still default to empty string
            phone: "",
            message: "",
            tour: defaultTour ?? "",
            date: "",
            honeypot: "",
            startedAt: undefined,
        },
    });

    useEffect(() => {
        if (defaultTour) setValue("tour", defaultTour);
    }, [defaultTour, setValue]);

    const onSubmit = async (values: ContactInput) => {
        setStatus("submitting");
        setErrorMsg(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, startedAt: startedAtRef.current }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                setStatus("error");
                setErrorMsg(typeof data?.error === "string" ? data.error : "Unable to send your message right now.");
                return;
            }
            setStatus("success");
            reset({
                name: "",
                email: "",
                phone: "",
                message: "",
                tour: defaultTour ?? "",
                date: "",
                honeypot: "",
                startedAt: undefined,
            });
            startedAtRef.current = Date.now();
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
        }
    };

    const disabled = isSubmitting || status === "submitting";

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className={`relative grid gap-4 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur ${className ?? ""}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            {/* Title */}
            <div className="space-y-1">
                <h3 className="text-xl font-semibold">Enquire or Book</h3>
                <p className="text-sm text-neutral-600">Tell us your plan—we’ll get back within one working day.</p>
            </div>

            {/* Honeypot (hidden) */}
            <div className="absolute -z-10 opacity-0 pointer-events-none">
                <label>
                    Do not fill this field
                    <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        {...register("name")}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium mb-1">Phone (optional)</label>
                <input
                    {...register("phone")}
                    placeholder="+60 ..."
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message as string}</p>}
            </div>

            {/* Tour + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Tour (optional)</label>
                    {tours.length > 0 ? (
                        <select
                            {...register("tour")}
                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">— Select a tour —</option>
                            {tours.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            {...register("tour")}
                            placeholder="e.g., Klias River Cruise"
                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Preferred Date (optional)</label>
                    <input
                        {...register("date")}
                        type="date"
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date.message as string}</p>}
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Group size, pickup point, special requests..."
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
            </div>

            {/* Submit */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={disabled}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
                >
                    {status === "submitting" ? "Sending..." : "Send Enquiry"}
                </button>

                {status === "success" && <span className="text-sm text-emerald-700">Thanks! We’ll be in touch soon.</span>}
                {status === "error" && errorMsg && <span className="text-sm text-red-700">{errorMsg}</span>}
            </div>
        </motion.form>
    );
}
