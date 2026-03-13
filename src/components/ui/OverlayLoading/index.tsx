import AnimatingDots from '../AnimatingDots';

const OverlayLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-lg">
      <AnimatingDots color="bg-brand-200" />
    </div>
  );
};

export default OverlayLoading;
