import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Start afspilning af video, når komponenten er blevet monteret
    videoRef.current.play().catch((error) => {
      // Håndter fejl, hvis afspilning ikke kunne startes
      console.error("Fejl ved afspilning af video:", error);
    });
  }, []);

  return (
    <div className="opacity-50">
      <video
        ref={videoRef}
        src={videoSource}
        loop // Loop afspilning af videoen
        muted // Mute lyden (valgfrit)
        autoPlay
        controls={false} // Fjerner kontrolknapperne
        style={{ width: "100%", height: "auto" }} // Juster størrelsen efter behov
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  videoSource: PropTypes.string.isRequired,
};

export default VideoPlayer;
