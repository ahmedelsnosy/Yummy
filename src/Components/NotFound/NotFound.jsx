import React from 'react'
import { Link } from 'react-router-dom'
import Style from './NotFound.module.css'
export default function NotFound() {
  return <>
  
    <section class={Style.page_404}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class={Style.four_zero_four_bg}>
                <h1 class="text-center ">404</h1>


              </div>

              <div class={Style.contant_box_404}>
                <h3 class={Style.h2}>
                  Look like you're lost
                </h3>

                <p>the page you are looking for not avaible!</p>

                <Link to="" class={Style.link_404}>Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
