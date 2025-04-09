"use client"
import { UserProvider } from "./userProvider"
import Container from "./Container"
const Page = () => {
  return (
    <UserProvider>
      <Container />
    </UserProvider>
  )
}

export default Page