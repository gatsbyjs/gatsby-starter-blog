import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import grey from "../images/grey2.jpg"
import clouds from "../images/clouds.jpg"
import earth from "../images/earth.jpg"

const IndexPage = () => (
  <Layout>
    <div
      id="carouselExampleControls"
      class="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner relative w-full overflow-hidden">
        <div class="carousel-item active relative float-left w-full">
          <img
            src={grey}
            class="block w-full"
            alt="Wild Landscape"
          />
        </div>
        <div class="carousel-item relative float-left w-full">
          <img
            src={clouds}
            class="block w-full"
            alt="Camera"
          />
        </div>
        <div class="carousel-item relative float-left w-full">
          <img
            src={earth}
            class="block w-full"
            alt="Exotic Fruits"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span
          class="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </Layout>
)

export const Head = () => <Seo title="HOME" />

export default IndexPage
