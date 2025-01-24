"use client";

const AutoPlayVideo = ({
  src,
  width = "640",
}: {
  src: string;
  width: string;
}) => {
  return (
    <div className="video-container mx-auto max-w-[1400px] overflow-hidden">
      <video
        width={width}
        height="auto"
        controls
        autoPlay
        muted
        loop
        className="max-h-fit"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AutoPlayVideo;
