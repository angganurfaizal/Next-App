import { Dialog, Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import walletLists from "./walletLists";

export default function ButtonConnect({ className }: IProp) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button type={"button"} className={className} onClick={openModal}>
        Connect Wallet <span aria-hidden={"true"}>&rarr;</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as={"div"} className={"relative z-10"} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter={"ease-out duration-300"}
            enterFrom={"opacity-0"}
            enterTo={"opacity-100"}
            leave={"ease-in duration-200"}
            leaveFrom={"opacity-100"}
            leaveTo={"opacity-0"}
          >
            <div className={"fixed inset-0 bg-black bg-opacity-25"} />
          </Transition.Child>

          <div className={"fixed inset-0 overflow-y-auto"}>
            <div
              className={
                "flex min-h-full items-center justify-center p-4 text-center"
              }
            >
              <Transition.Child
                as={Fragment}
                enter={"ease-out duration-300"}
                enterFrom={"opacity-0 scale-95"}
                enterTo={"opacity-100 scale-100"}
                leave={"ease-in duration-200"}
                leaveFrom={"opacity-100 scale-100"}
                leaveTo={"opacity-0 scale-95"}
              >
                <Dialog.Panel
                  className={
                    "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  }
                >
                  <Dialog.Title
                    as={"h3"}
                    className={"text-lg font-medium leading-6 text-gray-900"}
                  >
                    Connect Wallet
                  </Dialog.Title>
                  <div className={"mt-2"}>
                    <p className={"text-sm text-gray-500"}>blabla testing</p>
                  </div>
                  <div className={"mt-4"}>
                    <Transition
                      as={Fragment}
                      enter={"transition ease-out duration-200"}
                      enterFrom={"opacity-0 translate-y-1"}
                      enterTo={"opacity-100 translate-y-0"}
                      leave={"transition ease-in duration-150"}
                      leaveFrom={"opacity-100 translate-y-0"}
                      leaveTo={"opacity-0 translate-y-1"}
                    >
                      <div className={"p-4"}>
                        {walletLists.map((item) => (
                          <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"></div>
                            <div className="flex-auto">{item.name}</div>
                          </div>
                        ))}
                      </div>
                    </Transition>

                    <button
                      type={"button"}
                      className={
                        "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      }
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

interface IProp {
  className: string;
}
