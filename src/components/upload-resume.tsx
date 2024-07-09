import { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-uploader";
import { Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { genericMutationFetcher } from "@/utils/helpers/swr.helpers";
import API_CONSTANTS from "@/utils/apiConstants";
import useSWRMutation from "swr/mutation";
import { Console } from "console";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

const UploadResume = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const { trigger: uploadResume, isMutating: isLoggingIn } = useSWRMutation(
    API_CONSTANTS.UPLOAD_RESUME("2oyLzVCeHCTM6xLjrcSqXwjiH9F3"),
    genericMutationFetcher
  );

  const handleSubmit = () => {
    const form = new FormData();

    console.log(files);

    if (files !== null) form.append("file", files[0]);

    console.log(form);

    // uploadResume({
    //   type: "post",
    // });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Upload Resume</h1>

      <div className="w-2/3 p-2 border-2 rounded-md h-full bg-white">
        <FileUploader
          value={files}
          onValueChange={setFiles}
          dropzoneOptions={dropZoneConfig}
          className="relative bg-background rounded-lg p-2"
        >
          <FileInput className="outline-dashed outline-1 outline-white">
            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
              <FileSvgDraw />
            </div>
          </FileInput>
          <FileUploaderContent>
            {files &&
              files.length > 0 &&
              files.map((file, i) => (
                <FileUploaderItem key={i} index={i}>
                  <Paperclip className="h-4 w-4 stroke-current" />
                  <span>{file.name}</span>
                </FileUploaderItem>
              ))}
          </FileUploaderContent>
        </FileUploader>
      </div>
      <Button className="w-fit" onClick={handleSubmit}>
        Upload
      </Button>
    </div>
  );
};

export default UploadResume;