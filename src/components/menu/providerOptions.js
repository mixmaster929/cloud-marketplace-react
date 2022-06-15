import WalletConnect from "@walletconnect/web3-provider";
import { providers } from "web3modal";
import WalletLink from "walletlink";
const { ethereum } = window;

export const providerOptions = !ethereum ? {
    walletconnect: {
      package: WalletConnect, // required
      options: {
        infuraId: "223f20f418c34a758240a7f416435110", // Required
        network: "mainnet",
        qrcodeModalOptions: {
          mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
        }
      }
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: "Web 3 Modal",
        infuraId: "223f20f418c34a758240a7f416435110"
      }
    },
    "custom-metamask": {
      display: {
        logo: providers.METAMASK.logo,
        name: 'Install MetaMask',
        description: 'Connect using browser wallet'
      },
      package: {},
      connector: async () => {
        window.open('https://metamask.io')
        throw new Error('MetaMask not installed');
      }
    }
  } : ethereum.isCoinbaseWallet ? {
    walletconnect: {
      package: WalletConnect, // required
      options: {
        infuraId: "223f20f418c34a758240a7f416435110", // Required
        network: "mainnet",
        qrcodeModalOptions: {
          mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
        }
      }
    },
    "custom-metamask": {
      display: {
        logo: providers.METAMASK.logo,
        name: 'Install MetaMask',
        description: 'Connect using browser wallet'
      },
      package: {},
      connector: async () => {
        window.open('https://metamask.io')
        throw new Error('MetaMask not installed');
      }
    }
  } : {
    walletconnect: {
      package: WalletConnect, // required
      options: {
        infuraId: "223f20f418c34a758240a7f416435110", // Required
        network: "mainnet",
        qrcodeModalOptions: {
          mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
        }
      }
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: "Web 3 Modal",
        infuraId: "223f20f418c34a758240a7f416435110"
      }
    },
  };

// export const providerOptions = {
//   walletlink: {
//     package: WalletLink, // Required
//     options: {
//       appName: "Web 3 Modal Demo", // Required
//       infuraId: "223f20f418c34a758240a7f416435110" // Required unless you provide a JSON RPC url; see `rpc` below
//     }
//   },
//   walletconnect: {
//     package: WalletConnect, // required
//     options: {
//         infuraId: "223f20f418c34a758240a7f416435110", // Required
//         network: "mainnet",
//         qrcodeModalOptions: {
//             mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
//         }
//     }
//   }
// };
