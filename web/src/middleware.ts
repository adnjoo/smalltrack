import { authMiddleware } from '@clerk/nextjs';
import { PAGES } from './app/lib/constants';

export default authMiddleware({
  publicRoutes: Object.values(PAGES).map((page) => page.href),
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
