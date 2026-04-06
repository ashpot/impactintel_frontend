import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
import { useScrollNav } from "../hooks/usescrollnav"
import { useAdminSettingsForm } from "../action"

// Section Components
import GeneralSection from "../components/GeneralSection"
import OrganizationRules from "../components/OrganizationRules"
import ApprovalRules from "../components/ApprovalRules"
import SecuritySection from "../components/SecuritySection"
import RolesPermissions from "../components/RolesPermissions"
import DataCompliance from "../components/DataCompliance"
import DangerZone from "../components/DangerZone"
import NotificationSection from "../components/Notification"
import Button from "@/shared/ui/Button"

const SettingsPage = () => {
  const { activeSection, SECTIONS, scrollTo } = useScrollNav()
  const { register, errors, onSubmit, reset, isSubmitting } = useAdminSettingsForm()

  const handleGlobalReset = () => {
    if (confirm("Are you sure you want to reset all configurations to default?")) {
      reset()
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8 pb-20">
        <PageTitle
          title="Settings"
          body="Platform configuration and administrative controls"
        />

        <section className="grid grid-cols-3 gap-x-6 items-start">
          {/* Sticky Side Navigation */}
          <div className="sticky top-24">
            <nav className="bg-white rounded-3xl border border-line p-6 font-lato card-shadow">
              <ul className="space-y-1.5">
                {SECTIONS.map(({ id, label }) => {
                  const isActive = activeSection === id
                  return (
                    <li
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`
                        w-full flex items-center gap-2 px-3.5 py-3 rounded-xl text-base
                        font-medium transition-all duration-150 ease-in-out group font-lato hover:cursor-pointer
                        ${isActive 
                          ? "bg-nav-active text-brand-primary" 
                          : "text-text-body hover:bg-nav-active/50 hover:text-text-primary01"}
                      `}
                    >
                      {label}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Settings Configuration Form */}
          <div className="col-span-2">
            <form onSubmit={onSubmit} className="space-y-6">
                <GeneralSection register={register} errors={errors} />
                <RolesPermissions />
                <OrganizationRules register={register} errors={errors} />
                <ApprovalRules register={register} />
                <SecuritySection register={register} />
                <NotificationSection register={register} />
                <DataCompliance />
                <DangerZone onReset={handleGlobalReset} />
              <div className="flex justify-end pt-4">
                <Button
                  className="text-text-primary01 font-bold text-base"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving Changes..." : "Save All Changes"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default SettingsPage