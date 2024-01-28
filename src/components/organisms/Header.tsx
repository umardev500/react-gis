import { Popover, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import logo from '../../assets/logos/kkp-logo.png'

export const Header = () => {
    const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>({
        wisata: false,
        adat: false,
        konservasi: false,
        bmkt: false,
    })

    const handleCheckboxChange = (checkboxId: string) => {
        setCheckboxState((prev) => ({
            ...prev,
            [checkboxId]: !prev[checkboxId],
        }))
    }

    return (
        <header className="px-4 py-1 h-16 header  absolute grid grid-cols-8 justify-between items-center z-30 bg-white left-0 top-0 right-0 shadow-lg">
            <div className="flex col-span-2 items-center gap-4">
                <img src={logo} alt="logo" className="w-10" />
                <div className="text-white text-xs font-bold">
                    <div>KEMENTRIAN</div>
                    <div className="whitespace-nowrap">KELAUTAN DAN PERIKANAN</div>
                </div>
            </div>
            <nav className="hidden justify-center col-span-4 lg:flex py-4 px-4 ">
                <ul className="flex gap-12">
                    <li>
                        <Popover className="relative">
                            <Popover.Button
                                className={`outline-none text-sm font-bold whitespace-nowrap text-white`}
                            >
                                Bantuan Pemerintah
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Popover.Panel className="absolute z-10">
                                    <div className="whitespace-nowrap shadow-xl flex flex-col gap-2.5 py-4 mt-7 bg-white rounded-lg p-2 px-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={checkboxState.konservasi}
                                                type="checkbox"
                                                name=""
                                                id="konservasi"
                                                onChange={() => {
                                                    handleCheckboxChange('konservasi')
                                                }}
                                            />
                                            <label className="text-sm" htmlFor="konservasi">
                                                Kelompok Pengerang Konservasi
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={checkboxState.adat}
                                                type="checkbox"
                                                name=""
                                                id="adat"
                                                onChange={() => {
                                                    handleCheckboxChange('adat')
                                                }}
                                            />
                                            <label className="text-sm" htmlFor="adat">
                                                Hukum Adat
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={checkboxState.wisata}
                                                type="checkbox"
                                                name=""
                                                onChange={() => {
                                                    handleCheckboxChange('wisata')
                                                }}
                                                id="wisata"
                                            />
                                            <label className="text-sm" htmlFor="wisata">
                                                Sarana Prasarana Wisata Bahari
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={checkboxState.bmkt}
                                                type="checkbox"
                                                name=""
                                                onChange={() => {
                                                    handleCheckboxChange('bmkt')
                                                }}
                                                id="bmkt"
                                            />
                                            <label className="text-sm" htmlFor="bmkt">
                                                Sarana Prasarana BMKT
                                            </label>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </li>
                    <li>
                        <a href="#" className="whitespace-nowrap text-white text-sm font-bold">
                            Kantor UPT
                        </a>
                    </li>
                    <li>
                        <a href="#" className="whitespace-nowrap text-white text-sm font-bold">
                            Wilayah Perairan
                        </a>
                    </li>
                    <li>
                        <a href="#" className="whitespace-nowrap text-white text-sm font-bold">
                            Garam Nasional
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="col-span-2 flex justify-end">
                <button className="bg-white text-sm font-semibold text-gray-700 hover:text-gray-500 px-6 py-1.5 rounded-lg">
                    Masuk
                </button>
            </div>
        </header>
    )
}
