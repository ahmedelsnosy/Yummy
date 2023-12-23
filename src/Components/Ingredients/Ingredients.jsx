import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
export default function Ingredients() {
    
    
    const [ingredients, setingredients] = useState([])

    let getIngredients = async () => {
        let { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        setingredients(data.meals)
    }


    useEffect(() => {

        getIngredients()

    }, [])
    
    
    
    return <>
        <Helmet>
            <title>
                Ingredients
            </title>
        </Helmet>
        
        <div className="container">
            <div className="row gx-3 gy-3 ">
                {ingredients.length > 0 ?

                    ingredients.map((ingredients) =>
                        <div className="col-md-3  text-center ">
                            <div className="bg-primary  p-5 shadow-lg">
                                <Link className='text-decoration-none text-white' to={`/DetailsForIngredients/${ingredients.strIngredient}`}>
                                    <i className="text-white my-2 fa-solid fa-bowl-food fa-3x"></i>
                                    <h5>{ingredients.strIngredient}</h5>
                                </Link>
                            </div>
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
