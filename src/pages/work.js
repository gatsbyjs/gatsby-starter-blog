import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import grey from "../images/grey2.jpg"

const Work = () => (
  <Layout>
    <div className="grid md:grid-cols-4 gap-2 px-6">
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
      <div>
        <img src={grey} alt="sunset"></img>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="WORK" />

export default Work
