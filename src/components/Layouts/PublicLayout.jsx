import { Navbar } from "../Navbar";
import Layout from "./Layout";
export default function PublicLayout({ children }){
  const headerContent = (
    <>
      {/* Include header content */}
      <Navbar/>
    </>
  );

  const footerContent = (
    <div>
      {/* Include footer content */}
    </div>
  );

  return (
    <Layout headerContent={headerContent} footerContent={footerContent}>
      {children}
    </Layout>
  );
};

