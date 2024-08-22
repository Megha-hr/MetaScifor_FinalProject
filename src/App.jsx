import React,{ useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList'
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs'
import BlogDetail from './components/BlogDetail';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';
import {ContentfulProvider} from './components/ContentfulContext'
import './css/global.css'

function App() {
const[selectedItem,setSelectedItem]=useState(null)
  return (    
    <div>
      <ThemeProvider>
      <ContentfulProvider>
      <Navbar  setSelectedItem={setSelectedItem}/>
      <Routes>
          <Route path="/" element={<BlogList  category={selectedItem}/>} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/blogDetail/:id" element={<BlogDetail />} />
     </Routes>
    <Footer />
    </ContentfulProvider>
      </ThemeProvider>
    
    </div>
  )
}

export default App
