function xversButton() {
  console.log("XverseCli");
}
function hiroButton() {
  console.log("hiroButton");
}

function unisatButton() {
  console.log("hiroButton");
}
const walletLists = [
  {
    name: "Xverse",
    icon: "XMarkIcon",
    onClick: () => {
      xversButton;
    },
  },

  {
    name: "Hiro",
    icon: "XMarkIcon",
    onClick: () => {
      hiroButton;
    },
  },

  {
    name: "Unisat",
    icon: "XMarkIcon",
    onClick: () => {
      unisatButton;
    },
  },
];

export default walletLists;
