export const attachNavbarScrollListener = (
  setIsScrolled: (val: boolean) => void
) => {
  const listener = () => {
    setIsScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", listener);
  return () => window.removeEventListener("scroll", listener);
};
