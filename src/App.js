import { Routes, Route, BrowserRouter } from "react-router-dom"
import School from "./Pages/School";
import Design from "./Pages/Design";
import Personal from "./Pages/Personal";
import Layout from "./Components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
         <Route element={<Layout />} >
           <Route path="/" element={<School />} />
           <Route path="/Pages/Personal" element={<Personal />} />
           <Route path="/Pages/Design" element={<Design />} />
         </Route>
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App