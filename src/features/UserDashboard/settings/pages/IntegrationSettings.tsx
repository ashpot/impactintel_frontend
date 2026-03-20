import { Link2Off } from 'lucide-react';

const IntegrationSettings = () => {
  const integrations = [
    { name: 'Google Drive', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg' },
    { name: 'Slack', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
    { name: 'Microsoft Teams', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl card-shadow p-12 flex flex-col items-center justify-center font-jakarta border border-border-secondary mt-8">
      
      {/* Top Icon */}
      <div className="w-16 h-16 bg-bg-soft rounded-full flex items-center justify-center mb-6">
        <Link2Off className="text-text-body/40" size={32} />
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