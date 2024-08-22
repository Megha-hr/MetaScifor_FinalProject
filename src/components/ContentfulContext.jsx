import React, {createContext,useState,useEffect} from "react"
import {client} from "../Client/contentful";

export const ContentfulContext=createContext();

export const ContentfulProvider =({children})=>{

    const [data,setData]= useState([]);
    const [loading,setLoading]=useState(true);

    const fetchData = async () => {
        try {
          const entries = await client.getEntries({
            content_type: "frontEndFocus",
          });
          setData(entries.items);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      return (
        <ContentfulContext.Provider value={{ data, loading }}>
          {children}
        </ContentfulContext.Provider>
      );
    }


