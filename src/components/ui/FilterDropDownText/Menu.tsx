import { useOutsideClick } from '@/hooks/useOutsideClick';
import { MenuTypes } from '@/lib/types';

function Menu({
  open,
  onClose,
  children,
  style = {},
  x = 0,
  y = 0,
  className = '',
  hideShadow,
}: MenuTypes) {
  const ref = useOutsideClick((event) => {
    onClose(event);
  });

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`bg-surface-white absolute inset-0 z-[25] h-fit overflow-y-scroll rounded p-2 ${className}`}
      style={{
        boxShadow: hideShadow ? 'none' : '0px 0px 44px 0px rgba(0, 0, 0, 0.15)',
        transform: `translate(${x}px, ${y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Menu;
