import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const Root = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Root;