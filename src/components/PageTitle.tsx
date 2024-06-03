import React from "react";

interface PageTitle {
  text: string;
}

function PageTitle(prop: PageTitle) {
  return (
      <h1 className="text-3xl font-bold mb-7 mt-10">{prop.text}</h1>
  );
}

export default PageTitle;
