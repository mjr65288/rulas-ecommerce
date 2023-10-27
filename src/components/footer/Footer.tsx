import React from "react";

export default function Footer(props: any) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-cyan-500"
            : "relative") + " pb-2"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-cyan-500" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-20 md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.canogaperkins.net/"
                  target="_blank"
                  className="
                  text-white
                  text-sm
                  font-semibold
                  hover:opacity-75
                  subpixel-antialiased"
                >
                  CANOGA PERKINS
                </a>
              </div>
            </div>
            <div className="w-20 md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://www.canogaperkins.net/about-us"
                    target="_blank"
                    className="
                     text-white
                     text-sm
                     font-semibold
                     hover:opacity-75
                     subpixel-antialiased"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
