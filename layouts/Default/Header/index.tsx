import React, { Fragment } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  ChevronDownIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ButtonConnect from "@/components/ButtonConnect";
const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <div className={"fixed z-10 w-[100%] top-0 bg-black will-change-transform"}>
      <header className={"text-white"}>
        <nav
          className={
            "flex mx-auto max-w-7xl items-center justify-between p-6 lg:px8"
          }
          aria-label={"Global"}
        >
          <div className={"flex lg:flex-1"}>
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className={"flex lg:hidden"}>
            <button
              type={"button"}
              className={
                "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              }
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className={"h-6 w-6"} aria-hidden={"true"} />
            </button>
          </div>
          <Popover.Group className={"hidden lg:flex lg:gap-x-12"}>
            <Popover className={"relative"}>
              <Popover.Button
                className={
                  "flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
                }
              >
                Products
                <ChevronDownIcon
                  className={"h-5 w-5 flex-none text-white"}
                  aria-hidden={"true"}
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter={"transition ease-out duration-200"}
                enterFrom={"opacity-0 translate-y-1"}
                enterTo={"opacity-100 translate-y-0"}
                leave={"transition ease-in duration-150"}
                leaveFrom={"opacity-100 translate-y-0"}
                leaveTo={"opacity-0 translate-y-1"}
              >
                <Popover.Panel
                  className={
                    "absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-white"
                  }
                >
                  <div className={"p-4"}>
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className={
                              "h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            }
                            aria-hidden={"true"}
                          />
                        </div>
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className={"block font-semibold text-gray-600"}
                          >
                            {item.name}
                            <span className={"absolute inset-0"} />
                          </a>
                          <p className={"mt-1 text-gray-600"}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <Link
              href={"#"}
              className={"text-sm font-semibold leading-6 text-white"}
            >
              Features
            </Link>
            <Link
              href={"#"}
              className={"text-sm font-semibold leading-6 text-white"}
            >
              Marketplace
            </Link>
            <Link
              href={"#"}
              className={"text-sm font-semibold leading-6 text-white"}
            >
              Company
            </Link>
          </Popover.Group>
          <div className={"hidden lg:flex lg:flex-1 lg:justify-end"}>
            <ButtonConnect
              className={"text-sm font-semibold leading-6 text-white"}
            />
          </div>
        </nav>
        <Dialog
          as="div"
          className={"lg:hidden"}
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className={"fixed inset-0 z-10"} />
          <Dialog.Panel
            className={
              "fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:ring-1 sm:ring-gray-100/10"
            }
          >
            <div className={"flex items-center justify-between"}>
              <Link href={"#"} className={"-m-1.5 p-1.5"}>
                <span className={"sr-only"}>Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
              <button
                type={"button"}
                className={"-m-2.5 rounded-md p-2.5 text-white"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={"sr-only"}>Close Menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden={"true"} />
              </button>
            </div>
            <div className={"mt-6 flow-root text-right"}>
              <div className={"space-y-6 py-6 "}>
                <Disclosure as={"div"} className={"-mx-3"}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={
                          "flex w-full items-center justify-end rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-white"
                        }
                      >
                        <span>Products</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden={"true"}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className={"mt-2 space-y-2"}>
                        {products.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={
                              "block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-900"
                            }
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className={
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                  }
                >
                  Features
                </a>
                <a
                  href="#"
                  className={
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                  }
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className={
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                  }
                >
                  Company
                </a>
                <ButtonConnect
                  className={
                    "text-right block w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                  }
                />
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;
