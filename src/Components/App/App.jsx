import React, { useEffect, useState } from 'react'

import {createBrowserRouter ,Navigate,RouterProvider} from 'react-router-dom'


import Layout from '../Layout/Layout'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Categories from '../Categories/Categories'
import NotFound from '../NotFound/NotFound'
import DetailsMeal from '../DetailsMeal/DetailsMeal'
import DetailsForCategory from '../DetailsForCategory/DetailsForCategory'
import DetailsForIngredients from '../DetailsForIngredients/DetailsForIngredients'
import ProtectedRouter from '../ProtectedRouter/ProtectedRouter'
import Area from '../Area/Area'
import FilterByArea from '../FilterByArea/FilterByArea'
import Ingredients from '../Ingredients/Ingredients'

import { jwtDecode } from 'jwt-decode'

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      SaveUserData()
    }

  }, [])

  const [UserData, setUserData] = useState(null)



  function SaveUserData()
  {
    let encodedData = localStorage.getItem("token")
    let decodedData = jwtDecode(encodedData)
    setUserData(decodedData)
  }


    function logout() {

      localStorage.removeItem("token")
      setUserData(null)
      return <Navigate to="/login" />    }

  let routers = createBrowserRouter([
    {
      path: "/", element: <Layout logout={logout} UserData={UserData} />, children: [
        { path: "login", element: <Login SaveUserData={SaveUserData} />},
      {path:"register" ,element:<Register/>},
        { index: true, element:<ProtectedRouter SaveUserData={SaveUserData}  UserData={UserData}><Home/></ProtectedRouter>},
        {
          path: "area", element: <ProtectedRouter SaveUserData={SaveUserData} UserData={UserData}><Area/></ProtectedRouter>},
        {
          path: "filterByarea/:area", element: <ProtectedRouter SaveUserData={SaveUserData}  UserData={UserData}><FilterByArea/></ProtectedRouter>},
      
        {
          path: "categories", element: <ProtectedRouter SaveUserData={SaveUserData}  UserData={UserData}><Categories/></ProtectedRouter>},
        {
          path: "details/:id", element: <ProtectedRouter SaveUserData={SaveUserData}  UserData={UserData}><DetailsMeal/></ProtectedRouter>},
        {
          path: "DetailsForCategory/:NameOfMeal", element: <ProtectedRouter SaveUserData={SaveUserData} UserData={UserData} ><DetailsForCategory /></ProtectedRouter> },
        {
          path: "DetailsForIngredients/:NameOfMeal", element: <ProtectedRouter SaveUserData={SaveUserData}  UserData={UserData}><DetailsForIngredients /></ProtectedRouter> },
        {
          path: "ingredients", element: <ProtectedRouter SaveUserData={SaveUserData}  UserData={UserData}> <Ingredients /></ProtectedRouter> },
        
      {path:"*" ,element:<NotFound/>},
    ]}
  ])

 
  return <>
  
    
    <RouterProvider router={routers} />
    
  </>
}
