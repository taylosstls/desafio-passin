import { ChangeEvent, useState } from 'react'
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'

import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [inputSearch, setInputSearch] = useState('')
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)
    
    function searchForm(event: ChangeEvent<HTMLInputElement>) {
        setInputSearch(event.target.value)
    }

    function goToFirstPage() {
        setPage(1)
    }

    function goToPreviousPage() {
        setPage(page - 1)
    }

    function goToNextPage() {
        setPage(page + 1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }


    return (
        <div className='flex flex-col gap-4'>
            <section className="flex items-center w-full gap-3 px-2">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 h-9 px-3 py-1.5 border border-white/10 rounded-md flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input onChange={searchForm} className="bg-transparent border-none h-auto p-0 flex-1 text-sm outline-none" placeholder="Buscar participante..." />
                </div>
            </section>

            <Table>
                <thead>
                    <TableRow>
                        <TableHeader style={{ width: '48px' }}>
                            <input className='size-4 bg-black/20 rounded cursor-pointer border border-white/10 text-orange-400' type='checkbox' />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: '64px' }}></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return(
                            <TableRow key={attendee.id} className='transition-all hover:bg-white/5'>
                                <TableCell>
                                    <input className='size-4 bg-black/20 rounded cursor-pointer border border-white/10 text-orange-400' type='checkbox' />
                                </TableCell>
                                <TableCell><p>{attendee.id}</p></TableCell>
                                <TableCell>
                                    <div className='flex flex-col gap-0.5'>
                                        <p className='font-semibold text-white'>{attendee.name}</p>
                                        <p className='text-xs'>{attendee.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell><p>{dayjs(attendee.createdAt).format('DD/MM/YYYY')}</p></TableCell>
                                <TableCell><p>{dayjs().to(attendee.checkedInAt)}</p></TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className='size-4' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <p>Mostrando 10 de {attendees.length} items</p>
                        </TableCell>
                        <TableCell className='text-right' colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <p>Página {page} de {totalPages}</p>
                                <div className='flex gap-1'>
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}><ChevronsLeft className='size-4' /></IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}><ChevronLeft className='size-4' /></IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}><ChevronRight className='size-4' /></IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}><ChevronsRight className='size-4' /></IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </tfoot>
            </Table>
        </div>
    )
}