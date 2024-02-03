import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import logo from '../../assets/logos/kkp-logo.png'
import { type Category, type ResponseData } from '../../types'
import { capitalizeFirstLetterOfEachWord } from '../../utils'

interface Props {
    selCat?: Category[]
    setSelCat: React.Dispatch<React.SetStateAction<Category[]>>
    geoJsonDatasets: ResponseData[]
}

export const Header: React.FC<Props> = ({ selCat, setSelCat, geoJsonDatasets }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const name = target.name
        const group = target.dataset.group

        setSelCat((prev) => {
            return prev.map((val) => {
                if (val.name === group) {
                    return {
                        ...val,
                        categories: val.categories.includes(name)
                            ? val.categories.filter((item) => item !== name)
                            : [...val.categories, name],
                    }
                }

                return val
            })
        })
    }

    const bantuanItem = geoJsonDatasets.filter((val) => val.name === 'bantuan')[0]
    const bantuanData = bantuanItem.data
    let bantuanCats = bantuanData?.map((val) => val.name)
    bantuanCats = bantuanCats?.filter((val) => val !== undefined)

    // const bantuan = keys?.filter((val) => val.name === 'bantuan')[0]

    const getCheckState = (name: string): boolean => {
        const item = selCat?.filter((val) => val.categories.includes(name))
        if (item !== undefined) return item.length > 0
        return false
    }

    return (
        <header className="px-4 py-1 h-16 header flex absolute lg:grid lg:grid-cols-8 justify-between items-center z-30 bg-white left-0 top-0 right-0 shadow-lg">
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
                                        {bantuanCats?.map((item, i) => (
                                            <div
                                                id={bantuanItem.name}
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    checked={getCheckState(item)}
                                                    type="checkbox"
                                                    name={item}
                                                    id={item}
                                                    data-group={bantuanItem.name}
                                                    onChange={handleChange}
                                                />
                                                <label className="text-sm" htmlFor={item}>
                                                    {capitalizeFirstLetterOfEachWord(item)}
                                                </label>
                                            </div>
                                        ))}
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
            <div className="col-span-2  flex justify-end">
                <button className="bg-white text-sm font-semibold text-gray-700 hover:text-gray-500 px-6 py-1.5 rounded-lg">
                    Masuk
                </button>
            </div>
        </header>
    )
}
