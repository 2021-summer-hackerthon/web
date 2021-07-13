/*global kakao */
import Main from "components/Main/Main";
import { GETSTARPOSTS } from "lib/api/postAPI";
import { GETPROFILE } from "lib/api/profileAPI";
import { getToken } from "lib/getToken";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allStarPostsState,
  clickAddressState,
  isLoginState,
  mapState,
  placeState,
  postsMarkerState,
} from "recoil/mapAtom";
import { myGradeState, myNameState, myNumberState, myRoomState, profileState } from "recoil/profileAtom";

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
  const [MAP, setMAP] = useRecoilState(mapState);

  const setPostsMarkers = async () => {
    try {
      const data = await GETSTARPOSTS();
      if (data.status === 200) {
        let t = [];
        data.data.map((v) => {
          console.log(v);
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
      center: new kakao.maps.LatLng(35.661239715391845, 128.415),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);
    if (map !== null && map !== undefined) {
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(place, placesSearchCB);

      let marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        map: map,
        position: map.getCenter(),
      });

      console.log(MARKER);
      for (let i = 0; i < MARKER.length; i++) {
        setMark(MARKER[i]);
      }

      // 지도에 마커를 표시합니다

      var geocoder = new kakao.maps.services.Geocoder();

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
        console.log(data);
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(data.y, data.x),
        });

        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다

          let content = `<div class="marker"> <div class='marker-title'>${data.title}</div> </div>`;
          infowindow.setContent(content);
          infowindow.open(map, marker);
        });
      }

      function displayMarker(place) {
        console.log(place);
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
        console.log(marker);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다

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
              console.log(markerAddress);
              let content = `<div class="marker"> <div class='marker-title'>${result[0].address.address_name}</div></div>`;
              // 마커를 클릭한 위치에 표시합니다
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          }
        );
      });

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    }
  }, [place, MARKER]);

  return <Main />;
};

export default MainContainer;
