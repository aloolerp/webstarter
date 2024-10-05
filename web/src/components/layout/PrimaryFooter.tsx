
import { useFrappeGetDoc } from "frappe-react-sdk";

export const PrimaryFooter = () => {
  const { data, error } = useFrappeGetDoc("Web Settings", "Web Settings");

  if (error) {
    return <div>Error loading footer items.</div>;
  }

  const footerItems = data?.footer_items || [];

  // Group items by title (parent)
  const groupedFooterItems = footerItems.reduce((acc, item) => {
    if (!item.parent_label && item.label) {
      acc[item.label] = { parent: item, children: [] };
    } else if (item.parent_label) {
      if (!acc[item.parent_label]) {
        acc[item.parent_label] = { parent: { label: item.parent_label }, children: [] };
      }
      acc[item.parent_label].children.push(item);
    }
    return acc;
  }, {});

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-1">
        <div className="flex items-center gap-2">
            {data?.app_logo && (
              <img src={data.app_logo} alt={data.app_name || "Logo"} className="h-20 w-28 " />
            )}
            <span className="text-xl font-bold">{data?.app_name || "" }</span>
          </div>
        </div>

        {Object.keys(groupedFooterItems).map((key) => {
          const group = groupedFooterItems[key];
          return (
            <div key={key} className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">{group.parent.label}</h3>
              {group.children.map((child, index) => (
                <div key={index}>
                  <a
                    rel="noreferrer noopener"
                    href={child.url}
                    className="opacity-60 hover:opacity-100"
                  >
                    {child.label}
                  </a>
                </div>
              ))}
            </div>
          );
        })}
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://demo.aloolerp.com/"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Alool Technologies
          </a>
        </h3>
      </section>
    </footer>
  );
};

export default PrimaryFooter;
