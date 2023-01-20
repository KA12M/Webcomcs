import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";

const Footer = () => {
  const {
    settingStore: { setting },
  } = useStore();

  return (
    <footer className="p-4 bg-gray-800 sm:p-6 dark:bg-gray-900 bottom-0">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <a href="/" className="flex items-center">
            <img src={setting?.logoPreview!} className="h-8 mr-3" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              วิทยาการคอมพิวเตอร์
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase  text-white">
              Resources
            </h2>
            <ul className=" text-gray-400">
              <li className="mb-4">
                <a href="https://flowbite.com/" className="hover:underline">
                  Flowbite
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com/" className="hover:underline">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
              Follow us
            </h2>
            <ul className=" text-gray-400">
              <li className="mb-4">
                <a
                  href="https://github.com/themesberg/flowbite"
                  className="hover:underline "
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/4eeurUVvTy"
                  className="hover:underline"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Legal
            </h2>
            <ul className=" text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm sm:text-center text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a href="#" className="text-gray-500   hover:text-white">
            icon
            <span className="sr-only">Facebook page</span>
          </a>
          <a
            href="#"
            className="text-gray-500  hover:text-white"
          >
            icon
            <span className="sr-only">Instagram page</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white"
          >
            icon
            <span className="sr-only">Twitter page</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white"
          >
            icon
            <span className="sr-only">GitHub account</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white"
          >
            icon
            <span className="sr-only">Dribbbel account</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default observer(Footer);
