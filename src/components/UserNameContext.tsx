import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState } from "react"
import { useEffect } from "react"

const USER_NAME_KEY = "USER_NAME"

export const UserNameContext = React.createContext<{
  userName: string
  setUserName: React.Dispatch<React.SetStateAction<string>>
}>({
  userName: "",
  setUserName: () => {},
})

export const UserNameProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState("")

  const storeUserName = async () => {
    if (userName === undefined) return
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, userName)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  useEffect(() => {
    if (!userName) return
    storeUserName()
  }, [userName])

  useEffect(() => {
    const getUserName = async () => {
      try {
        const value = await AsyncStorage.getItem(USER_NAME_KEY)
        if (value !== null) {
          // value previously stored
          setUserName(value)
        } else {
          setUserName("")
        }
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }

    getUserName()
  }, [])

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  )
}
