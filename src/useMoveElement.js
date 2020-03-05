import * as React from "react";

export default function useMoveElement(elementRef) {
  const elementOffset = React.useRef({ x: 0, y: 0 });
  const shouldMove = React.useRef(false);
  const [elementPosition, setElementPosition] = React.useState({
    x: 50,
    y: 50
  });
  const onMouseDown = e => {
    shouldMove.current = true;
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", mouseMoving);
    const { top, left } = elementRef.current.getBoundingClientRect();
    elementOffset.current = { x: e.clientX - left, y: e.clientY - top };
    setElementPosition({
      x: getElementX(e.clientX),
      y: getElementY(e.clientY)
    });
  };
  const onMouseUp = e => {
    shouldMove.current = false;
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", mouseMoving);
  };
  const getElementX = clientX => {
    return clientX - elementOffset.current.x;
  };
  const getElementY = clientY => {
    return clientY - elementOffset.current.y;
  };
  const mouseMoving = e => {
    if (!shouldMove.current) return;
    setElementPosition({
      x: getElementX(e.clientX),
      y: getElementY(e.clientY)
    });
  };
  return { elementPosition, onMouseDown };
}
