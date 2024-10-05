import React from "react";
import { Link } from "react-router-dom";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define the FrontClient type to match the fields in the Front Client doctype
interface FrontClient {
  name: string;
  client_name: string;
  logo: string;
}

const FrontClient: React.FC = () => {
  // Fetch all Front Client records
  const { data: clients, error, isValidating } = useFrappeGetDocList<FrontClient>(
    "Front Client",
    {
      fields: ["name", "client_name", "logo"],
    }
  );

  if (isValidating) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>Error loading clients: {error.message}</p>;
  }

  if (!clients || clients.length === 0) {
    return <p>No clients available.</p>;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Header and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Clients</h2>
          <p className="text-lg text-muted-foreground">Trusted by leading companies around the world</p>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients.map((client) => (
            <Link
              to={`/web/clients/${client.name}`}
              key={client.name}
              className="hover:opacity-90 transition-opacity duration-200"
            >
              <Card className="h-full flex flex-col justify-between">
                <CardHeader className="flex flex-col items-center">
                  {/* Logo */}
                  <div className="w-40 h-40 ">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.client_name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                        {client.client_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {/* Client Name */}
                  <CardTitle className="text-center text-xl font-semibold">
                    {client.client_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <p className="text-center text-gray-500">Learn more about {client.client_name}</p> */}
                  
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrontClient;