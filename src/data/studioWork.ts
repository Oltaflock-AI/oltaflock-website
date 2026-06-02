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
  { id: '13', src: '/studio/videos/studio-13.mp4', poster: '/studio/videos/studio-13.jpg', title: 'Luxury automotive', tag: 'Automotive' },
  { id: '11', src: '/studio/videos/studio-11.mp4', poster: '/studio/videos/studio-11.jpg', title: 'Tech product reveal', tag: 'Product' },
  { id: '12', src: '/studio/videos/studio-12.mp4', poster: '/studio/videos/studio-12.jpg', title: 'Footwear brand film', tag: 'Product' },
  { id: '17', src: '/studio/videos/studio-17.mp4', poster: '/studio/videos/studio-17.jpg', title: 'Footwear launch', tag: 'Product' },
  { id: '19', src: '/studio/videos/studio-19.mp4', poster: '/studio/videos/studio-19.jpg', title: 'Device reveal', tag: 'Product' },
  { id: '18', src: '/studio/videos/studio-18.mp4', poster: '/studio/videos/studio-18.jpg', title: 'Snack pack spot', tag: 'Product' },
  { id: '24', src: '/studio/videos/studio-24.mp4', poster: '/studio/videos/studio-24.jpg', title: 'Skincare reveal', tag: 'Product' },
  { id: '26', src: '/studio/videos/studio-26.mp4', poster: '/studio/videos/studio-26.jpg', title: 'Gaming launch', tag: 'Product' },
  { id: '14', src: '/studio/videos/studio-14.mp4', poster: '/studio/videos/studio-14.jpg', title: 'Food & beverage', tag: 'Product' },
  { id: '15', src: '/studio/videos/studio-15.mp4', poster: '/studio/videos/studio-15.jpg', title: 'Gourmet tabletop', tag: 'Product' },
  { id: '20', src: '/studio/videos/studio-20.mp4', poster: '/studio/videos/studio-20.jpg', title: 'Snack lifestyle', tag: 'Live-action' },
  { id: '21', src: '/studio/videos/studio-21.mp4', poster: '/studio/videos/studio-21.jpg', title: 'Evening lifestyle', tag: 'Live-action' },
  { id: '22', src: '/studio/videos/studio-22.mp4', poster: '/studio/videos/studio-22.jpg', title: 'Fitness lifestyle', tag: 'Live-action' },
  { id: '16', src: '/studio/videos/studio-16.mp4', poster: '/studio/videos/studio-16.jpg', title: 'Light-burst reveal', tag: 'Stylized' },
  { id: '23', src: '/studio/videos/studio-23.mp4', poster: '/studio/videos/studio-23.jpg', title: 'Powder burst', tag: 'Stylized' },
  { id: '25', src: '/studio/videos/studio-25.mp4', poster: '/studio/videos/studio-25.jpg', title: 'Ambient ritual', tag: 'Stylized' },
];

// The three clips surfaced on the homepage Studio section.
export const featuredVideos = studioVideos.slice(0, 3);
