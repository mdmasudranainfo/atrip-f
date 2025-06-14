"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function BlogFilterDrawer({ contents }: { contents: any }) {
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

    const handleCheckbox = (key: string) => {
        setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Dialog.Root>
            {/* Filter Button (fixed at bottom center) */}
            <div className="md:hidden w-full fixed bottom-2 left-0 z-50 flex justify-center items-center">
                <Dialog.Trigger asChild>
                    <button className="text-lg font-semibold bg-white rounded-full px-4 py-2 shadow">
                        Filter
                    </button>
                </Dialog.Trigger>
            </div>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
                <Dialog.Content
                    className="fixed left-0 bottom-0 w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-lg z-50 flex flex-col animate-slideUp"
                    style={{ maxHeight: "80vh" }}
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <span className="font-bold text-lg">Filter</span>
                        <Dialog.Close asChild>
                            <button className="text-2xl">&times;</button>
                        </Dialog.Close>
                    </div>
                    <div className="overflow-y-auto flex-1 p-4">
                        <div className="mt-6">
                            <ul className="space-y-2">
                                {contents.map((item: any, index: number) => (
                                    <li key={index} className=" text-blue-600">
                                        <label className="flex items-center gap-2">
                                            <span>{index + 1}</span>
                                            <a href={`#${index + 1}`} className="text-blue-600">
                                                {item.title.length > 40
                                                    ? item.title.slice(0, 40) + "..."
                                                    : item.title}
                                            </a>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>

            {/* Optional: Add slide-up animation */}
            <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
        </Dialog.Root>
    );
}