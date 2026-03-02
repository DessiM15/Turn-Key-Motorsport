'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Eye, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { useCart } from '@/lib/cart-context';
import { cn, formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

const CheckoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

const INITIAL_FORM: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
};

export default function CheckoutForm() {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const shippingEstimate = cartTotal >= 299 ? 0 : 14.99;
  const taxEstimate = cartTotal * 0.08;
  const orderTotal = cartTotal + shippingEstimate + taxEstimate;

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = CheckoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CheckoutFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // TODO: Replace with real Shopify/Stripe checkout integration
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: result.data,
          items,
          total: orderTotal,
        }),
      });

      if (!response.ok) {
        throw new Error('Order submission failed');
      }

      clearCart();
      setIsComplete(true);
    } catch {
      setErrors({ email: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle className="mb-6 h-16 w-16 text-success" />
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
          Order Confirmed
        </h2>
        <p className="mt-4 max-w-md text-sm text-text-secondary">
          Thank you for your order! You will receive a confirmation email shortly.
          This is a demo — no real order was placed.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-lg bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          Your Cart is Empty
        </h2>
        <p className="mt-4 text-sm text-text-secondary">
          Add some products to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-6 rounded-lg bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const inputClass = (field: keyof CheckoutFormData) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent'
    );

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Shop
        </Link>

        {/* Contact Info */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-white">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium text-text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputClass('email')}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-error">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-xs font-medium text-text-secondary">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClass('phone')}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-xs text-error">{errors.phone}</p>
              )}
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-white">
            Shipping Address
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="mb-1 block text-xs font-medium text-text-secondary">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={inputClass('firstName')}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-xs text-error">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1 block text-xs font-medium text-text-secondary">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={inputClass('lastName')}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-xs text-error">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block text-xs font-medium text-text-secondary">
                Street Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="123 Main St"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={inputClass('address')}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="mt-1 text-xs text-error">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="mb-1 block text-xs font-medium text-text-secondary">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Anytown"
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={inputClass('city')}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                />
                {errors.city && (
                  <p id="city-error" className="mt-1 text-xs text-error">{errors.city}</p>
                )}
              </div>
              <div>
                <label htmlFor="state" className="mb-1 block text-xs font-medium text-text-secondary">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="CA"
                  value={form.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className={inputClass('state')}
                  aria-describedby={errors.state ? 'state-error' : undefined}
                />
                {errors.state && (
                  <p id="state-error" className="mt-1 text-xs text-error">{errors.state}</p>
                )}
              </div>
              <div>
                <label htmlFor="zip" className="mb-1 block text-xs font-medium text-text-secondary">
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder="90210"
                  value={form.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                  className={inputClass('zip')}
                  aria-describedby={errors.zip ? 'zip-error' : undefined}
                />
                {errors.zip && (
                  <p id="zip-error" className="mt-1 text-xs text-error">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Payment (Placeholder) */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-white">
            Payment
          </h2>
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <Lock className="mx-auto mb-3 h-8 w-8 text-text-tertiary" />
            <p className="text-sm text-text-secondary">
              Payment processing will be integrated with Shopify / Stripe.
            </p>
            <p className="mt-1 text-xs text-text-tertiary">
              This is a demo — no real payment will be charged.
            </p>
          </div>
        </section>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          Place Order — {formatPrice(orderTotal)}
        </Button>
      </form>

      {/* Order Summary */}
      <aside className="lg:col-span-1">
        <div className="sticky top-28 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-white">
            Order Summary
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950">
                  <Eye className="h-4 w-4 text-white/20" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-text-tertiary">Qty: {item.quantity}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-white">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-white">
                {shippingEstimate === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  formatPrice(shippingEstimate)
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tax (est.)</span>
              <span className="text-white">{formatPrice(taxEstimate)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <span className="font-semibold text-white">Total</span>
              <span className="font-display text-lg font-bold text-white">
                {formatPrice(orderTotal)}
              </span>
            </div>
          </div>

          {cartTotal < 299 && (
            <p className="mt-4 text-center text-xs text-text-tertiary">
              Add {formatPrice(299 - cartTotal)} more for free shipping!
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
