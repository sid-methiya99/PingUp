import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import { Loading } from '../components/Loading'

export const Layout = () => {
   const user = dummyUserData
   const [sidebar, setSideBarOpen] = useState(false)
   return user ? (
      <div className="w-full h-screen flex">
         <Sidebar sidebarOpen={sidebar} setSideBarOpen={setSideBarOpen} />
         <div className="flex-1 bg-slate-50">
            <Outlet />
         </div>
         {sidebar ? (
            <X
               className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
               onClick={() => {
                  setSideBarOpen(false)
               }}
            />
         ) : (
            <Menu
               className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
               onClick={() => {
                  setSideBarOpen(true)
               }}
            />
         )}
      </div>
   ) : (
      <Loading />
   )
}
