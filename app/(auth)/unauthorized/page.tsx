export default function UnauthorizedPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">Vous n'avez pas l'autorisation d'accéder à cette page.</h1>
      <p>Cette page n'est visible que par les administrateurs.</p>
    </div>
  );
}