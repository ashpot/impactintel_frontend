import { Plugs } from '@/shared';

const IntegrationSettings = () => {
  const integrations = [
    { name: 'Google Drive', icon: '/src/assets/logo/logo_google_drive.svg' },
    { name: 'Slack', icon: '/src/assets/logo/logo_slack.svg' },
    { name: 'Microsoft Teams', icon: '/src/assets/logo/logo_teams.svg' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl card-shadow p-12 flex flex-col items-center justify-center font-jakarta border border-border-secondary mt-8">
      
      {/* Top Icon */}
      <div className="w-16 h-16 bg-bg-soft rounded-full flex items-center justify-center mb-6">
        <Plugs className="text-text-body/40 w-10 h-10" />
      </div>

      {/* Text Content */}
      <h2 className="text-2xl font-bold text-text-title mb-2">Integrations Coming Soon</h2>
      <p className="text-text-body text-center max-w-md mb-10">
        Connect your CSR dashboard with external tools and APIs
      </p>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mb-12">
        {integrations.map((app) => (
          <div 
            key={app.name} 
            className="flex flex-col items-center justify-center p-8 border border-border-secondary rounded-2xl hover:bg-bg-main transition-colors duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <img src={app.icon} alt={app.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-semibold text-text-body">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Bottom Label */}
      <span className="text-xs font-medium text-text-body/60 uppercase tracking-widest">
        Available in future updates
      </span>
    </div>
  );
};

export default IntegrationSettings;