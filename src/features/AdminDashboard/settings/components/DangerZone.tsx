import Container from "@/shared/components/Container";

interface DangerProps {
  onReset: () => void;
}

const DangerZone = ({ onReset }: DangerProps) => (
  <Container 
    title="Danger Zone" 
    className="border-2 border-brand-primary"
    id="danger_zone"
  >
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div className="max-w-[70%]">
          <p className="font-semibold text-text-primary01">Suspend platform access</p>
          <p className="text-sm text-text-body">Temporarily disable all user access to the platform (emergency only)</p>
        </div>
        <button type="button" disabled className="bg-gray-100 text-gray-400 px-6 py-2 rounded-xl font-bold cursor-not-allowed">
          Disabled
        </button>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="max-w-[70%]">
          <p className="font-semibold text-text-primary01">Reset platform configuration</p>
          <p className="text-sm text-text-body">Reset all settings to default values. This action cannot be undone.</p>
        </div>
        <button 
          type="button" 
          onClick={onReset}
          className="border-2 border-brand-primary text-text-primary01 px-6 py-2 rounded-xl font-bold hover:bg-brand-primary/5 transition-colors"
        >
          Reset Configuration
        </button>
      </div>
    </div>
  </Container>
);

export default DangerZone;