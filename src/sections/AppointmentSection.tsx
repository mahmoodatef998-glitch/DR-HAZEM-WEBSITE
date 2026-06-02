"use client";

import { useState, FormEvent } from "react";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+971 50 000 0000",
    sub: "Available Sun–Thu, 9AM–6PM",
    href: "tel:+971500000000",
    color: "sky",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@drhazem.ae",
    sub: "Response within 24 hours",
    href: "mailto:info@drhazem.ae",
    color: "teal",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dubai Healthcare City",
    sub: "Dubai, United Arab Emirates",
    href: "#",
    color: "violet",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Sun – Thu: 9AM – 6PM",
    sub: "Sat: 10AM – 2PM",
    href: "#",
    color: "amber",
  },
];

export default function AppointmentSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Please add a message";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="appointment" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-teal-50/50 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Book Appointment"
          title="Take the First Step to "
          highlight="Better Health"
          description="Fill out the form below and our team will reach out within 24 hours to confirm your appointment with Dr. Hazem."
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
                <p className="text-white/60 text-sm mb-8">
                  Reach out through any of the channels below or fill the form.
                </p>

                <div className="space-y-5">
                  {contactInfo.map((info, i) => {
                    const Icon = info.icon;
                    const colorMap: Record<string, string> = {
                      sky: "bg-sky-500/20 text-sky-400",
                      teal: "bg-teal-500/20 text-teal-400",
                      violet: "bg-violet-500/20 text-violet-400",
                      amber: "bg-amber-500/20 text-amber-400",
                    };
                    return (
                      <a
                        key={i}
                        href={info.href}
                        className="flex items-start gap-4 group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[info.color]}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs font-medium uppercase tracking-wide">
                            {info.label}
                          </p>
                          <p className="text-white font-semibold text-sm group-hover:text-sky-300 transition-colors duration-200">
                            {info.value}
                          </p>
                          <p className="text-white/50 text-xs">{info.sub}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
                    Follow Dr. Hazem
                  </p>
                  <div className="flex gap-3">
                    {["in", "tw", "ig", "fb"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-sky-500/30 flex items-center justify-center text-white/60 hover:text-white text-xs font-bold transition-all duration-300 uppercase"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Appointment Requested!</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    Thank you, <strong>{form.name}</strong>! We&apos;ll contact you at{" "}
                    <strong>{form.phone}</strong> within 24 hours to confirm your appointment.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", message: "" }); }}
                    className="text-sky-600 font-semibold text-sm hover:text-sky-700 underline underline-offset-4 mt-4"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg shadow-slate-100/80 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ahmed Hassan"
                      className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-300 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-slate-50 hover:bg-white
                        ${errors.name ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-300 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-slate-50 hover:bg-white
                        ${errors.phone ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
                    />
                    {errors.phone && (
                      <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-300 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-slate-50 hover:bg-white
                      ${errors.email ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-slate-50 hover:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select a service...</option>
                    <option>Preventive Care</option>
                    <option>Specialist Consultation</option>
                    <option>Chronic Disease Management</option>
                    <option>Advanced Diagnostics</option>
                    <option>Follow-up & Monitoring</option>
                    <option>Urgent Consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Please briefly describe your health concern or reason for appointment..."
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-300 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-slate-50 hover:bg-white resize-none
                      ${errors.message ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
                  />
                  {errors.message && (
                    <p className="text-rose-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Privacy note */}
                <p className="text-slate-400 text-xs">
                  Your information is protected and will never be shared. See our{" "}
                  <a href="#" className="text-sky-500 hover:underline">Privacy Policy</a>.
                </p>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full group"
                >
                  <Send className="w-5 h-5" />
                  Request Appointment
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
