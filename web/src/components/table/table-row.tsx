import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

interface TableRowProps extends ComponentProps<'tr'> {
    center?: boolean
}

export function TableRow({center, ...props}: TableRowProps) {
    return (
        <tr
            {...props}
            className={twMerge((center ? 'text-center ' : 'text-left ') + 'border-b border-white/10', props.className)}
            />
    )
}