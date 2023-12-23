import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';
import Style from './DetailsForCategory.module.css'
import { useState } from 'react';
import Helmet from 'react-helmet'
export default function DetailsForCategory() {

    let params = useParams();
    const [MealsForCategory, setMealsForCategory] = useState([])

    let getMealsForCtegorry = async () => {
        let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.NameOfMeal}`)
        setMealsForCategory(data.meals);
    }

    useEffect(() => {

        getMealsForCtegorry();

    }, [])


    return <>
        <Helmet>
            <title>
                Details For Categories
            </title>
        </Helmet>
        <div div className='container my-5 ' >
            <div className="row gx-2 gy-2">
                {MealsForCategory.length > 0 ? MealsForCategory.map((meal, index) =>
                    <div className="col-md-3 " key={index}>
                        <Link to={`/details/${meal.idMeal}`}>
                            <div className={`${Style.meal}  `}>
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
                    </div>}

            </div>

        </div >

    </>
}
