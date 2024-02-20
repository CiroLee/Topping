import clsx from 'clsx';
import TitleBar from './components/TitleBar';
import ImageContainer from './components/ImageContainer';
import { isMac } from './utils/utils';
export default function App() {
  return (
    <div className={clsx('w-screen h-screen overflow-hidden bg-sky-100 relative', { 'rounded-md': isMac() })}>
      <TitleBar />
      <ImageContainer />
    </div>
  );
}
