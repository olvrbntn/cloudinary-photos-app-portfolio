"use client";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { SearchResult } from "@/app/gallery/page";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

export function ImageGrid({
  images,
  getImage,
}: {
  images: SearchResult[];
  getImage: (imageData: SearchResult) => React.ReactNode;
}) {
  const [numColumns, setNumColumns] = useState(4);
  const [selectedImage, setSelectedImage] = useState<SearchResult | null>(null);

  useEffect(() => {
    // Function to calculate the number of columns based on screen width
    const calculateNumColumns = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setNumColumns(3);
      } else if (screenWidth >= 768) {
        setNumColumns(2);
      } else {
        setNumColumns(1);
      }
    };

    // Initial calculation
    calculateNumColumns();

    // Listen to window resize events and recalculate
    window.addEventListener("resize", calculateNumColumns);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateNumColumns);
    };
  }, []);

  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => idx % numColumns === colIndex);
  }

  const openModal = (imageData: SearchResult) => {
    setSelectedImage(imageData);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`grid grid-cols-${numColumns} gap-4 py-8 pr-8`}>
      {Array.from({ length: numColumns }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {getColumns(colIndex).map((imageData, idx) => (
            <div
              key={idx}
              className="cursor-pointer"
              onClick={() => openModal(imageData)}
            >
              {getImage(imageData)}
            </div>
          ))}
        </div>
      ))}

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white/10 p-4 max-w-screen-md rounded-sm">
            <button
              className="absolute -top-10 -right-10 p-2 text-white hover:text-zinc-400"
              onClick={closeModal}
            >
              Close
            </button>

            {getImage(selectedImage)}
          </div>
        </div>
      )}
    </div>
  );
}





// //  LIGHTBOX WITH NAVIGATION

// export function ImageGrid({
//   images,
//   getImage,
// }: {
//   images: SearchResult[];
//   getImage: (imageData: SearchResult) => React.ReactNode;
// }) {
//   const [numColumns, setNumColumns] = useState(4);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

//   useEffect(() => {
//     // ... (same as your existing code for resizing columns)
//   }, []);

//   function getColumns(colIndex: number) {
//     return images.filter((resource, idx) => idx % numColumns === colIndex);
//   }

//   const openModal = (imageIndex: number) => {
//     setSelectedImageIndex(imageIndex);
//   };

//   const closeModal = () => {
//     setSelectedImageIndex(null);
//   };

//   const nextImage = () => {
//     if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
//       setSelectedImageIndex(selectedImageIndex + 1);
//     }
//   };

//   const prevImage = () => {
//     if (selectedImageIndex !== null && selectedImageIndex > 0) {
//       setSelectedImageIndex(selectedImageIndex - 1);
//     }
//   };

//   return (
//     <div className={`grid grid-cols-${numColumns} gap-4`}>
//       {Array.from({ length: numColumns }).map((_, colIndex) => (
//         <div key={colIndex} className="flex flex-col gap-4">
//           {getColumns(colIndex).map((imageData, idx) => (
//             <div
//               key={idx}
//               className="cursor-pointer"
//               onClick={() => openModal(idx)}
//             >
//               {getImage(imageData)}
//             </div>
//           ))}
//         </div>
//       ))}

//       {selectedImageIndex !== null && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
//           <div className="relative bg-white/10 p-4 max-w-screen-md">
//             <button
//               className="absolute -top-10 -right-10 p-2 text-white hover:text-zinc-400"
//               onClick={closeModal}
//             >
//               Close
//             </button>

//             {getImage(images[selectedImageIndex])}

//             <div className="flex justify-between mt-4">
//               <button
//                 className="text-white hover:text-zinc-400"
//                 onClick={prevImage}
//                 disabled={selectedImageIndex === 0}
//               >
//                 Previous
//               </button>
//               <button
//                 className="text-white hover:text-zinc-400"
//                 onClick={nextImage}
//                 disabled={selectedImageIndex === images.length - 1}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }