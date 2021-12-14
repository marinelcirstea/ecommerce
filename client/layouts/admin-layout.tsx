type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = ({
  children,
}) => {
  return (
    <main>
      admin layout
      {children}
    </main>
  );
};

export default AdminLayout;
