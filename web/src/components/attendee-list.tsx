import { ChangeEvent, useEffect, useState } from 'react'
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'

//import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface AttendeeProps {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}

export function AttendeeList() {
    const [inputSearch, setInputSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if(url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? ''
        }

        return ''
    })

    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        if(url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }

        return 1
    })

    const [attendees, setAttendees] = useState<AttendeeProps[]>([])
    const [total, setTotal] = useState(0)

    const eventId = '9e9bd979-9d10-4915-b339-3786b1634f33'

    useEffect(() => {
        const url = new URL(`http://localhost:3333/events/${eventId}/attendees`)

        url.searchParams.set('pageIndex', String(page - 1))
        if(inputSearch.length > 0) {
            url.searchParams.set('query', inputSearch)
        }


        fetch(url).then(response => response.json())
        .then(data => {
            setAttendees(data.attendees)
            setTotal(data.total)
        })
    }, [page, inputSearch])

    const totalPages = Math.ceil(total / 10)
    
    function searchForm(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setPage(1)
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())

        url.searchParams.set('search', search)
        window.history.pushState({}, '', url)

        setInputSearch(search)
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())

        url.searchParams.set('page', String(page))
        window.history.pushState({}, '', url)

        setPage(page)
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1)
    }
    
    function goToNextPage() {
        setCurrentPage(page + 1)
    }

    function goToFirstPage() { 
        setCurrentPage(1)
     }

    function goToLastPage() { 
        setCurrentPage(totalPages)
     }

    return (
        <div className='flex flex-col gap-4'>
            <section className="flex items-center w-full gap-3 px-2">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 h-9 px-3 py-1.5 border border-white/10 rounded-md flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input onChange={searchForm} value={inputSearch} className="bg-transparent border-none h-auto p-0 flex-1 text-sm outline-none" placeholder="Buscar participante..." />
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
                    {attendees.map((attendee) => {
                        return(
                            <TableRow key={attendee.id} className='transition-all hover:bg-white/5'>
                                <TableCell>
                                    <input className='size-4 bg-black/20 rounded cursor-pointer border border-white/10 text-orange-400' type='checkbox' />
                                </TableCell>
                                <TableCell><p>{attendee.id}</p></TableCell>
                                <TableCell>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold text-white'>{attendee.name}</p>
                                        <p className='text-xs text-zinc-500'>{attendee.email.toLocaleLowerCase()}</p>
                                    </div>
                                </TableCell>
                                <TableCell><p>{dayjs(attendee.createdAt).format('DD/MM/YYYY')}</p></TableCell>
                                <TableCell><p>{attendee.checkedInAt === null ? <span className='text-zinc-500'>Check-in não realizado</span> : dayjs().to(attendee.checkedInAt)}</p></TableCell>
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
                            <p>Mostrando {attendees.length} de {total} itens</p>
                        </TableCell>
                        <TableCell className='text-right' colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <p>Página {page} de {totalPages == 0 ? '1' : totalPages}</p>
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