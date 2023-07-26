import L from "leaflet";
import headphone_red from "../../assets/logos/headphone_red.svg";
import headphone_green from "../../assets/logos/headphone_green.svg";

import phone_green from "../../assets/logos/phone_green.svg";
import phone_red from "../../assets/logos/phone_red.svg";

import wallet_green from "../../assets/logos/wallet_green.svg";
import wallet_red from "../../assets/logos/wallet_red.svg";

import key_green from "../../assets/logos/key_green.svg";
import key_red from "../../assets/logos/key_red.svg";

import others_red from "../../assets/logos/others_red.svg";
import others_green from "../../assets/logos/others_green.svg";
import others_black from "../../assets/logos/others_black.svg";

import fly_img from "../../assets/images/fly_img.png";

const headphoneLost = L.icon({
  iconUrl: headphone_red,
  iconSize: [50, 50],
});

const headphoneFound = L.icon({
  iconUrl: headphone_green,
  iconSize: [50, 50],
});

const phoneLost = L.icon({
  iconUrl: phone_red,
  iconSize: [50, 50],
});

const phoneFound = L.icon({
  iconUrl: phone_green,
  iconSize: [50, 50],
});

const keyLost = L.icon({
  iconUrl: key_red,
  iconSize: [50, 50],
});

const keyFound = L.icon({
  iconUrl: key_green,
  iconSize: [50, 50],
});

const walletLost = L.icon({
  iconUrl: wallet_red,
  iconSize: [50, 50],
});

const walletFound = L.icon({
  iconUrl: wallet_green,
  iconSize: [50, 50],
});

const othersLost = L.icon({
  iconUrl: others_red,
  iconSize: [50, 50],
});

const othersFound = L.icon({
  iconUrl: others_green,
  iconSize: [50, 50],
});

export const othersDrag = L.icon({
  iconUrl: others_black,
  iconSize: [50, 50],
});

export const flyImg = L.icon({
  iconUrl: fly_img,
  iconSize: [0.01, 0.01],
});

export const iconsMap = {
  headphone: {
    true: headphoneLost,
    false: headphoneFound,
  },
  phone: {
    true: phoneLost,
    false: phoneFound,
  },
  wallet: {
    true: walletLost,
    false: walletFound,
  },
  key: {
    true: keyLost,
    false: keyFound,
  },
  others: {
    true: othersLost,
    false: othersFound,
  },
};
