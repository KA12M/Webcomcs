import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import FooterBottom from "./Footer/FooterBottom";
import FooterContact from "./Footer/FooterContact";
import FooterHeader from "./Footer/FooterHeader";

const Footer = () => {
  const {
    settingStore: { setting },
  } = useStore();

  return (
    <footer className="p-4 bg-gray-800 sm:p-6 bottom-0">
      <div className="lg:container grid px-6 mx-auto">
        <div className="md:flex md:justify-between">
          <FooterHeader logo={setting?.logoPreview!} web={setting?.webName!} />

          <FooterContact setting={setting!} />
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />

        <FooterBottom pageFacebook={setting?.pageFacebook || ""} />
      </div>
    </footer>
  );
};

export default observer(Footer);
