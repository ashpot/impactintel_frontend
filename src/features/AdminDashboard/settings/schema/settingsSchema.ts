import { z } from "zod"

export const adminSettingsSchema = z.object({
    // General settings
    platformName: z.string()
        .min(2, 'Platform name is too short (min 2 chars)')
        .max(50, "Platform name is too long (max 50 chars)"),
    supportEmail: z.string().email("Please enter a valid email address."), 
    
    defaultTimeZone: z.string().min(1, 'Please select a timezone'),
    defaultLanguage: z.string().min(1, 'Please select a language'),
    time: z.string().min(1, 'Please select a date format'),

    // Organization rules
    requireOrgVerification: z.boolean(),
    publicOrgProfiles: z.boolean(),
    projectVisibility: z.boolean(),
    maxOrgUsers: z.string().min(1, "Must allow at least 1 user").regex(/^\d+$/, "Only numbers are allowed"),

    // Approval rules
    manualApproval: z.boolean(),
    profileUpdates: z.boolean(),
    publicVisibilityChanges: z.boolean(),

    // Security and access
    sessionTimeout: z.string().min(1, "Timeout is required").regex(/^\d+$/, "Only numbers are allowed"),
    onResetLogout: z.boolean(),

    // Email notifications
    newApprovals: z.boolean(),
    flaggedActivity: z.boolean(),
    suspensionAlert: z.boolean()
})

export type AdminSettingFormValues = z.infer<typeof adminSettingsSchema>;