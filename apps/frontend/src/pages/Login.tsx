import { Star } from 'lucide-react'
import { assets } from '../assets/assets'
import { SignIn } from '@clerk/clerk-react'

export const Login = (props: {}) => {
   return (
      <div className="min-h-screen flex flex-col md:flex-row ">
         {/* Background Image */}
         <img
            src={assets.bgImage}
            className="absolute top-0 left-0 -z-1 w-full h-full object-cover"
         />

         <div className="flex-1 flex flex-col items-start  p-6 md:p-10 lg:pl-40 ">
            <img
               src={assets.logo}
               className="h-14 object-contain "
               alt="Hello"
            />
            <div className="mt-40">
               <div className="flex items-center gap-3 mb-4 max-md:mt-10 ">
                  <img src={assets.group_users} className="h-8 md:h-10" />
                  <div>
                     <div className="flex">
                        {Array(5)
                           .fill(0)
                           .map((_, i) => (
                              <Star
                                 key={i}
                                 className="size-4 md:size-4.5 text-transparent fill-amber-500"
                              />
                           ))}
                     </div>
                     <p className="text-[#1C398E] font-semibold">
                        Used By 12k+ developers
                     </p>
                  </div>
               </div>
               <h1 className="text-3xl tracking-normal md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent max-w-2xl">
                  More than just friends truly connect
               </h1>
               <p className="text-indigo-900 md:text-3xl md:max-w-md max-w-72">
                  connect with global community on pingup
               </p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
            <SignIn />
         </div>
      </div>
   )
}
