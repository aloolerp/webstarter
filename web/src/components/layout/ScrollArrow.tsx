import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowUpToLine, ArrowDownToLine } from "lucide-react";

export const ScrollArrow = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has reached near the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={isAtBottom ? scrollToTop : scrollToBottom}
      className="fixed bottom-4 right-4 opacity-90 shadow-md"
      size="icon"
    >
      {isAtBottom ? (
        <ArrowUpToLine className="h-4 w-4" />
      ) : (
        <ArrowDownToLine className="h-4 w-4" />
      )}
    </Button>
  );
};
