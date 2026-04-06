import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, type OnboardingFormValues } from './schema/OnboardingSchema';

export const useOnboardingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      displayName: '',
      slug: '',
      adminEmail: '',
      status: 'Pending',
    },
  });

  // Watch the 'displayName' field
  const displayName = watch("displayName");

  // Auto-generate slug whenever displayName changes
  useEffect(() => {
    if (displayName) {
      const generatedSlug = displayName
        .toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '');    // Remove special characters
      
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [displayName, setValue]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    reset
  };
};