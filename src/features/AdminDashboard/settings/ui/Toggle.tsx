export const Toggle = ({ register, name }: { register: any; name: string }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0">
    <input type="checkbox" {...register(name)} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-brand-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
  </label>
);