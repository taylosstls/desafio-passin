import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<'th'> {
    center?: boolean
}

export function TableHeader({center, ...props}: TableHeaderProps) {
    return (
        <th
            className={(center ? 'text-center ' : 'text-left ') + 'py-3 px-4 text-sm font-semibold'}
            {...props} />
    )
}