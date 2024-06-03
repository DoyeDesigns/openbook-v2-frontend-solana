import React from "react";

interface PageSubTitle {
  text: string;
}

function PageSubTitle(prop: PageSubTitle) {
  return (
      <h2 className="text-xl font-bold my-8">{prop.text}</h2>
  );
}

export default PageSubTitle;
