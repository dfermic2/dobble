import { useEffect, useState } from "react";

function usePreloadImages(imageUrls) {
  const [isLoading, setIsLoading] = useState(true);

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(url);
      image.onerror = () => reject(url);
    });
  };

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = imageUrls.map(preloadImage);
        await Promise.all(promises);
      } catch (e) {
        console.log("Error preloading images ", e);
      } finally {
        setIsLoading(false);
      }
    };
    preloadImages();
  }, [imageUrls]);

  return isLoading;
}

export default usePreloadImages;
