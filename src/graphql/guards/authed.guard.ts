
export const authed = (context: any) => {
  const { userInfo } = context

  if (!(userInfo && userInfo.email)) {
    throw new Error('Not authenticated')
  }

  return userInfo
}