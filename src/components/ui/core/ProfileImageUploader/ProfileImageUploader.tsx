"use client";
import { useState, useCallback } from "react";
import { X, User } from "lucide-react"; // Added User icon
import Image from "next/image";
import { Button } from "../../button";

type ProfileImageUploaderProps = {
  initialImage?: string;
  onImageChange?: (file: File | null) => void;
  className?: string;
};

const ProfileImageUploader = ({
  initialImage = "",
  onImageChange,
  className,
}: ProfileImageUploaderProps) => {
  const [preview, setPreview] = useState(initialImage);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      onImageChange?.(selectedFile);
    },
    [onImageChange]
  );

  const handleRemove = useCallback(() => {
    setPreview("");
    onImageChange?.(null);
  }, [onImageChange]);

  return (
    <div className={`group relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="profile-image-upload"
      />
      
      <label
        htmlFor="profile-image-upload"
        className={`cursor-pointer transition-all duration-300 ${
          preview ? "hover:opacity-80" : ""
        }`}
      >
        {preview ? (
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg">
            <Image
              src={preview}
              alt="Profile preview"
              width={128}
              height={128}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        ) : (
          
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-blue-100 hover:border-blue-200 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-lg transition-all duration-300 gap-2">
            <User className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              Upload Photo
            </span>
          </div>
        )}
      </label>

      {preview && (
        <Button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 -right-2 p-1 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ProfileImageUploader;