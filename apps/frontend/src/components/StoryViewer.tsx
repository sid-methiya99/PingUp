import { BadgeCheck, X, type DivideSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Story } from './StoriesBar'

interface StoryProps {
   setViewStory: React.Dispatch<React.SetStateAction<boolean>>
   stories?: Story
}

export const StoryViewer = ({ setViewStory, stories }: StoryProps) => {
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      let timer: number, progressInterval: number

      if (stories && stories.media_type !== 'video') {
         setProgress(0)
         const duration = 10000
         const setTime = 100
         let elapsed = 0

         progressInterval = setInterval(() => {
            elapsed += setTime
            setProgress((elapsed / duration) * 100)
         }, setTime)

         timer = setTimeout(() => {
            setViewStory(false)
         }, duration)
      }

      return () => {
         clearTimeout(timer)
         clearInterval(progressInterval)
      }
   }, [stories, setViewStory])

   const handleClose = () => {
      setViewStory(false)
   }
   const renderContent = () => {
      stories?.map((x, i) => {
         switch (x.media_type) {
            case 'image':
               return (
                  <img
                     key={i}
                     src={x?.media_url}
                     className="max-w-full max-h-screen object-contain"
                  />
               )

            case 'video':
               return (
                  <video
                     key={i}
                     src={x.media_url}
                     className="max-h-screen"
                     controls
                     autoPlay
                     onEnded={() => setViewStory(false)}
                  />
               )

            case 'text':
               return (
                  <div
                     key={i}
                     className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center"
                  >
                     {x.content}
                  </div>
               )

            default:
               return null
         }
      })
   }

   return (
      <div
         className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center"
         style={{
            backgroundColor: stories?.background_color || 'white',
         }}
      >
         <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 ">
            <div
               className="h-full bg-white transition-all duration-100 linear"
               style={{
                  width: `${progress}%`,
               }}
            ></div>
         </div>
         {/* User Info */}
         <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
            <img
               src={stories?.user.profile_picture}
               className="size-7 sm:size-8  rounded-full object-cover border border-white"
            />
            <div className="text-white font-medium flex items-center gap-1.5">
               <span>{stories?.user.full_name}</span>
               <BadgeCheck size={18} />
            </div>
         </div>
         {/* Closr button */}

         <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
         >
            <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
         </button>

         <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {stories?.media_type === 'image' && (
               <img
                  src={stories.media_url}
                  className="max-w-full max-h-screen object-contain"
               />
            )}
            {stories?.media_type === 'video' && (
               <video
                  src={stories?.media_url}
                  className="max-h-screen"
                  controls
                  autoPlay
                  onEnded={() => setViewStory(false)}
               />
            )}

            {stories?.media_type === 'text' && (
               <div className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center">
                  {stories.content}
               </div>
            )}
         </div>
      </div>
   )
}
