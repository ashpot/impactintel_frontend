import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { organizationSchema, type OrganizationFormValues } from './schemas/profileSchema';
import { accountSettingsSchema, type AccountSettingsFormValues } from './schemas/accountSchema';

export const useOrganizationForm = (defaultData?: Partial<OrganizationFormValues>) => {
  return useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    mode: "onChange",
    defaultValues: {
      name: 'Shell Nigeria',
      email: 'contact@organization.org',
      phone: '+234 XXX XXX XXXX',
      website: 'https://www.yourwebsite.com',
      mission: '',
      ...defaultData
    },
  });
};

export const useSettingsForm = () => {
  return useForm<AccountSettingsFormValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      emailNewProjects: true,
      weeklyCSR: true,
      impactAlerts: true,
      budgetWarnings: false,
      documentNotifications: true,
      timeZone: 'Lagos, Nigeria (GMT +01:00)',
      currency: 'Nigerian Naira (₦ NGN)',
    },
  });
};