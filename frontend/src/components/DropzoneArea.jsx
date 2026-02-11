import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneArea({ onImagesAdded }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          onImagesAdded({
            type: "image",
            data: base64,
            filename: file.name,
            mimeType: file.type,
          });
        };
        reader.readAsDataURL(file);
      });
    },
    [onImagesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "dropzone--active" : ""}`}
    >
      <input {...getInputProps()} />
      <p>Drag & drop images here, or click to select</p>
    </div>
  );
}

export default DropzoneArea;

