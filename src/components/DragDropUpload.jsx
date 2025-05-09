import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText } from 'lucide-react';

export default function DragDropUpload({ onFileSelect }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      'application/json': ['.ipynb'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer transition-all duration-300
        ${
          isDragActive
            ? 'bg-purple-800/20 border-purple-400'
            : 'bg-white/5 border-white/20 hover:border-purple-300'
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center text-white/80 space-y-2">
        <FileText size={32} className="opacity-70" />
        {isDragActive ? (
          <p>Drop your `.ipynb` file here...</p>
        ) : (
          <>
            <p>
              <strong>Click or drag</strong> an IPYNB file here
            </p>
            <p className="text-sm text-white/50">Only one notebook at a time</p>
          </>
        )}
        {acceptedFiles.length > 0 && (
          <div className="mt-4 text-green-300 text-sm">
            Selected: <code>{acceptedFiles[0].name}</code>
          </div>
        )}
      </div>
    </div>
  );
}
