import React, { useState } from "react";
import { TagInput } from "emblor";

interface Tag {
  id: string;
  text: string;
}

const MultiSelect = () => {
  const tags = [
    {
      id: "3632277577",
      text: "Sports",
    },
    {
      id: "559657270",
      text: "Programming",
    },
    {
      id: "2745161050",
      text: "Travel",
    },
    {
      id: "231562266",
      text: "react",
    },
  ];
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <TagInput
      tags={exampleTags}
      setTags={(newTags) => {
        setExampleTags(newTags);
      }}
      placeholder="Add a tag"
      styleClasses={{
        input: "w-full sm:max-w-[350px] border-0 shadow-none",
        tag: {
          body: "flex items-center gap-2 p-2",
        },
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
    />
  );
};

export default MultiSelect;

// tag: {
//   body: "flex items-center gap-2 p-2",
//   closeButton: "text-red-500 hover:text-red-600",
// },
