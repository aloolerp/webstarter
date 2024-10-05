import { Button } from "../ui/button";  // Import Button for URL fields
import { ArrowDown, Eye } from 'lucide-react';

    interface PublicationsProps {
        header?: string;
        subtitle?: string;

        items?: Array<PublicationsItemProps>;
        }

        interface PublicationsItemProps {
        title?: string;
        content?: string;
        image?: string;
        attachment?: string;

        }
        
    const Publications = ({ header, subtitle, items }: PublicationsProps) => {
        return (
            <section className="p-6">
            <div className="container">
              {/* Header and Subtitle */}
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{header}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{subtitle}</p>
      
              {/* Publication Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                {items  && items.map((item, idx) => (
                  <div key={idx} className="publication-item-container flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2">
                    {/* Image */}
                    {item.image && (
                      <div className="w-1/3 mr-4">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                      </div>
                    )}
      
                    {/* Content */}
                    <div className="w-2/3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{item.content}</p>
      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                      
                        {/* Buttons for Viewing and Downloading Attachment */}
                        {item.attachment && (
                          <>
                            <a href={item.attachment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Button variant="default">
                                View <Eye size={16} />
                              </Button>
                            </a>
                            <a href={item.attachment} download className="flex items-center gap-2">
                              <Button variant="outline">
                                Download <ArrowDown size={16} />
                              </Button>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
    }

    export default Publications;