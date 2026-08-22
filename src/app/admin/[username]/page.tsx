import ProfileEditor from "@/components/admin/ProfileEditor";

export default async function AdminProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <ProfileEditor username={username} />;
}
