import { useState } from "react";
import { postApi } from "../api";
import {
    User,
    Users,
    Phone,
    School,
    Hash,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Send,
    GraduationCap,
    Sparkles
} from "lucide-react";

// ✅ InputField component moved OUTSIDE
const InputField = ({
    label,
    name,
    type = "text",
    icon: Icon,
    placeholder,
    required = true,
    value,
    onChange,
    error
}) => (
    <div className="space-y-2">
        <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon className={`h-5 w-5 transition-colors duration-200 ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`
                    block w-full pl-12 pr-4 py-3.5 
                    border-2 rounded-xl
                    text-gray-900 placeholder-gray-400
                    transition-all duration-200
                    focus:outline-none focus:ring-0
                    ${error
                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white hover:border-gray-300'
                    }
                `}
                placeholder={placeholder}
            />
        </div>
        {error && (
            <p className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {error}
            </p>
        )}
    </div>
);

export default function AdmissionForm() {
    const [formData, setFormData] = useState({
        studentName: '',
        guardianName: '',
        guardianNumber: "",
        schoolName: "",
        schoolRoll: "",
        class: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentName.trim()) {
            newErrors.studentName = "Student name is required";
        } else if (formData.studentName.trim().length < 2) {
            newErrors.studentName = "Name must be at least 2 characters";
        }

        if (!formData.guardianName.trim()) {
            newErrors.guardianName = "Guardian name is required";
        }

        if (!formData.guardianNumber.trim()) {
            newErrors.guardianNumber = "Mobile number is required";
        } else if (!/^[0-9]{11}$/.test(formData.guardianNumber)) {
            newErrors.guardianNumber = "Please enter a valid 11-digit mobile number";
        }

        if (!formData.schoolName.trim()) {
            newErrors.schoolName = "School name is required";
        }

        if (!formData.schoolRoll.trim()) {
            newErrors.schoolRoll = "School roll number is required";
        }

        if (!formData.class) {
            newErrors.class = "Please select a class";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (submitStatus) {
            setSubmitStatus(null);
            setApiError('');
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setSubmitStatus(null);
        setApiError('');

        try {
            const response = await postApi("/admission", formData);

            if (response && (response.status === 200 || response.status === 201 || response.success)) {
                setSubmitStatus('success');
                setFormData({
                    studentName: '',
                    guardianName: '',
                    guardianNumber: "",
                    schoolName: "",
                    schoolRoll: "",
                    class: '',
                });
            } else {
                throw new Error(response?.message || 'Submission failed');
            }
        } catch (error) {
            setSubmitStatus('error');

            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message;

                if (status === 400) {
                    setApiError(message || 'Invalid data provided. Please check your inputs.');
                } else if (status === 401) {
                    setApiError('Unauthorized. Please login and try again.');
                } else if (status === 403) {
                    setApiError('Access denied. You do not have permission.');
                } else if (status === 404) {
                    setApiError('Service not found. Please try again later.');
                } else if (status === 409) {
                    setApiError(message || 'This student may already be registered.');
                } else if (status === 422) {
                    setApiError(message || 'Validation failed. Please check your inputs.');
                } else if (status >= 500) {
                    setApiError('Server error. Please try again later.');
                } else {
                    setApiError(message || 'An error occurred. Please try again.');
                }
            } else if (error.request) {
                setApiError('Network error. Please check your internet connection.');
            } else {
                setApiError(error.message || 'An unexpected error occurred.');
            }

            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Student Admission
                    </h1>
                    <p className="mt-2 text-gray-600 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        Fill in the details to apply
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-gray-200/50 p-6 sm:p-8 border border-white/50">
                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-green-800">Submitted Successfully!</p>
                                <p className="text-sm text-green-600">We'll contact you soon.</p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-red-800">Submission Failed</p>
                                <p className="text-sm text-red-600">{apiError}</p>
                            </div>
                            <button
                                onClick={() => { setSubmitStatus(null); setApiError(''); }}
                                className="text-red-400 hover:text-red-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <form onSubmit={onSubmitHandler} className="space-y-5">
                        <InputField
                            label="Student Name"
                            name="studentName"
                            icon={User}
                            placeholder="Enter student's full name"
                            value={formData.studentName}
                            onChange={onChangeHandler}
                            error={errors.studentName}
                        />

                        <InputField
                            label="Guardian Name"
                            name="guardianName"
                            icon={Users}
                            placeholder="Enter guardian's full name"
                            value={formData.guardianName}
                            onChange={onChangeHandler}
                            error={errors.guardianName}
                        />

                        <InputField
                            label="Guardian Mobile"
                            name="guardianNumber"
                            type="tel"
                            icon={Phone}
                            placeholder="11-digit mobile number"
                            value={formData.guardianNumber}
                            onChange={onChangeHandler}
                            error={errors.guardianNumber}
                        />

                        <InputField
                            label="School Name"
                            name="schoolName"
                            icon={School}
                            placeholder="Enter current school name"
                            value={formData.schoolName}
                            onChange={onChangeHandler}
                            error={errors.schoolName}
                        />

                        <InputField
                            label="School Roll Number"
                            name="schoolRoll"
                            icon={Hash}
                            placeholder="Enter school roll number"
                            value={formData.schoolRoll}
                            onChange={onChangeHandler}
                            error={errors.schoolRoll}
                        />

                        {/* Class Select */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                Class <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <GraduationCap className={`h-5 w-5 transition-colors duration-200 ${errors.class ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
                                </div>
                                <select
                                    name="class"
                                    value={formData.class}
                                    onChange={onChangeHandler}
                                    className={`
                                        block w-full pl-12 pr-10 py-3.5 
                                        border-2 rounded-xl
                                        transition-all duration-200
                                        focus:outline-none focus:ring-0
                                        appearance-none cursor-pointer
                                        ${formData.class === '' ? 'text-gray-400' : 'text-gray-900'}
                                        ${errors.class
                                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                                            : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white hover:border-gray-300'
                                        }
                                    `}
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.75rem center',
                                        backgroundSize: '1.5em 1.5em',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <option value="">Select Class</option>
                                    <option value="5">Class 5</option>
                                    <option value="6">Class 6</option>
                                    <option value="7">Class 7</option>
                                    <option value="8">Class 8</option>
                                    <option value="9">Class 9</option>
                                    <option value="10">Class 10</option>
                                </select>
                            </div>
                            {errors.class && (
                                <p className="flex items-center gap-1 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.class}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full flex items-center justify-center gap-2 
                                px-6 py-4 mt-6
                                text-white font-semibold rounded-xl
                                transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Submit Application</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}