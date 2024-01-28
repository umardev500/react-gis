import { Popover, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import logo from '../../assets/logos/kkp-eng.png'

export const Header = () => {
    const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>({
        wisata: false,
        bencanaAlam: false,
    })

    const handleCheckboxChange = (checkboxId: string) => {
        setCheckboxState((prev) => ({
            ...prev,
            [checkboxId]: !prev[checkboxId],
        }))
    }

    return (
        <header className="px-4 py-1 header  absolute flex justify-between items-center z-30 bg-white left-0 top-0 right-0 shadow-lg">
            <div>
                <img src={logo} alt="logo" className="w-10" />
            </div>
            <nav className="flex py-4 px-4">
                <ul className="flex gap-12">
                    <li>
                        <Popover className="relative">
                            <Popover.Button className={`outline-none whitespace-nowrap`}>
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
                                    <div className="whitespace-nowrap shadow-xl flex flex-col gap-1.5 py-4 mt-7 bg-white rounded-lg p-2 px-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={checkboxState.wisata}
                                                type="checkbox"
                                                name=""
                                                id="wisata"
                                                onChange={() => {
                                                    handleCheckboxChange('wisata')
                                                }}
                                            />
                                            <label htmlFor="wisata">Sarana Wisata Bahari</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={checkboxState.bencanaAlam}
                                                type="checkbox"
                                                name=""
                                                id="bencana_alam"
                                                onChange={() => {
                                                    handleCheckboxChange('bencanaAlam')
                                                }}
                                            />
                                            <label htmlFor="bencana_alam">Bencana Alam</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" name="" id="konservasi" />
                                            <label htmlFor="konservasi">Pengerang Konservasi</label>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </li>
                    <li>
                        <a href="#" className="whitespace-nowrap">
                            Kantor UPT
                        </a>
                    </li>
                    <li>
                        <a href="#" className="whitespace-nowrap">
                            Wilayah Perairan
                        </a>
                    </li>
                    <li>
                        <a href="#" className="whitespace-nowrap">
                            Garam Nasional
                        </a>
                    </li>
                </ul>
            </nav>
            <div>
                <button className="bg-transparent text-grey-600 hover:text-gray-500 px-4 py-2 rounded-lg">
                    Masuk
                </button>
            </div>
        </header>
    )
}
