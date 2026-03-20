import { z } from 'zod';

export const organizationSchema = z.object({
  name: z.string().min(2, "Organization name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  website: z.string().url("Invalid website URL").or(z.literal("")),
  mission: z.string().max(1000, "Mission statement must be under 1000 characters"),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;