import { useRouter as useSolitoRouter } from '@packrat/ui';

interface HrefObject {
  pathname?: string;
  /** Query parameters for the path. */
  params?: Record<string, any>;
}

type Href = HrefObject | string;

interface Router {
  push: (href: Href) => void;
}

export const useRouter = (): Router => {
  const router = useSolitoRouter();

  return router;
};
