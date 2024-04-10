import Image from "next/image";

const PropertyLocation = () => {
  return (
    <>
      <div className="thumb">
        <div className="h400" id="map-canvas">
          <div className="gmap_canvas ">
            <iframe
              title="map"
              className="gmap_iframe"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22595.777846929217!2d25.447559!3d44.930490!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sro!4v[timestamp-ul-tau-aici]!5m2!1sen!2sro"            ></iframe>
          </div>
        </div>
        <div className="overlay_icon">
          <a href="#">
            <Image
              width={40}
              height={45}
              className="map_img_icon"
              src="/assets/images/header-logo.png"
              alt="header-logo.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
