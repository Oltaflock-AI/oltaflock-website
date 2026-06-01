// Oltaflock Studio showcase reel — AI-generated video work.
// Source clips compressed to web (no audio, faststart) in /public/studio/videos.
export type StudioVideo = {
  id: string;
  src: string;
  poster: string;
  title: string;
  tag: string;
};

export const studioVideos: StudioVideo[] = [
  { id: '08', src: '/studio/videos/studio-08.mp4', poster: '/studio/videos/studio-08.jpg', title: 'Product film', tag: 'Automotive' },
  { id: '10', src: '/studio/videos/studio-10.mp4', poster: '/studio/videos/studio-10.jpg', title: 'Brand lifestyle', tag: 'Product travel' },
  { id: '06', src: '/studio/videos/studio-06.mp4', poster: '/studio/videos/studio-06.jpg', title: 'Urban cinematic', tag: 'Live-action' },
  { id: '09', src: '/studio/videos/studio-09.mp4', poster: '/studio/videos/studio-09.jpg', title: 'Product imagery', tag: 'Product travel' },
  { id: '04', src: '/studio/videos/studio-04.mp4', poster: '/studio/videos/studio-04.jpg', title: 'Lifestyle comedy', tag: 'Live-action' },
  { id: '07', src: '/studio/videos/studio-07.mp4', poster: '/studio/videos/studio-07.jpg', title: 'Animated story', tag: 'Stylized' },
  { id: '01', src: '/studio/videos/studio-01.mp4', poster: '/studio/videos/studio-01.jpg', title: 'Cinematic anime', tag: 'Stylized' },
  { id: '02', src: '/studio/videos/studio-02.mp4', poster: '/studio/videos/studio-02.jpg', title: 'Emotional scene', tag: 'Live-action' },
  { id: '05', src: '/studio/videos/studio-05.mp4', poster: '/studio/videos/studio-05.jpg', title: 'Automotive action', tag: 'Product' },
];

// The three clips surfaced on the homepage Studio section.
export const featuredVideos = studioVideos.slice(0, 3);
