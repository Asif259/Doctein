import React, { useState, useEffect } from "react";
import {
    User,
    GraduationCap,
    Briefcase,
    Stethoscope,
    Phone,
    FileText,
    Award,
    Plus,
    X,
    Check,
    Camera
} from "lucide-react";
import { doctor } from "@/types/dashboard";
import { saveDoctor, updateDoctor } from "@/api/dashboard/profileAPI";
import toast from "react-hot-toast";
import router from "next/router";
import { logoutUser } from "@/api/api";

interface ProfileComponentProps {
    doctor?: doctor | null;
    onProfileUpdate?: (updatedDoctor: doctor) => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
    doctor: doctorProp,
    onProfileUpdate,
}) => {
    const [formData, setFormData] = useState<{
        name: string;
        degrees: string[];
        designation: string;
        specialization: string;
        phone: string[];
        bmdcNumber: string;
        digitalSignature: string;
    }>({
        name: "",
        degrees: [],
        designation: "",
        specialization: "",
        phone: [""],
        bmdcNumber: "",
        digitalSignature: "",
    });

    const [additionalPhones, setAdditionalPhones] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Populate form data when doctor prop is provided
    useEffect(() => {
        if (doctorProp) {
            setFormData({
                name: doctorProp.name || "",
                degrees: doctorProp.degrees || [],
                designation: doctorProp.designation || "",
                specialization: doctorProp.specialization || "",
                phone:
                    doctorProp.phone && doctorProp.phone.length > 0
                        ? doctorProp.phone
                        : [""],
                bmdcNumber: doctorProp.bmdcNumber || "",
                digitalSignature: doctorProp.digitalSignature || "",
            });

            // Set additional phones if there are more than one
            if (doctorProp.phone && doctorProp.phone.length > 1) {
                setAdditionalPhones(doctorProp.phone.slice(1));
            }
        }
    }, [doctorProp]);

    const degrees = [
        { key: "mbbs", label: "MBBS" },
        { key: "bds", label: "BDS" },
        { key: "fcps", label: "FCPS" },
        { key: "md", label: "MD" },
        { key: "ms", label: "MS" },
        { key: "phd", label: "PhD" },
    ];

    const specializations = [
        { key: "cardiology", value: "Cardiology" },
        { key: "neurology", value: "Neurology" },
        { key: "orthopedics", value: "Orthopedics" },
        { key: "pediatrics", value: "Pediatrics" },
        { key: "dermatology", value: "Dermatology" },
        { key: "psychiatry", value: "Psychiatry" },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddDegree = (degree: string) => {
        if (degree && !formData.degrees.includes(degree)) {
            setFormData((prev) => ({
                ...prev,
                degrees: [...prev.degrees, degree],
            }));
        }
    };

    const handleRemoveDegree = (degree: string) => {
        setFormData((prev) => ({
            ...prev,
            degrees: prev.degrees.filter((d) => d !== degree),
        }));
    };

    const handleAddPhone = () => {
        if (additionalPhones.length < 9) {
            setAdditionalPhones([...additionalPhones, ""]);
        }
    };

    const handleRemovePhone = (index: number) => {
        setAdditionalPhones(additionalPhones.filter((_, i) => i !== index));
    };

    const handleAdditionalPhoneChange = (index: number, value: string) => {
        const updated = [...additionalPhones];
        updated[index] = value;
        setAdditionalPhones(updated);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Validate required fields
        if (!formData.name.trim()) {
            setErrors({ name: "Name is required" });
            setLoading(false);
            toast.error("Please enter your name");
            return;
        }

        if (formData.degrees.length === 0) {
            setErrors({ degrees: "At least one degree is required" });
            setLoading(false);
            toast.error("Please select at least one degree");
            return;
        }

        if (!formData.phone[0]?.trim()) {
            setErrors({ phone: "Phone number is required" });
            setLoading(false);
            toast.error("Please enter a phone number");
            return;
        }

        if (!formData.bmdcNumber.trim()) {
            setErrors({ bmdcNumber: "BMDC number is required" });
            setLoading(false);
            toast.error("Please enter your BMDC registration number");
            return;
        }

        try {
            // Combine primary phone with additional phones
            const allPhones = [
                formData.phone[0],
                ...additionalPhones.filter((phone) => phone.trim() !== ""),
            ];

            const doctorData: doctor = {
                name: formData.name.trim(),
                degrees: formData.degrees,
                designation: formData.designation.trim(),
                specialization: formData.specialization.trim(),
                phone: allPhones,
                bmdcNumber: formData.bmdcNumber.trim(),
                digitalSignature: formData.digitalSignature.trim(),
            };

            // If doctor exists (has key), update; otherwise, save
            let response;
            if (doctorProp && doctorProp.key) {
                // Update existing doctor profile
                doctorData.key = doctorProp.key;
                response = await updateDoctor(doctorData);
            } else {
                // Save new doctor profile
                response = await saveDoctor(doctorData);
            }

            if (response && response.success) {
                toast.success(
                    doctorProp && doctorProp.key
                        ? "Profile updated successfully!"
                        : "Profile saved successfully!",
                );

                // Update the store with the response data if available
                if (response.data) {
                    const updatedDoctor: doctor = {
                        ...doctorData,
                        key: response.data.key || doctorProp?.key,
                        profileImage:
                            response.data.profileImage ||
                            doctorProp?.profileImage,
                    };

                    // Call onProfileUpdate callback if provided
                    if (onProfileUpdate) {
                        onProfileUpdate(updatedDoctor);
                    }
                } else if (onProfileUpdate) {
                    // Fallback to updating with the data we sent
                    onProfileUpdate(doctorData);
                }

                // Reload the component/page to reflect the latest data
                if (typeof window !== "undefined") {
                    window.location.reload();
                }
            } else {
                const errorMessage =
                    response?.data ||
                    response?.message ||
                    "Failed to save profile";
                toast.error(errorMessage);
                setErrors({ submit: errorMessage });
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("An error occurred while saving the profile");
            setErrors({ submit: "An error occurred" });
        } finally {
            setLoading(false);
        }
    };
        const handleLogout = async () => {
            const res = await logoutUser();
            console.log(res.message);
            router.push("/auth/login");
        };

    return (
        <div className="max-h-screen p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 relative">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
                                {formData.name
                                    ? formData.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()
                                    : "DR"}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-slate-100 hover:border-primary transition-colors">
                                    <Camera className="w-4 h-4 text-primary" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-slate-800 mb-1">
                                {formData.name || "Doctor Profile"}
                            </h1>
                            <p className="text-slate-500 text-sm">
                                Complete your professional profile
                            </p>
                        </div>
                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="absolute top-4 right-4 flex items-center cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                            type="button"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                                ></path>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Dr. John Doe"
                                />
                            </div>

                            {/* Degrees */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <GraduationCap className="w-4 h-4 text-primary" />
                                    Degrees
                                </label>
                                <div className="relative">
                                    <select
                                        onChange={(e) =>
                                            handleAddDegree(e.target.value)
                                        }
                                        value=""
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">
                                            Select a degree
                                        </option>
                                        {degrees.map((degree) => (
                                            <option
                                                key={degree.key}
                                                value={degree.key}
                                            >
                                                {degree.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {formData.degrees.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.degrees.map((degree) => (
                                            <span
                                                key={degree}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                                            >
                                                {
                                                    degrees.find(
                                                        (d) => d.key === degree,
                                                    )?.label
                                                }
                                                <X
                                                    onClick={() =>
                                                        handleRemoveDegree(
                                                            degree,
                                                        )
                                                    }
                                                    className="w-3.5 h-3.5 cursor-pointer hover:text-primary/80"
                                                />
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Phone Numbers */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    Primary Phone
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone[0]}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                phone: [e.target.value],
                                            }))
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12"
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddPhone}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 text-primary" />
                                    </button>
                                </div>
                            </div>

                            {/* Additional Phones */}
                            {additionalPhones.map((phone, index) => (
                                <div key={index}>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                                        Additional Phone {index + 1}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) =>
                                                handleAdditionalPhoneChange(
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12"
                                            placeholder="+880 1XXX-XXXXXX"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemovePhone(index)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Designation */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Senior Consultant"
                                />
                            </div>

                            {/* Specialization */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Stethoscope className="w-4 h-4 text-primary" />
                                    Specialization
                                </label>
                                <div className="relative">
                                    <select
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">
                                            Select specialization
                                        </option>
                                        {specializations.map((spec) => (
                                            <option
                                                key={spec.key}
                                                value={spec.value}
                                            >
                                                {spec.value}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* BMDC Number */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Award className="w-4 h-4 text-primary" />
                                    BMDC Registration Number
                                </label>
                                <input
                                    type="text"
                                    name="bmdcNumber"
                                    value={formData.bmdcNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="A-XXXXX"
                                />
                            </div>

                            {/* Digital Signature */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Digital Signature
                                </label>
                                <input
                                    type="text"
                                    name="digitalSignature"
                                    value={formData.digitalSignature}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Your digital signature"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving Profile...
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    Save Profile
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileComponent;
