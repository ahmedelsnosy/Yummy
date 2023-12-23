import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Style from './FilterByArea.module.css'
import Helmet from 'react-helmet'

export default function FilterByArea() {

  let params = useParams()
  const [MainMealForArea, setMainMealForArea] = useState([])

  let getMainMealForArea = async () => {
    let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.area}`)
    setMainMealForArea(data.meals)
  }

  useEffect(() => {

    getMainMealForArea()

  }, [])

  console.log(MainMealForArea);

  return <>
    <Helmet>
      <title>
        Meals For Ingredients
      </title>
    </Helmet>
    <div className='container my-5 '>
      <div className="row gx-4 gy-4">
        {MainMealForArea.length > 0 ? MainMealForArea.map((meal, index) =>
          <div className="col-md-3 shadow-lg" key={index}>
            <Link to={`/details/${meal.idMeal}`}>
              <div className={Style.meal}>
                <img src={meal.strMealThumb} className='w-100' alt="" />

                <div className={`${Style.memberCaption} d-flex justify-content-center align-items-center fa-2x text-center`}>
                  <p>{meal.strMeal}</p>
                </div>
              </div>

            </Link>
          </div>
        )
          :
          <div className='position-absolute top-0 bottom-0 end-0 start-0 bg-primary d-flex justify-content-center align-items-center'>
            <div>
              <div className="spinner-grow text-muted" />
              <div className="spinner-grow text-primary" />
              <div className="spinner-grow text-success" />
              <div className="spinner-grow text-info" />
              <div className="spinner-grow text-warning" />
              <div className="spinner-grow text-danger" />
              <div className="spinner-grow text-secondary" />
              <div className="spinner-grow text-dark" />
              <div className="spinner-grow text-light" />
            </div>

          </div>

        }


      </div>

    </div>
    
  </>
  
}
