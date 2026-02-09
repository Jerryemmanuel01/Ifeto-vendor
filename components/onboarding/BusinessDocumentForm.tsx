"use client";

import { Upload, X, FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import {
  useBusinessDocuments,
  FileState,
} from "@/hooks/form-hooks/useBusinessDocuments";

const BusinessDocumentForm = () => {
  const {
    files,
    isLoading,
    isFormValid,
    handleFileChange,
    removeFile,
    handleSubmit,
  } = useBusinessDocuments();

  const fileInputRefs = {
    governmentId: useRef<HTMLInputElement>(null),
    cacDocument: useRef<HTMLInputElement>(null),
    proofOfAddress: useRef<HTMLInputElement>(null),
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (key: keyof FileState, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    handleFileChange(key, file);
  };

  const triggerFileInput = (key: keyof FileState) => {
    fileInputRefs[key].current?.click();
  };

  const handleRemoveFile = (key: keyof FileState) => {
    removeFile(key);
    if (fileInputRefs[key].current) {
      fileInputRefs[key].current!.value = "";
    }
  };

  const renderUploadField = (
    key: keyof FileState,
    label: string,
    description: string,
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        ref={fileInputRefs[key]}
        onChange={(e) => handleFileChange(key, e.target.files?.[0])}
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
      />
      {!files[key] ? (
        <div
          onClick={() => triggerFileInput(key)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(key, e)}
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 font-medium">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-gray-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {files[key]?.name}
              </p>
              <p className="text-xs text-gray-500">
                {(files[key]!.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveFile(key)}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );

  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">
          Business Documentation
        </h2>
        <p className="text-gray-500 mt-1">
          Provide your business documentation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {renderUploadField(
          "governmentId",
          "Government Issued ID",
          "PDF, JPEG, PNG file, min 800px width, max 5MB",
        )}

        {renderUploadField(
          "cacDocument",
          "Business Registration Document (CAC)",
          "PDF file, max 10MB",
        )}

        {renderUploadField(
          "proofOfAddress",
          "Proof of Address",
          "PDF, JPEG, PNG file, max 5MB",
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-4 bg-transparent border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`flex-1 py-4 font-semibold rounded-lg text-sm transition-colors ${
            isFormValid && !isLoading
              ? "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
              : "bg-[#C2C2C2] text-white cursor-not-allowed"
          }`}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default BusinessDocumentForm;
