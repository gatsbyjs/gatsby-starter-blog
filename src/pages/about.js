import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import sunset from "../images/sunset.jpg"

const About = () => (
  <Layout>
    <div className="grid grid-cols-2">
        <div className="px-6">
            <img src={sunset} alt="sunset"/>
        </div>
      <div className="text-center max-w-7xl flex flex-col py-8 px-6 text-black dark:text-white">
        <p className="font-bold text-lg leading-6">
          Conceptualized in 2020, and made into reality in 2022, EN PLEIN AIR is
          a Film Production company based in Bristol, United Kingdom.{" "}
          <em>En Plein Air</em> (Which is French for "outdoors") is derived from
          the French Impressionist movement characterised as a crucial element
          of human perception and experience of art itself.
        </p>
        <p className="font-bold text-lg leading-6 mt-4">
          By working alongside the individuals who embody the values held by the
          film and art cultures appreciated throughout the United Kingdom, En
          Plein Air unites these characteristics, dedicating its brand to the
          outsiders.
        </p>
        <p className="font-bold text-lg leading-6 mt-4">
          En Plein Air is committed to providing clients with high concept
          corporate films. This is a platform in which each supporter can
          uniquely identify with, and work together.
        </p>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="ABOUT" />

export default About
