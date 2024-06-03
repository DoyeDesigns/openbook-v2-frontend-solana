'use client'

import { useRouter, usePathname } from 'next/navigation'

function ActiveLink({ children, href }) {
  const router = useRouter();
  const pathname = usePathname()

  let className = "";
  if (pathname === href)
    className = `${className} underline underline-offset-4`;

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default ActiveLink;
