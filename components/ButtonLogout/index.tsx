import { useUserContext } from "@/contexts/userContext";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import walletLists from "../ButtonConnect/walletLists";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [ordinalsAddress, setOrdinalsAddress] = useState("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const [copyOrdinalsSuccessfull, setCopyOrdinalsSuccessful] = useState(false);
  const [copyPaymentSuccessful, setCopyPaymentSuccessful] = useState(false);
  const { isConnected, signOut } = useUserContext();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOrdinalsCopy = async () => {
    try {
      await navigator.clipboard.writeText(ordinalsAddress);
      const shortAddress = `${ordinalsAddress.slice(
        0,
        8
      )}...${ordinalsAddress.slice(-8)}`;
      toast.success("Ordinals Address copied to clipboard! \n" + shortAddress);
      setCopyOrdinalsSuccessful(true);
    } catch (e) {
      toast.error("Failed to copy text:" + e);
    } finally {
      setTimeout(() => setCopyOrdinalsSuccessful(false), 5000);
    }
  };

  const handlePaymentCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentAddress);
      const shortAddress = `${paymentAddress.slice(
        0,
        8
      )}...${paymentAddress.slice(-8)}`;
      toast.success("BTC Address copied to clipboard! \n" + shortAddress);
      setCopyPaymentSuccessful(true);
    } catch (err) {
      toast.error("Failed to copy text: " + err);
    } finally {
      setTimeout(() => setCopyPaymentSuccessful(false), 5000);
    }
  };

  const disconnectWallet = () => {
    Cookies.remove("connectedInfo");
    signOut();
    toast.success("Wallet disconnected");
    onClose();
  };

  useEffect(() => {
    const connectedInfoStr = Cookies.get("connectedInfo");
    if (connectedInfoStr) {
      const connectedInfo = JSON.parse(connectedInfoStr);
      const currentTime = new Date().getTime();
      const hoursDiff =
        (currentTime - connectedInfo.connectTime) / (1000 * 60 * 60);
      if (hoursDiff <= 24) {
        setOrdinalsAddress(connectedInfo.ordinalsAddress);
        setPaymentAddress(connectedInfo.paymentAddress);
      } else {
        disconnectWallet();
      }
    } else {
      onClose();
    }
  }, []);

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
                    Your Wallet
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
                      <div className="pb-4">
                        <h3 className={"text-center font-bold"}>
                          Ordinals Address :
                        </h3>
                        <div className="group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 mb-5">
                          <div className="flex-auto text-center ml-10">
                            {ordinalsAddress.slice(0, 10)} ...{" "}
                            {ordinalsAddress.slice(-10)}
                          </div>
                          <DocumentDuplicateIcon
                            className="h-5 w-5"
                            onClick={handleOrdinalsCopy}
                          />
                        </div>
                        <h3 className={"text-center font-bold"}>
                          Payment Address :
                        </h3>
                        <div className="group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                          <div className="flex-auto text-center ml-10">
                            {paymentAddress.slice(0, 10)} ...{" "}
                            {paymentAddress.slice(-10)}
                          </div>
                          <DocumentDuplicateIcon
                            className="h-5 w-5"
                            onClick={handlePaymentCopy}
                          />
                        </div>
                      </div>
                    </Transition>

                    <button
                      type={"button"}
                      className={
                        "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      }
                      onClick={disconnectWallet}
                    >
                      Disconnect Wallet
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

export default LogoutModal;
