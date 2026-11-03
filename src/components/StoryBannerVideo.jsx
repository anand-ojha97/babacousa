import BannerVideo from "./BannerVideo.jsx";

export default function StoryBannerVideo() {
  return <BannerVideo
    id="story-banner-video"
    src="/videos/who-we-are-distribution.mp4"
    poster="/images/who-we-are/distribution-video-poster.webp"
    alt="Babco Foods distribution trucks at the warehouse and travelling through the countryside"
    width="1920"
    height="1080"
    className="absolute inset-0 size-full object-cover object-center"
  />;
}
