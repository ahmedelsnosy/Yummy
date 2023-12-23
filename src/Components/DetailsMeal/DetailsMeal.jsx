
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import  Helmet  from 'react-helmet'

export default function DetailsMeal() {
  let params = useParams()


  const [detailsMeal, setdetailsMeal] = useState([])



  let getDetailsMeal = async() => {
    let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
    setdetailsMeal(data.meals[0])
  }

  useEffect(() => {
    
    getDetailsMeal()
    
  }, [])


  

  return <>
    <Helmet>
      <title>
        Details For Meal
      </title>
    </Helmet>

   
    <div className="row text-white ">
      
         <div className="col-md-4">
        <img src={detailsMeal.strMealThumb} className='w-100' alt="" />
      </div>
      <div className="col-md-8 p-4">
        <h2>{detailsMeal.strMeal}</h2>
        <h3>Area is {detailsMeal.strArea}</h3>
        <h5>Category is {detailsMeal.strCategory}</h5>
        <br />
        <p>
          <span className='fa-2x text-light bg-primary p-1'>Some Instruction for make this meal</span>
          <br />
          <br />
          {detailsMeal.strInstructions}</p>
        <p className='ms-2'>
          Some Ingredients
          <br />
          <br />
          <div className='d-flex flex-wrap'>
            <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient1} {detailsMeal.strMeasure1}</p>
          <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient2} {detailsMeal.strMeasure2}</p>
          <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient3} {detailsMeal.strMeasure3}</p>
          <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient4} {detailsMeal.strMeasure4}</p>
          <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient5} {detailsMeal.strMeasure5}</p>
          <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient6} {detailsMeal.strMeasure6}</p>
          <p className='bg-primary p-2 my-3 ms-2'>{detailsMeal.strIngredient7} {detailsMeal.strMeasure7}</p>
          </div>
          
        </p>

        <a className='text-decoration-none' target='_blank' href={detailsMeal.strSource}><button className='btn btn-info mx-2 my-3'>More Info</button></a>
        <a className='text-decoration-none' target='_blank' href={detailsMeal.strYoutube}><button className='btn btn-success mx-2 my-3'>Watch</button></a>
      </div>
      
    </div>
    
  </>
}
