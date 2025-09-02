"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, motion as m } from "framer-motion";
import Link from "next/link";

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d4af37] focus:outline-none text-sm";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    flightCount: "",
    date: "",
    aircraft: "",
    instructor: "",
    takeOffTime: "",
    takeOffBatteryVoltage: "",
    batteryId: "",
    landingTime: "",
    voltageAfterFlight: "",
    level: "",
    flightType: "",
    flightMode: "",
    aircraftOrientation: "",
    flightDuration: "",
    comment: "" // ✅ Fixed field name
  });

  // ✅ Updated to match your Google Apps Script URL
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxp56q41KtNj7urHeYqxwpis8fOG8Y6Gr79MQqyd8UQHaOVyqjghnV4hUfRQ1zU-Tmv/exec";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  if (loading) return; // Prevent multiple clicks
  setLoading(true);

  // Basic validation
  const requiredFields = [
    "flightCount",
    "date",
    "aircraft",
    "takeOffTime",
    "takeOffBatteryVoltage",
    "landingTime",
    "voltageAfterFlight",
    "level",
    "flightType",
    "flightMode",
  ];
  const missingFields = requiredFields.filter(
    (field) => !formData[field as keyof typeof formData]
  );

  if (missingFields.length > 0) {
    alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let result: { status?: string } = { status: undefined };

    // Try parsing JSON, fallback to text for older Apps Script behavior
    try {
      result = await response.json();
    } catch {
      const text = await response.text();
      if (text.includes("success")) result.status = "success";
    }

    if (result.status === "success") {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);

        // Reset form data
        setFormData(
          Object.fromEntries(Object.keys(formData).map((k) => [k, ""])) as typeof formData
        );
      }, 1800);
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert(
      "Failed to submit. Make sure your Google Apps Script URL is deployed with 'Anyone, even anonymous' access."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/drone.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-700/80 -z-10" />

      {/* Hero Content */}
      <div className="text-center max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/uas.png"
            width={120}
            height={60}
            alt="logo"
            className="mx-auto mb-8"
            priority
          />
        </motion.div>
        <motion.h1
          className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="text-[#d4af37]">BRIECH</span> UAS FPV DRONE PILOT
          RECORDS
        </motion.h1>
        <motion.div
          className="flex flex-wrap justify-center gap-5 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#d4af37] cursor-pointer hover:bg-[#b8902d] text-white px-8 py-3 rounded-xl font-semibold shadow transition-colors"
          >
            Create Record
          </button>
          <Link
            href="https://docs.google.com/spreadsheets/d/1Gh303zRDrXh3Dwt15rhYoUN97kepQtgg0-TENp8lzSY/edit?usp=sharing"
            target="_blank"
          >
            <button className="border border-[#d4af37] cursor-pointer hover:bg-[#d4af37]/10 text-white px-8 py-3 rounded-xl font-semibold shadow transition-colors">
              View Records
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {!submitted && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                  disabled={loading}
                >
                  ✕
                </button>
              )}

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center py-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <motion.span
                      className="text-white text-4xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      ✔
                    </motion.span>
                  </motion.div>
                  <p className="mt-4 text-lg font-semibold text-green-600">
                    Record Submitted Successfully!
                  </p>
                </motion.div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create Flight Record
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="flightCount"
                      value={formData.flightCount}
                      onChange={handleInputChange}
                      placeholder="Flight Count *"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      name="aircraft"
                      value={formData.aircraft}
                      onChange={handleInputChange}
                      placeholder="Aircraft *"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      placeholder="Instructor"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      type="time"
                      name="takeOffTime"
                      value={formData.takeOffTime}
                      onChange={handleInputChange}
                      placeholder="Take-off Time"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      type="number"
                      step="0.01"
                      name="takeOffBatteryVoltage"
                      value={formData.takeOffBatteryVoltage}
                      onChange={handleInputChange}
                      placeholder="Take-off Voltage (V) *"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      name="batteryId"
                      value={formData.batteryId}
                      onChange={handleInputChange}
                      placeholder="Battery ID"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      type="time"
                      name="landingTime"
                      value={formData.landingTime}
                      onChange={handleInputChange}
                      placeholder="Landing Time"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      type="number"
                      step="0.01"
                      name="voltageAfterFlight"
                      value={formData.voltageAfterFlight}
                      onChange={handleInputChange}
                      placeholder="Voltage After Flight (V) *"
                      className={inputClass}
                      disabled={loading}
                    />
                    <select 
                      name="level" 
                      value={formData.level}
                      onChange={handleInputChange}
                      className={inputClass} 
                      disabled={loading}
                    >
                      <option value="">Select Level *</option>
                      <option value="Trainee">Trainee</option>
                      <option value="Solo">Solo</option>
                      <option value="Instructor">Instructor</option>
                    </select>
                    <select 
                      name="flightType" 
                      value={formData.flightType}
                      onChange={handleInputChange}
                      className={inputClass} 
                      disabled={loading}
                    >
                      <option value="">Flight Type *</option>
                      <option value="LOS">Line of Sight (LOS)</option>
                      <option value="BVLOS">Beyond Visual Line of Sight (BVLOS)</option>
                      <option value="FPV">First Person View (FPV)</option>
                    </select>
                    <select 
                      name="flightMode" 
                      value={formData.flightMode}
                      onChange={handleInputChange}
                      className={inputClass} 
                      disabled={loading}
                    >
                      <option value="">Flight Mode *</option>
                      <option value="Angle">Angle</option>
                      <option value="Acro">Acro</option>
                      <option value="Stabilized">Stabilized</option>
                      <option value="Manual">Manual</option>
                    </select>
                    <input
                      name="aircraftOrientation"
                      value={formData.aircraftOrientation}
                      onChange={handleInputChange}
                      placeholder="Aircraft Orientation"
                      className={inputClass}
                      disabled={loading}
                    />
                    <input
                      name="flightDuration"
                      value={formData.flightDuration}
                      onChange={handleInputChange}
                      placeholder="Flight Duration (mins)"
                      className={inputClass}
                      disabled={loading}
                    />
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Comments / Remarks"
                      className={`${inputClass} col-span-2 min-h-[80px] resize-y`}
                      disabled={loading}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="col-span-2 bg-[#d4af37] hover:bg-[#b8902d] disabled:bg-[#d4af37]/50 transition-colors py-3 rounded-xl text-white font-semibold"
                    >
                      {loading ? "Submitting..." : "Submit Record"}
                    </button>
                  </div>
                </div>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}