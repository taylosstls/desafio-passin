import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

interface TableCellProps extends ComponentProps<'td'> {
    center?: boolean
}

export function TableCell({center, ...props}: TableCellProps) {
    return (
        <td
            {...props}
            className={twMerge((center ? 'text-center ' : 'text-left ') + 'py-3 px-4 text-sm text-zinc-300', props.className)}
            />
    )
}