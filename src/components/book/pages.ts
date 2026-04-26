import { atom } from "jotai";

export type PageFace = {
  color: string;
  imageSrc?: string;
};

export type PageData = {
  front: PageFace;
  back: PageFace;
};

const COVER_COLOR = "#1a1a1a";
const PAGE_COLOR = "#f5f1e8";
export const frontCoverImageSrc = "/book/front-cover.png";
export const backCoverImageSrc = "/book/back-cover.png";

export const pageAtom = atom(0);

export const pages: PageData[] = [
  {
    front: { color: COVER_COLOR, imageSrc: frontCoverImageSrc },
    back: { color: PAGE_COLOR, imageSrc: "/book/p1.png" },
  },
  {
    front: { color: PAGE_COLOR, imageSrc: "/book/p2.png" },
    back: { color: PAGE_COLOR, imageSrc: "/book/p3.png" },
  },
  {
    front: { color: PAGE_COLOR, imageSrc: "/book/p4.png" },
    back: { color: PAGE_COLOR, imageSrc: "/book/p5.png" },
  },
  {
    front: { color: PAGE_COLOR, imageSrc: "/book/p6.png" },
    back: { color: PAGE_COLOR, imageSrc: "/book/p7.png" },
  },
  {
    front: { color: PAGE_COLOR, imageSrc: "/book/p8.png" },
    back: { color: COVER_COLOR, imageSrc: backCoverImageSrc },
  },
];
