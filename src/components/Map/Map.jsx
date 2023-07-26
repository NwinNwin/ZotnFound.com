import { useState, useRef, useMemo, useContext } from "react";
// import { useMapEvents } from "react-leaflet/hooks";
// import mapuser from "../../assets/logos/mapuser.svg";
import "./Map.css";

import L from "leaflet";
import { othersDrag, flyImg, iconsMap } from "./MapIcons";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Rectangle,
} from "react-leaflet";
import { useDisclosure } from "@chakra-ui/react";
import InfoModal from "../InfoModal/InfoModal";

import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

import DataContext from "../../context/DataContext";
import { UserAuth } from "../../context/AuthContext";

export default function Map({
  itemDate,
  isEdit,
  type,
  isLost,
  name,
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
  focusLocation,
  setFocusLocation,
}) {
  const { user } = UserAuth();
  const { data, setLoading } = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemData, setItemData] = useState({});
  const allowedBounds = [
    [33.656487295651, -117.85412222020983],
    [33.65580858123096, -117.82236486775658],
    [33.63290776411016, -117.85403639000239],
    [33.630120665484185, -117.82240778293699],
  ];
  const bounds = L.latLngBounds(allowedBounds);

  const allMarkers = data
    .filter((item) => {
      return (
        (search.toLowerCase() === "" ||
          item.name.toLowerCase().includes(search)) &&
        (findFilter.isLost === item.isLost ||
          findFilter.isFound === !item.isLost) &&
        (findFilter.type === "everything" || findFilter.type === item.type) &&
        (findFilter.uploadDate === "" ||
          item.itemDate.includes(findFilter.uploadDate)) &&
        (!findFilter.isYourPosts ||
          (findFilter.isYourPosts && item.email === user.email))
      );
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
        icon={(iconsMap[item.type] || iconsMap["others"])[item.isLost]}
      >
        <Popup>{item.name}</Popup>
      </Marker>
    ));

  function Test({ location }) {
    const map = useMap();
    if (location) {
      map.flyTo(location, 18);
      setFocusLocation(undefined);
    }

    return location ? (
      <Marker position={location} icon={flyImg}></Marker>
    ) : null;
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
      email: user.email,
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
      email: user.email,
      location: [position.lat, position.lng],
      date: date.toISOString(),
      itemDate: itemDate,
      id: docRef.id,
    };
    setData((prev) => [...prev, newItem]);
    setPosition(centerPosition);
    setFocusLocation(newItem.location);
    setLoading(true);
  }

  const toggleDraggable = () => {
    if (!bounds.contains(position)) {
      alert("ITEM OUT OF BOUNDS (UCI ONLY)");
      return;
    } else {
      setLoading(false);
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
        <Rectangle
          bounds={bounds}
          eventHandlers={outerHandlers}
          pathOptions={redColor}
        />
      </>
    );
  }

  return (
    <div>
      <MapContainer
        className="map-container"
        center={centerPosition}
        zoom={17}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isEdit && <Test location={focusLocation} search={search} />}
        {!isEdit}
        {!isEdit && allMarkers}
        {isEdit && (
          <Marker
            className="marker"
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={othersDrag}
          >
            <Popup minWidth={90} closeButton={false}>
              <span className="popup" onClick={() => toggleDraggable()}>
                Click to Confirm Location 🤔
              </span>
            </Popup>
          </Marker>
        )}
        <SetBoundsRectangles />
      </MapContainer>
      <InfoModal
        props={itemData}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        setData={setData}
      />
    </div>
  );
}
