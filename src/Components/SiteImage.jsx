import { useImageSource } from '../data/useImageSource';

export default function SiteImage({ source, fallback, ...props }) {
  const src = useImageSource(source, fallback);
  return src ? <img {...props} src={src} /> : null;
}
