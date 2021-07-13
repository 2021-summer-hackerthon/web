/*global kakao */
import { memo, useEffect, useState } from "react";
import MainLogo from "asset/MainLogo.svg";
import DefaultProfile from "asset/DefaultProfile.svg";
import classNames from "classnames";

const style = require("./Nav.scss");
const cx = classNames.bind(style);

const Nav = () => {
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState("");
  let isLogin = true;

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearchPlace = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPlace(e.target.value);
      setSearch("");
    }
  };

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place, placesSearchCB);

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

    function displayMarker(place) {
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
  }, [place]);

  return (
    <div className={cx("Nav")}>
      <div className={cx("Nav-Logo")}>
        <img src={MainLogo} alt="메인로고" />
      </div>

      {isLogin ? (
        <div className={cx("Nav-Profile")}>
          <img src={DefaultProfile} alt="프로필 이미지" />
        </div>
      ) : (
        <div className={cx("Nav-Dodam")}>
          <a
            href="http://dauth.b1nd.com/login?clientId=35340c9845dc45aeafee3a3584018ca4312cb5b724d14fefaa95a8dbd9d97d2a&redirectUrl=http://localhost:3000/callback"
            target="_blank"
          >
            도담도담 로그인
          </a>
        </div>
      )}
      <div className={cx("Nav-Search")}>
        <input
          value={search}
          className={cx("Nav-Search-Input")}
          placeholder="음식점을 검색해주세요"
          onChange={onChangeSearch}
          onKeyPress={onSearchPlace}
        />
      </div>
    </div>
  );
};

export default memo(Nav);
