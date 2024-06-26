import React from "react";

function Footer() {
  return (
    <footer className="shadow border border-[#ADA7C3]">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://twitter.com/openbookdex" className="hover:underline">
            Openbook Team
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://twitter.com/openbookdex"
              className="mr-4 hover:underline md:mr-6"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/openbook-dex"
              className="mr-4 hover:underline md:mr-6"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="gofuckyourselfifyouwanttocontactus@weloveyou.shit"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
