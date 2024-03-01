import React,{useState} from 'react'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home';
import Popular from '../Popular/Popular';
import Offer from '../Offer/Offer';
import About from '../About/About';
import Footer from '../Footer/Footer';

const HomePage = () => {
  const [questData, setQuest] = useState([]);
  const [change,isChange]=useState(false)
  const handleDataFromHome = (data) => {
    isChange(true)
    setQuest(data);
    console.log("Home Page->questDatasize->",data.length)
  };
  return (
    <>
        <Navbar />
        <Home handleDataFromHome={handleDataFromHome}/>
        <Popular />
        <Offer questData={questData}  change={change} isChange={isChange}/>
        <About />
        <Footer />
    </>
  )
}

export default HomePage