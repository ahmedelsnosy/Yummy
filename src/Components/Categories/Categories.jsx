import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

export default function Categories() {
  
  const [Categories, setCategories] = useState([])
  
  let getCategories = async() => {
    let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    setCategories(data.categories)
  }  
 useEffect(() => {
  
   getCategories()

 }, [])
 
  return <>
    <Helmet>
      <title>
        Categories
      </title>
    </Helmet>
    <div className='container my-5 '>
      <div className="row gx-2 gy-2">
        {Categories.length > 0 ? Categories.map((meal, index) =>
            <div className="col-md-3 " key={index}>
            <Link to={`/DetailsForCategory/${meal.strCategory}`}>
            <div className={`${Style.meal}  ` }>
              <img src={meal.strCategoryThumb} className='w-100' alt="" />

              <div className={`${Style.memberCaption} d-flex justify-content-center align-items-center fa-2x text-center`}>
                <p>{meal.strCategory}</p>
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

          </div>}

      </div>

    </div>
  </>
}
