import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps) {
    return (
        <section className='rounded border border-white/10'>
            <table className='w-full' {...props} />
        </section>
    )
}