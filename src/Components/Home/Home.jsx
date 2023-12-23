import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
export default function Home() {

  const [MainMeal, setMainMeal] = useState([])

  let getMainMeal = async () => {
    let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)
    setMainMeal(data.meals)
  }

  // console.log(MainMeal);
  useEffect(() => {

    getMainMeal()

  }, [])

  const [search, setsearch] = useState([])


  let Search = async (word) => {
    let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    setsearch(data.meals)
  }


  return <>


    <Helmet>
      <title>
        Meals
      </title>
    </Helmet>
    <div className="container">

      <form className="d-flex my-4" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => Search(e.target.value)} />

      </form>
      {search?<div className='container my-5 '>
      <div className="row gx-2 gy-4">
        {search.map((meal, index) =>

          <div className="col-md-3" key={index}>
            <Link to={`/details/${meal.idMeal}`}>
              <div className={Style.meal}>
                <img src={meal.strMealThumb} className='w-100' alt="" />

                <div className={`${Style.memberCaption} d-flex justify-content-center align-items-center fa-2x text-center`}>
                  <p>{meal.strMeal}</p>
                </div>
              </div>

            </Link>
          </div>
        )}

      </div>
    </div>:""}
    </div>
    













    <div className='container my-5 '>

      <div className="row gx-2 gy-2">
        {MainMeal.length > 0 ? MainMeal.map((meal, index) =>
          <div className="col-md-3" key={index}>
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
