import { Dialog, Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import walletLists from "./walletLists";
import { useUserContext } from "@/contexts/userContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AddressPurposes, getAddress } from "sats-connect";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface loginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddressResponse {
  addresses: { address: string }[];
}

const loginModal: React.FC<loginModalProps> = ({ isOpen, onClose }) => {
  const { isConnected, setIsConnected, ordinalsAddress, setOrdinalsAddress } =
    useUserContext();
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      checkWalletConnection(); //call checkWalletConnect function
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const checkWalletConnection = () => {
    const connectedInfoStr = Cookies.get("connectedInfo");
    if (connectedInfoStr) {
      const connectedInfo = JSON.parse(connectedInfoStr);
      const currentTime = new Date().getTime();
      const hoursDiff =
        (currentTime - connectedInfo.connectTime) / (1000 * 60 * 60);
      //if difference is less than or equal to 24 hours, then maintain the connection
      if (hoursDiff <= 24) {
        setOrdinalsAddress(connectedInfo.ordinalsAddress);
        setIsConnected(true);
        toast.success("Connected to wallet Successfully!");
        onClose();
      } else {
        Cookies.remove("connectedInfo");
        setIsConnected(false);
        setOrdinalsAddress("");
      }
    }
  };

  const connectWallet = async (walletType: string) => {
    if (walletType === "Unisat") {
      connectUnisatWallet(walletType);
    } else if (walletType === "Xverse") {
      connectXverseWallet(walletType);
    } else if (walletType === "Hiro") {
      connectHiroWallet(walletType);
    }
  };

  const connectUnisatWallet = async (walletType: string) => {
    try {
      //Check if the Unisat Wallet is Installed
      const unisat = (window as any).unisat;
      if (typeof unisat !== "undefined") {
        let accounts = await unisat.requestAccounts();
        //After Successfull getting the accounts
        if (accounts && accounts[0]) {
          const connectedInfo = {
            ordinalsAddress: accounts[0],
            paymentAddress: accounts[0],
            connectTime: new Date().getTime(),
          };
          Cookies.set("connectedInfo", JSON.stringify(connectedInfo), {
            expires: 1,
          });
          setOrdinalsAddress(accounts[0]);
          setIsConnected(true);
          toast.success("Connected to Unisat wallet Successfully!");
          onClose();
        } else {
          toast.error("Failed to Connect Unisat Wallet");
        }
      } else {
        toast.error("Unisat wallet is not installed");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occured while trying to connect to Unisat Wallet");
    }
  };

  const connectXverseWallet = async (walletType: string) => {
    const getAddressOptions = {
      payload: {
        purposes: [AddressPurposes.ORDINALS, AddressPurposes.PAYMENT],
        message: `Address for receiving Ordinals using ${walletType}`,
        network: {
          type: "Mainnet" as const,
        },
      },
      onFinish: (response: AddressResponse) => {
        const connectedInfo = {
          ordinalsAddress: response.addresses[0].address,
          paymentAddress: response.addresses[1].address,
          connecttime: new Date().getTime(),
        };
        Cookies.set("connectedInfo", JSON.stringify(connectedInfo), {
          expires: 1,
        });
        setOrdinalsAddress(response.addresses[0].address);
        setIsConnected(true);
        toast.success("Connected to wallet Xverse Successfully!");
        onClose();
      },
      onCancel: () => toast.error("Request Canceled"),
    };
    getAddress(getAddressOptions);
  };

  const connectHiroWallet = async (walletType: string) => {
    // Call Hiro API here
    toast.error("Hiro Wallet Not Supported: Coming Soon!");
  };

  if (!isVisible) return null;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as={"div"} className={"relative z-10"} onClose={onClose}>
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
                            className="group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                            onClick={() => connectWallet(item.walletType)}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                              <img src={item.icon} />
                            </div>
                            <div className="flex-auto">
                              Connect to {item.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Transition>

                    <button
                      type={"button"}
                      className={
                        "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      }
                      onClick={onClose}
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
};

export default loginModal;
