import type React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import { MenuItems } from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'

export interface SidebarProps {
   sidebarOpen?: boolean
   setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const Sidebar = ({ sidebarOpen, setSideBarOpen }: SidebarProps) => {
   const navigate = useNavigate()
   const user = dummyUserData
   const { signOut } = useClerk()

   return (
      <div
         className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center 
             max-sm:absolute top-0 bottom-0 z-20 ${
                sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'
             } transition-all duration-300 ease-out`}
      >
         <div className="w-full">
            <img
               src={assets.logo}
               className="w-26 ml-7 my-2 cursor-pointer "
               onClick={() => {
                  navigate('/')
               }}
            />
            <hr className="border-gray-300 mb-8" />

            <MenuItems setSideBarOpen={setSideBarOpen} />
            <Link
               className="flex items-center justify-center gap-2 py-2.5 mx-6 mt-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 text-white cursor-pointer"
               to={'/create-post'}
            >
               <CirclePlus className="w-5 h-5" />
               Create Post
            </Link>
         </div>
         <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
            <div className="flex gap-2 items-center cursor-pointer">
               <UserButton />
               <div>
                  <h1 className="text-sm font-medium">{user.full_name}</h1>
                  <p className="text-xs text-gray-500">@{user.username}</p>
               </div>
            </div>
            <LogOut
               className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
               onClick={() => {
                  signOut()
               }}
            />
         </div>
      </div>
   )
}
