import { Inngest } from 'inngest'
import { PrismaClient } from '@repo/db/'

const prisma = new PrismaClient()

export const inngest = new Inngest({
   id: 'PingUp',
})

const syncUserCreation = inngest.createFunction(
   {
      id: 'sync user from clerk',
   },
   {
      event: 'clerk/user.created',
   },
   async ({ event }) => {
      const { id, first_name, last_name, email_addresses, image_url } =
         event.data
      let username = email_addresses[0].email_address.split('@')[0]

      const user = await prisma.user.findFirstOrThrow({
         where: {
            username: username,
         },
      })

      if (user) {
         username = username + Math.floor(Math.random() * 10000)
      }

      await prisma.user.create({
         data: {
            id: id,
            email: email_addresses[0].email_address,
            fullName: first_name + ' ' + last_name,
            profilePicture: image_url,
            username,
         },
      })
   }
)

const syncUserUpdate = inngest.createFunction(
   {
      id: 'update-user-from-clerk',
   },
   {
      event: 'clerk/user.updated',
   },
   async ({ event }) => {
      const { id, first_name, last_name, email_addresses, image_url } =
         event.data
      await prisma.user.update({
         where: {
            id: id,
         },
         data: {
            email: email_addresses[0].email_address,
            fullName: first_name + ' ' + last_name,
            profilePicture: image_url,
         },
      })
   }
)

const syncUserDelete = inngest.createFunction(
   {
      id: 'delete-user-from-clerk',
   },
   {
      event: 'clerk/user.deleted',
   },
   async ({ event }) => {
      const { id } = event.data
      await prisma.user.delete({
         where: {
            id: id,
         },
      })
   }
)

export const functions = [syncUserCreation, syncUserUpdate, syncUserDelete]
