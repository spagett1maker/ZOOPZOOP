// interface ChannelUser {
//   id: string
//   name?: string
//   email?: string
//   phoneNumber?: string
// }

// export const getChannelBootOption = (user?: ChannelUser) => {
//   return {
//     pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY!,
//     ...(user && {
//       userId: user.id,
//       profile: {
//         name: user.name,
//         email: user.email,
//         mobileNumber: user.phoneNumber,
//       },
//     }),
//   }
// }

interface ChannelUser {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
}

interface ChannelBootOption {
  pluginKey: string
  memberId?: string
  name?: string
  email?: string
  mobileNumber?: string
}

export const getChannelBootOption = (user?: ChannelUser): ChannelBootOption => {
  const bootOption: ChannelBootOption = {
    pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY || "", // Use environment variable
  }

  if (user) {
    bootOption.memberId = user.id
    bootOption.name = user.name
    bootOption.email = user.email
    bootOption.mobileNumber = user.phoneNumber
  }

  return bootOption
}

