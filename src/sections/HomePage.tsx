import useIsLargeViewport from "../hooks/use-is-large-viewport";
import HomePageDesktop from "./HomePageDesktop";
import HomePageMobile from "./HomePageMobile";

type HomePageProps = {
  isRevealed: boolean;
};

const HomePage = ({ isRevealed }: HomePageProps) => {
  const isLarge = useIsLargeViewport(600);
  return isLarge ? (
    <HomePageDesktop />
  ) : (
    <HomePageMobile isRevealed={isRevealed} />
  );
};

export default HomePage;
