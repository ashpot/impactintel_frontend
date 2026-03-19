import { Outlet } from "react-router-dom"

const SettingsLayout = () => {
  return (
    <div className="text-3xl">
        testing the settings layout for other pages
      <Outlet/>
    </div>
  )
}
export default SettingsLayout