import { isMac } from '@/utils/utils';
import { X, Minus } from 'lucide-react';
import { Quit, WindowMinimise } from '@wails/runtime';
import clsx from 'clsx';
function MacTitleBar() {
  return (
    <div className="h-[28px] transition-all bg-transparent group hover:bg-black/30 px-[8px] flex items-center gap-[6px]">
      <div
        className="size-[13px] group-hover:bg-red-400 transition-all rounded-full flex flex-center"
        title="关闭"
        onClick={Quit}>
        <X size={9} className="text-black/60 group-hover:visible invisible" />
      </div>
      <div
        title="最小化"
        className="size-[13px] group-hover:bg-[#fdd32d] transition-all rounded-full flex flex-center"
        onClick={WindowMinimise}>
        <Minus size={9} className="text-black/60 group-hover:visible invisible" />
      </div>
    </div>
  );
}

function WindowTitleBar() {
  return (
    <div className="h-[32px] transition-all bg-transparent group hover:bg-black/30 px-[8px] flex items-center gap-[6px]">
      <div
        title="关闭"
        className="size-[18px] rounded-[2px] transition-colors hover:bg-white/30 flex flex-center"
        onClick={Quit}>
        <X size={10} className="text-black/60 group-hover:visible invisible" />
      </div>
      <div
        title="最小化"
        className="size-[18px] rounded-[2px] transition-colors hover:bg-white/30 flex flex-center"
        onClick={WindowMinimise}>
        <Minus size={10} className="text-black/60 group-hover:visible invisible" />
      </div>
    </div>
  );
}

export default function TitleBar() {
  return (
    <div
      className={clsx('fixed top-0 left-0 w-full z-10 cursor-default overflow-hidden', { 'rounded-t-md': isMac() })}
      style={{ '--wails-draggable': 'drag' } as React.CSSProperties}>
      {isMac() ? <MacTitleBar /> : <WindowTitleBar />}
    </div>
  );
}
