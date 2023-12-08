import React from "react";

export const PopupLayout = ({ children }: { children?: React.ReactNode }) => {
  return <div className="p-4">{children}</div>;
};
