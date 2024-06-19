import { ChakraProvider } from "@chakra-ui/react"
import { Navbar } from "./components/Navbar"
import CreateNote from "./components/CreateNote"
import Notes from "./components/Notes"
import React from "react"

function App() {
  return (
    <ChakraProvider>
      <div className="text-[#50d0f0] bg-gradient-to-br from-[#161616] to-[#0a0a2e] h-screen w-full flex flex-col">
        <Navbar />
        <Notes />
      </div>
    </ChakraProvider>
  )
}

export default App
