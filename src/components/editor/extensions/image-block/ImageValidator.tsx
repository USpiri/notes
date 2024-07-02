import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageValidatorProps {
  src: string;
  alt: string;
  width: number;
  className?: string;
}

export const ImageValidator = (props: ImageValidatorProps) => {
  const [state, setState] = useState<"loading" | "error" | "success">(
    "loading",
  );

  useEffect(() => {
    const img = new Image();
    img.src = props.src;
    img.onload = () => setState("success");
    img.onerror = () => setState("error");
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [props.src]);

  if (state === "success") {
    return (
      <img
        className={props.className}
        style={{ maxWidth: `${props.width}%` }}
        src={props.src}
        alt={props.alt}
      />
    );
  }

  if (state === "error") {
    return (
      <div
        className={`w-max rounded border-2 border-dotted border-rose-500/50 p-2 text-base font-semibold text-rose-400 ${props.className}`}
      >
        <div className=" flex flex-col items-center ">
          <ImageOff className="h-6 w-6" />
          <span>Invalid image</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-max ${props.className}`}>
      <Skeleton className="h-28 w-48" />
    </div>
  );
};
