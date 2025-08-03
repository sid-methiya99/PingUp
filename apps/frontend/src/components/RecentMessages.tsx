import { useEffect, useState } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

export function RecentMessages() {
   const [messages, setMessages] = useState<typeof dummyRecentMessagesData>([])
   const fetchRecentMessages = async () => {
      setMessages(dummyRecentMessagesData)
   }

   useEffect(() => {
      fetchRecentMessages()
   }, [])
   return (
      <div className="max-w-xs bg-white text-xs mt-4 p-4 min-h-20 rounded-md  text-slate-800   shadow">
         <h3 className="font-semibold text-slate-800 mb-4">Recent Messages</h3>
         <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
            {messages.map((message, index) => (
               <Link
                  key={index}
                  className="flex items-start gap-2 py-2 hover:bg-slate-100"
               >
                  <img
                     src={message.from_user_id.profile_picture}
                     className="w-8 h-8 rounded-full"
                  />
                  <div className="w-full">
                     <div className="flex justify-between">
                        <p className="font-medium">
                           {message.from_user_id.full_name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                           {moment(message.createdAt).fromNow()}
                        </p>
                     </div>
                     <div className="flex justify-between">
                        <p className="text-gray-500">
                           {message.text ? message.text : 'media'}
                        </p>
                        {!message.seen && (
                           <p className="bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                              1
                           </p>
                        )}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
