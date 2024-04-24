import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import Segment from '../Segment';

const objectFitOptions = [
  {
    label: 'cover',
    value: 'cover'
  },
  {
    label: 'contain',
    value: 'contain'
  },
  {
    label: 'fill',
    value: 'fill'
  },
  {
    label: 'none',
    value: 'none'
  },
  {
    label: 'scale-down',
    value: 'scale-down'
  }
];
export default function ImageContainer() {
  const [base64, setBase64] = useState<string>('');
  const [objectFit, setObjectFit] = useState('contain');

  const readAsImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setBase64(e.target?.result as string);
    };
    reader.readAsDataURL(file as Blob);
  };
  // 处理粘贴事件
  const handlePaste = (e: Event) => {
    const event = e as ClipboardEvent;
    const items = event.clipboardData?.items;
    if (items?.length) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          file && readAsImage(file);
          break;
        }
      }
    }
  };
  // 处理点击选择文件
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (base64) return;
    const file = e.target.files?.[0];
    file && readAsImage(file);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  // 处理dragover 设置鼠标样式
  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  // 处理拖拽
  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    const file = e.dataTransfer.files[0];
    file && readAsImage(file);
  };
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const handleKeyBoard = (e: Event) => {
    const event = e as KeyboardEvent;

    if (['Delete', 'Backspace'].includes(event.code)) {
      setBase64('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyBoard);
    return () => {
      document.removeEventListener('keydown', handleKeyBoard);
    };
  }, []);
  return (
    <div className="h-full flex flex-center box-border relative">
      {base64 && (
        <img
          className="w-screen h-screen bg-[100%_auto] bg-no-repeat pointer-events-none"
          src={base64}
          style={{ objectFit: objectFit as any }}
        />
      )}
      <label
        className={clsx(
          'w-[80%] max-h-[480px] transition-all duration-200 aspect-[4/3] overflow-hidden absolute-center border-2 border-blue-500 rounded-lg border-dashed flex flex-center',
          { 'opacity-0': base64 }
        )}>
        <div className="flex flex-col items-center">
          <Plus className="text-blue-500" size={40} />
          <p className="mt-2 text-gray-500 text-sm">支持拖拽、复制/粘贴或点击选择图片文件</p>
          <p className="mt-1 text-gray-500 text-sm">支持点击回退(Backspace)或删除(Delete)清空</p>
        </div>
        <input
          className="opacity-0 absolute inset-0 cursor-default"
          type={base64 ? 'text' : 'file'}
          accept="image/*"
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onChange={handleFileChange}
        />
      </label>
      <Segment
        defaultValue={objectFit}
        className="absolute right-4 bottom-4 transition-all opacity-30 hover:opacity-100 duration-300"
        options={objectFitOptions}
        onSegmentChange={setObjectFit}
      />
    </div>
  );
}
