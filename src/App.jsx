import React, { useEffect } from "react";
import { ListOfRfp, Suppliers, SplitScreen, Tenders } from "./pages/vanguards";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RFPEdit from "./pages/indispensable/RFPEdit";
import RFPList from "./pages/indispensable/RFPList";
import RFPDraft from "./pages/indispensable/RFPDraft";
import Draftlist from "./pages/indispensable/Draftlist";
import RFPDetailView from "./pages/indispensable/RFPDetailView";
import BidSubmit from "./pages/indispensable/BidSubmission";
import ItemList from './pages/indispensable/VendorHome';
import BidDetailView from './pages/indispensable/BidDetailView';
import BidView from './pages/indispensable/BidView';
import RPFForm from './pages/indispensable/RPFForm';

import {
  LogIn,
  Register,
  AddIndent,
  AddIndent2,
  AddProduct,
  ForgotPassword,
  IndentList,
  EditIndent,
  VendorPage,
  ViewIndents,
  MultipleIndent,
} from "./pages/innovators";
import { useDispatch, useSelector } from "react-redux";
import { authorization, login, logout } from "./slices/authSlice";

export default function App() {
  const state = useSelector(authorization)
  const dispatch = useDispatch()
  console.log("USER",state,localStorage.getItem('token'))
  let token = localStorage.getItem('token')
  useEffect(()=>{
    console.log("kk")
    if(token){
      dispatch(login({user:token,isLoggedIn:true,token}))
    } else{
      dispatch(logout())
    }
  },[dispatch,state])
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfRfp />} />
        {/* <Route element={<RouteProtect />}> */}
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/:id" element={<Suppliers />} />
        {/* </Route> */}
        <Route path="/splitscreen" element={<SplitScreen />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addindent" element={<AddIndent />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/indentlist" element={<IndentList />} />
        <Route path="/editindent" element={<EditIndent />} />
        <Route path="/viewindent" element={<ViewIndents />} />
        <Route path="/addindent2" element={<AddIndent2 />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/multipleindent" element={<MultipleIndent />} />
        <Route path="/vendor" element={<VendorPage />} />

        <Route path="/rfpform" element={<RPFForm />} />
        <Route path="/rfpedit" element={<RFPEdit />} />
        <Route path="/rfplist" element={<RFPList />} />
        <Route path="/draftlist" element={<Draftlist />} />
        <Route path="/rfpdraft" element={<RFPDraft />} />
        <Route path="/rfpdetailview" element={<RFPDetailView />} />
        <Route path="/bidsubmission/:id" element={<BidSubmit />} />
        <Route path="/vendorhome" element={<ItemList />} />
        <Route path="/biddetailview/:id" element={<BidDetailView />} />
        <Route path="/viewbids/:id" element={<BidView />} />
      </Routes>
      <Footer />
    </>
  );
}
