/*global kakao */
import Main from "components/Main/Main";
import { GETSTARPOSTS } from "lib/api/postAPI";
import { GETPROFILE } from "lib/api/profileAPI";
import { getToken } from "lib/getToken";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clickAddressState,
  isLoginState,
  placeState,
  postsMarkerState,
} from "recoil/mapAtom";
import {
  myGradeState,
  myNameState,
  myNumberState,
  myRoomState,
  profileState,
} from "recoil/profileAtom";

const MainContainer = () => {
  const place = useRecoilValue(placeState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [username, setUsername] = useRecoilState(myNameState);
  const [myGrade, setMyGrade] = useRecoilState(myGradeState);
  const [myRoom, setMyRoom] = useRecoilState(myRoomState);
  const [myNumber, setMyNumber] = useRecoilState(myNumberState);
  const [MARKER, setMarker] = useRecoilState(postsMarkerState);
  const [markerAddress, setMarkerAddress] = useRecoilState(clickAddressState);

  const setPostsMarkers = async () => {
    try {
      const data = await GETSTARPOSTS();
      if (data.status === 200) {
        let t = [];
        data.data.map((v) => {
          let dto = {
            title: v.name,
            x: v.xPosition,
            y: v.yPosition,
          };
          t.push(dto);
        });
        setMarker(t);
      }
    } catch (e) {
      throw e;
    }
  };

  const checkLogin = async () => {
    if (!getToken()) {
      setIsLogin(false);
      return;
    }

    try {
      const { data } = await GETPROFILE();

      setProfile(data.profileImage);
      setUsername(data.name);
      setMyGrade(data.grade);
      setMyRoom(data.room);
      setMyNumber(data.number);
      setIsLogin(true);
    } catch (err) {
      localStorage.removeItem("token");
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
    setPostsMarkers();
  }, []);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(35.6625, 128.414119415),
      level: 4,
    };
    let map = new kakao.maps.Map(container, options);
    if (map !== null && map !== undefined) {
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(place, placesSearchCB);

      let marker = new kakao.maps.Marker({
        map: map,
        position: map.getCenter(),
      });

      for (let i = 0; i < MARKER.length; i++) {
        setMark(MARKER[i]);
      }

      let geocoder = new kakao.maps.services.Geocoder();

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      }

      function setMark(data) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(data.y, data.x),
        });

        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다

          let content = `<div class="marker"> <div class='marker-title'>${data.title}</div> <div class='marker-desc'> </div> </div>`;
          infowindow.setContent(content);
          infowindow.open(map, marker);
        });
      }

      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        kakao.maps.event.addListener(marker, "click", function () {
          let content = `<div class="marker"> <div class='marker-title'>${place.place_name}</div> <div class='marker-desc'>${place.address_name}</div> </div>`;
          infowindow.setContent(content);
          infowindow.open(map, marker);
        });
      }

      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              const dto = {
                title: result[0].address.address_name,
                x: mouseEvent.latLng.La,
                y: mouseEvent.latLng.Ma,
              };
              setMarkerAddress(dto);
              let content = `<div class="marker"> <div class='marker-title'>${result[0].address.address_name}</div></div>`;
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          }
        );
      });

      function searchDetailAddrFromCoords(coords, callback) {
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    }
  }, [place, MARKER]);

  return <Main />;
};

export default MainContainer;
