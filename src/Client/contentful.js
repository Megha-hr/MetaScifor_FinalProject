import {createClient} from "contentful";
import React,{useEffect} from 'react'

//Create a client instance
export const client=createClient({
    accessToken:import.meta.env.VITE_accessToken,
    space:import.meta.env.VITE_space
})




 