import type { OrganizationFormValues } from '../schemas/profileSchema';
import { useOrganizationForm } from '../actions';
import { UploadsIcon } from '@/shared';
import Button from '@/shared/ui/Button';

const ProfileSettings = () => {
  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    formState: { errors, isSubmitting, isValid } 
  } = useOrganizationForm();

  // Watch mission length for the counter
  const missionText = watch("mission");

  const onSubmit = async (data: OrganizationFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="mx-auto bg-white p-8 rounded-xl card-shadow font-jakarta border border-line">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Organization Logo */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-text-title mb-3">Organization Logo</p>
          <div className="w-32 h-32 border-2 border-dashed border-border-secondary rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-bg-soft transition-colors group">
            <UploadsIcon className="text-text-body w-6 h-6 group-hover:text-brand-primary mb-2" />
            <span className="text-[10px] text-text-body text-center px-2 font-medium">Click to upload</span>
          </div>
          <p className="text-xs text-placeholder">Recommended: 400x400px, PNG or JPG</p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-8">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-title">Organization Name</label>
            <input
              {...register("name")}
              placeholder='Shell Nigeria'
              className={`px-4 py-3 rounded-lg border focus:outline-none transition-all ${
                errors.name ? 'border-error' : 'border-border-secondary focus:border-brand-primary'
              }`}
            />
            {errors.name && <p className="text-xs text-error font-medium">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-title">Email Address</label>
            <input
              type="email"
              {...register("email")}
              placeholder='contact@organization.org'
              className={`px-4 py-3 rounded-lg border focus:outline-none transition-all ${
                errors.email ? 'border-error' : 'border-border-secondary focus:border-brand-primary'
              }`}
            />
            {errors.email && <p className="text-xs text-error font-medium">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-title">Phone Number</label>
            <input
              {...register("phone")}
              placeholder='+234 XXX XXX XXXX'
              className="px-4 py-3 rounded-lg border border-border-secondary focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-title">Website</label>
            <input
              {...register("website")}
              placeholder='https://www.yourwebsite.com'
              className="px-4 py-3 rounded-lg border border-border-secondary focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-title">Mission Statement</label>
            <textarea
              {...register("mission")}
              rows={6}
              placeholder="Describe your organization's mission and commitments..."
              className="px-4 py-3 rounded-lg border border-border-secondary focus:outline-none focus:border-brand-primary resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-error font-medium">{errors.mission?.message}</p>
              <span className="text-xs text-text-body">
                {missionText?.length || 0}/1000
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-line">
          <Button
            variant='outline'
            type='button'
            onClick={()=> reset()}
            className='text-base px-8 py-2.5 rounded-lg border border-border-secondary text-text-title font-medium hover:bg-bg-soft'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='text-base px-8 py-2.5 rounded-lg text-white font-medium hover:opacity-85 disabled:opacity-50 shadow-sm'
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;