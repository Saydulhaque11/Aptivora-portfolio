export type InstagramPost = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  postUrl: string;
  type: "video" | "image";
};

export const instagramPosts: InstagramPost[] = [
  {
    id: "instagram-01",
    title: "AI Automation Workflow",
    description:
      "Explore practical AI automation and connected digital workflows.",
    coverImage: "/images/instagram/instagram-01.jpg",
    postUrl: "https://www.instagram.com/saydul.ai/reel/DdPUnoiOxn8/",
    type: "video",
  },
  {
    id: "instagram-02",
    title: "Business Automation",
    description:
      "Practical ideas for building smarter and more efficient business systems.",
    coverImage: "/images/instagram/instagram-02.jpg",
    postUrl: "https://www.instagram.com/saydul.ai/reel/DdMbgm-vxKq/",
    type: "video",
  },
  {
    id: "instagram-03",
    title: "AI Workflow Systems",
    description:
      "A look at modern AI-powered workflows and digital systems.",
    coverImage: "/images/instagram/instagram-03.jpg",
    postUrl: "https://www.instagram.com/saydul.ai/reel/Dc1gD1tuJpu/",
    type: "video",
  },
];