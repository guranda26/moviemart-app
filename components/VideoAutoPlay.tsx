"use client";

const AutoPlayVideo = ({
  src,
  width = "640",
}: {
  src: string;
  width: string;
}) => {
  return (
    <div className="video-container mx-auto max-w-[1400px] overflow-hidden relative pb-1">
      <video
        width={width}
        height="auto"
        controls
        autoPlay
        muted
        loop
        className="w-full h-auto object-cover min-h-[130px] xs:min-h-[200px] sm:min-h-[300px] sm:h-[300px]"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AutoPlayVideo;
