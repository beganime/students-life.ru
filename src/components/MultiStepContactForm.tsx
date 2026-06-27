"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";
import { submitToCRM } from "@/lib/submitToCRM";
import {
  Check,
  ChevronLeft,
  User,
  MapPin,
  Smile,
  FileText,
  LayoutGrid,
  GraduationCap
} from "lucide-react";
import universityIcon from "@/assets/contact_icons/university.webp";
import changeIcon from "@/assets/contact_icons/change.webp";
import chinaIcon from "@/assets/contact_icons/china.webp";
import umrahIcon from "@/assets/contact_icons/umrah.webp";
import visaIcon from "@/assets/contact_icons/visa.webp";
import flightIcon from "@/assets/contact_icons/flight.webp";
import rvpIcon from "@/assets/contact_icons/rvp.png";
interface MultiStepContactFormProps {
  lang: string;
  dict: {
    title: string;
    selectService: string;
    backButton: string;
    stepIndicator?: string;
    steps?: string;
    navigation?: {
      back: string;
      next: string;
      submit: string;
    };
    stepTitles?: {
      serviceSelection: string;
      personalInfo: string;
      serviceDetails: string;
      additionalInfo: string;
    };
    stepDescriptions?: {
      serviceSelection: string;
      personalInfo: string;
      serviceDetails: string;
      additionalInfo: string;
    };
    services: {
      university: { title: string; desc: string };
      transfer: { title: string; desc: string };
      school: { title: string; desc: string };
      umrah: { title: string; desc: string };
      workVisa: { title: string; desc: string };
      ticket: { title: string; desc: string };
      rvp?: { title: string; desc: string };
    };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}
type ServiceType = 'university' | 'transfer' | 'school' | 'umrah' | 'workVisa' | 'ticket' | 'rvp' | '';
interface FormData {
  service: ServiceType;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  educationLevel?: string;
  relationship?: string;
  targetCountry?: string;
  fieldOfStudy?: string;
  citizenship?: string;
  region?: string;
  city?: string;
  currentEducationLevel?: string;
  currentUniversity?: string;
  currentCountry?: string;
  currentField?: string;
  paymentType?: string;
  transferType?: string;
  targetUniversity?: string;
  targetField?: string;
  studentName?: string;
  parentName?: string;
  hasPassport?: string;
  passportExpiry?: string;
  travelMonth?: string;
  workPreferences?: string;
  previousTravel?: string;
  fromCity?: string;
  toCity?: string;
  travelDate?: string;
  needsBaggage?: string;
  rvpType?: string;
  legalBasis?: string;
  applicationCity?: string;
  hasViolations?: string;
  rvpService?: string;
}
const COUNTRIES = [
  'Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan',
  'Russia', 'Kazakhstan', 'Kyrgyzstan', 'Afghanistan', 'Iran'
];
const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];
const TARGET_COUNTRIES = ['Russia', 'China', 'Cyprus', 'Turkey', 'Belarus', 'Uzbekistan', 'Kazakhstan', 'Malaysia', 'Romania', 'Europe (Hungary, Bulgaria)'];
export default function MultiStepContactForm({ lang, dict }: MultiStepContactFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [shake, setShake] = useState(false);
  const shakeAnimation = {
    static: { x: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };
  const getInputClass = (fieldName: string) => `w-full bg-gray-50 border-2 outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors ${errors[fieldName]
    ? 'border-red-500 ring-4 ring-red-500/10'
    : 'border-gray-200 focus:border-navy'
    }`;
  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };
  const [formData, setFormData] = useState<FormData>({
    service: 'university',
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    relationship: '',
    educationLevel: '',
    targetCountry: '',
    fieldOfStudy: '',
    citizenship: '',
    region: '',
    city: '',
    studentName: '',
    parentName: '',
    hasPassport: '',
    passportExpiry: '',
    fromCity: '',
    toCity: '',
    travelDate: '',
    needsBaggage: '',
    currentEducationLevel: '',
    currentUniversity: '',
    currentCountry: '',
    currentField: '',
    paymentType: '',
    transferType: '',
    targetUniversity: '',
    targetField: '',
    travelMonth: '',
    workPreferences: '',
    previousTravel: '',
    rvpType: '',
    legalBasis: '',
    applicationCity: '',
    hasViolations: '',
    rvpService: ''
  });
  const services = [
    {
      id: 'university' as const,
      icon: universityIcon,
      title: dict.services.university.title,
      desc: dict.services.university.desc
    },
    {
      id: 'transfer' as const,
      icon: changeIcon,
      title: dict.services.transfer.title,
      desc: dict.services.transfer.desc
    },
    {
      id: 'school' as const,
      icon: chinaIcon,
      title: dict.services.school.title,
      desc: dict.services.school.desc
    },
    {
      id: 'umrah' as const,
      icon: umrahIcon,
      title: dict.services.umrah.title,
      desc: dict.services.umrah.desc
    },
    {
      id: 'workVisa' as const,
      icon: visaIcon,
      title: dict.services.workVisa.title,
      desc: dict.services.workVisa.desc
    },
    {
      id: 'ticket' as const,
      icon: flightIcon,
      title: dict.services.ticket.title,
      desc: dict.services.ticket.desc
    },
    {
      id: 'rvp' as const,
      icon: rvpIcon,
      title: dict.services.rvp?.title || 'РВП / РВПО / ВНЖ',
      desc: dict.services.rvp?.desc || 'Помощь в оформлении разрешений на проживание в России'
    },
  ];
  const getSteps = () => {
    const baseSteps = [
      {
        id: 1,
        title: dict.stepTitles?.personalInfo || "Tell us about yourself",
        shortTitle: "Personal Info",
        icon: User
      },
      {
        id: 2,
        title: dict.stepTitles?.serviceSelection || "Which service do you need?",
        shortTitle: (formData.service && (dict.services as any)[formData.service]) ? (dict.services as any)[formData.service].title : "Service",
        icon: LayoutGrid
      },
      {
        id: 3,
        title: dict.stepTitles?.serviceDetails || "Service Details",
        shortTitle: "Details",
        icon: GraduationCap
      },
      {
        id: 4,
        title: dict.stepTitles?.additionalInfo || "Location Details",
        shortTitle: "Location",
        icon: MapPin
      }
    ];
    return baseSteps;
  };
  const steps = getSteps();
  const totalSteps = steps.length;
  const validateCurrentStep = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;
    const check = (field: string, value: any) => {
      if (!value || value === '') {
        newErrors[field] = true;
        isValid = false;
      }
    };
    if (currentStep === 1) {
      check('fullName', formData.fullName);
      check('phone', formData.phone);
      check('email', formData.email);
      check('dateOfBirth', formData.dateOfBirth);
    }
    if (currentStep === 2) {
      check('service', formData.service);
    }
    if (currentStep === 3) {
      if (formData.service === 'university') {
        check('educationLevel', formData.educationLevel);
        check('relationship', formData.relationship);
        check('targetCountry', formData.targetCountry);
        check('fieldOfStudy', formData.fieldOfStudy);
      }
      if (formData.service === 'school') {
        check('studentName', formData.studentName);
        check('parentName', formData.parentName);
        check('relationship', formData.relationship);
        check('hasPassport', formData.hasPassport);
        if (formData.hasPassport === 'yes') check('passportExpiry', formData.passportExpiry);
      }
      if (formData.service === 'ticket') {
        check('fromCity', formData.fromCity);
        check('toCity', formData.toCity);
        check('travelDate', formData.travelDate);
        check('needsBaggage', formData.needsBaggage);
      }
      if (formData.service === 'transfer') {
        check('currentEducationLevel', formData.currentEducationLevel);
        check('paymentType', formData.paymentType);
        check('currentUniversity', formData.currentUniversity);
        check('currentCountry', formData.currentCountry);
        check('currentField', formData.currentField);
        check('transferType', formData.transferType);
      }
      if (formData.service === 'umrah') {
        check('travelMonth', formData.travelMonth);
        check('relationship', formData.relationship);
        check('hasPassport', formData.hasPassport);
        if (formData.hasPassport === 'yes') check('passportExpiry', formData.passportExpiry);
      }
      if (formData.service === 'workVisa') {
        check('targetCountry', formData.targetCountry);
        check('relationship', formData.relationship);
        check('workPreferences', formData.workPreferences);
        check('previousTravel', formData.previousTravel);
      }
      if (formData.service === 'rvp') {
        check('rvpType', formData.rvpType);
        check('legalBasis', formData.legalBasis);
        check('applicationCity', formData.applicationCity);
        check('hasViolations', formData.hasViolations);
        check('rvpService', formData.rvpService);
      }
    }
    if (currentStep === 4) {
      check('citizenship', formData.citizenship);
      if (formData.citizenship === 'Turkmenistan') check('region', formData.region);
      else if (formData.citizenship) check('city', formData.city);
      if (formData.service === 'transfer') {
        check('targetUniversity', formData.targetUniversity);
        check('targetField', formData.targetField);
      }
    }
    setErrors(newErrors);
    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    return isValid;
  };
  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      if (validateCurrentStep()) {
        handleNext();
      }
      return;
    }
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    const serviceMap = {
      university: 'University',
      transfer: 'Transfer',
      school: 'School',
      umrah: 'Umrah',
      workVisa: 'Work Visa',
      ticket: 'Ticket',
      rvp: 'RVP'
    };
    const serviceKey = serviceMap[formData.service as keyof typeof serviceMap];
    const [sheetsResult] = await Promise.allSettled([
      submitToGoogleSheets(serviceKey, formData),
      submitToCRM(serviceKey, formData)
    ]);
    const result = sheetsResult.status === 'fulfilled'
      ? sheetsResult.value
      : { success: false, message: 'Google Sheets submission failed' };
    if (result.success) {
      router.push(`/${lang}/thanks`);
    } else {
      alert(result.message);
      setIsSubmitting(false);
    }
  };
  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
              {dict.stepTitles?.personalInfo || "Tell us about yourself"}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {dict.stepDescriptions?.personalInfo || "We need to validate your information"}
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {dict.fields.fullName} *
              </label>
              <motion.input
                type="text"
                required
                variants={shakeAnimation}
                animate={errors.fullName && shake ? "shake" : "static"}
                value={formData.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                className={getInputClass("fullName")}
                placeholder={dict.placeholders.fullName}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {dict.fields.phone} *
                </label>
                <motion.input
                  type="tel"
                  required
                  variants={shakeAnimation}
                  animate={errors.phone && shake ? "shake" : "static"}
                  value={formData.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className={getInputClass("phone")}
                  placeholder={dict.placeholders.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {dict.fields.email} *
                </label>
                <motion.input
                  type="email"
                  required
                  variants={shakeAnimation}
                  animate={errors.email && shake ? "shake" : "static"}
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={getInputClass("email")}
                  placeholder={dict.placeholders.email}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {dict.fields.dateOfBirth} *
              </label>
              <motion.input
                type="date"
                required
                variants={shakeAnimation}
                animate={errors.dateOfBirth && shake ? "shake" : "static"}
                value={formData.dateOfBirth}
                onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                className={getInputClass("dateOfBirth") + " max-w-full min-w-0 max-w-[calc(100vw-3rem)]"}
              />
            </div>
          </div>
        </div>
      );
    }
    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
              {dict.stepTitles?.serviceSelection || "Which service do you need?"}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {dict.stepDescriptions?.serviceSelection || "Choose the service you need"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => {
              const isSelected = formData.service === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, service: service.id })}
                  className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all duration-300 ${isSelected
                    ? 'border-navy bg-navy/[0.02] shadow-[0_0_0_1px_#06182E]'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  style={{ borderRadius: '1.25rem' }}
                >
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight">{service.title}</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 mt-1 line-clamp-1">{service.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-[#06182E] rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    const renderLocationFields = () => (
      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            {dict.fields.citizenship} *
          </label>
          <motion.select
            required
            variants={shakeAnimation}
            animate={errors.citizenship && shake ? "shake" : "static"}
            value={formData.citizenship}
            onChange={(e) => {
              handleFieldChange("citizenship", e.target.value);
              setFormData(prev => ({ ...prev, citizenship: e.target.value, region: '', city: '' }));
            }}
            className={getInputClass("citizenship")}
          >
            <option value="">{dict.options.select}</option>
            {COUNTRIES.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </motion.select>
        </div>
        {formData.citizenship === 'Turkmenistan' ? (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              {dict.fields.region} *
            </label>
            <select
              required
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
            >
              <option value="">{dict.options.selectRegion}</option>
              {TURKMEN_REGIONS.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        ) : formData.citizenship ? (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              {dict.fields.city} *
            </label>
            <motion.input
              type="text"
              required
              variants={shakeAnimation}
              animate={errors.city && shake ? "shake" : "static"}
              value={formData.city}
              onChange={(e) => handleFieldChange("city", e.target.value)}
              className={getInputClass("city")}
              placeholder={dict.placeholders.city}
            />
          </div>
        ) : null}
      </div>
    );
    if (currentStep === 3) {
      if (formData.service === 'university') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.stepTitles?.serviceDetails || "Education Details"}</h3>
              <p className="text-sm md:text-base text-gray-600">{dict.stepDescriptions?.serviceDetails || "Tell us about your educational background"}</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.educationLevel} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.educationLevel && shake ? "shake" : "static"} value={formData.educationLevel} onChange={(e) => handleFieldChange("educationLevel", e.target.value)}
                    className={getInputClass("educationLevel")}>
                    <option value="">{dict.options.selectLevel}</option>
                    <option value="language">{dict.options.languageCourses}</option>
                    <option value="college">{dict.options.college || 'Колледж'}</option>
                    <option value="preparatory">{dict.options.preparatory}</option>
                    <option value="bachelor">{dict.options.bachelor}</option>
                    <option value="master">{dict.options.master}</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.relationship && shake ? "shake" : "static"} value={formData.relationship} onChange={(e) => handleFieldChange("relationship", e.target.value)}
                    className={getInputClass("relationship")}>
                    <option value="">{dict.options.selectRelationship}</option>
                    <option value="self">{dict.options.self}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                    <option value="friend">{dict.options.friend}</option>
                  </motion.select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetCountry} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.targetCountry && shake ? "shake" : "static"} value={formData.targetCountry} onChange={(e) => handleFieldChange("targetCountry", e.target.value)}
                    className={getInputClass("targetCountry")}>
                    <option value="">{dict.options.selectCountry}</option>
                    {TARGET_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.fieldOfStudy} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.fieldOfStudy && shake ? "shake" : "static"} value={formData.fieldOfStudy} onChange={(e) => handleFieldChange("fieldOfStudy", e.target.value)}
                    className={getInputClass("fieldOfStudy")} placeholder={dict.placeholders.fieldOfStudy} />
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (formData.service === 'school') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.school.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide details about the student and parent.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.studentName} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.studentName && shake ? "shake" : "static"} value={formData.studentName} onChange={(e) => handleFieldChange("studentName", e.target.value)}
                    className={getInputClass("studentName")} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.parentName} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.parentName && shake ? "shake" : "static"} value={formData.parentName} onChange={(e) => handleFieldChange("parentName", e.target.value)}
                    className={getInputClass("parentName")} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.relationship && shake ? "shake" : "static"} value={formData.relationship} onChange={(e) => handleFieldChange("relationship", e.target.value)}
                    className={getInputClass("relationship")}>
                    <option value="">{dict.options.select}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.hasPassport} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.hasPassport && shake ? "shake" : "static"} value={formData.hasPassport} onChange={(e) => handleFieldChange("hasPassport", e.target.value)}
                    className={getInputClass("hasPassport")}>
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yes}</option>
                    <option value="no">{dict.options.no}</option>
                  </motion.select>
                </div>
              </div>
              {formData.hasPassport === 'yes' && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.passportExpiry} *</label>
                  <motion.input type="date" required variants={shakeAnimation} animate={errors.passportExpiry && shake ? "shake" : "static"} value={formData.passportExpiry} onChange={(e) => handleFieldChange("passportExpiry", e.target.value)}
                    className={getInputClass("passportExpiry") + " max-w-full min-w-0 max-w-[calc(100vw-3rem)]"} />
                </div>
              )}
            </div>
          </div>
        );
      }
      if (formData.service === 'ticket') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.ticket.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide flight information.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.fromCity} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.fromCity && shake ? "shake" : "static"} value={formData.fromCity} onChange={(e) => handleFieldChange("fromCity", e.target.value)}
                    className={getInputClass("fromCity")} placeholder={dict.placeholders.fromCity} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.toCity} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.toCity && shake ? "shake" : "static"} value={formData.toCity} onChange={(e) => handleFieldChange("toCity", e.target.value)}
                    className={getInputClass("toCity")} placeholder={dict.placeholders.toCity} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.travelDate} *</label>
                  <motion.input type="date" required variants={shakeAnimation} animate={errors.travelDate && shake ? "shake" : "static"} value={formData.travelDate} onChange={(e) => handleFieldChange("travelDate", e.target.value)}
                    className={getInputClass("travelDate") + " max-w-full min-w-0 max-w-[calc(100vw-3rem)]"} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.needsBaggage} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.needsBaggage && shake ? "shake" : "static"} value={formData.needsBaggage} onChange={(e) => handleFieldChange("needsBaggage", e.target.value)}
                    className={getInputClass("needsBaggage")}>
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yesBaggage}</option>
                    <option value="no">{dict.options.noBaggage}</option>
                  </motion.select>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (formData.service === 'transfer') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.transfer.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide current education details.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentEducationLevel} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.currentEducationLevel && shake ? "shake" : "static"} value={formData.currentEducationLevel} onChange={(e) => handleFieldChange("currentEducationLevel", e.target.value)}
                    className={getInputClass("currentEducationLevel")}>
                    <option value="">{dict.options.select}</option>
                    <option value="preparatory">{dict.options.preparatory}</option>
                    <option value="bachelor">{dict.options.bachelor}</option>
                    <option value="master">{dict.options.master}</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.paymentType} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.paymentType && shake ? "shake" : "static"} value={formData.paymentType} onChange={(e) => handleFieldChange("paymentType", e.target.value)}
                    className={getInputClass("paymentType")}>
                    <option value="">{dict.options.select}</option>
                    <option value="paid">{dict.options.paid}</option>
                    <option value="grant">{dict.options.grant}</option>
                  </motion.select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentUniversity} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.currentUniversity && shake ? "shake" : "static"} value={formData.currentUniversity} onChange={(e) => handleFieldChange("currentUniversity", e.target.value)}
                    className={getInputClass("currentUniversity")} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentCountry} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.currentCountry && shake ? "shake" : "static"} value={formData.currentCountry} onChange={(e) => handleFieldChange("currentCountry", e.target.value)}
                    className={getInputClass("currentCountry")} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentField} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.currentField && shake ? "shake" : "static"} value={formData.currentField} onChange={(e) => handleFieldChange("currentField", e.target.value)}
                    className={getInputClass("currentField")} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.transferType} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.transferType && shake ? "shake" : "static"} value={formData.transferType} onChange={(e) => handleFieldChange("transferType", e.target.value)}
                    className={getInputClass("transferType")}>
                    <option value="">{dict.options.select}</option>
                    <option value="same">{dict.options.sameCountry}</option>
                    <option value="different">{dict.options.differentCountry}</option>
                  </motion.select>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (formData.service === 'umrah') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.umrah.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide pilgrimage details.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.travelMonth} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.travelMonth && shake ? "shake" : "static"} value={formData.travelMonth} onChange={(e) => handleFieldChange("travelMonth", e.target.value)}
                    className={getInputClass("travelMonth")}>
                    <option value="">{dict.options.selectMonth}</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => <option key={m} value={m}>{m}</option>)}
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.relationship && shake ? "shake" : "static"} value={formData.relationship} onChange={(e) => handleFieldChange("relationship", e.target.value)}
                    className={getInputClass("relationship")}>
                    <option value="">{dict.options.selectRelationship}</option>
                    <option value="self">{dict.options.self}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                  </motion.select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.hasPassport} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.hasPassport && shake ? "shake" : "static"} value={formData.hasPassport} onChange={(e) => handleFieldChange("hasPassport", e.target.value)}
                    className={getInputClass("hasPassport")}>
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yes}</option>
                    <option value="no">{dict.options.no}</option>
                  </motion.select>
                </div>
                {formData.hasPassport === 'yes' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.passportExpiry} *</label>
                    <motion.input type="date" required variants={shakeAnimation} animate={errors.passportExpiry && shake ? "shake" : "static"} value={formData.passportExpiry} onChange={(e) => handleFieldChange("passportExpiry", e.target.value)}
                      className={getInputClass("passportExpiry") + " max-w-full min-w-0 max-w-[calc(100vw-3rem)]"} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      if (formData.service === 'workVisa') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.workVisa.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide work visa details.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetCountry} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.targetCountry && shake ? "shake" : "static"} value={formData.targetCountry} onChange={(e) => handleFieldChange("targetCountry", e.target.value)}
                    className={getInputClass("targetCountry")}>
                    <option value="">{dict.options.select}</option>
                    <option value="Russia">Russia</option>
                    <option value="Belarus">Belarus</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.relationship && shake ? "shake" : "static"} value={formData.relationship} onChange={(e) => handleFieldChange("relationship", e.target.value)}
                    className={getInputClass("relationship")}>
                    <option value="">{dict.options.selectRelationship}</option>
                    <option value="self">{dict.options.self}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                  </motion.select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.workPreferences} *</label>
                <motion.textarea required variants={shakeAnimation} animate={errors.workPreferences && shake ? "shake" : "static"} value={formData.workPreferences} onChange={(e) => handleFieldChange("workPreferences", e.target.value)}
                  className={getInputClass("workPreferences")} rows={2} placeholder={dict.placeholders.workPreferences} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.previousTravel} *</label>
                <motion.textarea required variants={shakeAnimation} animate={errors.previousTravel && shake ? "shake" : "static"} value={formData.previousTravel} onChange={(e) => handleFieldChange("previousTravel", e.target.value)}
                  className={getInputClass("previousTravel")} rows={2} placeholder={dict.placeholders.previousTravel} />
              </div>
            </div>
          </div>
        );
      }
      if (formData.service === 'rvp') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.rvp?.title || 'РВП / РВПО / ВНЖ'}</h3>
              <p className="text-sm md:text-base text-gray-600">{dict.services.rvp?.desc || 'Помощь в оформлении разрешений на проживание в России'}</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.rvpType || 'Подаёте на'} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.rvpType && shake ? "shake" : "static"} value={formData.rvpType} onChange={(e) => handleFieldChange("rvpType", e.target.value)}
                    className={getInputClass("rvpType")}>
                    <option value="">{dict.options.select}</option>
                    <option value="РВП">РВП</option>
                    <option value="РВПО">РВПО</option>
                    <option value="ВНЖ">ВНЖ</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.hasViolations || 'Административное нарушение'} *</label>
                  <motion.select required variants={shakeAnimation} animate={errors.hasViolations && shake ? "shake" : "static"} value={formData.hasViolations} onChange={(e) => handleFieldChange("hasViolations", e.target.value)}
                    className={getInputClass("hasViolations")}>
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yes}</option>
                    <option value="no">{dict.options.no}</option>
                  </motion.select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.legalBasis || 'Основание для подачи'} *</label>
                <motion.input type="text" required variants={shakeAnimation} animate={errors.legalBasis && shake ? "shake" : "static"} value={formData.legalBasis} onChange={(e) => handleFieldChange("legalBasis", e.target.value)}
                  className={getInputClass("legalBasis")} placeholder={dict.placeholders.legalBasis || 'Укажите основание'} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.applicationCity || 'Город подачи документов'} *</label>
                <motion.input type="text" required variants={shakeAnimation} animate={errors.applicationCity && shake ? "shake" : "static"} value={formData.applicationCity} onChange={(e) => handleFieldChange("applicationCity", e.target.value)}
                  className={getInputClass("applicationCity")} placeholder={dict.placeholders.applicationCity || 'Например: Казань'} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.rvpService || 'Какой услугой хотите воспользоваться'} *</label>
                <motion.select required variants={shakeAnimation} animate={errors.rvpService && shake ? "shake" : "static"} value={formData.rvpService} onChange={(e) => handleFieldChange("rvpService", e.target.value)}
                  className={getInputClass("rvpService")}>
                  <option value="">{dict.options.select}</option>
                  <option value="consultation">{dict.options.rvpConsultation || 'Консультация'}</option>
                  <option value="documents">{dict.options.rvpDocuments || 'Помощь в подготовке документов'}</option>
                  <option value="queue">{dict.options.rvpQueue || 'Получение талона для подачи документов'}</option>
                </motion.select>
                {formData.rvpService === 'queue' && (
                  <p className="mt-2 text-xs text-amber-600 font-medium">
                    ⚠️ Получение талона для подачи документов в Москве недоступно
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      }
    }
    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
              {formData.service === 'transfer' ? "Final Details" : (dict.stepTitles?.additionalInfo || "Location Details")}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {formData.service === 'transfer' ? "Provide target university and your location." : (dict.stepDescriptions?.additionalInfo || "Where are you from?")}
            </p>
          </div>
          <div className="space-y-4">
            {formData.service === 'transfer' && (
              <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetUniversity} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.targetUniversity && shake ? "shake" : "static"} value={formData.targetUniversity} onChange={(e) => handleFieldChange("targetUniversity", e.target.value)}
                    className={getInputClass("targetUniversity")} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetField} *</label>
                  <motion.input type="text" required variants={shakeAnimation} animate={errors.targetField && shake ? "shake" : "static"} value={formData.targetField} onChange={(e) => handleFieldChange("targetField", e.target.value)}
                    className={getInputClass("targetField")} />
                </div>
              </div>
            )}
            {renderLocationFields()}
          </div>
        </div>
      );
    }
    return null;
  };
  const canProceed = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.phone && formData.email && formData.dateOfBirth;
    }
    if (currentStep === 2) {
      return formData.service !== '';
    }
    if (currentStep === 3) {
      if (formData.service === 'university') {
        return formData.educationLevel && formData.relationship && formData.targetCountry && formData.fieldOfStudy;
      }
      if (formData.service === 'school') {
        return formData.studentName && formData.parentName && formData.relationship && formData.hasPassport && (formData.hasPassport === 'no' || formData.passportExpiry);
      }
      if (formData.service === 'ticket') {
        return formData.fromCity && formData.toCity && formData.travelDate && formData.needsBaggage;
      }
      if (formData.service === 'transfer') {
        return formData.currentEducationLevel && formData.paymentType && formData.currentUniversity && formData.currentCountry && formData.currentField && formData.transferType;
      }
      if (formData.service === 'umrah') {
        return formData.travelMonth && formData.relationship && formData.hasPassport && (formData.hasPassport === 'no' || formData.passportExpiry);
      }
      if (formData.service === 'workVisa') {
        return formData.targetCountry && formData.relationship && formData.workPreferences && formData.previousTravel;
      }
      if (formData.service === 'rvp') {
        return formData.rvpType && formData.legalBasis && formData.applicationCity && formData.hasViolations && formData.rvpService;
      }
    }
    if (currentStep === 4) {
      const locationValid = formData.citizenship && (formData.citizenship === 'Turkmenistan' ? formData.region : formData.city);
      if (formData.service === 'transfer') {
        return locationValid && formData.targetUniversity && formData.targetField;
      }
      return locationValid;
    }
    return true;
  };
  return (
    <section className="relative pt-26 pb-8 md:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-14 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col lg:flex-row w-full md:gap-8 justify-center items-start">
          {}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-7">
              {steps.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isPending = step.id > currentStep;
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                return (
                  <motion.div
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {}
                    {!isLast && (
                      <div
                        className={`absolute left-[36px] -translate-x-1/2 top-[52px] w-[2px] h-[calc(100%-44px)] transition-colors duration-500 z-0 ${isCompleted ? 'bg-navy' : 'bg-gray-200'
                          }`}
                      >
                        {isCompleted && (
                          <motion.div
                            className="absolute top-0 left-0 w-full bg-navy"
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </div>
                    )}
                    <motion.div
                      className={`flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 ${isCurrent ? 'bg-white shadow-xl ring-1 ring-gray-100 scale-[1.02]' : ''
                        }`}
                      whileHover={{ scale: isCurrent ? 1.02 : 1.01 }}
                    >
                      <div className="relative z-10 flex-shrink-0">
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-navy rounded-full flex items-center justify-center shadow-lg shadow-blue-100"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : isCurrent ? (
                          <motion.div
                            animate={{
                              boxShadow: ["0px 0px 0px 0px rgba(0, 0, 128, 0.2)", "0px 0px 0px 10px rgba(0, 0, 128, 0)"]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-8 h-8 bg-white border-2 border-navy rounded-full flex items-center justify-center shadow-lg shadow-blue-50"
                          >
                            <Icon className="w-4 h-4 text-navy" />
                          </motion.div>
                        ) : (
                          <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className={`text-[11px] font-bold tracking-wider uppercase transition-colors duration-300 ${isCompleted ? 'text-navy' : isCurrent ? 'text-navy' : 'text-gray-400'
                          }`}>
                          Step {step.id}
                        </div>
                        <div className={`text-[15px] font-bold mt-0.5 break-words transition-colors duration-300 ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                          }`}>
                          {step.title}
                        </div>
                        <div className={`text-[11px] mt-1 font-bold transition-colors duration-300 ${isCompleted ? 'text-blue-600' : isCurrent ? 'text-blue-600' : 'text-gray-300'
                          }`}>
                          {isCompleted ? 'Complete' : isCurrent ? 'In progress' : 'Pending'}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {}
          <div className="lg:hidden w-full max-w-3xl mx-auto px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 font-bold transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {dict.navigation?.back || dict.backButton || "Back"}
              </button>
              <div className="bg-gray-100 px-3 py-1 rounded-md text-sm font-bold text-gray-600">
                {dict.steps || "Steps"} {currentStep}/{totalSteps}
              </div>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-navy"
                />
              </div>
            </div>
          </div>
          {}
          <div className="flex-1 max-w-3xl w-full">
            <div className="bg-white lg:rounded-2xl lg:shadow-xl p-4 md:p-8">
              {}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="hidden lg:flex items-center gap-2 text-navy hover:text-blue-900 font-bold mb-6 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {dict.navigation?.back || dict.backButton || "Back"}
                </button>
              )}
              {}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
                {}
                <div className="mt-8 flex gap-4">
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-4 bg-crimson/80 text-white font-black uppercase tracking-widest rounded-full hover:bg-crimson transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {dict.navigation?.next || "Next"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-navy text-white font-black uppercase tracking-widest rounded-full hover:bg-crimson transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? 'Submitting...' : (dict.navigation?.submit || dict.buttons.submit)}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
