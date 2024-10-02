import Link from 'next/link';

export default function Footer() {
  return (
    <div className="text-sm text-gray-400 p-4 text-center bg-gray-800">
      Questions? <Link href="mailto:contact@useai.in.th" className="text-blue-400 hover:underline">Contact us</Link>
    </div>
  );
}