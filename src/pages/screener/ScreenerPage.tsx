import { useScreener } from '../../hooks/useScreener';
import { useIsMobile } from '../../hooks/useIsMobile';
import ScreenerDesktop from './ScreenerDesktop';
import ScreenerMobile from './ScreenerMobile';

function ScreenerPage() {
  const screener = useScreener();
  const isMobile = useIsMobile();

  return isMobile ? (
    <ScreenerMobile {...screener} />
  ) : (
    <ScreenerDesktop {...screener} />
  );
}

export default ScreenerPage;
