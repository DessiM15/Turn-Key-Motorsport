'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProgressBar from './ProgressBar';
import ServiceStep from './steps/ServiceStep';
import VehicleStep from './steps/VehicleStep';
import DateTimeStep from './steps/DateTimeStep';
import ContactStep from './steps/ContactStep';
import ReviewStep from './steps/ReviewStep';
import ConfirmationStep from './steps/ConfirmationStep';

const STEP_LABELS = ['Services', 'Vehicle', 'Date & Time', 'Contact', 'Review'] as const;

// --- Per-step validation schemas ---

const serviceSchema = z.object({
  servicesRequested: z.array(z.string()).min(1, 'Select at least one service'),
  projectDescription: z.string(),
});

const vehicleSchema = z.object({
  vehicleYear: z.string().min(4, 'Year is required'),
  vehicleMake: z.string().min(1, 'Make is required'),
  vehicleModel: z.string().min(1, 'Model is required'),
});

const dateTimeSchema = z.object({
  appointmentDate: z.string().min(1, 'Please select a date'),
  appointmentTime: z.string().min(1, 'Please select a time slot'),
});

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  preferredContact: z.enum(['call', 'email', 'text']),
});

interface FormState {
  servicesRequested: string[];
  projectDescription: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  appointmentDate: string;
  appointmentTime: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: 'call' | 'email' | 'text';
}

const INITIAL_STATE: FormState = {
  servicesRequested: [],
  projectDescription: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  appointmentDate: '',
  appointmentTime: '',
  name: '',
  email: '',
  phone: '',
  preferredContact: 'email',
};

function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'TKM-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function ScheduleWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const clearErrors = useCallback(() => setErrors({}), []);

  const updateField = useCallback(<K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const toggleService = useCallback((service: string) => {
    setForm((prev) => {
      const current = prev.servicesRequested;
      const updated = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...prev, servicesRequested: updated };
    });
    setErrors((prev) => {
      if (prev.servicesRequested) {
        const next = { ...prev };
        delete next.servicesRequested;
        return next;
      }
      return prev;
    });
  }, []);

  const validateStep = (): boolean => {
    const schemas = [serviceSchema, vehicleSchema, dateTimeSchema, contactSchema];
    if (step >= schemas.length) return true;

    const schema = schemas[step];
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }
    clearErrors();
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  };

  const handleBack = () => {
    clearErrors();
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleEditStep = (targetStep: number) => {
    clearErrors();
    setStep(targetStep);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const ref = generateRef();

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          referenceNumber: ref,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setReferenceNumber(ref);
      setIsComplete(true);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again or call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleAnother = () => {
    setForm(INITIAL_STATE);
    setStep(0);
    setIsComplete(false);
    setReferenceNumber('');
    clearErrors();
  };

  if (isComplete) {
    return (
      <ConfirmationStep
        referenceNumber={referenceNumber}
        appointmentDate={form.appointmentDate}
        appointmentTime={form.appointmentTime}
        name={form.name}
        onScheduleAnother={handleScheduleAnother}
      />
    );
  }

  return (
    <div className="space-y-8">
      <ProgressBar currentStep={step} steps={STEP_LABELS} />

      <div className="min-h-[400px]">
        {step === 0 && (
          <ServiceStep
            servicesRequested={form.servicesRequested}
            projectDescription={form.projectDescription}
            onToggleService={toggleService}
            onDescriptionChange={(v) => updateField('projectDescription', v)}
            errors={errors}
          />
        )}
        {step === 1 && (
          <VehicleStep
            vehicleYear={form.vehicleYear}
            vehicleMake={form.vehicleMake}
            vehicleModel={form.vehicleModel}
            onFieldChange={(field, value) => updateField(field, value)}
            errors={errors}
          />
        )}
        {step === 2 && (
          <DateTimeStep
            appointmentDate={form.appointmentDate}
            appointmentTime={form.appointmentTime}
            onDateSelect={(d) => updateField('appointmentDate', d)}
            onTimeSelect={(t) => updateField('appointmentTime', t)}
            errors={errors}
          />
        )}
        {step === 3 && (
          <ContactStep
            name={form.name}
            email={form.email}
            phone={form.phone}
            preferredContact={form.preferredContact}
            onFieldChange={(field, value) => updateField(field, value as FormState[typeof field])}
            errors={errors}
          />
        )}
        {step === 4 && (
          <ReviewStep data={form} onEditStep={handleEditStep} />
        )}
      </div>

      {errors.submit && (
        <p className="text-center text-sm text-error" role="alert">{errors.submit}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        {step > 0 ? (
          <Button variant="ghost" size="md" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < STEP_LABELS.length - 1 ? (
          <Button variant="primary" size="md" onClick={handleNext}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Confirm Appointment'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
