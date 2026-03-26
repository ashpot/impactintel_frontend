import { z } from 'zod';

export const accountSettingsSchema = z.object({
  // Password Section
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string(),
  
  // Notification Section (Booleans for switches)
  emailNewProjects: z.boolean(),
  weeklyCSR: z.boolean(),
  impactAlerts: z.boolean(),
  budgetWarnings: z.boolean(),
  documentNotifications: z.boolean(),

  // Regional Section
  timeZone: z.string().min(1, "Please select a time zone"),
  currency: z.string().min(1, "Please select a currency"),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // This puts the error on the confirm field
});

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;