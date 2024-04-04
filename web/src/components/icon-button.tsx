import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'> {
    transparent?: boolean
}

export function IconButton({children, transparent, ...props}: IconButtonProps) {
    
    return(
        <button {...props} className={(transparent ? 'bg-white/5' : 'bg-white/20') + ` transition-all border border-white/10 hover:bg-white/30 disabled:bg-white/5 rounded-md p-1.5` }>
            {children}
        </button>
    )
}