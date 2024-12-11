import ResetPasswordForm from '@/components/pages/auth/reset-password';

export default async function ResetPasswordPage(
  props: {
    searchParams: Promise<{ token: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const { token } = searchParams;
  return (
    <div className="flex justify-center items-center h-screen">
      <ResetPasswordForm token={token} />
    </div>
  );
}
