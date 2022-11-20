import * as React from "react"
import { Link } from "gatsby"
import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"

const navigation = [
  { name: "HOME", href: "/", current: false },
  { name: "WORK", href: "/work", current: false },
  { name: "ABOUT", href: "/about", current: false },
  { name: "BLOG", href: "/blog", current: false },
  { name: "CONTACT", href: "/contact", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Header = ({ siteTitle }) => (
  <Disclosure
    as="header"
    className="sticky top-0 z-30 max-w-7xl mx-auto bg-white dark:bg-black transition-all"
  >
    {({ open }) => (
      <>
        <div className="flex items-center justify-between h-20">
          <div className="px-4">
            <a href="/">
              <svg
                width={240}
                height={40}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2160 360"
                className="text-black dark:text-white"
                fill="currentColor"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect x="2061" y="70" width="20" height="20" fill="none" />
                  </clipPath>
                </defs>
                <path d="M83.57,288.38c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21V98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9h137.7c14.1,0,17.7,4.2,17.7,31.5,0,6.3-1.5,8.7-5.1,8.7-6.6,0-7.8-6-20.7-13.5-10.2-6-24-6.3-47.1-6.3-32.1,0-35.1,1.5-35.1,21v49.2h52.2c17.4,0,18-10.2,26.1-10.2,6.6,0,8.1,6.6,8.1,19.2,0,16.8-.3,22.2-7.8,22.2-9,0-6.3-10.8-26.7-10.8H131v53.7c0,32.4,2.4,34.5,19.2,34.5,43.2,0,69-3,76.2-13.8,4.8-7.2,9-11.1,14.1-11.1,6.3,0,8.7,4.5,8.7,9.6,0,27.3-6,35.7-21.9,35.7Z" />
                <path d="M273.77,288.38c-12,0-15-3.3-15-9,0-12.9,23.4-5.1,23.4-21V98.78c0-15.9-23.4-8.1-23.4-21,0-5.7,4.2-9,10.2-9h44.4c15,0,28.2,17.4,117,147h.6v-117c0-15.9-18-8.1-18-21,0-5.7,3-9,13.8-9h30.6c10.8,0,13.8,3.3,13.8,9,0,12.9-18,5.1-18,21v173.4c0,14.7-.6,19.2-13.5,19.2-6.6,0-9.6-.3-13.2-5.4L305.27,115h-.9v143.4c0,15.9,20.4,8.1,20.4,21,0,5.7-3,9-13.8,9Z" />
                <path d="M641,258.38c0,15.9,19.8,8.1,19.8,21,0,5.7-3,9-13.8,9h-53.4c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21V98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9H677c60.6,0,89.7,24.6,89.7,57.6,0,54-60.3,77.4-125.7,77.4Zm0-73.8c43.2,0,77.7-22.2,77.7-55.2,0-25.8-16.5-40.2-49.2-40.2-20.7,0-28.5,3-28.5,19.2Z" />
                <path d="M791.56,98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9H839c10.8,0,13.8,3.3,13.8,9,0,12.9-16.8,5.1-16.8,21v154.8c0,11.4,2.4,14.4,35.41,14.4,63.6,0,55.8-28.2,71.4-28.2,4.2,0,6.6,3,6.6,11.7,0,13.5-7.2,36.9-24,36.9H788.56c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21Z" />
                <path d="M968.56,288.38c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21V98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9h137.7c14.1,0,17.7,4.2,17.7,31.5,0,6.3-1.5,8.7-5.1,8.7-6.6,0-7.8-6-20.7-13.5-10.2-6-24-6.3-47.1-6.3-32.1,0-35.1,1.5-35.1,21v49.2h52.2c17.4,0,18-10.2,26.1-10.2,6.6,0,8.1,6.6,8.1,19.2,0,16.8-.3,22.2-7.8,22.2-9,0-6.3-10.8-26.7-10.8H1016v53.7c0,32.4,2.4,34.5,19.2,34.5,43.2,0,69-3,76.2-13.8,4.8-7.2,9-11.1,14.1-11.1,6.3,0,8.7,4.5,8.7,9.6,0,27.3-6,35.7-21.9,35.7Z" />
                <path d="M1205.26,258.38c0,15.9,16.8,8.1,16.8,21,0,5.7-3,9-13.8,9h-50.4c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21V98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9h50.4c10.8,0,13.8,3.3,13.8,9,0,12.9-16.8,5.1-16.8,21Z" />
                <path d="M1251.76,288.38c-12,0-15-3.3-15-9,0-12.9,23.4-5.1,23.4-21V98.78c0-15.9-23.4-8.1-23.4-21,0-5.7,4.2-9,10.2-9h44.4c15,0,28.2,17.4,117,147h.6v-117c0-15.9-18-8.1-18-21,0-5.7,3-9,13.8-9h30.6c10.8,0,13.8,3.3,13.8,9,0,12.9-18,5.1-18,21v173.4c0,14.7-.6,19.2-13.5,19.2-6.6,0-9.6-.3-13.2-5.4l-121.2-171h-.9v143.4c0,15.9,20.4,8.1,20.4,21,0,5.7-3,9-13.8,9Z" />
                <path d="M1606.36,214.58c-4.5,11.1-13.2,41.4-13.2,48,0,8.4,15.3,4.8,15.3,17.4,0,6.9-3.9,8.4-9.91,8.4h-40.8c-5.4,0-8.1-3.6-8.1-8.4,0-13.8,13.81-6.6,18.31-21.6,23.7-78.9,56.1-151.8,75-183.6,4.8-8.1,8.4-10.8,18.6-10.8,11.4,0,13.5,1.5,15.6,5.4,36,63.6,60.9,145.5,78.3,191.4,3.9,10.5,15.3,4.8,15.3,18.6,0,6.6-4.2,9-10.2,9h-56.4c-6,0-8.7-2.4-8.7-8.4,0-12.6,13.8-9.6,13.8-16.8,0-6-5.7-19.8-14.7-48.6Zm80.1-21.6-36.9-90-36,90Z" />
                <path d="M1838.25,258.38c0,15.9,16.8,8.1,16.8,21,0,5.7-3,9-13.8,9h-50.4c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21V98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9h50.4c10.8,0,13.8,3.3,13.8,9,0,12.9-16.8,5.1-16.8,21Z" />
                <path d="M1883.55,288.38c-10.8,0-13.8-3.3-13.8-9,0-12.9,16.8-5.1,16.8-21V98.78c0-15.9-16.8-8.1-16.8-21,0-5.7,3-9,13.8-9h100.2c42.6,0,75.3,13.8,75.3,54.6,0,25.2-23.7,42.6-46.5,50.4v.6c19.2,26.1,31.8,52.8,44.41,82.5,6.59,15.6,21,11.1,21,23.7,0,4.8-3,7.8-8.41,7.8h-67.2c-4.2,0-7.2-3-7.2-8.4,0-11.4,13.8-5.4,13.8-16.8,0-15.9-28.2-60-39-76.8l-39,7.2v64.8c0,15.9,16.8,8.1,16.8,21,0,5.7-3,9-13.8,9Zm47.4-115.2c28.2-3.6,80.1-10.8,80.1-47.4,0-24-14.1-36.6-51.6-36.6-20.7,0-28.5,6.6-28.5,19.2Z" />
                <g clip-path="url(#clip-path)">
                  <g clip-path="url(#clip-path)">
                    <path d="M2071,72.5a7.45,7.45,0,1,1-2.92.59,7.47,7.47,0,0,1,2.92-.59m0-2.5a10,10,0,1,0,10,10,10,10,0,0,0-10-10" />
                  </g>
                  <path d="M2067.23,84.35V75.76h3.65a6.39,6.39,0,0,1,2,.23,2,2,0,0,1,1,.82,2.5,2.5,0,0,1,.37,1.36,2.32,2.32,0,0,1-.56,1.59,2.75,2.75,0,0,1-1.7.8,4.4,4.4,0,0,1,.93.72,10.18,10.18,0,0,1,1,1.39l1,1.68h-2.07l-1.26-1.87a11.34,11.34,0,0,0-.91-1.26,1.29,1.29,0,0,0-.52-.36,3.06,3.06,0,0,0-.88-.1H2069v3.59Zm1.73-5h1.29a6.65,6.65,0,0,0,1.55-.1.91.91,0,0,0,.49-.37,1.08,1.08,0,0,0,.18-.64,1.05,1.05,0,0,0-.23-.7,1.11,1.11,0,0,0-.66-.34q-.21,0-1.26,0H2069Z" />
                </g>
              </svg>
            </a>
          </div>
          <div className="hidden md:flex px-6 pb-2 text-black dark:text-white">
            <Link
              to="/"
              className="px-4 font-bold hover:text-gray-500 dark:hover:text-gray-300"
            >
              HOME
            </Link>
            <Link
              to="/work"
              className="px-4 font-bold hover:text-gray-500 dark:hover:text-gray-300"
            >
              WORK
            </Link>
            {/* About Dropdown */}
            <Menu as="div" className="px-4">
              <div>
                <Menu.Button>
                  {({ active }) => (
                    <button
                      href="#"
                      className={classNames(
                        active ? "" : "",
                        "font-bold hover:text-gray-500 dark:hover:text-gray-300"
                      )}
                    >
                      ABOUT
                    </button>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Menu.Items className="absolute px-2 py-1 z-10 mt-2 text-center rounded-none shadow-lg bg-white border border-gray-200 dark:bg-black dark:border-gray-200 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/about"
                        className={classNames(
                          active ? "" : "",
                          "font-bold text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-300 block py-2"
                        )}
                      >
                        ABOUT US
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/about/privacypolicy"
                        className={classNames(
                          active ? "" : "",
                          "font-bold text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-300 block py-2"
                        )}
                      >
                        PRIVACY POLICY
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <Link
              to="/blog"
              className="px-4 font-bold hover:text-gray-500 dark:hover:text-gray-300"
            >
              BLOG
            </Link>
            <Link
              to="/contact"
              className="pl-4 font-bold hover:text-gray-500 dark:hover:text-gray-300"
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Disclosure.Button className="px-4 text-black dark:text-white hover:text-gray-500 md:hidden">
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </Disclosure.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel
              as="nav"
              className="md:hidden absolute top-16 z-10 mt-2 w-full rounded-md bg-white dark:bg-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              aria-label="Global"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 pt-2 pb-3 px-2 space-y-1 hover:text-gray-500">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    as="a"
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 dark:bg-black text-black dark:text-white"
                        : "text-black dark:text-white",
                      "block rounded-md py-2 px-3 font-bold"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      </>
    )}
  </Disclosure>
)

export default Header
