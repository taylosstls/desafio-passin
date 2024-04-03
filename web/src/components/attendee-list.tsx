import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

export function AttendeeList() {
    return (
        <div className='flex flex-col gap-4'>
        <section className="flex items-center w-full gap-3 px-2">
            <h1 className="text-2xl font-bold">Participantes</h1>
            <div className="w-72 h-9 px-3 py-1.5 border border-white/10 rounded-md flex items-center gap-3">
                <Search className='size-4 text-emerald-300' />
                <input className="bg-transparent border-none h-auto p-0 flex-1 text-sm outline-none" placeholder="Buscar participante..." />
            </div>
        </section>
        <section className='rounded border border-white/10'>
            <table className='w-full'>
                <thead>
                    <tr className='border-b border-white/10'>
                        <th style={{ width: '48px' }} className='py-3 px-4 text-sm font-semibold'>
                            <input className='size-4 bg-black/20 rounded border border-white/10 text-orange-400' type='checkbox' />
                        </th>
                        <th className='py-3 px-4 text-sm font-semibold text-left'>Código</th>
                        <th className='py-3 px-4 text-sm font-semibold text-left'>Participante</th>
                        <th className='py-3 px-4 text-sm font-semibold text-left'>Data de inscrição</th>
                        <th className='py-3 px-4 text-sm font-semibold text-left'>Data do check-in</th>
                        <th style={{ width: '64px' }} className='py-3 px-4 text-sm font-semibold text-left'></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return(
                            <tr key={index} className='border-b border-white/10 transition-all hover:bg-white/5'>
                                <td className='py-3 px-4 text-sm text-zinc-300 text-center'>
                                    <input className='size-4 bg-black/20 rounded border border-white/10 text-orange-400' type='checkbox' />
                                </td>
                                <td className='py-3 px-4 text-sm text-zinc-300'><p>52716</p></td>
                                <td className='py-3 px-4 text-sm'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold text-white'>Nome do participante</p>
                                        <p className='text-xs text-zinc-300'>emaildo@participante.com</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4 text-sm text-zinc-300'><p>7 dias atrás</p></td>
                                <td className='py-3 px-4 text-sm text-zinc-300'><p>3 dias atrás</p></td>
                                <td className='py-3 px-4 text-sm text-zinc-300'>
                                    <button type='button' className='bg-black/20 border border-white/10 rounded-md p-1.5'>
                                        <MoreHorizontal className='size-4' />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>
                            <p>Mostrando 10 de 228 items</p>
                        </td>
                        <td className='py-3 px-4 text-sm text-right text-zinc-300' colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <p>Página 1 de 23</p>
                                <div className='flex gap-1'>
                                    <button type='button' className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronsLeft className='size-4' />
                                    </button>
                                    <button type='button' className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronLeft className='size-4' />
                                    </button>
                                    <button type='button' className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronRight className='size-4' />
                                    </button>
                                    <button type='button' className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronsRight className='size-4' />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </section>
        </div>
    )
}