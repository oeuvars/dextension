import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  wallpaper?: string;
  wallpaperClassName?: string;
}

export const MacWrapper = ({ children, wallpaper, wallpaperClassName }: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full my-8">
        <div className="rounded-xl overflow-hidden shadow-2xl bg-neutral-800 border-4 border-neutral-700">
          <div className="bg-neutral-800 h-10 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-16 h-1.5 rounded-full bg-neutral-700"></div>
            </div>
          </div>

          <div className="relative">
            {wallpaper && (
              <div
                className={`absolute inset-0 bg-cover bg-center ${wallpaperClassName || ''}`}
                style={{ backgroundImage: `${wallpaper}` }}
              ></div>
            )}

            <div className={`relative p-4 ${wallpaper ? 'bg-neutral-300/90 bg-gradient-to-b from-neutral-300/95 to-neutral-300/85' : 'bg-gradient-to-b from-neutral-300 to-gray-50'}`}>
              {children}
            </div>
          </div>

          <div className="bg-neutral-800 h-4"></div>
        </div>

        <div className="mx-auto w-32 h-8 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-b-lg"></div>
      </div>
    </div>
  );
}
