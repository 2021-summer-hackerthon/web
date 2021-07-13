/*global kakao */
import Main from "components/Main/Main";
import { getToken } from "lib/getToken";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, placeState } from "recoil/mapAtom";

const MainContainer = () => {
  const place = useRecoilValue(placeState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    if (getToken()) {
      setIsLogin(false);
    }
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
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      }
    }
  }, [place]);

  return <Main isLogin={isLogin} />;
};

export default MainContainer;


