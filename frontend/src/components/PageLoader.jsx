import { LoaderIcon } from 'lucide-react';
import { APP_NAME, AppLogo } from './AppLogo';

const PageLoader = () => {
  return (
    <div className='bg-background text-foreground flex h-dvh items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <AppLogo
          size={44}
          className='rounded-xl'
        />

        <div className='text-muted flex items-center gap-2 text-sm font-medium'>
          <LoaderIcon
            className='text-accent size-4 animate-spin'
            aria-hidden
          />
          <span>Loading {APP_NAME}</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
