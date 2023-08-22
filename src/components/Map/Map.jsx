import { useState, useRef, useMemo, useContext, useEffect } from "react";
// import { useMapEvents } from "react-leaflet/hooks";
// import mapuser from "../../assets/logos/mapuser.svg";
import "./Map.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { othersDrag, flyImg, iconsMap } from "./MapIcons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Rectangle,
  Circle,
} from "react-leaflet";
import { useDisclosure } from "@chakra-ui/react";
import InfoModal from "../InfoModal/InfoModal";

import DataContext from "../../context/DataContext";
import { UserAuth } from "../../context/AuthContext";

import axios from "axios";

export default function Map({
  isEdit,
  newAddedItem,
  setNewAddedItem,
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
  const [showDonut, setShowDonut] = useState(false);
  console.log(showDonut);
  console.log(focusLocation);
  const allowedBounds = [
    [33.656487295651, -117.85412222020983],
    [33.65580858123096, -117.82236486775658],
    [33.63290776411016, -117.85403639000239],
    [33.630120665484185, -117.82240778293699],
  ];
  const bounds = L.latLngBounds(allowedBounds);

  const handleMarkerSelect = async () => {
    setShowDonut(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setShowDonut(false);
  };

  useEffect(() => {
    const handleFocus = async () => {
      await handleMarkerSelect();
      setFocusLocation(undefined);
    };

    if (focusLocation) {
      handleFocus();
    }
  }, [focusLocation, setFocusLocation]);


  const allMarkers = data
    .filter((item) => {
      return (
        (search.toLowerCase() === "" ||
          item.name.toLowerCase().includes(search)) &&
        (findFilter.islost === item.islost ||
          findFilter.isFound === !item.islost) &&
        (findFilter.type === "everything" || findFilter.type === item.type) &&
        (findFilter.uploadDate === "" ||
          item.itemDate.includes(findFilter.uploadDate)) &&
        (!findFilter.isYourPosts ||
          (findFilter.isYourPosts && item.email === user.email))
      );
    })
    .map((item) => {
      return (
        <Marker
          position={item.location}
          eventHandlers={{
            click: () => {
              onOpen();
              setItemData(item);
              setFocusLocation(item.location);
            },
          }}
          icon={(iconsMap[item.type] || iconsMap["others"])[item.islost]}
        ></Marker>
      );
    });

  function Test({ location }) {
    const map = useMap();
    if (location) {
      map.flyTo(location, 18);
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
        }
      },
    }),
    [setPosition]
  );

  async function handleSubmit() {
    const date = new Date();

    axios
      .post(`${process.env.REACT_APP_AWS_BACKEND_URL}/items`, {
        image: newAddedItem.image,
        type: newAddedItem.type,
        islost: newAddedItem.islost,
        name: newAddedItem.name,
        description: newAddedItem.description,
        email: user.email,
        location: [position.lat, position.lng],
        itemDate: newAddedItem.itemDate,
        date: date.toISOString(),
      })
      .then((item) => {
        const newItem = {
          image: newAddedItem.image,
          type: newAddedItem.type,
          islost: newAddedItem.islost,
          name: newAddedItem.name,
          description: newAddedItem.description,
          email: user.email,
          location: [position.lat, position.lng],
          date: date.toISOString(),
          itemDate: newAddedItem.itemDate,
          id: item.data.id,
        };
        setData((prev) => [...prev, newItem]);
        setPosition(centerPosition);
        setFocusLocation(newItem.location);
        setNewAddedItem({
          image: "",
          type: "",
          islost: true,
          name: "",
          description: "",
          itemDate: "",
        });
        setIsCreate(!isCreate);
      })
      .catch((err) => console.log(err));

    setLoading(true);
  }

  const toggleDraggable = () => {
    if (!bounds.contains(position)) {
      alert("ITEM OUT OF BOUNDS (UCI ONLY)");
      return;
    } else {
      setLoading(false);
      handleSubmit();
      setIsEdit(!isEdit);
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
        attributionControl={false}
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
        {showDonut && focusLocation && (
          <>
            <Circle
              center={focusLocation}
              radius={20}
              color="red"
              weight={3}
              fillColor="yellow"
            />
          </>
        )}
        <SetBoundsRectangles />
      </MapContainer>
      {isOpen && (
        <InfoModal
          props={itemData}
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          setData={setData}
        />
      )}
    </div>
  );
}
