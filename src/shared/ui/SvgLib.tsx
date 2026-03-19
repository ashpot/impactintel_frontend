interface svgProps {
    className?: string
    stroke?: string
}
export const FolderOpen = ({className, stroke = 'currentColor'}:svgProps)=>{
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.67 14.3L21.27 19.3C21.12 20.83 21 22 18.29 22H5.71001C3.00001 22 2.88001 20.83 2.73001 19.3L2.33001 14.3C2.25001 13.47 2.51001 12.7 2.98001 12.11C2.99001 12.1 2.99001 12.1 3.00001 12.09C3.55001 11.42 4.38001 11 5.31001 11H18.69C19.62 11 20.44 11.42 20.98 12.07C20.99 12.08 21 12.09 21 12.1C21.49 12.69 21.76 13.46 21.67 14.3Z" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10"/>
            <path d="M3.5 11.4303V6.28027C3.5 2.88027 4.35 2.03027 7.75 2.03027H9.02C10.29 2.03027 10.58 2.41027 11.06 3.05027L12.33 4.75027C12.65 5.17027 12.84 5.43027 13.69 5.43027H16.24C19.64 5.43027 20.49 6.28027 20.49 9.68027V11.4703" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.43005 17H14.5701" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
export const ProfileUsers = ({className, stroke = 'currentColor'}:svgProps) => {
    return(
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
export const Target = ({className, stroke = 'currentColor'}:svgProps)=>{
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                fill={stroke} 
                d="M20.8 7.8c1.04 2.18 1.24 4.66.55 6.97-.68 2.31-2.2 4.29-4.25 5.55-2.06 1.26-4.51 1.72-6.88 1.28-2.37-.44-4.5-1.74-5.97-3.66-1.47-1.91-2.17-4.31-1.98-6.71.19-2.4 1.27-4.65 3.02-6.31s4.05-2.65 6.46-2.71c2.41-.06 4.76.77 6.6 2.34l2.12-2.12a.75.75 0 1 1 1.06 1.06L12.53 12.53a.75.75 0 0 1-1.06 0 .75.75 0 0 1 0-1.06l2.6-2.6c-.7-.47-1.54-.68-2.39-.61-.84.07-1.63.43-2.25 1-.61.58-1.02 1.35-1.14 2.18-.12.84.04 1.69.46 2.42.42.73 1.08 1.3 1.86 1.61.78.31 1.65.35 2.46.11.81-.24 1.51-.75 2-1.44.48-.69.72-1.53.67-2.37 0-.1.01-.2.04-.29.03-.09.08-.18.15-.25.07-.07.15-.13.23-.18.09-.04.19-.07.28-.07.2-.01.4.06.54.19.07.07.13.15.18.23.04.09.07.19.07.28.07 1.19-.27 2.37-.96 3.35-.7.97-1.7 1.68-2.85 2.01-1.15.32-2.38.25-3.48-.22-1.1-.47-2.01-1.3-2.57-2.35-.57-1.05-.76-2.27-.54-3.44.22-1.18.83-2.24 1.74-3.02.9-.78 2.05-1.23 3.24-1.27 1.19-.04 2.37.33 3.32 1.04l2.14-2.13c-1.56-1.3-3.55-1.97-5.58-1.89-2.03.08-3.96.9-5.42 2.32-1.46 1.41-2.34 3.32-2.48 5.34-.14 2.03.47 4.03 1.72 5.64 1.25 1.6 3.05 2.69 5.05 3.04 2 .36 4.06-.04 5.79-1.1 1.73-1.07 3-2.74 3.57-4.69.57-1.95.4-4.04-.48-5.87-.08-.18-.1-.39-.03-.57.07-.19.2-.34.38-.43.18-.09.39-.1.57-.03.19.07.34.2.43.38Z" 
            />
        </svg>
    )
}
export const Medal = ({className, stroke = 'currentColor'}:svgProps)=>{
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C15.7279 15 18.75 12.0899 18.75 8.5C18.75 4.91015 15.7279 2 12 2C8.27208 2 5.25 4.91015 5.25 8.5C5.25 12.0899 8.27208 15 12 15Z" 
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.51999 13.5198L7.51001 20.8998C7.51001 21.7998 8.14001 22.2398 8.92001 21.8698L11.6 20.5999C11.82 20.4899 12.19 20.4899 12.41 20.5999L15.1 21.8698C15.87 22.2298 16.51 21.7998 16.51 20.8998V13.3398" 
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}