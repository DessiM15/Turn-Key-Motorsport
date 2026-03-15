'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { useWishlist } from '@/lib/wishlist-context';
import AuthModal from '@/components/auth/AuthModal';

interface WishlistButtonProps {
  productId: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function WishlistButton({ productId, size = 'sm', className }: WishlistButtonProps) {
  const { isLoggedIn } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isSaved = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    toggleWishlist(productId);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After login/signup, add to wishlist
    toggleWishlist(productId);
  };

  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-200',
          isSaved
            ? 'bg-accent/20 text-accent hover:bg-accent/30'
            : 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white',
          buttonSize,
          className,
        )}
        aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={cn(iconSize, isSaved && 'fill-accent')}
        />
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="signup"
        message="Create a free account to save items to your wishlist"
      />
    </>
  );
}
