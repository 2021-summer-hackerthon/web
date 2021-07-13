/*global kakao */
import Main from "components/Main/Main";
import { GETPROFILE } from "lib/api/profileAPI";
import { getToken } from "lib/getToken";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, placeState } from "recoil/mapAtom";
import { profileState } from "recoil/profileAtom";

const MainContainer = () => {
  const place = useRecoilValue(placeState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [profile, setProfile] = useRecoilState(profileState);

  const checkLogin = async () => {

    if (!getToken()) {

      setIsLogin(false);
      return;
    }

    try {
      const { data } = await GETPROFILE();

      setProfile(data.profileImage);

      setIsLogin(true);
    } catch (err) {

      localStorage.removeItem('token');
      setIsLogin(false);
    }
  }

  useEffect(() => {
    checkLogin();
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
      var marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: map.getCenter(),
      });
      // 지도에 마커를 표시합니다
      marker.setMap(map);
      var geocoder = new kakao.maps.services.Geocoder();

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          console.log(map);
          map.setBounds(bounds);
        }
      }

      function displayMarker(place) {
        console.log(place);
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
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
              console.log(result[0].address.address_name);
              let content = result[0].address.address_name;
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
  }, [place]);

  return <Main isLogin={isLogin} />;
};

export default MainContainer;
