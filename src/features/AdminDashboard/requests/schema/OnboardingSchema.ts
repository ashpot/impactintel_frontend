import {z} from "zod"

export const onboardingSchema = z.object({
    displayName: z.string().min(3, 'Organization name is too short'),
    slug: z.string().toLowerCase().regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    adminEmail: z.string().email('invalid email address'),
    status: z.string().min(1, "Organization status is required"),
})
export type OnboardingFormValues = z.infer<typeof onboardingSchema>;