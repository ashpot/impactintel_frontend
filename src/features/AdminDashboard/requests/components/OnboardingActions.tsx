import Button from '@/shared/ui/Button';
import { useOnboardingForm } from '../actions';
import Container from '@/shared/components/Container';

const OnboardingActions = () => {
  const { 
    register, 
    handleSubmit, 
    errors, 
    isSubmitting, 
    isValid, 
    reset 
  } = useOnboardingForm();

  // only runs if validation passes
  const onSubmit = async (data: any) => {
    console.log("Onboarding Data Ready:", data);
    // await createOrganization(data);
  };

  return (
    <Container
        title='Onboarding Actions'
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Organization Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Organization Display Name</label>
          <input
            {...register("displayName")}
            placeholder="e.g. First Bank Nigeria"
            className={`px-4 py-3 rounded-lg border transition-all outline-none ${
              errors.displayName ? 'border-error bg-error/5' : 'border-border-secondary focus:border-brand-primary'
            }`}
          />
          {errors.displayName && (
            <span className="text-xs text-error font-medium">{errors.displayName.message}</span>
          )}
        </div>

        {/* auto generated slug */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">
            Organization Slug <span className="text-placeholder font-normal">(auto-generated)</span>
          </label>
          <input
            {...register("slug")}
            readOnly
            className="px-4 py-3 rounded-lg border border-border-secondary bg-nav-active text-placeholder cursor-not-allowed outline-none"
          />
          {errors.slug && (
            <span className="text-xs text-error font-medium">{errors.slug.message}</span>
          )}
        </div>

        {/* Client Admin Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Client Admin Email</label>
          <input
            type="email"
            {...register("adminEmail")}
            placeholder="admin@organization.com"
            className={`px-4 py-3 rounded-lg border transition-all outline-none ${
              errors.adminEmail ? 'border-error bg-error/5' : 'border-border-secondary focus:border-brand-primary'
            }`}
          />
          {errors.adminEmail && (
            <span className="text-xs text-error font-medium">{errors.adminEmail.message}</span>
          )}
        </div>

        {/* Initial Status */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Initial Organization Status</label>
          <select
            {...register("status")}
            className="px-4 py-3 rounded-lg border border-border-secondary focus:border-brand-primary outline-none bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full text-text-primary01 font-bold text-base shadow-md"
          >
            {isSubmitting ? 'Processing...' : 'Create Organization'}
          </Button>
          
          <Button
            type="button"
            variant='outline'
            onClick={() => reset()}
            className="w-full border border-line text-text-title font-semibold hover:bg-bg-soft"
          >
            Decline Request
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default OnboardingActions;