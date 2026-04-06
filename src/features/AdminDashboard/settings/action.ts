import { zodResolver } from "@hookform/resolvers/zod";
import { adminSettingsSchema, type AdminSettingFormValues } from "./schema/settingsSchema";
import { useForm } from "react-hook-form";

export const useAdminSettingsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    ...rest
  } = useForm<AdminSettingFormValues>({
    resolver: zodResolver(adminSettingsSchema),
    mode: "onChange",
    defaultValues: {
      // General Settings
      platformName: "Impact Intel",
      supportEmail: "support@impactintel.com",
      defaultTimeZone: "Africa/Lagos (WAT)",
      defaultLanguage: "English",
      time: "DD/MM/YYYY",

      // Organization Rules
      requireOrgVerification: true,
      publicOrgProfiles: false,
      projectVisibility: true,
      maxOrgUsers: "10", // string but later converted to number

      // Approval Rules
      manualApproval: false,
      profileUpdates: true,
      publicVisibilityChanges: false,

      // Security and Access
      sessionTimeout: "3600",
      onResetLogout: true,

      // Email Notifications
      newApprovals: true,
      flaggedActivity: true,
      suspensionAlert: true,
    },
  });

  const onSubmit = (data: AdminSettingFormValues) => {
    const formattedData = {
      ...data,
      maxOrgUsers: Number(data.maxOrgUsers),
      sessionTimeout: Number(data.sessionTimeout),
    };
    console.log("Data for backend:", formattedData);
  };

  return {
    register,
    errors,         // Now explicitly returned
    isSubmitting,   // Now explicitly returned
    reset,
    onSubmit: handleSubmit(onSubmit),
    ...rest         // Keeps access to watch, setValue, etc. if needed
  };
};