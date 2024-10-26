import ResetPasswordForm from '@/components/pages/auth/reset-password';

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  return (
    <div className="flex justify-center items-center h-screen">
      <ResetPasswordForm token={token} />
    </div>
  );
}
