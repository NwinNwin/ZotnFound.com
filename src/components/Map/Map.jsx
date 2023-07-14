import { useState, useRef, useMemo } from "react";
// import { useMapEvents } from "react-leaflet/hooks";
// import mapuser from "../../assets/logos/mapuser.svg";
import "./Map.css";

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

import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle } from "react-leaflet";
import { useDisclosure } from "@chakra-ui/react";
import InfoModal from "../InfoModal/InfoModal";

import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Map({
  itemDate,
  data,
  isEdit,
  type,
  isLost,
  name,
  email,
  image,
  description,
  setIsEdit,
  search,
  findFilter,
  setIsCreate,
  setData,
  isCreate,
  centerPosition,
  position,
  setPosition,
  onOpen2,
  focusLocation,
  setFocusLocation,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemData, setItemData] = useState({});
  const allowedBounds = [
    [33.656487295651, -117.85412222020983],
    [33.65580858123096, -117.82236486775658],
    [33.63290776411016, -117.85403639000239],
    [33.630120665484185, -117.82240778293699],
  ];
  const bounds = L.latLngBounds(allowedBounds);
  console.log(bounds);

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

  const othersDrag = L.icon({
    iconUrl: others_black,
    iconSize: [50, 50],
  });

  const flyImg = L.icon({
    iconUrl: fly_img,
    iconSize: [0.01, 0.01],
  });

  const allMarkers = data
    .filter((item) => {
      return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search);
    })
    .filter((item) => {
      if (findFilter.isLost && item.isLost) {
        if (findFilter.type === "everything") {
          return item;
        } else if (findFilter.type === "headphone" && item.type === "headphone") {
          return item;
        } else if (findFilter.type === "phone" && item.type === "phone") {
          return item;
        } else if (findFilter.type === "key" && item.type === "key") {
          return item;
        } else if (findFilter.type === "wallet" && item.type === "wallet") {
          return item;
        } else if (findFilter.type === "others" && item.type === "others") {
          return item;
        }
      }
      if (findFilter.isFound && !item.isLost) {
        if (findFilter.type === "everything") {
          return item;
        } else if (findFilter.type === "headphone" && item.type === "headphone") {
          return item;
        } else if (findFilter.type === "phone" && item.type === "phone") {
          return item;
        } else if (findFilter.type === "key" && item.type === "key") {
          return item;
        } else if (findFilter.type === "wallet" && item.type === "wallet") {
          return item;
        } else if (findFilter.type === "others" && item.type === "others") {
          return item;
        }
      }
      return;
    })
    .filter((item) => {
      return findFilter.uploadDate === "" ? item : item.itemDate.includes(findFilter.uploadDate);
    })
    .map((item) => (
      <Marker
        position={item.location}
        eventHandlers={{
          click: () => {
            onOpen();
            setItemData(item);
            setFocusLocation(item.location);
          },
          mouseover: (event) => !isEdit && event.target.openPopup(),
        }}
        icon={
          item.type === "headphone" && item.isLost
            ? headphoneLost
            : item.type === "phone" && item.isLost
            ? phoneLost
            : item.type === "wallet" && item.isLost
            ? walletLost
            : item.type === "key" && item.isLost
            ? keyLost
            : item.type === "others" && item.isLost
            ? othersLost
            : item.type === "headphone" && !item.isLost
            ? headphoneFound
            : item.type === "phone" && !item.isLost
            ? phoneFound
            : item.type === "wallet" && !item.isLost
            ? walletFound
            : item.type === "key" && !item.isLost
            ? keyFound
            : item.type === "others" && !item.isLost
            ? othersFound
            : othersFound
        }
      >
        <Popup>{item.name}</Popup>
      </Marker>
    ));

  function Test({ location }) {
    const map = useMap();
    if (location) map.flyTo(location, 18);

    return location ? <Marker position={location} icon={flyImg}></Marker> : null;
  }

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(position);
        }
      },
    }),
    []
  );

  async function handleSubmit(image, type, name, description) {
    const date = new Date();

    const docRef = await addDoc(collection(db, "items"), {
      image: image,
      type: type,
      isLost: isLost,
      name: name,
      description: description,
      email: email,
      location: [position.lat, position.lng],
      itemDate: itemDate,
      date: date.toISOString(),
    });

    const newItem = {
      image: image,
      type: type,
      isLost: isLost,
      name: name,
      description: description,
      email: email,
      location: [position.lat, position.lng],
      date: date.toISOString(),
      itemDate: itemDate,
      id: docRef.id,
    };
    setData((prev) => [...prev, newItem]);
    setPosition(centerPosition);
    setFocusLocation(newItem.location);
  }

  const toggleDraggable = () => {
    if (!bounds.contains(position)) {
      alert("ITEM OUT OF BOUNDS (UCI ONLY)");
      return;
    } else {
      handleSubmit(image, type, name, description);
      setIsEdit(!isEdit);
      setIsCreate(!isCreate);
    }
  };
  const redColor = { color: "#880808", fillColor: "None" };

  function SetBoundsRectangles() {
    const map = useMap();

    const outerHandlers = useMemo(
      () => ({
        click() {
          map.fitBounds(bounds);
        },
      }),
      [map]
    );

    return (
      <>
        <Rectangle bounds={bounds} eventHandlers={outerHandlers} pathOptions={redColor} />
      </>
    );
  }

  return (
    <div>
      <MapContainer className="map-container" center={centerPosition} zoom={17} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {!isEdit && <Test location={focusLocation} search={search} />}
        {!isEdit}
        {!isEdit && allMarkers}
        {isEdit && (
          <Marker className="marker" draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef} icon={othersDrag}>
            <Popup minWidth={90} closeButton={false}>
              <span className="popup" onClick={() => toggleDraggable()}>
                Click to Confirm Location 🤔
              </span>
            </Popup>
          </Marker>
        )}
        <SetBoundsRectangles />
      </MapContainer>
      <InfoModal props={itemData} onOpen={onOpen} onClose={onClose} isOpen={isOpen} currentEmail={email} setData={setData} />
    </div>
  );
}
