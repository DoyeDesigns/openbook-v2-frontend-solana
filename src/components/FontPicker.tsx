"use client";

import React, { useEffect, useState } from "react";
import { useFont } from "@/context-api/fontContextProvider";
import { fonts as PopularGoogleFonts } from "@/utils/fonts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import PageSubTitle from './PageSubTitle';

const FontPicker = () => {
  const { font, updateFont } = useFont();
  const [previewFont, setPreviewFont] = useState(font);

  console.log(font);

  const previewSelectedFont = (e: string) => {
    setPreviewFont(e);
  };

  return (
    <div>
      <div className="flex gap-5 items-center my-5">
        {/* <PageSubTitle text='Select Font' /> */}
        
        <Select
          onValueChange={(e) => previewSelectedFont(e)}
          defaultValue={font}
        >
          <SelectTrigger className="w-[180px]" style={{ fontFamily: font }}>
            <SelectValue placeholder="Select Preferred Font..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Popular Google Fonts</SelectLabel>
              {PopularGoogleFonts.map((font, index) => (
                <SelectItem
                  key={index}
                  value={font}
                  style={{ fontFamily: font }}
                >
                  {font}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={() => updateFont(previewFont)}>Save Font</Button>
      </div>

      <p style={{ fontFamily: previewFont, fontSize: "24px" }}>
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  );
};

export default FontPicker;
