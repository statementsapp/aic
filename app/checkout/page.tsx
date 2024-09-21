import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

function LoadingFallback() {
  return <div>Loading...</div>;
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}