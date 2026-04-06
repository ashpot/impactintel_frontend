import Container from "@/shared/components/Container";

const DataCompliance = () => (
  <Container title="Data & Compliance" id="data_compliance">
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-text-primary01 mb-1">Data retention period</h3>
        <p className="text-sm text-text-body">All platform data is retained for 7 years in accordance with regulatory requirements.</p>
      </div>
      <div className="border-t border-line pt-6">
        <h3 className="font-semibold text-text-primary01 mb-1">Audit log retention policy</h3>
        <p className="text-sm text-text-body">Audit logs are immutable and retained indefinitely for compliance and security purposes.</p>
      </div>
      <div className="border-t border-line pt-6">
        <h3 className="font-semibold text-text-primary01 mb-1">Compliance notice</h3>
        <p className="text-sm text-text-body leading-relaxed">
          This platform adheres to applicable data protection regulations. All user data is encrypted at rest and in transit. 
          For detailed compliance information, contact the platform administrator.
        </p>
      </div>
    </div>
  </Container>
);

export default DataCompliance;