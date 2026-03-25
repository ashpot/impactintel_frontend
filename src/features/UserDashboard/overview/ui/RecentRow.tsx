import avatar from "@/assets/images/testimonial_avatar_03.png"

const RecentRow = () => {
  return (
    <div className="border-b border-line flex items-center px-5 pt-5 pb-3 hover:bg-nav-active/40 hover:cursor-pointer">
        {/* title + body */}
        <div className="w-full max-w-xl">
            <h3 className="text-text-primary01 text-sm font-medium ">Clear Water Initiative</h3>
            <p className="text-text-body text-sm">Milestone completed</p>
        </div>

        {/* avatar + timestamp + link */}
        <div className="w-full flex justify-end">
            <div className="max-w-xl w-[70%] items-center flex justify-between">
                {/* avatar + name */}
                <div className="text-sm text-text-primary01 flex gap-2 items-center">
                    <img src={avatar} alt="avatar" className="w-9 h-9 rounded-full" />
                    <p>Sarah Johnson</p>
                </div>
                {/* timestamp */}
                <div className="text-text-body text-xs">2 hours ago</div>
                {/* link to more details about activity */}
                <div className="text-sm text-brand-primary font-medium">
                    <a href="#" className="p-2">
                        View details
                    </a>
                </div>
            </div>
            
        </div>
    </div>
  )
}
export default RecentRow