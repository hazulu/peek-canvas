import React, { useEffect, useState, ChangeEventHandler, FunctionComponent, HTMLInputTypeAttribute, MouseEventHandler, TouchEventHandler } from 'react';
import UploadImage from 'Components/icons/upload-image';

type DropzoneProps = {
    onFilesDropped: Function
}


const Dropzone: FunctionComponent<DropzoneProps> = ({ onFilesDropped }: DropzoneProps) => {

    const [showDropzone, setShowDropzone] = useState(false);

    useEffect(() => {
        window.addEventListener("dragenter", onDragEnter);
        window.addEventListener("dragleave", onDragLeave);
        window.addEventListener('dragover', onDragOver);
        window.addEventListener("drop", onDrop);

        return () => {
            window.removeEventListener("dragenter", onDragEnter);
            window.removeEventListener("dragleave", onDragLeave);
            document.removeEventListener('dragover', onDragOver);
            window.removeEventListener("drop", onDrop);
        };
    }, []);

    const onDragEnter = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDropzone(true);
    }

    const onDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDropzone(false);
    }

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        const files = dt?.files;

        setShowDropzone(false);
        onFilesDropped(files);
    }

    return (
        <div data-enabled={showDropzone} className="flex bg-sky-200 pointer-events-none transition-all duration-75 justify-center items-center absolute inset-0 z-10 opacity-0 data-[enabled=true]:opacity-50">
            <UploadImage className='w-48 h-48'/>
        </div>
    )
}

export default Dropzone