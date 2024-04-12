"use client";
import { ImageGallery } from "react-image-grid-gallery";

const imagesArray = [
  {
    alt: "Image by Agata",
    caption: "Image by Agata from Pixabay",
    src: "https://cdn.pixabay.com/photo/2021/05/06/16/13/children-6233868_1280.png",
  },
  {
    alt: "Image by Deborah Jackson",
    caption: "Image by Deborah Jackson from Pixabay",
    src: "https://cdn.pixabay.com/photo/2023/05/25/22/07/river-8018379_1280.jpg",
  },
  {
    alt: "Image by Agata",
    caption: "Image by Agata from Pixabay",
    src: "https://cdn.pixabay.com/photo/2020/09/14/15/10/birch-tree-5571242_1280.png",
  },
  {
    alt: "Image by Agata",
    caption: "Image by Agata from Pixabay",
    src: "https://cdn.pixabay.com/photo/2020/05/25/13/41/landscape-5218666_1280.png",
  },
  {
    alt: "Image by Agata",
    caption: "Image by Agata from Pixabay",
    src: "https://cdn.pixabay.com/photo/2022/07/27/14/13/house-7348025_1280.png",
  },
  {
    alt: "Image by Bianca Van Dijk",
    caption: "Image by Bianca Van Dijk from Pixabay",
    src: "https://cdn.pixabay.com/photo/2023/05/21/11/45/flowers-8008392_1280.jpg",
  },
  {
    alt: "Image by Deborah Jackson",
    caption: "Image by Deborah Jackson from Pixabay",
    src: "https://cdn.pixabay.com/photo/2023/05/25/22/07/river-8018382_1280.jpg",
  },
  {
    alt: "Image by Agata",
    caption: "Image by Agata from Pixabay",
    src: "https://cdn.pixabay.com/photo/2020/08/26/15/47/autumn-5519836_1280.png",
  },
  {
    alt: "Image by Agata",
    caption: "Image by Agata from Pixabay",
    src: "https://cdn.pixabay.com/photo/2023/01/22/23/59/couple-7737589_1280.png",
  },
  {
    alt: "Image by Bianca Van Dijk",
    caption: "Image by Bianca Van Dijk from Pixabay",
    src: "https://cdn.pixabay.com/photo/2023/05/09/17/20/flowers-7982037_1280.jpg",
  },
];

export default function Media() {
  return (
    <main id="media" className="container bg-white my-8 rounded-lg py-4 space-y-2">
      <h1 className="text-4xl font-bold">Media</h1>
      <ImageGallery imagesInfoArray={imagesArray} gapSize={24} />
    </main>
  );
}
