'use client';

import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof ContactSchema>;

const INITIAL: ContactFormData = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      const fe: Partial<Record<keyof ContactFormData, string>> = {};
      for (const i of result.error.issues) { const f = i.path[0] as keyof ContactFormData; if (!fe[f]) fe[f] = i.message; }
      setErrors(fe);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.data) });
      if (!res.ok) throw new Error('Failed');
      setIsComplete(true);
    } catch { setErrors({ name: 'Something went wrong. Please try again.' }); }
    finally { setIsSubmitting(false); }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-success" />
        <h3 className="font-display text-xl font-bold uppercase text-white">Message Sent</h3>
        <p className="mt-2 text-sm text-text-secondary">We will get back to you within 1 business day.</p>
      </div>
    );
  }

  const ic = (f: keyof ContactFormData) => cn('w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1', errors[f] ? 'border-error focus:border-error focus:ring-error' : 'border-border focus:border-accent focus:ring-accent');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-xs font-medium text-text-secondary">Name *</label>
          <input id="c-name" placeholder="John Doe" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={ic('name')} />
          {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-xs font-medium text-text-secondary">Email *</label>
          <input id="c-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className={ic('email')} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="mb-1 block text-xs font-medium text-text-secondary">Phone</label>
          <input id="c-phone" type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} className={ic('phone')} />
        </div>
        <div>
          <label htmlFor="c-subject" className="mb-1 block text-xs font-medium text-text-secondary">Subject *</label>
          <input id="c-subject" placeholder="Parts inquiry, build question, etc." value={form.subject} onChange={(e) => handleChange('subject', e.target.value)} className={ic('subject')} />
          {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-msg" className="mb-1 block text-xs font-medium text-text-secondary">Message *</label>
        <textarea id="c-msg" rows={5} placeholder="How can we help?" value={form.message} onChange={(e) => handleChange('message', e.target.value)} className={ic('message')} />
        {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
      </div>
      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>Send Message</Button>
    </form>
  );
}
