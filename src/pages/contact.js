import * as React from "react"
import Layout from "../components/layout"
import emailjs from "@emailjs/browser";
import Seo from "../components/seo"
import PrimaryButton from "../components/primaryButton";

const SERVICE_ID = "service_vphekzy"
const TEMPLATE_ID = "template_34np12r"
const USER_ID = "6Ay6_hkUtksoaqV2_"

const onSubmit = e => {
  e.preventDefault()
  emailjs
    .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
    .then(alert("Message Received!"))
  e.target.reset()
}

const Contact = () => (
  <Layout>
    <div class="max-w-7xl px-6 mx-auto flex items-center">
      <div className="text-center sm:text-left sm:w-1/3 text-black dark:text-white">
        <h1 className="text-2xl leading-6 font-bold pb-8">CONTACT</h1>
        <h1 className="text-lg leading-6 font-bold">ADDRESS</h1>
        <p className="pb-4 font-medium">
          14 OAKSEY GROVE
          <br />
          BRISTOL
          <br />
          UNITED KINGDOM
          <br />
          BS48 2TP
        </p>
        <h1 className="text-lg leading-6 font-bold pt-4">PHONE</h1>
        <p className="pb-4 font-medium">01234 567890</p>
        <h1 className="text-lg leading-6 font-bold pt-4">EMAIL</h1>
        <p className="font-medium">CONTACT@ENPLEINAIR.COM</p>
      </div>
      <form
        class="sm:w-2/3 px-2 py-4 sm:py-0 text-black dark:text-white"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label class="uppercase text-sm font-bold" htmlFor="from_name">
              First Name
            </label>
            <input
              class="appearance-none mt-1 w-full bg-white dark:bg-black text-gray-700 dark:text-white border py-3 px-2 focus:outline-none"
              id="grid-first-name"
              name="first_name"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <label class="uppercase text-sm font-bold" htmlFor="from_name">
              Last Name
            </label>
            <input
              class="appearance-none mt-1 w-full bg-white dark:bg-black text-gray-700 dark:text-white border py-3 px-2 focus:outline-none"
              id="grid-last-name"
              name="last_name"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="mt-2">
          <label class="block uppercase text-sm font-bold" htmlFor="from_name">
            E-mail
          </label>
          <input
            class="mt-1 block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 py-3 px-4 leading-tight focus:outline-none"
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div className="mt-2">
          <label class="block uppercase text-sm font-bold" htmlFor="from_name">
            Message
          </label>
          <textarea
            name="message"
            class="no-resize appearance-none mt-1 block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none h-40 resize-none"
            id="message"
          ></textarea>
        </div>
        <PrimaryButton text="SEND" type="submit" />
      </form>
    </div>
  </Layout>
)

export const Head = () => <Seo title="CONTACT" />

export default Contact
